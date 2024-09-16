import React from 'react'
import { useEffect,useRef } from 'react'
import logo from '../../assets/images/logo.png'
import { Link, NavLink} from "react-router-dom"
import avatar from "../../assets/images/avatar-icon.png"
import {BiMenu} from "react-icons/bi"




const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Doctors",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];
const  Header = ()=> {
const headerRef= useRef(null);
const menuRef= useRef(null);


const toggleMenu = ()=>{menuRef.current.classList.toggle("show_menu")};

const handelStickyHeader = ()=>{
  window.addEventListener("scroll", ()=>{
    if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
      headerRef.current.classList.add("sticky_header")
  }
else{
  headerRef.current.classList.remove("sticky_header")
}}
)
}
useEffect(()=>{handelStickyHeader ()
return () => window.removeEventListener("scroll", handelStickyHeader)
})

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
{/* :::::::::::::::Logo:::::::::::::::::::: */}
            <img src={logo} alt="" />
          </div>

{/* :::::::::::::Navigation::::::::::::: */}

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((item, index) => (
                <li key={index}>
                  
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
                  
                </li>
              ))}
            </ul>
          </div>
          
{/* ::::::::::::::::::: Nav_Right ::::::::::::::::::: */}
 
          <div className='flex items-center gap-4'>
            <div className='hidden'>
              <Link to='/'>
             <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
              <img src = {avatar} className='w-full rounded-full alt="" '/>
               </figure></Link> </div>

               <Link to='/login'>
               <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] rounded-[50px] flex items-center justify-center '>Login</button>
               </Link>


              <span className="w-6 h-6 cursor-pointer md:hidden" onClick={toggleMenu}>
                <BiMenu className= "w-6 h-6 cursor-pointer" />
              </span>
              
              </div>
            
        </div>
      </div>
    </header>
  );
}

export default Header
