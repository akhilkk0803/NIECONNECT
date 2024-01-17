import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../url";
import { Avatar } from "@radix-ui/themes";
import ProfileInfo from "./ProfileInfo";
import Posts from "./Posts";
const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { username } = params;
  useEffect(() => {
    fetch(url + "user/" + username)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        console.log(data);
        setLoading(false);
      });
  }, [username]);
  if (loading) {
    return <h1>Loading....</h1>;
  }
  return (
    <div className="container ">
      <div>
        <div className="flex justify-center gap-6">
          <div className=" ">
            <Avatar src={userData.user.dp} radius="full" size="8" />
          </div>
          <div className="flex flex-col gap-3 items-start ">
            <div>
              <p className="font-semibold text-lg">{userData.user.username}</p>
              <p className="text-sm ">{userData.user.about}</p>
            </div>
            <ProfileInfo socials={userData.socials} />
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-col md:ml-52 md:mr-52">
          <Posts post={userData.socials.posts} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
