import React from 'react'
import aboutImg from '../../assets/images/about.png'

import aboutCardImg from '../../assets/images/about-card.png'
import { Link } from 'react-router-dom'
const about = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10  order-2 lg:order-1 ">
            <img src={aboutImg} alt="" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
              <img src={aboutCardImg} alt="" />
            </div>
          </div>

          <div className=" w-full  lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading ">Proud to be a part of the community</h2>
            <p className="text_para">
              We are committed to providing quality, patient-centered care with
              compassion and respect. We are committed to providing you with
              excellent care and making sure you have a positive experience.
            </p>
            <p className="text_para mt-[30px] ">
              k We are committed to providing quality, patient-centered care
              with compassion and respect. We are committed to providing you
              with excellent care and making sure you have a positive
              experience.
            </p>

            <Link to="/" ><button className='btn'>     Learn More</button>
          
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default about
