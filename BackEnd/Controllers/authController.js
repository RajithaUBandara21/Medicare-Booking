import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};


export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;
  try {
    let user = null;



    if (role === "patient") {
      user =  await User.findOne({ email });
    } else if (role === "doctor") {
     
      user =  await Doctor.findOne({ email });
   
    }

    // check user exists

    if (user) {
      return res.status(400).json({ success: false, message: "The user already exists" });
    }
    // hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashedPassword,
        photo,
        gender,
        role,
      });
    }

    if (role === "doctor") {
      user = new Doctor({
        email, password: hashedPassword, name, role, photo, gender
      });

     
    }



    let saveUser = await user.save(); //when fail its goes to catch
    

   
   
    res.status(200).json({success:true, message: "User is registered" });



  } catch (err) {
    res.status(500).json({ message: "user register error" , success:false});
  }
};



  export const login = async (req, res) => {
    const { email } = req.body;
    try {
      let user = null;

      const patient = await User.findOne({ email });
      const doctor = await Doctor.findOne({ email });

      if (patient) {
        user = patient;
      } else if (doctor) {
        user = doctor;
      }

      //user exist or not
      if (!user) {
        return res.status(400).json({ success: false, message: "User does not exist" });
      }
      // check password

      const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isPasswordMatch) {
        return res.status(400).json({ success: false, message: "Incorrect password" });
      }

      // get token
      const token = generateToken(user);

      const { password, role, appointment, ...rest } = user._doc;

      res
        .status(200)
        .json({
          success: true,
          message: "User is logged in",
          token,
          data: { ...rest },
          role,
        });
    } catch (err) {
      res.status(500).json({ success: false, message: "User login error" });

    }
  };
