import User from "../models/UserSchema.js"
import Booking from "../models/bookingSchema.js"
import Doctors from "../models/DoctorSchema.js"
import bcrypt from "bcryptjs"

export const UpdateUser = async (req, res) => {
  const id = req.params.id;
  const { password, ...updateData } = req.body;

  // restrict(["patient"]) only checks role - without this, any authenticated
  // patient could edit another patient's record (including their password) by id.
  if (req.userId !== id) {
    return res.status(403).json({ success: false, message: "You can only update your own profile" });
  }

  try {
    // the edit-profile form always submits a password field, blank unless the
    // user deliberately typed a new one - only touch the hash when it isn't blank,
    // otherwise every profile save wipes it out and locks the account out of login.
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "User updated",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    // same ownership gap as UpdateUser - role alone doesn't prove it's their own account
    if (req.userId !== id) {
      return res.status(403).json({ success: false, message: "You can only delete your own account" });
    }

    try {
      await User.findByIdAndDelete(
        id,
    
      );
  
      res.status(200).json({
        success: true,
        message: "User deleted",
     
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
}


  export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    // this route excludes the password but still leaks email/phone/gender/bloodType -
    // restrict(["patient"]) alone lets any patient read anyone else's record by id
    if (req.userId !== id) {
      return res.status(403).json({ success: false, message: "You can only view your own profile" });
    }

    try {
      const user = await User.findById(
        id,
     
      ).select("-password");
  
      res.status(200).json({
        success: true,
        message: "User found",
        data: user,
      });
    } catch (error) {
      res.status(404).json({ success: false, message: "no user found" });
    }
  }

  export const getAllUsers = async (req, res) => {

  
    try {
      const users = await User.find({}).select("-password");      
  
      res.status(200).json({
        success: true,
        message: "User found",
        data:users,
      });
    } catch (error) {
      res.status(404).json({ success: false, message: "no found" });
    }
  }

  export const  getUserProfile = async (req, res) => {
    const userId = req.userId;
   

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
        
      }
      const { password, ...others } = user._doc;
      res.status(200).json({ success: true , message:"Profile info is getting" ,data: {...others} });
    }
    catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  export const getMyAppointments = async (req, res) => {
    const userId = req.userId;


    try {
   
      const booking = await  Booking.find({user: userId})



      const doctorIds = booking.map((book) => book.doctor.toString())
    
      const doctors = await Doctors.find({_id: {$in: doctorIds}}).select("-password") 
     
     await res.status(200).json({success: true, message: "Appointments are getting", data: doctors})
 
 
      
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }


 