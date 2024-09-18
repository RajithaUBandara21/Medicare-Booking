
import {Link } from 'react-router-dom'
import {BsArrowRight} from 'react-icons/bs'
import About from '../component/About/About'

import heroImage01 from '../assets/images/hero-img01.png'
import heroImage02 from '../assets/images/hero-img02.png'
import heroImage03 from '../assets/images/hero-img03.png'
import icon01  from '../assets/images/icon01.png'
import icon02  from '../assets/images/icon02.png'
import icon03  from '../assets/images/icon03.png'
import featureImg  from '../assets/images/feature-img.png'
import videoIcon  from '../assets/images/video-icon.png'
import avatarIcon  from '../assets/images/avatar-icon.png'
import faqImg  from '../assets/images/faq-img.png'

import ServiceList from '../component/Services/ServiceList'
import DoctorList from '../component/Doctors/DoctorList'
import FaqList from '../component/Faq/FaqList'
import Testimonial from '../component/Testimonial/Testimonial'



const Home = () => {
      return (
        <>
          {/* ::::::::::::::;hero section:::::::::::::::::;; */}

          <section className="hero_section pt-[60px] 2xl:h-[800px] ]">
            <div className="container">
              <div className="flex flex-col  lg:flex-row gap-[90px] items-center justify-between ">
                <div>
                  <div className="lg:w-[570px]">
                    <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                      We help patient live a healthy life
                    </h1>
                    <p className="text_para">
                      Our team of medical professionals and staff provide you
                      with the highest level of care and make sure you feel
                      comfortable and confident in our ability to help you get
                      healthy and stay healthy. Our goal is to provide quality,
                      patient-centered care with compassion and respect. We are
                      committed to providing you with excellent care and making
                      sure you have a positive experience.
                    </p>
                    <button className="btn">Request Appointment </button>
                  </div>

                  <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                    <div>
                      <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700]">
                        30+
                      </h2>
                      <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                      <p className="text_para">Years of Experience</p>
                    </div>

                    <div>
                      <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700]">
                        15+
                      </h2>
                      <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                      <p className="text_para"> Clinical locations </p>
                    </div>

                    <div>
                      <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700]">
                        30+
                      </h2>
                      <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                      <p className="text_para">100% Satisfaction</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-[30px] justify-end">
                  <div>
                    <img className="w-full" src={heroImage01} alt="" />
                  </div>
                  <div className="mt-[30px]">
                    <img
                      src={heroImage02}
                      className="w-full mb-[30px]"
                      alt=""
                    />
                    <img src={heroImage03} className="w-full" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ::::::::::::::;services section:::::::::::::::::;; */}
          <section>
            <div className="container">
              <div className="lg:w-[470px] mx-auto">
                <h2 className="heading text-center">
                  We are committed to providing quality, patient-centered care
                  with
                </h2>
                <p className="text_para text-center">
                  Compassion and respect. We are committed to providing you with
                  excellent care and making sure you have a positive experience.
                </p>
              </div>

              {/* ::::::::::::;services section:::; */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-[30px] lg:gap-[30px] lg:mt-[55px]">
                <div className="py-[30px]">
                  <div className="flex justify-center items-center">
                    <img src={icon01} alt="" />
                  </div>
                  <div className="mt-[30px] ">
                    <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                      Find Doctor
                    </h2>
                  </div>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Our team of medical professionals and staff provide you with
                    the highest level of care and make sure you feel comfortable
                    and confident in our ability to help you get healthy and
                    stay
                  </p>
                  <Link
                    to="/doctors"
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181a1e] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover-border-none"
                  >
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                  </Link>
                </div>

                <div className="py-[30px]">
                  <div className="flex justify-center items-center">
                    <img src={icon02} alt="" />
                  </div>
                  <div className="mt-[30px] ">
                    <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                      Find Location
                    </h2>
                  </div>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Our team of medical professionals and staff provide you with
                    the highest level of care and make sure you feel comfortable
                    and confident in our ability to help you find the nearest
                    medical location.
                  </p>
                  <Link
                    to="/doctors"
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181a1e] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover-border-none"
                  >
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                  </Link>
                </div>
                <div className="py-[30px]">
                  <div className="flex justify-center items-center">
                    <img src={icon03} alt="" />
                  </div>
                  <div className="mt-[30px] ">
                    <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                      Book Appointment
                    </h2>
                  </div>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Our team of medical professionals and staff provide you with
                    the highest level of care and make sure you feel comfortable
                    and confident in our ability to help you book appointments
                    with our doctors. Whether you need a routine check-up or a
                    specialized consultation, we are here to assist you. Book
                    your appointment today and take a step towards a healthier
                    life.
                  </p>
                  <Link
                    to="/doctors"
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181a1e] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover-border-none"
                  >
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
          {/* ::::::::::::::;About::::::::::::::: */}
          <About />
          {/* :::::::::::::Services::::::::::::::: */}
          <section>
            <div className="container">
              <div className="xl:w-[470px] mx-auto">
                <h2 className="heading text-center">Our medical services</h2>
                <p className="text_para text-center">
                  We are committed to providing quality, patient-centered care
                  with compassion and respect. We are committed to providing you
                  with excellent care and making sure you have a positive
                  experience.
                </p>
              </div>
            </div>
          </section>
          <section>
            <ServiceList />
          </section>

          {/*::::::::::::::::::::::: feature section::::::::::::: */}
          <section>
            <div className="container">
              <div className="flex items-center justify-between flex-col lg:flex-row">
                <div className="xl:w-[670px]">
                  <h2 className="heading">
                    Get virtual treatment
                    <br />
                    anytime
                  </h2>

                  <ul className="pl-4">
                    <li className="text_para">
                      1.Schedule the appointment directly
                    </li>

                    <li className="text_para">2.Search your doctor</li>

                    <li className="text_para">
                      3.Online schedule tool to select an appointment time.
                    </li>
                  </ul>
                  <Link to="/">
                    <div className="btn w-[165px] ">Learn More</div>
                  </Link>
                </div>

                <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
                  <img src={featureImg} alt="" className="w-3/4" />

                  <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:px-4 lg:pb-[26px] rounded-[10px] ">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[6px] lg:gap-3">
                        <p className="text-[10px] leading-[10px] lg:leading-5 text-headingColor font-[600]">
                          tue, 24
                        </p>
                        <p className="text-[10px] leading-[10px] lg:leading-5 text-textColor font-[400] lg:text-[14px]">
                          10:00AM
                        </p>
                      </div>
                      <span className="w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:px-[9px] lg:py-3">
                        <img src={videoIcon} alt="" />
                      </span>
                    </div>

                    <div className="w-[65px] lg:w-[90px] bg-[#ccf0f3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full">
                      Consultation
                    </div>
                    <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px] ">
                      <img src={avatarIcon} alt="" />
                      <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor">
                        Bru bru
                      </h4>
                      '
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ::::::::::::::::Doctors:::::::::::::::: */}
          <section>
            <div className="container">
              <div className="lg:w-[470px] mx-auto">
                <h2 className="heading text-center">Our Great Doctors</h2>
                <p className="text_para text-center">
                  Our team of experienced and highly skilled doctors are
                  dedicated to providing exceptional medical care. With years of
                  expertise and a commitment to patient well-being, our doctors
                  strive to deliver personalized treatment plans and ensure the
                  best possible outcomes for our patients. Whether you need a
                  routine check-up or specialized care, our great doctors are
                  here to help you on your journey to better health. Trust in
                  our expertise and experience for all your medical needs.
                </p>
              </div>
              <DoctorList />
            </div>
          </section>

          {/* ::::::::faq section:::::::::::::::; */}
          <section>
            <div className="container">
              <div className="flex justify-between gap-[50px] lg:gap-0">
                <div className="w-1/2  md:block">
                  <img src={faqImg} alt="" />
                </div>

                <div className='w-full md:w-1/2'>
                <h2 className='heading'> Most questions by your beloved patients</h2>
                  <FaqList/>
                </div>
              </div>
            </div>
          </section>

          {/* ::::::::::test imoinal:::::::::::::::: */}

          {/* Not Working pl check */}
          <section>
            <div className="container">
            <div className="lg:w-[470px] mx-auto">
                <h2 className="heading text-center">What our patient say</h2>
                <p className="text_para text-center">
                Our patients' satisfaction is our top priority. Here are some of the testimonials from our beloved patients who have experienced our exceptional care and services. We are grateful for their kind words and trust in our medical team.
                </p>
              </div>
              <Testimonial/>
            </div>
          </section>



        </>
      );
}

export default Home
