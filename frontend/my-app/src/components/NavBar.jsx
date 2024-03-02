import React from "react";
import logo from "../public/assets/images/logo.png";
import defaultLogo from "../public/assets/images/Default_pfp.svg.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "@radix-ui/themes";
import { Switch } from "@radix-ui/themes";
import { BellIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/userslice";
import { url } from "../url";
import Sidebar from "./Sidebar";
const NavBar = () => {
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggle = () => {
    if (!dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setDark((prev) => !prev);
  };
  const logouthandler = () => {
    dispatch(removeUser());
    return navigate("/auth?type=student");
  };
  return (
    <div className="static shadow-lg shadow-gray-900 mb-10 p-2">
      <div className="flex   md:flex-row p-4 rounded-lg  justify-between items-center">
        <div>
          <NavLink to="/">
            <img src={logo} alt="" className="h-10" />
          </NavLink>
        </div>

        <div className=" items-center gap-5 md:flex hidden ">
          {user && <NavLink to="/">Home</NavLink>}
          {user?.username && (
            <NavLink to={"/profile/" + user?.username}>
              <Avatar
                src={user?.dp}
                size="3"
                radius="full"
                fallback={user?.name?.substring(0, 2)}
              />
            </NavLink>
          )}
          {/* dark/lightmode */}
          <Switch defaultChecked onClick={toggle} />
          {dark ? "Dark" : "Light"}
          {user && <button onClick={logouthandler}>Logout</button>}
        </div>

        {user && (
          <div
            className="block md:hidden "
            onClick={() => setOpen((prev) => !prev)}
          >
            Menu
          </div>
        )}
        <AnimatePresence>
          {open && user && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className="fixed right-0 z-10  
              
              bg-slate-900
              w-[40%] top-0 flex flex-col justify-normal items-end p-3 h-full"
            >
              <div onClick={() => setOpen(false)}>X</div>
              <div className=" items-center gap-5 flex flex-col  ">
                <Sidebar setOpen={setOpen} />
                {user && (
                  <NavLink to="/" onClick={() => setOpen(false)}>
                    Home
                  </NavLink>
                )}

                <NavLink
                  to={"/profile/" + user?.username}
                  onClick={() => setOpen(false)}
                >
                  <Avatar
                    src={user?.dp}
                    size="3"
                    radius="full"
                    fallback={user?.name?.substring(0, 2)}
                  />
                </NavLink>
                {/* dark/lightmode */}
                <div className="flex gap-2">
                  <Switch defaultChecked onClick={toggle} />
                  <p className="text-black dark:text-white">
                    {dark ? "Dark" : "Light"}
                  </p>
                </div>
                {user && <button onClick={logouthandler}>Logout</button>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {user && <h1>Welcome {user.name}</h1>}
    </div>
  );
};

export default NavBar;
