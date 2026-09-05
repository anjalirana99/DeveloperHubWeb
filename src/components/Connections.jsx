import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../store/connectionsSlice'

const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector((store)=>store.connections)
    const fetchConnections = async()=>{
        try{
            const res = await axios.get(BASE_URL+"/user/connections" ,{withCredentials : true})
            dispatch(addConnections(res.data.result))

        }
        catch(err){
            console.log("ERROR: " + err.response)
        }
    }
    useEffect(()=>{
        fetchConnections()
    },[])
    if(!connections) return
    if(connections.length === 0){
        return(
            <div className='flex justify-center text-3xl m-auto mt-10'>No Connections Found!</div>
        )
    }
  return (
    <div className="list rounded-box shadow-md w-1/2 mx-auto my-10">

    {connections.map((connection)=>{
        const {_id, firstName ="", lastName="", age="", gender="", photoUrl="", about="", skills=""} = connection 
        return (
  
  
  <li key={_id} className="list-row bg-base-300 my-2">
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
   

  </li>
        )
    })}

    </div>
  )
}

export default Connections