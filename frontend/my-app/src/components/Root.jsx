import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

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
      <Footer/>
    </div>
  );
};

export default Root;
