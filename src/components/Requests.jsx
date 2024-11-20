import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../store/requestsSlice";
import ConnectionCard from "./ConnectionCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  useEffect(() => {
    getRequests();
  }, []);
  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      console.log(res?.data?.data);
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="font-bold text-3xl">No Requests Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl">Requests</h1>
      {requests.map((request) => (
        <ConnectionCard connection={request.fromUserId} key={request._id} />
      ))}
    </div>
  );
};

export default Requests;
