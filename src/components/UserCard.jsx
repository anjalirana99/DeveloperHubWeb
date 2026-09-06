import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../store/feedSlice'

const UserCard = ({user, fromProfilePage=false}) => {
  const dispatch = useDispatch()
  const {_id, firstName ="", lastName="", age="", gender="", photoUrl="", about="", skills=""} = user

  const handleSendRequest = async(status,userID)=>{
      try{
        const res = await axios.post(BASE_URL+ "/request/send/" + status + "/" + userID,
          {},
          {withCredentials:true}
        )
        dispatch(removeUserFromFeed(userID))
      }
      catch(err){
        console.log("ERROR : " + err.response)
      }
  }
  return (
    <div className="card bg-base-300 w-96 shadow-sm p-4">
        <figure>
          <img
            src={user.photoUrl}
            alt="User Image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age +", " + gender}</p>}
          <p>{about}</p>
          <p>{skills}</p>
        </div>
        {!fromProfilePage && 
          <div className='flex justify-center gap-10'>
          <button className="btn btn-secondary w-2/5" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
          <button className="btn btn-accent w-2/5" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
          </div>
        }
    </div>
  )
}

export default UserCard