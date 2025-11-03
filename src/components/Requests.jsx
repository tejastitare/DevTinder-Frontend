import React, { useEffect } from "react";

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest,removeRequest } from "../utils/requestSlice";
function Requests() {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

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
    <div className="justify-center items-center mt-4 flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Requests</h1>

      <div className="card-body text-white text-3xl w-full flex gap-4 items-center">
        {requests.map((request, index) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <div
              key={_id}
              className="card shadow-sm items-center w-[40%] bg-base-300"
            >
              <div className="flex w-full h-full justify-center items-center gap-6 ml-12">
                <figure className="w-80 p-2">
                  <img
                    className="rounded-full w-full h-32"
                    src={photoUrl}
                    alt="Image"
                  />
                </figure>
                <div className="w-[80%] space-y-2">
                  <h2 className="card-title">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-xl">
                    Age - {age} , Gender - {gender}
                  </p>
                  <p className="text-xl"> About - {about}</p>
                </div>
                <div className="flex mr-36 gap-6">
                  <button
                    onClick={() => reviewRequest("rejected", request._id)}
                    className="btn btn-primary"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => reviewRequest("accepted", request._id)}
                    className="btn btn-secondary"
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
