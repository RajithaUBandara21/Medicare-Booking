/* eslint-disable react/prop-types */
import { useState } from 'react'
import { convertTime } from '../../utils/convertTime';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const SidePanel = ( {doctorId,ticketPrice, timeSlots} ) => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBookAppointment = async () => {
    if (!appointmentDate) {
      return toast.error("Please select an appointment date");
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorId}/bookings`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ appointmentDate }),
      });

      const result = await res.json();

      if (!res.ok) {
        // verifyToken.js's 401/403 bodies use "msg", not "message" - fall back so the
        // toast isn't blank for the logged-out/wrong-role cases.
        throw new Error(result.message || result.msg || "Something went wrong");
      }

      setLoading(false);
      toast.success(result.message);
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex item-center justify-between">
        <p className="text_para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} Rs
        </span>
      </div>
      <div className="mt-[30px] ">
        <p className="text_para mt-0 font-semibold text-headingColor">
          Available Time Slots
        </p>

        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex item-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
             {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
               {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold text-headingColor">
          Appointment Date
        </p>
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="form_input py-3.5 w-full mt-2"
        />
      </div>

      <button
        disabled={loading}
        onClick={handleBookAppointment}
        className="btn px-2 w-full rounded-md mt-[30px]"
      >
        {loading ? <HashLoader size={25} color="#fff" /> : " BooK Appointment"}
      </button>
    </div>
  );
}

export default SidePanel
