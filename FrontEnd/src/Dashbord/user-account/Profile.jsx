
// import avatar from '../assets/images/avatar-icon.png'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import uploadImageToCloudinary from '../../utils/uploadCloudinary'
import {BASE_URL , token} from '../../config'
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader'

const Profile = ( {user}) => {


  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [fromData, setFromData] = useState({
    email: "",
    name: "",
    password: "",
    bloodType: "",
    photo: null,
    gender: "male",
  });
  

 const navigate = useNavigate();
 useEffect(() => {
  setFromData({name:user.name,email:user.email,bloodType:user.bloodType,photo:user.photo, gender:user.gender})}

  , [user])

  const handeleInputChange = e => {
    setFromData({...fromData,[e.target.name]:e.target.value});
  };
const handeleFileInputChange = async (event) => {
  const file = event.target.files[0]; 

  const data = await uploadImageToCloudinary(file);

  setSelectedFile(data.url);
  setFromData({...fromData,photo:data.url})

};



const submitHandler = async event=>{

  event.preventDefault();
  setLoading(true);

  try{

    const res = await fetch(`${BASE_URL}/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(fromData),
    });

  const {message} = await res.json();

  if(!res.ok){
    throw new Error(message)
  }

  setLoading(false);
  toast.success("User is registered")

  navigate('/users/profile/me')


}catch(error){
  toast.error(error.message)
  setLoading(false);
}}

  return (

    <div className='mt-10'>
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
                   aria-readonly
                   readOnly
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
              
                  />
                </div>


                <div className="mb-5">
                  <input
                    type="text"
                    placeholder=" Blood type"
                    name="bloodType"
                    value={fromData.bloodType}
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
                  {FormData.photo && (
                    <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                      <img
                        src={fromData.photo}
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
                    {selectedFile ? selectedFile.name : "Upload Photo"}
                    </label>
                  </div>
                </div>

                <div className="mt-7">
                  <button
                  disabled= {loading && true }
                    type="submit"
                    className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 cursor-pointer"
                  >
                    {loading ? <HashLoader size={25} color="#fff" /> : "Update"}
                  </button>
                </div>
               
              </form>
    </div>
  )
}

export default Profile
