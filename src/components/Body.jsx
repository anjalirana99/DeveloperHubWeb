import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/userSlice'
import axios from 'axios'

const Body = () => {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()
  const user = useSelector((store)=> store.user)
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
    
  }

  useEffect(()=>{
    fetchProfile()
  },[])
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