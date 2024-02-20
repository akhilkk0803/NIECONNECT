import React from "react";
import { useEffect, useState } from "react";
import { NavLink, json, useParams } from "react-router-dom";
import { url } from "../url";
import { Avatar } from "@radix-ui/themes";
import ProfileInfo from "./ProfileInfo";
import Posts from "./Posts";
import { getUser } from "./util/users";
import { useSelector } from "react-redux";
import { Badge } from "@chakra-ui/react";

import Follow from "./Follow";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Announcement from "./Announcement";
import Loading from "./util/Loading";
import Edit from "./Edit";
import ProfileImage from "./ProfileImage";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { username } = params;
  const user = useSelector((state) => state.user?.user?._id);
  useEffect(() => {
    getUser(username)
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
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
    return <Loading />;
  }
  return (
    <div className="container ">
      <div>
        <div className="flex justify-center gap-6 wrap">
          <ProfileImage dp={userData.user.dp} name={userData.user.name} />
          <div className="flex flex-col gap-3 items-start md:max-w-[25%] ">
            <div>
              <div className="flex gap-2">
                <p className="font-semibold text-lg">
                  {userData.user.username}
                </p>
                <span>
                  <Badge colorScheme="blue">{userData.user.type}</Badge>
                </span>
              </div>
              <p className="text-sm whitespace-pre-line break-words ">
                {userData.user.about}
              </p>
            </div>
            <ProfileInfo socials={userData.socials} />
            <Follow el={userData} />
            {userData?.user?._id === user && (
              <NavLink
                to="/edit"
                className="flex items-center dark:bg-slate-900
                bg-slate-500
                p-2 rounded-lg"
              >
                <span>Edit</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M10 9L9 4l5 1z" />
                </svg>
              </NavLink>
            )}
          </div>
          <div></div>
        </div>
      </div>
      <div className="p-5 ">
        <Tabs variant="soft-rounded">
          <TabList className="w-full">
            <div className="flex justify-center w-full">
              <Tab>Posts</Tab>
              {userData?.user?.type != "student" && <Tab>Announcement</Tab>}
            </div>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="flex flex-col md:ml-52 md:mr-52">
                <Posts post={userData.socials.posts} />
              </div>
            </TabPanel>
            <TabPanel
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Announcement
                type={userData?.user?.type}
                auth={userData?.user?._id}
                user={userData?.user}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
