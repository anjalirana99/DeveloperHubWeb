import React, { useDebugValue, useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import {addFeed} from '../store/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector((store)=>store.feed)
  const dispatch = useDispatch()
  const fetchFeedData = async()=>{
    try{
        const res = await axios.get(BASE_URL + '/user/feed',{withCredentials: true})
        dispatch(addFeed(res.data?.result))
    }
    catch(err){
      console.log("Error: " + err.response)
    }
    

  }
  useEffect(()=>{
    fetchFeedData()
  },[])
  return (
    feed ? 
      <div className='flex justify-center my-10'>
        <UserCard user={feed[0]}/>
      </div>
       
    : 
      <div className='flex justify-center'><h1 className='text-xl'>No Devs Found!!!</h1></div>
    
  )
}

export default Feed