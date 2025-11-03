import React from "react";

function UserCard({ user }) {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  return (
    <div className="card bg-base-200 w-64 shadow-sm items-center">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title gap-2">
          <span>{firstName} </span><span>{lastName}</span>
        </h2>
        <div>
          <span>{age} </span><span>{gender}</span>
        </div>
        <div>{about}</div>
        <div className="card-actions justify-end gap-3">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
