import React, { useState } from "react";
import { url } from "../../url";
import { useDispatch } from "react-redux";
import { setuser } from "../../store/userslice";
import { useNavigate } from "react-router-dom";
import Toast from "../util/Toast";
const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "student1",
    password: "student123",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(url + "student/", {
      method: "POST",
      body: JSON.stringify({ ...user }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 404) {
      return <Toast title={"User not found"} status={"error"} />;
    } else if (res.status === 401) {
      return <Toast title={"Incorrect Password"} status={"warning"} />;
    }
    const User = await res.json();
    dispatch(setuser({ user: User.user.auth, token: User.token }));
    return navigate(`/profile/${user.username}`);
  };
  const handlechange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <form action="">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" onChange={handlechange} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handlechange} />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Login;
