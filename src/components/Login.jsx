import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {

  const dispatch = useDispatch()
  const [email,setEmail] = useState("rohit@gmail.com")
  const [password, setPassword] = useState("Rohit@123")
  const navigateTo = useNavigate()

  const handleSubmit = async()=>{
    try{
      const res = await axios.post( BASE_URL + '/login',
      {
        email,
        password
      },
      {
        withCredentials: true //For this cross-origin request, include cookies and allow cookies received from the server to be stored.
      }
    )

    dispatch(addUser(res.data.result))
    navigateTo("/feed")

  }
    catch (err) {
    console.log("ERROR:", err);
  }
  }

  return (
    <div className='flex justify-center'>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-xl">Login</legend>

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />

        <button className="btn btn-neutral mt-4" onClick={handleSubmit}>Login</button>
      </fieldset>
    </div>
    
  )
}

export default Login