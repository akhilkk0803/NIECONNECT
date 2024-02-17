import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div
      className="bg-authBg   dark:bg-[#00040f]  
    
    dark:text-white text-black
    min-h-screen
    bg-[#d1c7c6]
    container"
    >
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Root;
