import React, { useEffect, useState } from "react";
import { url } from "../url";
import Creator from "./Creator";
const Announcement = ({ type, auth, user }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!type || !auth) return;
    fetch(`${url}${type}/announce/${auth}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log(result);
      });
  }, [type, auth, user]);
  return (
    <div className="flex flex-col justify-center items-start ">
      {data.length === 0 && <h3>No Announcements Made</h3>}
      {data.map((el) => (
        <div
          className="p-4 dark:bg-slate-900 mb-3 
        bg-gray-300
        rounded-3xl"
        >
          <Creator
            dp={user?.dp}
            name={user?.name}
            time={el?.createdAt}
            username={user?.username}
          />
          <div className="mt-3 font-medium">{el.message}</div>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
