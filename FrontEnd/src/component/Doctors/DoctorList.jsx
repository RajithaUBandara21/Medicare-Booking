import DoctorCard from "./DoctorCard"
import {BASE_URL} from "./../../config"
import useFetchData from "./../../hooks/useFetchData"
import Loader from "../../component/Loader/Loading"
import Error from "../../component/Error/Error"
import {doctors} from '../../assets/data/doctors'

const DoctorList = () => {

  const {data:doctors,loading,error}  = useFetchData(`${BASE_URL}/doctors`)
 

  return (
    <>
      {loading && <Loader />}
      {error && <Error  errMessage ={error} />}

      {!loading & !error && (
        <div className="grid grid-cols-1 px-[50px] md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] lg:mt-[55px]">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </>
  );
}

export default DoctorList
