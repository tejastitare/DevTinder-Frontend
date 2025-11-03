import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
function UserCard({ user }) {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {withCredentials: true}
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log("Error while sending the request ", error);
    }
  };

  return (
    <div className="card bg-base-200 w-64 shadow-sm items-center">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title gap-2">
          <span>{firstName} </span>
          <span>{lastName}</span>
        </h2>
        <div>
          <span>{age} </span>
          <span>{gender}</span>
        </div>
        <div>{about}</div>
        <div className="card-actions justify-end gap-3">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="btn btn-primary"
          >
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="btn btn-secondary"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
