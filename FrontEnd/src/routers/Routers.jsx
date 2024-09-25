
import Home from "../pages/Home"
import Services from "../pages/Services"
import Login from "../pages/Login"
import Singup from "../pages/Singup"
import Contact from "../pages/Contact"
import Doctors from "../pages/Doctors/Doctors"
import DoctorsDetails from "../pages/Doctors/DoctorDetails"
import {Routes, Route} from "react-router-dom"
import MyAccount from '../Dashbord/user-account/MyAccount'
import Dashbord from '../Dashbord/doctor-account/Dashbord'
import ProtectiveRoute from './ProtectiveRoute'

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
    <Route path="/users/profile/me" element={ <ProtectiveRoute allowedRoles={["patient"]}><MyAccount/></ProtectiveRoute>}/>
    <Route path="/doctors/profile/me" element={<ProtectiveRoute allowedRoles = {["doctor"]}><Dashbord/> </ProtectiveRoute>}/>
  
    </Routes>
     )
}

export default Routers
