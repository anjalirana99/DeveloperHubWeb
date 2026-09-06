import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/userSlice'
import axios from 'axios'
import Loading from './Loading'

const Body = () => {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()
  const user = useSelector((store)=> store.user)
  const [authLoading, setAuthLoading] = useState(true)
  const fetchProfile = async()=>{
    if(user)return
    try{
        const res = await axios.get(BASE_URL + '/profile/view',{withCredentials : true})
        dispatch(addUser(res.data))
    }
    catch(err){
      if(err.response?.status === 401)
        navigateTo("/login")
      console.log(err);
    }
    finally{
      setAuthLoading(false)
    }
    
  }

  useEffect(()=>{
    fetchProfile()
  },[])

  if(authLoading){ // ui to show meanwhile hitting the profile view API to fetch user...will throw error if user isnot logged in and redirect to login page 
    return (
    <div className='flex justify-center items-center flex-col w-1/2 m-auto my-10'>
      <div className='text-3xl '>DeveloperHub</div>
      <Loading/>
    </div>
    )
  }
  return (
    <div className='min-h-screen flex flex-col'>
    <Header/>
    <div className="flex-1">
    <Outlet/>
    </div>
    <Footer/>
    </div>
    
  )
}

export default Body