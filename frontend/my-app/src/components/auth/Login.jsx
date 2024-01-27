import React, { useEffect, useState } from "react";
import { url } from "../../url";
import { useDispatch } from "react-redux";
import { setuser, removeUser } from "../../store/userslice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: null,
    password: null,
  });
  const location = useLocation();
  const myParam = new URLSearchParams(location.search).get("type");
  useEffect(() => {
    if (myParam != "student" && myParam != "club" && myParam != "dept") {
      return navigate("?type=student");
    }
  }, [myParam]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(url + myParam + "/", {
        method: "POST",
        body: JSON.stringify({ ...user }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 404) {
        throw new Error("User not found");
      } else if (res.status === 401) {
        throw new Error("Incorrect Password");
      }
      const User = await res.json();
      dispatch(setuser({ user: User.user.auth, token: User.token }));
      // setTimeout(() => {
      //   dispatch(removeUser());
      //   console.log("removed")
      // }, 9000);
      return navigate(`/profile/${user.username}`);
    } catch (e) {
      console.log(e.message);
      toast({
        title: e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  const handlechange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <form action="" className="flex flex-col items-center gap-3">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="text-black"
            onChange={handlechange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="text-black"
            onChange={handlechange}
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <Link to={"?type=student"}>As a student</Link>
        <Link to="?type=club">As a club</Link>
        <Link to={"?type=dept"}>As a dept</Link>
      </form>
    </div>
  );
};

export default Login;
