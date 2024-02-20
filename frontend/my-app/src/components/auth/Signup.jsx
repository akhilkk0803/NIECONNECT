import React, { useEffect } from "react";
import Login from "./Login";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { url } from "../../url";
import {
  Avatar,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { setuser, updateUser } from "../../store/userslice";
import { useDispatch } from "react-redux";
const Signup = ({ edit = false, currUser }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const myParam = new URLSearchParams(location.search).get("type");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dp, setDp] = useState(null);
  const [passwordisValid, setpasswordIsValid] = useState(true);
  const [confirmpasswordisValid, setconfirmpasswordIsValid] = useState(true);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: undefined,
    password: undefined,
    name: "",
  });
  const [uploaded, setUploaded] = useState(edit ? true : false);
  const navigate = useNavigate();
  const returnToast = (e) => {
    toast({
      title: e.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-left",
    });
  };
  const handleDp = async (e) => {
    e.preventDefault();
    if (!edit && !file) return;
    console.log(file);
    const formData = new FormData();
    formData.append("dp", file[0]);
    const res = await fetch(url + "user/dp", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    setUploaded(true);
    setDp(result.filename);
  };
  const handleUser = (e) => {
    if (e.target.name === "password") {
      setpasswordIsValid(e.target.value.trim().length < 7 ? false : true);
    }
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = edit ? "PUT" : "POST";
    const uri = edit ? "user" : myParam + "/new";
    if (!user.username || (!edit && !user.password) || !user.name) {
      returnToast({ message: "Fill all fields" });
      return;
    }
    if (!edit && user.password.trim().length < 7) {
      returnToast({ message: "Password should be minimum of length 7" });
      return;
    }
    if (!edit && confirmPassword != user.password) {
      returnToast({ message: "CONFIRM PASSWORD DOES NOT MATCH PASSWORD" });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(url + uri, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: edit ? "Bearer " + token : null,
        },
        body: JSON.stringify({
          ...user,
          dp,
        }),
      });
      if (res.status === 403) {
        returnToast({ message: "Username already exsists" });
        return;
      }
      const data = await res.json();
      setLoading(false);
      console.log(data);
      if (edit) {
        dispatch(updateUser({ user: data }));
      } else {
        dispatch(
          setuser({
            user: data.user.auth,
            token: data.token,
            announcement: myParam == "student" ? false : true,
          })
        );
      }

      navigate(
        "/profile/" + (!edit ? data?.user?.auth.username : data?.username)
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (edit) {
      setDp(currUser?.dp);
      setConfirmPassword(currUser?.password);
      setUser({
        username: currUser.username,
        name: currUser.name,
        about: currUser.about,
        password: undefined,
      });
    }
  }, []);
  return (
    <div
      className="flex

    justify-center flex-col items-center "
    >
      {!edit ? (
        <h1 className="text-xl">Signup as {myParam}</h1>
      ) : (
        <h2>Edit your Profile</h2>
      )}
      <form action="">
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="username">Name</label>
            <Input
              type="text"
              value={user.name}
              name="name"
              onChange={handleUser}
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              value={user.username}
              name="username"
              onChange={handleUser}
            />
          </div>
          {!edit && (
            <>
              <div>
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
                    value={user.password}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    isInvalid={!passwordisValid}
                    focusBorderColor={passwordisValid ? "blue.300" : "red.300"}
                    onChange={handleUser}
                  />
                </InputGroup>
              </div>
              <div>
                <label htmlFor="confirmpassword">Confirm Password</label>
                <InputGroup>
                  <InputRightElement>
                    {!showConfirmPassword ? (
                      <ViewIcon
                        className="cursor-pointer"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      />
                    ) : (
                      <ViewOffIcon
                        className="cursor-pointer"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      />
                    )}
                  </InputRightElement>
                  <Input
                    value={confirmPassword}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmpassword"
                    isInvalid={!confirmpasswordisValid}
                    focusBorderColor={
                      confirmpasswordisValid ? "blue.300" : "red.300"
                    }
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setconfirmpasswordIsValid(
                        e.target.value.trim().length < 7 ||
                          user.password != e.target.value
                          ? false
                          : true
                      );
                    }}
                  />
                </InputGroup>
              </div>
            </>
          )}
          <div>
            <label htmlFor="about">About</label>
            <Input
              type="text"
              value={user.about}
              name="about"
              onChange={handleUser}
            />
          </div>
          <div>
            <label htmlFor="dp">Profile Photo</label>
            <InputGroup>
              <InputRightElement>
                <motion.button
                  className={`button transition-colors ${
                    uploaded ? "bg-green-600" : "bg-red-700"
                  }`}
                  onClick={handleDp}
                  transition={{ duration: 1 }}
                >
                  Upload{" "}
                </motion.button>
                {dp && <Avatar src={url + "public/dp/" + dp} />}
              </InputRightElement>
              <Input
                type="file"
                name="dp"
                onChange={(e) => setFile(e.target.files)}
              />
            </InputGroup>
          </div>
        </div>

        <button className="button mt-2 " onClick={handleSubmit}>
          {loading ? "...Loading" : "Submit"}
        </button>
        {!edit && (
          <div className="flex  gap-3 mt-2">
            <Link
              to={"?type=student"}
              className="bg-slate-500 p-2 rounded-md  hover:bg-slate-800"
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
        )}
      </form>
    </div>
  );
};

export default Signup;
