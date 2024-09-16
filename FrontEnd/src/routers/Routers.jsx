import React from 'react'

import Home from "../pages/Home"
import Services from "../pages/Services"
import Login from "../pages/Login"
import Singup from "../pages/Singup"
import Contact from "../pages/Contact"
import Doctors from "../pages/Doctors/Doctors"
import DoctorsDetails from "../pages/Doctors/DoctorDetails"
import {Routes, Route} from "react-router-dom"

function Routers() {
  return (
  
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/doctors" element={<Doctors/>}/>
    <Route path="/doctors/:id" element={<DoctorsDetails/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Singup/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/services" element={<Services/>}/>
    </Routes>
     )
}

export default Routers
