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
    return <h1 className="font-bold text-3xl">No Connections Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl">Connections</h1>
      {connections.map((connection) => (
        <ConnectionCard connection={connection} key={connection._id} />
      ))}
    </div>
  );
};

export default Connections;
