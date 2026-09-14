import React from 'react'
import {useEffect,useState } from 'react'
import { toast } from 'react-toastify'

const useFetchData = (url) => {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

useEffect(() => {
    // no url yet (e.g. caller is waiting on auth state) - nothing to fetch
    if(!url){
        setLoading(false)
        return
    }

    const fetchData = async () => {
        setLoading(true)
        setError(null)
      try{
        const res = await fetch(url,{
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })

        const result = await res.json()

        if(!res.ok){
            toast.error(result.message || "Data fetching error🤷‍♂️")
            setError(result.message || "Data fetching error")
            setLoading(false)
            return
        }
    setData(result.data)

    setLoading(false)

    }catch(err){
        setLoading(false)
            setError(err.message)
      }}


 fetchData()

   },[url])

  return (

{data,loading,error}
  )


}

export default useFetchData
