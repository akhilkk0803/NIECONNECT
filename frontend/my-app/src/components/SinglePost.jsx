import React, { useState, useEffect } from "react";
import PostAction from "./PostAction";
import PostComments from "./PostComments";
import { Avatar } from "@radix-ui/themes";
import { motion } from "framer-motion";
import PostImage from "./PostImage";
import Time from "./util/Time";

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
          <Time currTime={el.createdAt} />
        </div>
      </div>
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
