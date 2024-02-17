import React, { useEffect } from "react";
import { useState } from "react";
import { url } from "../url";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Announcement from "./Announcement";
const Dept = () => {
  const [selected, setSelected] = useState(null);
  const [dept, setDept] = useState([]);
  useEffect(() => {
    fetch(url + "user/all/dept")
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) throw new Error("NO CLUBS FOUND");
        setSelected(data[0]);
        setDept(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex flex-col items-center mt-7 ">
      <Tabs variant="soft-rounded">
        <TabList style={{
          marginBottom:'10px'
        }}>
          {dept.map((el) => (
            <Tab onClick={() => setSelected(el)}>{el.name}</Tab>
          ))}
        </TabList>
      </Tabs>
      <div className="handleOverflow">
        {selected && (
          <Announcement type="dept" auth={selected._id} user={selected} />
        )}
      </div>
    </div>
  );
};

export default Dept;
