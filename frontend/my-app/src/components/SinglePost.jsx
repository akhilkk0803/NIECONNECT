import React, { useState, useEffect } from "react";
import PostAction from "./PostAction";
import PostComments from "./PostComments";
import { motion } from "framer-motion";
import PostImage from "./PostImage";
import Time from "./util/Time";
import { NavLink, useNavigate } from "react-router-dom";
import { url } from "../url";
import PostCreator from "./Creator";
import { useSelector } from "react-redux";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
} from "@chakra-ui/react";
const SinglePost = ({ el }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user?.user);
  const [comment, setComments] = useState([]);
  useEffect(() => {
    setComments(el.comments);
  }, []);

  const addComment = (comment) => {
    setComments(comment);
  };
  const handleDelete = async () => {
    if (!token) return;
    const res = await fetch(url + "post/" + el._id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    navigate("/profile/" + user?.username);
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
      <div className="flex justify-between">
        <PostCreator
          dp={el?.auth?.dp}
          name={el?.auth?.name}
          time={el?.createdAt}
          username={el?.auth?.username}
        />
        {user?._id === el.auth._id && (
          <Popover>
            <PopoverTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
                className="cursor-pointer"
              >
                <circle cx="12" cy="5" r="2"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <circle cx="12" cy="19" r="2"></circle>
              </svg>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverCloseButton />
              <PopoverBody>
                <div className="bg-slate-700 p-3">
                  <button onClick={handleDelete}>Delete</button>
                  {/* <h3>Edit</h3> */}
                </div>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
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
