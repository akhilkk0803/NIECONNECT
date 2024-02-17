import React, { useState } from "react";
import Creator from "./Creator";
import { Avatar } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import { url } from "../url";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddAnnouncement = ({ el }) => {
  const token = localStorage.getItem("token");
  const [announcement, setAnnouncement] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  if (!user) return;
  const handleAnnouncement = async () => {
    if (announcement.trim().length === 0) return;
    console.log(announcement);
    const res = await fetch(url + user?.type + "/announce", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: announcement }),
    });
    navigate("/profile/" + user?.username);
  };
  return (
    <div className=" p-6  rounded-md dark:bg-slate-900 bg-gray-200 ml-1 ">
      <div className="flex gap-3 ">
        <Avatar src={url + "public/dp/" + user?.dp} radius="full" size="4" />
        <div className="flex w-full gap-2">
          <Input
            variant="flushed"
            placeholder="Announce"
            onChange={(e) => setAnnouncement(e.target.value)}
          />

          <button
            className="button rounded-lg hover:bg-blue-900"
            onClick={handleAnnouncement}
          >
            ANNOUNCE
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AddAnnouncement;
