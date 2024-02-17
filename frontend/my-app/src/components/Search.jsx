import React, { useEffect, useState } from "react";
import { getUser } from "./util/users";
import { Avatar } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";
import { url } from "../url";
import { Badge, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
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
    return () => {
      setLoading(false);
      console.log("cleaned");
    };
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
            <div
              className="px-7 py-4 
            bg-gray-400
            dark:bg-slate-900 dark:hover:bg-blue-950
            hover:bg-gray-500
            cursor-pointer rounded-full w-fit  "
            >
              <NavLink to={"/profile/" + el.username}>
                <div className="flex">
                  <Avatar src={url + "public/dp/" + el.dp} />
                  <div className="flex flex-col items-center">
                    <p>{el.username}</p>
                    <Badge>{el.type}</Badge>
                  </div>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      )}
      {loading && (
        <Stack>
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Stack>
      )}
    </div>
  );
};

export default Search;
