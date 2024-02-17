import React, { useEffect } from "react";
import { useState } from "react";
import { url } from "../url";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Announcement from "./Announcement";
const Clubs = () => {
  const [selected, setSelected] = useState("");
  const [clubs, setClubs] = useState([]);
  useEffect(() => {
    fetch(url + "user/all/club")
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) throw new Error("NO CLUBS FOUND");
        setSelected(data[0]);
        setClubs(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex justify-center w-full flex-col items-center mt-7">
      <Tabs
        variant="soft-rounded"
        style={{
          overflow: "auto",
        }}
      >
        <TabList
          style={{
            overflow: "auto",
            maxWidth: "100vw",
            display:'flex',
            gap:'20px',
            marginBottom:'10px'
          }}
        >
          {clubs.map((el) => (
            <Tab onClick={() => setSelected(el)}>{el.name}</Tab>
          ))}
        </TabList>
      </Tabs>
      <div className="handleOverflow ">
        {selected && (
          <Announcement type="club" auth={selected._id} user={selected} />
        )}
      </div>
    </div>
  );
};

export default Clubs;
