import { useEffect, useState } from "react";
import {AiOutlineDelete} from "react-icons/ai";
import uploadImageToCloudinary from "./../../utils/uploadCloudinary.js";
import {BASE_URL , token} from "./../../config.js";
import {toast} from   "react-toastify";


const Profile = ( doctorData) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [],

    experience: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  useEffect(() => {
  setFormData({
    name: doctorData.name,
    email: doctorData.email,
    phone:  doctorData.phone,
    password:   doctorData.password,
    bio:  doctorData.bio,
    gender:   doctorData.gender,
    specialization: doctorData.specialization,
    ticketPrice:  doctorData.ticketPrice,
    qualifications:   doctorData.qualifications,

    experience:   doctorData.experience,
    timeSlots:  doctorData.timeSlots,
    about:  doctorData.about,
    photo:  doctorData.photo,



  });  
  
  }, [doctorData]
  )

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelFileInputChange = async (e) => {

    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setFormData({ ...formData,photo: data?.url})

console.log(data);    

  };

  const updateProfileHandeler = async (e) => {
    e.preventDefault();

    try{
      const res = await fetch (` ${BASE_URL}/doctors/${doctorData._id}` , {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),

      });

      const result = await res.json();
      if(!res.ok)
      {
        throw new Error(result.message);  
      }
      toast.success("Profile Updated Successfully");

    }catch (err){
      toast.error(err.message);
    }


  };

  // reuseable function to add item in array
  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };
  // reusable input change function
  const handleReusableChangeFunc = (key, event, index) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

