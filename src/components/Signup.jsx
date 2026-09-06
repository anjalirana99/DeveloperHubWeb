import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../store/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {

  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigateTo = useNavigate()

  const handleSubmit = async()=>{
    setError("")
    try{
      const res = await axios.post( BASE_URL + '/signup',
      {
        firstName,
        lastName,
        email,
        password
      },
      {
        withCredentials: true //For this cross-origin request, include cookies and allow cookies received from the server to be stored.
      }
    )

    dispatch(addUser(res.data.result))
    navigateTo("/profile")  //after signup redirect to profile page to update more data 

  }
    catch (error) {
    setError(error?.response?.data)
  }
  }

  return (
    <div className='flex justify-center'>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-xl">Signup</legend>

        <label className="label">FirstName</label>
        <input type="email" className="input" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
        <label className="label">LastName</label>
        <input type="email" className="input" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />

        {error && <p className='text-red-500 mt-1'>{error}</p>}

        <button className="btn btn-neutral mt-4" onClick={handleSubmit}>Signup</button>
        <p>Already a User ? <Link to="/login"> Login</Link></p>
        
      </fieldset>
    </div>
    
  )
}

export default Login