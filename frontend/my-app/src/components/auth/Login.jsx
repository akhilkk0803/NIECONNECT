import React, { useEffect, useState } from "react";
import { url } from "../../url";
import { useDispatch } from "react-redux";
import { setuser } from "../../store/userslice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Toast from "../util/Toast";
const Login = () => {
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
    const res = await fetch(url + myParam + "/", {
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
