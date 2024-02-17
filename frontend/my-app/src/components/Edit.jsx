import React from "react";
import Signup from "./auth/Signup";
import { useSelector } from "react-redux";

const Edit = () => {
  const user = useSelector((state) => state.user?.user);
  if (!user) return;
  return (
    <div>
      <Signup edit={true} currUser={user}/>
    </div>
  );
};

export default Edit;
