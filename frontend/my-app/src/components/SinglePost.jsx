import React, { useState } from "react";
import PostAction from "./PostAction";
import PostComments from "./PostComments";
import { Avatar } from "@radix-ui/themes";
import { motion } from "framer-motion";
import PostImage from "./PostImage";
const SinglePost = ({ el }) => {
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
            <span className="font-semibold  ">{el.created_at} </span>hours ago
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm text-blue-400 ">{el.caption}</p>
      </div>
      <PostImage el={el.image} />
      <div className="flex mt-4 mb-2 gap-10 items-center justify-center text-blue-500">
        <PostAction el={el} />
      </div>
      <div>
        <PostComments comments={el.comments} />
      </div>
    </motion.div>
  );
};

export default SinglePost;
