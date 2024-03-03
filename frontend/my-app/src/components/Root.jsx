import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div
      className="dark:bg-authBg   dark:bg-[#00040f]  
    dark:text-white 
    text-black
    min-h-screen
    bg-white
    "
    >
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Root;
