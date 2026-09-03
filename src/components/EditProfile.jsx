import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {BASE_URL} from '../utils/constants'
import {addUser} from '../store/userSlice'

const EditProfile = ({user}) => {

  const dispatch = useDispatch()
  
  const [firstName , setFirstName] = useState(user.firstName)
  const [lastName , setLastName] = useState(user.lastName)
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "")
  const [age , setAge] = useState(user.age || "")
  const [gender , setGender] = useState(user.gender || "")
  const [about , setAbout] = useState(user.about || "")
  const [skills , setSkills] = useState(user.skills || "")

  const [error, setError] = useState("")
  const [showToast, setShowToast] = useState(false)

  const handleSaveProfile = async()=>{
    setError("")
    try{
      const res = await axios.patch(BASE_URL + '/profile/edit',{
        firstName,
        lastName,
        photoUrl,
        age,
        gender,
        about,
        skills
      },{withCredentials:true})

      dispatch(addUser(res.data.result))
      setShowToast(true)
      setTimeout(()=>{
        setShowToast(false)
      },2000)
    }
    catch(err){
      setError(err?.response?.data)
    }  
  }


  return (
    <>
    <div className='flex justify-center'>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Edit Profile</legend>

        <label className="label">First Name</label>
        <input type="text" className="input" placeholder="Enter your first name" value={firstName}  onChange={(e)=>setFirstName(e.target.value)}/>

        <label className="label">Last Name</label>
        <input type="text" className="input" placeholder="Enter your last name" value={lastName} onChange={(e)=>setLaststName(e.target.value)}/>

        <label className="label">PhotoURL</label>
        <input type="text" className="input" placeholder="Enter your photoUrl" value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)}/>

        <label className="label">Age</label>
        <input type="text" className="input" placeholder="Enter your age" value={age} onChange={(e)=>setAge(e.target.value)}/>

        <label className="label">Gender</label>
        <input type="text" className="input" placeholder="Enter your gender" value={gender} onChange={(e)=>setGender(e.target.value)}/>


        <label className="label">About</label>
        <input type="text" className="input" placeholder="Tell about yourself" value={about} onChange={(e)=>setAbout(e.target.value)}/>

        <label className="label">Skills</label>
        <input type="text" className="input" placeholder="Enter your skills" value={skills} onChange={(e)=>setSkills(e.target.value)}/>

        {error && <p className='text-red-500'>{error}</p>}

        <button className="btn btn-neutral mt-4" onClick={handleSaveProfile}>Save Profile</button>

      </fieldset>
      <div className="card bg-base-100 w-96 shadow-sm p-4">
        <figure>
          <img
            src={user.photoUrl}
            alt="User Image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{age +", " + gender}</p>
          <p>{about}</p>
          <p>{skills}</p>
        </div>
      </div>
    </div>
    {showToast && 
      <div className="toast toast-top toast-center">
      <div className="alert alert-success">
        <span>Profile saved successfully.</span>
      </div>
    </div>
    }
    
    </>
  )
}

export default EditProfile