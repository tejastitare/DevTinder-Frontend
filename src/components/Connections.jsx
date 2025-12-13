import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Connections() {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.log("Error in fetching connections: ", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  });

  if (!connections) return;

  if (connections.length === 0)
    return (
      <div className="flex justify-center items-center p-3 mt-3 font-semibold">
        No Connections Found !
      </div>
    );
  return (
    <div className="flex flex-col items-center mt-4 px-4 mb-40 md:px-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Connections</h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {connections.map((connection, index) => (
          <div
            key={index}
            className="bg-base-300 rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row items-center md:items-stretch justify-between p-4"
          >
            <figure className="flex-shrink-0 w-full md:w-28 lg:w-36 flex justify-center md:justify-start">
              <div className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden">
                <img
                  src={connection.photoUrl}
                  alt={`${connection.firstName} ${connection.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </figure>

            <div className="flex-1 w-full md:px-4 mt-3 md:mt-0">
              <h2 className="text-lg md:text-xl font-semibold">
                {connection.firstName} {connection.lastName}
              </h2>

              <p className="text-sm md:text-base mt-1">
                <span className="font-medium">Age</span> - {connection.age} ·{" "}
                <span className="font-medium">Gender</span> -{" "}
                {connection.gender}
              </p>

              <p className="text-sm md:text-base mt-2 max-h-16 md:max-h-20 overflow-hidden">
                <span className="font-medium">About</span> - {connection.about}
              </p>
            </div>

            <div className="w-full md:w-auto mt-3 md:mt-0 md:ml-4 flex-shrink-0 flex md:items-center">
              <Link to={`/chat/${connection._id}`} className="w-full md:w-auto">
                <button
                  className="btn btn-primary w-full md:w-auto"
                  aria-label={`Chat with ${connection.firstName}`}
                >
                  Chat
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Connections;
