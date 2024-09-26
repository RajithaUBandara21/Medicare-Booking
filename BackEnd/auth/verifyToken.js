import jwt from 'jsonwebtoken';
import Doctor from "../models/DoctorSchema.js"
import Patient from "../models/UserSchema.js"

export const authenticate = async (req, res, next) => {
  // Get token from header

  const authToken = await req.headers.authorization;

  // Check if no token

  if (!authToken) {
    return res
      .status(401)
      .json({ success: false, msg: "No token, authorization denied" });
  }
  try {
    const token = authToken.split(" ")[1];

    //verify token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId =decoded.id;
    req.role = decoded.role;
    console.log(authToken);
    next();
  } catch (err) {
    if(err.name == "TokenExpiredError"){
        return res.status(401).json({ success: false, msg: "Token Expired" });
    }

    return res.status(401).json({ success: false, msg: "Invalid Token"});
    }
  
};
export const restrict = roles => async (req, res, next) => {
  const userId = req.userId;

  let user;

  const patient = await Patient.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }
  if(!roles.includes(req.role)){
    return res.status(403).json({ success: false, msg: "You are not authorized to access this route" });
  }

  next();
}