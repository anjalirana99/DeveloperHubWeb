import React from 'react'

const UserCard = ({user, fromProfilePage=false}) => {
  const {firstName, lastName, age, gender, photoUrl, about, skills} = user
  return (
    <div className="card bg-base-300 w-96 shadow-sm p-4">
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
        {!fromProfilePage && 
          <div className='flex justify-center gap-10'>
          <button className="btn btn-secondary w-2/5">Ignore</button>
          <button className="btn btn-accent w-2/5">Interested</button>
          </div>
        }
    </div>
  )
}

export default UserCard