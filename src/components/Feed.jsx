
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { UserPlus } from 'lucide-react';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(`${BASE_URL}/api/v1/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <UserPlus className="w-16 h-16 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No New Profiles</h2>
        <p>Check back later for more potential matches!</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-12 px-4">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;