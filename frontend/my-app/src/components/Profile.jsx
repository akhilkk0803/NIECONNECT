import React from "react";
import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import { url } from "../url";
import { Avatar } from "@radix-ui/themes";
import ProfileInfo from "./ProfileInfo";
import Posts from "./Posts";
import { getUser } from "./util/users";
const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { username } = params;

  useEffect(() => {
    getUser(username)
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.status);
        setError({ msg: err.message, status: err.status });
      });
  }, [username]);
  if (error) {
    return (
      <h1>
        {error.msg}
        {error.status}
      </h1>
    );
  }
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
