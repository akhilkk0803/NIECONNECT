import React, { useEffect, useState } from "react";
import { url } from "../url";
import Creator from "./Creator";
import { motion } from "framer-motion";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
const RecentAnnouncements = ({ type }) => {
  const [clubData, setClubData] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const [clubloading, setclubloading] = useState(false);
  const [deptloading, setdeptloading] = useState(false);
  useEffect(() => {
    setdeptloading(true);
    setclubloading(true);
    fetch(url + "dept/announcements/all?limits=3")
      .then((res) => res.json())
      .then((result) => {
        setdeptloading(false);
        setDeptData(result);
      });
    fetch(url + "club/announcements/all?limits=3")
      .then((res) => res.json())
      .then((result) => {
        setclubloading(false);
        setClubData(result);
      });
  }, []);
  return (
    <div className="md:border-l-2 pl-2 border-l-gray-800">
      <h3>Recent Club Announcements</h3>
      <div className="flex flex-col gap-3">
        {clubloading && (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        )}
        {clubData.length === 0 && <h3>No Club announcemnts</h3>}

        {clubData.map((el, i) => (
          <motion.div
            className="dark:bg-slate-900 
         
          text-sm  p-4 rounded-lg"
            initial={{ x: -200 - 20 - i }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2 + i }}
          >
            <Creator
              dp={el.auth?.dp}
              name={el.auth?.name}
              time={el?.createdAt}
              username={el.auth?.username}
            />
            <div className="mt-3 font-medium">{el.message}</div>
          </motion.div>
        ))}
      </div>
      <hr />
      <h3 className="mt-3">Recent Dept Announcements</h3>
      <div className="flex flex-col  gap-3">
        {deptloading && (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        )}
        {deptData.length === 0 && <h3>No Dept announcemnts</h3>}
        {deptData.map((el,i) => (
          <motion.div
            className="dark:bg-slate-900 
          text-sm 
          p-4
          rounded-lg"
            initial={{ x: -200 - 20 - i }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 + i }}
          >
            <Creator
              dp={el.auth?.dp}
              name={el.auth?.name}
              time={el?.createdAt}
              username={el.auth?.username}
            />
            <div className="mt-3 font-medium">{el.message}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentAnnouncements;
