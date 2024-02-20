import React, { useState, useEffect } from "react";
import PostAction from "./PostAction";
import PostComments from "./PostComments";
import { motion } from "framer-motion";
import PostImage from "./PostImage";
import Time from "./util/Time";
import { NavLink } from "react-router-dom";
import { url } from "../url";
import PostCreator from "./Creator";

const SinglePost = ({ el }) => {
  const [comment, setComments] = useState([]);
  useEffect(() => {
    setComments(el.comments);
  }, []);

  const addComment = (comment) => {
    setComments(comment);
  };
  return (
    <motion.div
      className="post  dark:bg-gray-950 
      
      
      shadow-blue-900
       md:ml-3 shadow-sm "
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <PostCreator
        dp={el?.auth?.dp}
        name={el?.auth?.name}
        time={el?.createdAt}
        username={el?.auth?.username}
      />
      <div>
        <p className="text-sm text-blue-400 ">{el.caption}</p>
        <p className="text-sm text-blue-400 ">{el.hashtag}</p>
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
