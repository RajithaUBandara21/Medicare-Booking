import React from 'react'
import { useEffect,useRef } from 'react'
import logo from '../../assets/images/logo.png'
import {BrowserRouter, Link, NavLink} from "react-router-dom"
import avatar from "../../assets/images/avatar-icon.png"
import {BiMenu} from 'react-icons/bi'



const navLinks= [{
  path:"/home",
  display:"Home"
},
{
  path:"/doctors",
  display:"Doctors"
},
{
  path:"/services",
  display:"Services"
},
{
  path:"/contact",
  display:"Contact"
}
]
const  Header = ()=> {
  return (
    <header className="header flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            {/* :::::::::::::::Logo:::::::::::::::::::: */}
            <img src={logo} alt="" />
          </div>

          {/* :::::::::::::Navigation::::::::::::: */}

          <div className="navigation">
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((item, index) => (
                <li key={index}>
                  <BrowserRouter>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive
                          ? "text-primaryColor text-[16px] leading-7 font-[600]"
                          : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                      }
                    >
                      {item.display}
                    </NavLink>
                  </BrowserRouter>
                </li>
              ))}
            </ul>
          </div>
          

          <div className='flex items-center gap-4'>
            <div>
            <BrowserRouter> <Link to='/'>
            <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
              <img src = {avatar} className='w-full rounded-full alt="" '/>
              


              </figure></Link> </BrowserRouter>
              <span className="w-6 h-6 cursor-pointer">
                <BiMenu className= "w-6 h-6 cursor-pointer" />
              </span>
              
              </div></div>
        </div>
      </div>
    </header>
  );
}

export default Header
