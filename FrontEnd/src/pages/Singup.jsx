
import signupImg from '../assets/images/signup.gif'
// import avatar from '../assets/images/avatar-icon.png'
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import uploadImageToCloudinary from '../utils/uploadCloudinary'
import {BASE_URL} from '../config'
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader'


const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [fromData, setFromData] = useState({
    email: "",
    name: "",
    password: "",
    role: "patient",
    photo: "",
    gender: "male",
  });
  

 const navigate = useNavigate();

  const handeleInputChange = e => {
    setFromData({...fromData,[e.target.name]:e.target.value});
  };
const handeleFileInputChange = async (event) => {
  const file = event.target.files[0]; 

  const data = await uploadImageToCloudinary(file);
setPreviewURL( "url", data.url)
  setSelectedFile(data.url);
  setFromData({...fromData,photo:data.url})


};



const submitHandler = async event=>{

  event.preventDefault();
  setLoading(true);

  try{

    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fromData),
    });

  const {message} = await res.json();

  if(!res.ok){
    throw new Error(message)
  }

  setLoading(false);
  toast.success("User is registered")

  navigate('/login')


}catch(error){
  toast.error(error.message)
  setLoading(false);
}}



  return (
    <>
      <section className=" container  px-5 mx-[26px] xl:px-0 ">
        <div className="max-w-[1170px] mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:block bg-primaryColor rounded-l-lg">
              <figure className="rounded-l-lg">
                <img src={signupImg} alt="" className="w-full rounded-l-lg" />
              </figure>
            </div>

            {/* ::::::::form::::::::::::::: */}
            <div className="rounded-l-lg lg:pl-16 py-10">
              <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                Create an <span className="text-primaryColor">Account</span>
              </h3>
              <form onSubmit={submitHandler}>
                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={fromData.name}
                    onChange={handeleInputChange}
                    className="w-full pr-4  py-3 border-b border-solid border-[#0066ff61] focus:outline-none
          focus:border-b-primaryColor focus:shadow-xl  text-[22px] leading-7 text-headingColor placeholder:text-textColor round-md cursor-pointer"
                    required
                  />
                </div>

                <div className="mb-5">
                  <input
                    type="email"
                    placeholder=" Enter your email"
                    name="email"
                    value={fromData.email}
                    onChange={handeleInputChange}
                    className="w-full pr-4  py-3 border-b border-solid border-[#0066ff61] focus:outline-none
          focus:border-b-primaryColor focus:shadow-xl  text-[22px] leading-7 text-headingColor placeholder:text-textColor round-md cursor-pointer"
                    required
                  />
                </div>

                <div className="mb-5">
                  <input
                    type="password"
                    placeholder=" Password"
                    name="password"
                    value={fromData.password}
                    onChange={handeleInputChange}
                    className="w-full pr-4  py-3 border-b border-solid border-[#0066ff61] focus:outline-none
          focus:border-b-primaryColor focus:shadow-xl  text-[22px] leading-7 text-headingColor placeholder:text-textColor round-md cursor-pointer"
                    required
                  />
                </div>
                <div className="mb-5 flex item-center justify-between ">
                  <label
                    htmlFor=""
                    className="text-textColor font-semibold text-[15px] leading-7 "
                  >
                    Are you a:
                    <select
                      name="role"
                      value={fromData.role}
                      onChange={handeleInputChange}
                      className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                    </select>
                  </label>

                  <label
                    htmlFor=""
                    className="text-textColor font-semibold text-[15px] leading-7 "
                  >
                    Gender
                    <select
                      name="gender"
                      value={fromData.gender}
                      onChange={handeleInputChange}
                      className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                    >
                      <option value="patient">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>

                <div className="mb-5 flex item-center gap-3">
                  {selectedFile && (
                    <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                      <img
                        src={previewURL}
                        alt=" "
                        className="w-full rounded-full"
                      />
                    </figure>
                  )}

                  <div className="relative w-[130px] h-[50px] ">
                    <input
                      type="file"
                      name="photo"
                      id="customFile"
                      onChange={handeleFileInputChange}
                      accept=".jpg,.png"
                      className="absolute top-0 left-0 opacity-0  w-full h-full cursor-pointe"
                    />
                    <label
                      htmlFor="customFile"
                      className="absolute top-0 left-0 w-full h-full flex item-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                    >
                      Upload Photo
                    </label>
                  </div>
                </div>

                <div className="mt-7">
                  <button
                    disabled={loading && true}
                    type="submit"
                    className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 cursor-pointer"
                  >
                    {loading ? (
                      <HashLoader size={35} color="#fff" />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
                <p className="mt-5 text-textColor text-center">
                  Already have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primaryColor cursor-pointer"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup
