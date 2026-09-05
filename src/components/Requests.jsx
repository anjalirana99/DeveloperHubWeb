import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../store/requestSlice'

const Requests = () => {
    const dispatch  = useDispatch()
    const requests = useSelector((store)=>store.requests)
    const fetchRequests = async()=>{
        try{
            const res = await axios.get(BASE_URL + "/user/request/received" , {withCredentials:true})
            dispatch(addRequests(res.data.result))
        }
        catch(err){
            console.log("ERROR : " + err.response)
        }
    }
    useEffect(()=>{
        fetchRequests()
    },[])
    if(!requests) return 
    if(requests.length === 0 ){
        return(
            <div className='flex justify-center text-3xl m-auto mt-10'>No Request Found!</div>
        )
    }
  return (
         <div className="list rounded-box shadow-md w-1/2 mx-auto my-10">

    {requests.map((request)=>{
        const {_id, firstName ="", lastName="", age="", gender="", photoUrl="", about="", skills=""} = request.fromUserId 
        return (
  
  
  <li key={_id} className="list-row bg-base-300 my-2">
        {/* <div><img className="size-20 rounded-box" alt="Tailwind CSS list item" src={photoUrl}/></div> */}

    <div className="avatar">
        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
            <img alt="user-icon" src={photoUrl} />
        </div>
    </div> 
    <div className='flex flex-col gap-2'>
      <div>{firstName+", " + lastName}</div>
      <div className="text-s uppercase font-semibold opacity-60">{age +" " + gender}</div>
                <p className="list-col-wrap text-s">{about}</p>

    </div>
    <div className='flex items-center gap-2'>
            <button className="btn btn-secondary">
        Reject
    </button>
    <button className="btn btn-accent">
        Accept
    </button>

    </div>
    


  </li>
        )
    })}

    </div>
  )
}

export default Requests
