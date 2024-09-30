
import starIcon from '../../assets/images/Star.png'
import Feedback from './Feedback'
import DoctorAbout from './DoctorAbout'
import SidePanel from './SidePanel'
import {BASE_URL} from "./../../config"
import useFetchData from "./../../hooks/useFetchData"
import Loader from "../../component/Loader/Loading"
import Error from "../../component/Error/Error"
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const DoctorDetails = () => {


  const [tab, setTab] = useEffect("about");

  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/${id}`);


  const {
    name,

    qualifications,
    experience,
    timeSlot,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    ticketPrice,
    photo,
  } = doctor;

  const { id } = useParams();






  return (
    <section>
      <div className="container">
        {!loading && error && (
          <div className="max-w-[1170px] px-5 mx-auto">
            {loading && <Loader />}
            {error && <Error />}

            <div className="grid md:grid-cols-3 gap-[50px] ">
              <div className="md:col-span-2">
                <div className="flex items-center gap-5">
                  <figure className="max-w-[200px] max-h-[200px] ">
                    <img src={photo} alt="" className="w-full" />
                  </figure>

                  <div>
                    <span className="bg-[#ccf0f3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                      {specialization}
                    </span>

                    <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                      {name}
                    </h3>
                    <div className="flex items-center gap-[6px]">
                      <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor  ">
                        <img src={starIcon} alt="" />
                        {averageRating}
                      </span>
                      <span className=" flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7  text-textColor font-[400]">
                        ({totalRating}){" "}
                      </span>
                    </div>
                    <p className="text_para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px] ">
                      {bio}
                    </p>
                  </div>
                </div>

                <div className="mt-[50px] border-b border-solid border-[#0066ff34] ">
                  <button
                    onClick={() => setTab("about")}
                    className={`${
                      tab === "about" &&
                      "border-b border-solid border-primaryColor"
                    }
                py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor  font-semibold
                `}
                  >
                    About
                  </button>

                  <button
                    onClick={() => setTab("feedback")}
                    className={` ${
                      tab === "feedback" &&
                      "border-b border-solid border-primaryColor"
                    }
                py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold font-semibold
                `}
                  >
                    Feedback
                  </button>
                </div>

                <div className="mt-50px">
                  {tab === "about" && (
                    <DoctorAbout
                      name={name}
                      about={about}
                      qualifications={qualifications}
                      experience={experience}
                    />
                  )}
                  {tab === "feedback" && <Feedback  reviews={reviews} totalRating= {totalRating} />}
                </div>
              </div>
              <div>
                <SidePanel doctorId = {doctor._id}
                ticketPrice = {ticketPrice}
                timeSlots = {timeSlot} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDetails
