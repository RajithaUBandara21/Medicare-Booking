import React from 'react'
import {Link } from 'react-router-dom'
import {BsArrowRight} from 'react-icons/bs'
import About from '../component/About/About'

import heroImage01 from '../assets/images/hero-img01.png'
import heroImage02 from '../assets/images/hero-img02.png'
import heroImage03 from '../assets/images/hero-img03.png'
import icon01  from '../assets/images/icon01.png'
import icon02  from '../assets/images/icon02.png'
import icon03  from '../assets/images/icon03.png'


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
                  Our team of medical professionals and staff provide you with
                  the highest level of care and make sure you feel comfortable
                  and confident in our ability to help you get healthy and stay
                  healthy. Our goal is to provide quality, patient-centered care
                  with compassion and respect. We are committed to providing you
                  with excellent care and making sure you have a positive
                  experience.
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
                <img src={heroImage02} className="w-full mb-[30px]" alt="" />
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
              We are committed to providing quality, patient-centered care with
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
                Our team of medical professionals and staff provide you with the
                highest level of care and make sure you feel comfortable and
                confident in our ability to help you get healthy and stay
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
                Our team of medical professionals and staff provide you with the highest level of care and make sure you feel comfortable and confident in our ability to help you find the nearest medical location.
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
              Our team of medical professionals and staff provide you with the highest level of care and make sure you feel comfortable and confident in our ability to help you book appointments with our doctors. Whether you need a routine check-up or a specialized consultation, we are here to assist you. Book your appointment today and take a step towards a healthier life.
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
      <About/>

      <section>
        <div className="container">
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>Our medical services</h2>
            <p className='text_para text-center'>We are committed to providing quality, patient-centered care with compassion and respect. We are committed to providing you with excellent care and making sure you have a positive experience.</p>

          </div>
          </div>
      </section>
    </>
  );
}

export default Home
