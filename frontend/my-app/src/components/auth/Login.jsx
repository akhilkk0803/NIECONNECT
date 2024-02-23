import React, { useEffect, useState } from "react";
import { url } from "../../url";
import { useDispatch } from "react-redux";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { setuser, removeUser } from "../../store/userslice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useToast,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: null,
    password: null,
  });
  const [showPassword, setShowPassword] = useState(false);
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
      setLoading(true);
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
      console.log(User)
      dispatch(
        setuser({
          user: User.user.auth,
          token: User.token,
          announcement: myParam == "student" ? false : true,
          socials: User.user.socials,
        })
      );
      setLoading(false);
      // setTimeout(() => {
      //   dispatch(removeUser());
      //   console.log("removed")
      // }, 9000);
      return navigate(`/profile/${user.username}`);
    } catch (e) {
      setLoading(false);

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
    <div
      className="flex justify-center flex-col 
      items-center"
    >
      <h3 className="text-xl">Login as {myParam}</h3>
      <form action="">
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="username">Username</label>
            <Input type="text" name="username" onChange={handlechange} />{" "}
          </div>
          <div className="">
            <label htmlFor="password">Password</label>
            <InputGroup>
              <InputRightElement>
                {!showPassword ? (
                  <ViewIcon
                    className="cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                ) : (
                  <ViewOffIcon
                    className="cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )}
              </InputRightElement>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handlechange}
              />
            </InputGroup>
          </div>
          <button onClick={handleSubmit} className="button" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
          <div className="flex gap-3 ">
            <Link
              to={"?type=student"}
              className="bg-slate-500 p-2 rounded-md hover:bg-slate-800"
            >
              As a student
            </Link>
            <Link
              to="?type=club"
              className="bg-slate-500 p-2 rounded-md  hover:bg-slate-800"
            >
              As a club
            </Link>
            <Link
              to={"?type=dept"}
              className="bg-slate-500 p-2 rounded-md  hover:bg-slate-800"
            >
              As a dept
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
