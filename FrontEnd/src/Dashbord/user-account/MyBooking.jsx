import React from 'react'
import useFetchData from '../../hooks/useFetchData'
import { BASE_URL } from '../../config'
import DoctorCard from '../../component/Doctors/DoctorCard'
import Loading from '../../component/Loader/Loading'
import Error from '../../component/Error/Error'

const MyBooking =  () => {

  const {
    data: appointments,
    loading,
    error,
  } =   useFetchData(`http://localhost:5000/api/v1/users/appointments/my-appointments`);

  console.log("appointment",appointments)

  return (
    <div>
      {loading && !error && <Loading/>}
      {error && !loading && <Error errMessage={error}/>}
      {!loading && !error && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15'>
          {  appointments.map((doctor)=>(
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <h2 className='mt-5 text-center text-headingColor leading-7 text-[20px] font-semibold text-primaryColor'>
          You have no appointments yet
        </h2>)}
         
    </div>
  
  )
}

export default MyBooking
