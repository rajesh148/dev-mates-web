import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/connectionsSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();

  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="flex justify-center my-10"> No Connections Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-center items-center">
                <img
                  alt="photo"
                  className="w-24 h-24 rounded-full object-cover"
                  src={photoUrl}
                />
              </div>
              <div>
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
