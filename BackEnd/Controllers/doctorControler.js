import Doctor from "../models/DoctorSchema.js"
import Booking from "../models/BookingSchema.js"
import bcrypt from "bcryptjs"

export const UpdateDoctor = async (req, res) => {
  const id = req.params.id;
  const { password, ...updateData } = req.body;

  // restrict(["doctor"]) only checks role - without this, any authenticated
  // doctor could edit another doctor's record (including their password) by id.
  if (req.userId !== id) {
    return res.status(403).json({ success: false, message: "You can only update your own profile" });
  }

  try {
    // the edit-profile form always submits a password field, blank unless the
    // doctor deliberately typed a new one - only touch the hash when it isn't blank,
    // otherwise every profile save wipes it out and locks the account out of login.
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updateDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Doctor updated",
      data: updateDoctor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteDoctor = async (req, res) => {
    const id = req.params.id;

    // same ownership gap as UpdateDoctor - role alone doesn't prove it's their own account
    if (req.userId !== id) {
      return res.status(403).json({ success: false, message: "You can only delete your own account" });
    }

    try {
      await Doctor.findByIdAndDelete(
        id,
    
      );
  
      res.status(200).json({
        success: true,
        message: "Doctor deleted",
     
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }


  export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;
   
  
    try {
      const doctor = await Doctor.findById(
        id
     
      ).populate("reviews").select("-password");
  
    
      res.status(200).json({
        success: true,
        message: "Doctor found ",
        data: doctor,
      });
    } catch (error) {
      res.status(404).json({ success: false, message: "no Doctor found" });
    }
  }

  export const getAllDoctors = async (req, res) => {

  
    try {
        const {query} = req.query;
        let doctors;

        if(query){
          doctors = await Doctor.find({
            isApproved: "approved",
            $or: [
              { name: { $regex: query, $options: "i" } },
              { specialization: { $regex: query, $options: "i" } },
            ],
          }).select("-password");
        }
        else{



       doctors = await Doctor.find({ isApproved:"approved"}).select("-password");   
 
        }

    
      res.status(200).json({
        success: true,
        message: "Doctor found d",
        data: doctors,
      });
    } catch (error) {
      res.status(404).json({ success: false, message: "no found" });
    }
  }

  export const getDoctorProfile = async (req, res) => {

    const doctorId = req.userId;

    try {
      const doctor = await Doctor.findById(doctorId);

      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      const { password, ...others } = doctor._doc;
      // Appointments.jsx renders item.user.name/email/photo/gender - without
      // populating it's just a raw ObjectId string, so the patient info never shows.
      const appointments = await Booking.find({ doctor: doctorId }).populate("user", "-password");
      res
        .status(200)
        .json({
          success: true,
          message: " profile info is geting",
          data: { ...others ,appointments},
        });
      
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }}