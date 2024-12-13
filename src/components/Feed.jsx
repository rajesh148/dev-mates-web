import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
  const getTheFeeds = async () => {
    if (feedData) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTheFeeds();
  }, []);

  if (!feedData) return;
  if (feedData.length <= 0)
    return (
      <h1 className="flex justify-center my-10"> No new users found!!!</h1>
    );
  return (
    feedData && (
      <div className="flex justify-center my-10">
        <UserCard user={feedData[0]} />
      </div>
    )
  );
};

export default Feed;
