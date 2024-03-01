import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { url } from "../url";

const Follow = ({ el }) => {
  const token = localStorage.getItem("token");

  if (!token) return;
  const socials = useSelector((state) => state.user?.socials);
  const user = useSelector((state) => state.user?.user?._id);
  if (!user) return;
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    setFollowing(
      socials?.following?.filter((curr) => curr === el.user._id).length > 0
    );
  }, [el]);
  console.log(following);
  const handleFollow = async () => {
    try {
      const res = await fetch(
        url + "user/follow?request=" + !following + "&user=" + el.user._id,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status == 500) {
        throw Error("ERROR");
      }
      setFollowing((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    el?.user?._id != user && (
      <button className="button" onClick={handleFollow}>
        {following ? "Following" : "Follow"}
      </button>
    )
  );
};

export default Follow;
