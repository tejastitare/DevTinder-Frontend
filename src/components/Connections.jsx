import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { useSelector } from "react-redux";
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
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <div>No Connections Found !</div>;
  return (
    <div className="justify-center items-center mt-4 flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Connections</h1>

      <div className="card-body text-white text-3xl w-full flex gap-4 items-center">
        {connections.map((connection, index) => (
          <div key={index} className="card shadow-sm items-center w-[30%] bg-base-300">
            <div className="flex w-full h-full justify-center items-center gap-6">
              <figure className="w-80 p-4">
                <img
                  className="rounded-full w-full h-40"
                  src={connection.photoUrl}
                  alt="Shoes"
                />
              </figure>
              <div className="w-full space-y-2">
                <h2 className="card-title">
                  {connection.firstName} {connection.lastName}
                </h2>
                <p className="text-xl">
                  {" "}
                  Age - {connection.age} , Gender - {connection.gender}
                </p>
                <p className="text-xl"> About - {connection.about}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Connections;
