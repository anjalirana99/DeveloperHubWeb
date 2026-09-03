import React from 'react'

const UserCard = ({user}) => {
  const {firstName, lastName, age, gender, photoUrl, about, skills} = user
  return (
    <div className="card bg-base-300 w-96 shadow-sm p-4 m-auto mt-10">
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
  )
}

export default UserCard