import React from "react";
import { NavLink } from "react-router-dom";
import Time from "./util/Time";
import { Avatar } from "@radix-ui/themes";

import { url } from "../url";
const Creator = ({ dp, name, time, username, message }) => {
  return (
    <NavLink to={"/profile/" + username}>
      <div className="flex gap-3">
        <Avatar
          src={ dp}
          fallback={name?.substring(0, 2)}
          radius="full"
          size="3"
        />
        <div className="">
          <p className="font-semibold ">{name}</p>
          <Time currTime={time} />
          {message && <p className="text-sm">{message}</p>}
        </div>
      </div>
    </NavLink>
  );
};

export default Creator;
