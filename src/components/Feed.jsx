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

  if(!feed) return
  if(feed.length === 0){
    return (
      <div className='flex justify-center text-3xl m-auto mt-10'>No Devs Found!</div>

    )  
  }

  return (
      <div className='flex justify-center my-10'>
        <UserCard key={feed[0]._id} user={feed[0]}/>
      </div>    
  )
}

export default Feed