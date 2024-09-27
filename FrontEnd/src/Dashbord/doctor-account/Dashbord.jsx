import React from 'react'
import { useState } from 'react'
import Loader from '../../component/Loader/Loading'
import Error from '../../component/Error/Error'
import useGetProfile from '../../hooks/useFetchData'
import { BASE_URL } from '../../config'
import Tabs from './Tabs.jsx'
import starIcon from '../../assets/images/Star.png'
import DoctorAbout from "../../pages/Doctors/DoctorAbout"
import Profile from './Profile.jsx'
import  {Appointments}  from './Appointments.jsx'
const Dashbord = () => {

const {data,loading, error} = useGetProfile(`${BASE_URL}/doctors/profile/me`);
console.log(data)

const [tab ,setTab] = useState("overview")

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loader />}
        {error && !loading && <Error />}

        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} SetTab={setTab} />

            <div className="lg:col-span-2">
              {data.isApproved === "pending" && (
                <div className="flex p-4 mb-4 text-yellow-600 bg-yellow-50 rounded-lg">
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-5 h-5"
                    fill=" currentColor"
                    viewBox="0 0 20 20 "
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 00-.707.293l-7 7a1 1 0 000 1.414l7 7a1 1 0 001.414-1.414L4.414 11H17a1 1 0 000-2H4.414l4.293-4.293A1 1 0 0010 3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>

                  <div className="ml-3 text-sm font-medium">
                    Your account is under review. You will be notified once it's
                    approved.
                  </div>
                </div>
              )}

              <div className="mt-8">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[200px] ">
                        <img
                          src={data?.photo}
                          alt="doctor"
                          className="w-full "
                        />
                      </figure>

                      <div>
                        <span className="bg-[#ccf0f3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                          {data.specialization}
                        </span>
                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                         {data.name}
                        </h3>

                        <div className="flex items-center gap-[6px] ">
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            <img src={starIcon} alt="star" />
                            {data.averageRating}
                          </span>
                          <span className="text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                          (  {data.totalRating} )
                          </span>
                        </div>
                        <p className="text_para font-[15px] lg:max-w-[390px] leading-6 ">
                       {data?.bio}
                        </p>
                      </div>
                    </div>
                    <div className="mt-[80px]">
                      <DoctorAbout
                        name={data.name}
                        about={data.about}
                        qualifications={data.qualifications}
                        experience={data.experience}
                      />
                    </div>
                  </div>
                )}
                {tab === "appointments" && <Appointments appoinments={data.appointments} />}
                {tab === "profile" && <Profile  doctorData = {data}/>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashbord
