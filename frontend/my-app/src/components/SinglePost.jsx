import React, { useState, useEffect } from "react";
import PostAction from "./PostAction";
import PostComments from "./PostComments";
import { Avatar } from "@radix-ui/themes";
import { motion } from "framer-motion";
import PostImage from "./PostImage";
import {
  differenceInDays,
  differenceInHours,
  differenceInSeconds,
  differenceInMinutes,
} from "date-fns";

const SinglePost = ({ el }) => {
  const [comment, setComments] = useState([]);
  useEffect(() => {
    setComments(el.comments);
  }, []);
  let time, type;
  const getTime = (...fn) => {
    for (let i = 0; i < fn.length; i++) {
      const temp = fn[i](new Date(), el.createdAt);
      if (temp > 0) {
        time = temp;
        console.log(fn);
        type = fn[i].name.substring(12);
        return true;
      }
    }
    return false;
  };
  getTime(
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds
  );
  console.log(time, type);
  const addComment = (comment) => {
    setComments(comment);
  };
  return (
    <motion.div
      className="post"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex gap-3">
        <Avatar src={el.auth.dp} radius="full" size="3" />
        <div className="">
          <p className="font-semibold ">{el.auth.name}</p>
          <p className="text-xs dark:text-gray-200 ">
            <span className="font-semibold  ">{time} </span>
            {type} ago
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm text-blue-400 ">{el.caption}</p>
      </div>
      <PostImage el={el.image} />
      <div className="flex mt-4 mb-2 gap-10 items-center justify-center text-blue-500">
        <PostAction el={el} addComment={addComment} len={comment.length} />
      </div>
      <div>
        <PostComments comments={comment} />
      </div>
    </motion.div>
  );
};

export default SinglePost;
