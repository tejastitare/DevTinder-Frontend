import React, { useEffect } from "react";

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest,removeRequest } from "../utils/requestSlice";
import { useNavigate } from "react-router-dom";
function Requests() {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,{},
        {
          withCredentials: true,
        }
      );

      dispatch(removeRequest(_id));
    } catch (error) {
      console.log("Error in reviewing request: ", error);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.log("Error in fetching requests: ", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <div className="flex justify-center items-center mt-5 text-3xl font-semibold">No Requests Found !</div>;
  return (
   <div className="justify-center items-center mt-4 flex flex-col px-4">
  <h1 className="text-3xl font-bold mb-4">Requests</h1>

  <div className="text-white w-full flex flex-wrap gap-4">
    {requests.map((request) => {
      const { _id, firstName, lastName, photoUrl, age, gender, about } =
        request.fromUserId;

      return (
        <div
          key={_id}
          className="card bg-base-300 shadow-sm rounded-lg w-full md:w-[48%] lg:w-[32%] p-4"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full">

            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={photoUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-lg md:text-xl font-bold truncate">
                {firstName} {lastName}
              </h2>

              <p className="text-sm md:text-base">
                Age - {age} , Gender - {gender}
              </p>

              <p className="text-sm md:text-base max-h-20 overflow-hidden">
                About - {about}
              </p>
            </div>

            <div className="flex flex-row md:flex-col gap-3 flex-shrink-0">
              <button
                onClick={() => reviewRequest("rejected", request._id)}
                className="btn btn-primary btn-sm md:btn-md"
              >
                Reject
              </button>
              <button
                onClick={() => reviewRequest("accepted", request._id)}
                className="btn btn-secondary btn-sm md:btn-md"
              >
                Accept
              </button>
            </div>

          </div>
        </div>
      );
    })}
  </div>
</div>

  );
}

export default Requests;