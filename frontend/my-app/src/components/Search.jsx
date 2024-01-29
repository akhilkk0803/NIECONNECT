import React, { useState } from "react";
import { getUser } from "./util/users";
import { Avatar } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";
const Search = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchUser = async (e) => {
    setLoading(true);
    const res = await getUser(e.target.value, true);
    setLoading(false);
    console.log(res);
    setSuggestions(res);
  };
  return (
    <div>
      <div className=" relative inline-block w-full">
        <input
          type="text"
          className="text-black w-full  p-2  rounded-md "
          placeholder="searchUser"
          onChange={fetchUser}
        />
        {loading && (
          <p className="absolute right-1 text-xl text-black top-0">...</p>
        )}
      </div>
      {suggestions.length > 0 && (
        <div className="flex flex-col gap-3">
          {suggestions.map((el) => (
            <NavLink to={"/profile/" + el.username}>
              <div className="flex">
                <Avatar src={el.dp} />
                <p>{el.username}</p>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
