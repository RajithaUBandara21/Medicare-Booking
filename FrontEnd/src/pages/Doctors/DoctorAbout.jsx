import React from 'react'
import { formateDate } from '../../utils/formateDate';
import SidePanel from './SidePanel';

const DoctorAbout = () => {
  return (
    <div className=" ">
      
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className="text-irisBlueColor font-bold text-[24px] leading-9 ">
            Dr. Stella Kane
          </span>
        </h3>
        <p className="text_para ">
          Dr. Stella is the top most neurosurgeon in country with 12 years of
          experience in the field. She specializes in Neurology and has
          performed more than 100 successful surgeries. She is a member of many
          prestigious medical associations and has contributed a lot in the
          field of Neurology.
        </p>
        
      </div>


      {/* ::::::::::::::::      Education::::::::::::: */}

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          Education
        </h3>
        <ul className="pt-4 md:p-5 ">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold ">
                {formateDate("2021-08-2")} - {formateDate("2021-08-2")}
              </span>

              <p className="text-[16px] leading-6 font-medium text-textColor ">
                PHD in Surgeon
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              New York Medical College
            </p>
          </li>
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold ">
                {formateDate("2021-08-2")} - {formateDate("2021-08-2")}
              </span>

              <p className="text-[16px] leading-6 font-medium text-textColor ">
                PHD in Surgeon
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              New York Medical College
            </p>
          </li>
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold ">
                {formateDate("2021-08-2")} - {formateDate("2021-08-2")}
              </span>

              <p className="text-[16px] leading-6 font-medium text-textColor ">
                PHD in Surgeon
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              New York Medical College
            </p>
          </li>
        </ul>
      </div>

      {/* ::::::::::::Experiance::::::::::::::; */}

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          <li className="p-4 rounded bg-[#fff9ea] ">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {" "}
              {formateDate("2021-08-2")} - {formateDate("2021-08-2")}
            </span>
            <p className="text-[15px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[15px] leading-5 font-medium text-textColor">
              New pera hospital
            </p>
          </li>
          <li className="p-4 rounded bg-[#fff9ea] ">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {" "}
              {formateDate("2021-08-2")} - {formateDate("2021-08-2")}
            </span>
            <p className="text-[15px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[15px] leading-5 font-medium text-textColor">
              New pera hospital
            </p>
          </li>
          <li className="p-4 rounded bg-[#fff9ea] ">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {" "}
              {formateDate("2021-08-2")} - {formateDate("2021-08-2")}
            </span>
            <p className="text-[15px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[15px] leading-5 font-medium text-textColor">
              New pera hospital
            </p>
          </li>
        </ul>
      </div>

    </div>
  );
}

export default DoctorAbout
