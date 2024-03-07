import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Posts from "./Posts";
import Search from "./Search";
import { NavLink, useNavigate } from "react-router-dom";
import { url } from "../url";
import { useSelector } from "react-redux";
import Loading from "./util/Loading";
import AddAnnouncement from "./AddAnnouncement";
import RecentAnnouncements from "./RecentAnnouncements";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
const Home = () => {
  const token = localStorage.getItem("token");

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const redirect = useNavigate();
  if (!user?.user) return redirect("/auth");
  useEffect(() => {
    setLoading(true);
    fetch(url + "post/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setPost(result.flat(Infinity));
      });
  }, [user]);
  return (
    <div className={` px-3  w-full`}>
      <div className="grid md:grid-cols-[0.8fr,2.9fr,1fr]">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex flex-col mr-3">
          <div className="handleOverflow">
            {user?.announcement && <AddAnnouncement />}
            {loading && (
              <>
                <Box padding="6">
                  <SkeletonCircle size="10" />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="3"
                  />
                </Box>
                <Box padding="6">
                  <SkeletonCircle size="10" />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="3"
                  />
                </Box>
              </>
            )}
            {!loading && post.length > 0 && (
              <div className="">
                {" "}
                <Posts post={post} />
              </div>
            )}
            {!loading && post.length == 0 && (
              <div>Please Login or Follow someone to View Posts</div>
            )}
          </div>
        </div>
        {/* <Posts /> */}
        <div className="handleOverflow md:block hidden">
          <RecentAnnouncements />
        </div>
      </div>
    </div>
  );
};

export default Home;
