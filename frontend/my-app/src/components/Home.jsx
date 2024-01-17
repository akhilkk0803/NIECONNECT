import React from "react";
import Sidebar from "./Sidebar";
import Posts from "./Posts";
import Friends from "./Friends";
import Bg from "../imgs/blue-social-media-background_1017-7008.avif";
const Home = () => {
  return (
    <div className={`p-8 dark:bg-black bg-white w-full`}>
      <div className="grid  md:grid-cols-[1fr,3fr,1fr]">
        <Sidebar />
        {/* <Posts /> */}
        <Friends />
      </div>
    </div>
  );
};

export default Home;
