import React, { useEffect, useState } from 'react'
import { doctors } from '../../assets/data/doctors';
import DoctorCard from '../../component/Doctors/DoctorCard';
import Testimonial from '../../component/Testimonial/Testimonial';
import SidePanel from './SidePanel';

import {BASE_URL} from "./../../config"
import useFetchData from "./../../hooks/useFetchData"
import Loader from "../../component/Loader/Loading"
import Error from "../../component/Error/Error"

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery,setDebounceQuery] = useState("")

  const handelSearch = () => {
    setQuery(query.trim());
    console.log("handel search");
  };

  useEffect (()=>{

    const timeout =setTimeout(()=>{
      setDebounceQuery(query)
    },700)

    return ()=> clearTimeout(timeout)
  },[query])

  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${query}`);
  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex item-center justify-between ">
            <input
              type="search"
              className="py-4 pl-4 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Doctor by name or specification"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />{" "}
            <button
              onClick={handelSearch}
              className="btn  mt-0  rounded-[0px] rounded-r-md "
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}

          {!loading && error && (
            <div className="grid grid-cols-1 px-[50px] md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-[30px]  ">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patient say</h2>
            <p className="text_para text-center">
              Our patients' satisfaction is our top priority. Here are some of
              the testimonials from our beloved patients who have experienced
              our exceptional care and services. We are grateful for their kind
              words and trust in our medical team.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors
