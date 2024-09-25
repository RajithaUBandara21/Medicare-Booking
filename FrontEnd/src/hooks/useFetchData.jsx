import React from 'react'
import {useEffect,useState } from 'react'
import { token } from '../config'
import { toast } from 'react-toastify'

const useFetchData = (url) => {

    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

useEffect(() => {
    const fetchData = async () => {
        setLoading(true)
      try{
        const res = await fetch(url,{
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })

        const result = await res.json()

        if(!res.ok){
            return toast.error(result.message,"🤷‍♂️")


        }
    setData(result.data)
    setLoading(false)
    
    }catch(err){
        setLoading(false)
            setError(err.message,"🤷‍♂️")
      }}
    
    
 fetchData()
      
   },[url])

   

  return (
    
{data,loading,error}
  )
}

export default useFetchData
