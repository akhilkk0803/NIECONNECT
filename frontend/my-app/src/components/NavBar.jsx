import React from "react";
import logo from "../imgs/logo.png";
import defaultLogo from "../imgs/Default_pfp.svg.png";
import { NavLink } from "react-router-dom";
import { Avatar } from "@radix-ui/themes";
import { Switch } from "@radix-ui/themes";
import { BellIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const NavBar = () => {
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    if (!dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setDark((prev) => !prev);
  };
  return (
    <div className="static shadow-md  p-2">
      <div className="flex   md:flex-row p-4 rounded-lg  justify-between items-center">
        <div>
          <NavLink to="/">
            <img src={logo} alt="" className="h-10" />
          </NavLink>
        </div>
        <div className=" items-center gap-5 md:flex hidden ">
          <div className="dark:bg-black  bg-gray-200 px-3 py-2 rounded-3xl cursor-pointer">
            <ChatBubbleIcon
              height={20}
              width={20}
              className="dark:text-white"
            />
          </div>
          <div className="dark:bg-black  bg-gray-200 px-3 py-2 rounded-3xl cursor-pointer">
            <BellIcon fontSize={20} height={20} width={20} />
          </div>
          <NavLink to="/profile">
            <Avatar src={defaultLogo} size="3" />
          </NavLink>
          {/* dark/lightmode */}
          <Switch defaultChecked onClick={toggle} />
          {dark ? "Dark" : "Light"}
        </div>
        <div
          className="block md:hidden "
          onClick={() => setOpen((prev) => !prev)}
        >
          Menu
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className="fixed right-0 z-10 bg-slate-200  dark:bg-gray-800 w-[30%] top-0 flex flex-col justify-normal items-end p-3 h-full"
            >
              <div onClick={() => setOpen(false)}>X</div>
              <div className=" items-center gap-5 flex flex-col  ">
                <div className="dark:bg-black  bg-gray-200 px-3 py-2 rounded-3xl cursor-pointer">
                  <ChatBubbleIcon
                    height={20}
                    width={20}
                    className="dark:text-white"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <div className="dark:bg-black  bg-gray-200 px-3 py-2 rounded-3xl cursor-pointer">
                  <BellIcon
                    fontSize={20}
                    height={20}
                    width={20}
                    onClick={() => setOpen(false)}
                  />
                </div>
                <NavLink to="/profile">
                  <Avatar
                    src={defaultLogo}
                    size="3"
                    onClick={() => setOpen(false)}
                  />
                </NavLink>
                {/* dark/lightmode */}
                <Switch defaultChecked onClick={toggle} />
                <p className="text-black dark:text-white">
                  {dark ? "Dark" : "Light"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NavBar;
