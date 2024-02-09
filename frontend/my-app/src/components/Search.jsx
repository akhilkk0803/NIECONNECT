import React, { useEffect, useState } from "react";
import { getUser } from "./util/users";
import { Avatar } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";
const Search = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    setLoading(true);
    getUser(text, true).then((res) => {
      setLoading(false);
      setSuggestions(res);
    });
  }, [text]);
  return (
    <div>
      <div className=" relative inline-block w-full">
        <input
          type="text"
          className="text-black w-full  p-2  rounded-md "
          placeholder="searchUser"
          onChange={(e) => setText(e.target.value)}
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
