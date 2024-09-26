import Doctor from "../models/DoctorSchema.js"
import Booking from "../models/BookingSchema.js"

export const UpdateDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const updateDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

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

    console.log("id" ,doctorId);

    try {
      const doctor = await Doctor.findById(doctorId);

      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      const { password, ...others } = doctor._doc;
      const appointments = await Booking.find({ doctor: doctorId });
      res
        .status(200)
        .json({
          success: false,
          message: " profile info is geting",
          data: { ...others ,appointments},
        });
      
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }}