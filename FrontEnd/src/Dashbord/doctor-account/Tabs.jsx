import React from 'react'
import { BiMenu } from 'react-icons/bi'
import { useContext } from 'react'
import { authContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'



const Tabs = ({tab,SetTab}) => {


  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  }

console.log(tab,)
  return (
    <div>
      <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
        <button
        onClick={() => SetTab("overview")}
          className={`${
            tab === "overview"
              ? "bg-indigo-100 text-primaryColor"
              : " bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>

        <button
        onClick={() => SetTab("appointments")}
          className={`${
            tab === "appointments"
              ? "bg-indigo-100 text-primaryColor"
              : " bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Appointments
        </button>

        <button
        onClick={() => SetTab("profile")}
          className={`${
            tab === "profile"
              ? "bg-indigo-100 text-primaryColor"
              : " bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Profile
        </button>

        <div className="w-full mt-[100px]">
    <button
      onClick={handleLogout}
      className="w-full bg-primaryColor p-3 text-[16px] leading-7 rounded-md text-white"
    >
      Logout
    </button>
    <button className="w-full bg-red-400 p-3  mt-4 text-[16px] leading-7 rounded-md text-white">
      Delete Account
    </button>
  </div>
      </div>
    </div>
  );
}

export default Tabs
