import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addfeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from "./UserCard";

function Feed() {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addfeed(res.data));
    } catch (error) {
      console.log("Error in fetching feed: ", error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="flex justify-center items-center mt-12">
        <UserCard user={feed[0]} />
      </div>
    )
  );
}

export default Feed;
