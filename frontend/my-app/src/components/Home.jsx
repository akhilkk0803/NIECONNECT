import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Posts from "./Posts";
import Friends from "./Friends";
import Bg from "../imgs/blue-social-media-background_1017-7008.avif";
import Search from "./Search";
import { NavLink } from "react-router-dom";
import { url } from "../url";
import { token } from "../getToken";
const Home = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    if (!token) return;
    fetch(url + "post/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPost(result.flat(Infinity));
      });
  }, []);
  return (
    <div className={`p-8 dark:bg-black bg-white w-full`}>
      <div className="grid  md:grid-cols-[1fr,3fr,1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Posts post={post} />
        </div>
        {/* <Posts /> */}
        <Friends />
      </div>
    </div>
  );
};

export default Home;
