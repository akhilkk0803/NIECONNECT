import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const Likes = ({ likes, likehandler, likeState }) => {
  return (
    <div className="flex items-center gap-2  ">
      <div className="cursor-pointer" onClick={likehandler}>
        <AnimatePresence>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <motion.path
              stroke-linecap="round"
              stroke-linejoin="round"
              initial={{
                pathLength: 0,
                fill: "",
              }}
              whileHover={{
                scale: 1.2,
              }}
              animate={{
                pathLength: 1,
                fill: likeState ? "rgb(54, 0, 175)" : "",
              }}
              transition={{ duration: 0.6 }}
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </AnimatePresence>
      </div>
      <span>{likes.length}</span>
    </div>
  );
};

export default Likes;
