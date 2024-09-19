import React from 'react'
import { services } from '../assets/data/services'
import ServiceCard from '../component/Services/ServiceCard'

const Services = () => {
  return (
  <section>
    <div className="container">
    <div className='grid grid-cols-1 px-[50px] md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] '>
    {
        services.map((item,index)=> <ServiceCard key={index} item={item} index={index} />)
    } 
    </div>
    </div>
  </section>
  )
}

export default Services
