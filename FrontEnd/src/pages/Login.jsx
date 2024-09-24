import { useState,useContext } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';
import {authContext} from '../context/AuthContext.jsx'

const Login = () => {
  const [fromData,setFromData] = useState({
    email:'',
    password:'',
  });


  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {dispatch} = useContext(authContext)

  const handeleInputChange =async  e => {


  await  setFromData({...fromData,[e.target.name]:e.target.value});
  };


  const submitHandler = async event=>{
    console.log(fromData);
    event.preventDefault();
    setLoading(true);
  
    try{
      const res = await  fetch("http://localhost:5000/api/v1/auth/login",
      {
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(fromData)
    })


  
    const result = await res.json();

  
    if(!res.ok){
      throw new Error(result.message);
    }

    dispatch(
      {
        type:"LOGIN_SUCCESS",
        payload:{
          user:result.user,
          token:result.token,
          role:result.role,
        }
      }
    )

    console.log(result,"Login Data")
  
    setLoading(false);
    toast.success(result.message)
    navigate('/home')
  }catch(error){
    toast.error(error.message)
    setLoading(false);
  }}
  

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 ">
        <h3 className="text-headingColor text-[16px] leading-9 font-bold mb-10">
          Hello!  <span className="text-primaryColor"> Welcome</span>back😊
        </h3>

        <form className="py-5  px-6 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={fromData.email}
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
              value={fromData.password}
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
