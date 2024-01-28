import React, { useState } from "react";
import { getUser } from "./util/users";
import { Avatar } from "@radix-ui/themes";

const Search = () => {
  const [suggestions, setSuggestions] = useState([]);
  const fetchUser = async (e) => {
    const res = await getUser(e.target.value, true);
    console.log(res);
    setSuggestions(res);
  };
  return (
    <div>
      <input
        type="text"
        className="text-black w-full rounded-md"
        placeholder="searchUser"
        onChange={fetchUser}
      />
      {suggestions.length > 0 && (
        <div className="flex flex-col gap-3">
          {suggestions.map((el) => (
            <div className="flex">
              <Avatar src={el.dp} />
              <p>{el.username}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