// reusable function to delete item from array
const deleteItem = (key,index)=>
{
  setFormData(prevFormData => ({
    ... prevFormData,
    [key]:prevFormData[key].filter((_, i)=> i !== index)
  }))
}




  const addQualification = (e) => {
    e.preventDefault();

    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const handelQualificationChange = (event, index) => {
    handleReusableChangeFunc("qualifications", event, index);
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualification", index);
  };




  const addExperience = (e) => {
    e.preventDefault();

    addItem("experience", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const handelExperienceChange = (event, index) => {
    handleReusableChangeFunc("experience", event, index);
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experience", index);
  };





  const addTimeSlot = (e) => {
    e.preventDefault();

    addItem("timeSlot", {
      day: "",
      startingTime: "",
      endingTime: "",
    });
  };

  const handelTimeSlotChange = (event, index) => {
    handleReusableChangeFunc("timeSlot", event, index);
  };

  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlot", index);
  };



  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>

      <form>
        <div className="mb-5">
          <p className="form_lable">Name</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form_input"
            placeholder="Full Name"
          />
        </div>

        <div className="mb-5">
          <p className="form_lable">Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form_input"
            placeholder="Email"
            readOnly
            aria-readonly
            disabled="true"
          />
        </div>

        <div className="mb-5">
          <p className="form_lable">Phone</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="form_input"
            placeholder="Phone Number"
          />
        </div>

        <div className="mb-5">
          <p className="form_lable">Bio</p>
          <input
            type="text"
            name="bio"
            value={formData.email}
            onChange={handleInputChange}
            className="form_input"
            placeholder="Bio"
            maxLength={100}
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            {/* gender */}
            <div>
              <p className="form_label">Gender*</p>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form_input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* specialization */}
            <div>
              <p className="form_label">Specialization*</p>

              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form_input py-3.5"
              >
                <option value="">Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>

            {/* ticket price */}

            <div>
              <p className="form_label">Ticket Price</p>
              <input
                type="number"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                className="form_input"
                placeholder="100"
              />
            </div>
          </div>

          {/* Qualification */}
          <div className="mb-5 ">
            {/*Expereance */}
            <p className="form_label ">Qualifications*</p>
            {formData.qualifications?.map((item, index) => (
              <div key={index}>
                <div>
                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-5 ">
                    <div>
                      <p className="form_label">Starting Date</p>
                      <input
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        className="form_input"
                        onChange={(e) => handelQualificationChange(e, index)}
                      />
                    </div>

                    <div>
                      <p className="form_label">End Date</p>
                      <input
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        className="form_input"
                        onChange={(e) => handelQualificationChange(e, index)}
                      />
                    </div>
                  </div>

                  {/* Degree and University */}
                  <div className="grid grid-cols-2 gap-5 ">
                    <div>
                      <p className="form_label">Degree</p>
                      <input
                        type="text"
                        name="degree"
                        value={item.degree}
                        className="form_input"
                        onChange={(e) => handelQualificationChange(e, index)}
                      />
                    </div>

                    <div>
                      <p className="form_label">University</p>
                      <input
                        type="text"
                        name="university"
                        value={item.university}
                        className="form_input"
                        onChange={(e) => handelQualificationChange(e, index)}
                      />
                    </div>
                  </div>

                  <button  onClick={e => deleteQualification(e ,index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}

            <button className="bg-[#000] py-2 px-2 rounded text-white h-fit cursor-pointer">
              Add Qualification
            </button>
          </div>

          {/* Experience */}
          <div className="mb-5 ">
            <p className="form_label ">Experience*</p>
            {formData.experience?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 gap-5 ">
                    <div>
                      <p className="form_label">Starting Date</p>
                      <input
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        className="form_input"
                        onChange={(e) => handelExperienceChange(e, index)}
                      />
                    </div>

                    <div>
                      <p className="form_label">End Date</p>
                      <input
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        className="form_input"
                        onChange={(e) => handelExperienceChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5 ">
                    <div>
                      <p className="form_label">Position</p>
                      <input
                        type="text"
                        name="position"
                        value={item.degree}
                        className="form_input"
                        onChange={(e) => handelExperienceChange(e, index)}
                      />
                    </div>

                    <div>
                      <p className="form_label">Hospital</p>
                      <input
                        type="text"
                        name="hospital"
                        value={item.university}
                        className="form_input"
                        onChange={(e) => handelExperienceChange(e, index)}
                      />
                    </div>
                  </div>
                  <button onClick = {e => deleteExperience(e,index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
















            <button onClick={addExperience} className="bg-[#000] py-2 px-2 rounded text-white h-fit cursor-pointer">
              Add Experience
            </button>
          </div>

          <div className="mb-5 ">
            <p className="form_label ">Time Slots*</p>
            {formData.timeSlots?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5 ">
                    <div>
                      <p className="form_label">Day*</p>
                      <select
                        name="day"
                        value={item.day}
                        className="form_input py-3.5"
                        onChange = {e => handelTimeSlotChange(e,index)}
                      >
                        <option value="">Select</option>
                        <option value="saturDay">Select</option>
                        <option value="sunDay">Sunday</option>
                        <option value="monDay">Monday</option>
                        <option value="tuesDay">Tuesday</option>
                        <option value="wendsDay">Wendsday</option>
                        <option value="thursDay">Thursday</option>
                        <option value="friDay">Friday</option>
                      </select>
                    </div>

                    <div>
                      <p className="form_label">Starting Time</p>
                      <input
                        type="time"
                        name="startingTime"
                        value={item.startingTime}
                        className="form_input"
                        onChange = {e => handelTimeSlotChange(e,index)}
                      />
                    </div>

                    <div>
                      <p className="form_label">Ending Time</p>
                      <input
                        type="time"
                        name="endingTime"
                        value={item.endingTime}
                        className="form_input"
                        onChange = {e => handelTimeSlotChange(e,index)}
                      />
                    </div>

                    {/* deleat button */}
                    <div className="flex items-center">
                      <button   onClick = {e => deleteTimeSlot(e,index)}  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-10 mb-[30px] cursor-pointer">
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addTimeSlot} className="bg-[#000] py-2 px-2 rounded text-white h-fit cursor-pointer">
              Add Time Slot
            </button>
          </div>

          <div className="mb-5">
            <p className="form_label">About</p>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              className="form_input"
              rows="5"
              placeholder="About"
            ></textarea>
          </div>

          <div className="mb-5 flex items-center gap-3">
            {formData.photo && (
              <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                <img
                  src={formData.photo}
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
                onChange={handelFileInputChange}
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
              type="submit"
              onClick={updateProfileHandeler}
              className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4  rounded-lg"
            >
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
