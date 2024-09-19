import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  const [fromData,setFromData] = useState({
    email:'',
    password:'',
  });

  const handeleInputChange = e => {
    setFromData({...FormData,[e.target.name]:e.target.value});
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 ">
        <h3 className="text-headingColor text-[16px] leading-9 font-bold mb-10">
          Hello!  <span className="text-primaryColor"> Welcome</span>back😊
        </h3>

        <form className="py-5  px-6 md:py-0">
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={FormData.email}
              onChange={handeleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
          focus:border-b-primaryColor text-[22px] focus:shadow-xl leading-7 text-headingColor placeholder:text-textColor round-md cursor-pointer"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={FormData.password}
              onChange={handeleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
          focus:border-b-primaryColor focus:shadow-xl  text-[22px] leading-7 text-headingColor placeholder:text-textColor round-md cursor-pointer"
              required
            />
          </div>
          <div className="mt-7">
            <button
            type = "submit"
            className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 cursor-pointer'>
              Login
            </button>
          </div>
          <p className='mt-5 text-textColor text-center'>
            Don't have an account? <Link to='/register' className='text-primaryColor cursor-pointer'>Sign Up</Link>
          </p>



        </form>
      </div>
    </section>
  );
}

export default Login
