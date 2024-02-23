import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Likes = ({ likes, likehandler, likeState }) => {
  return (
    <div className="flex items-center gap-2  ">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
          style={{ outline: "none" }}
        >
          <motion.path
            className="cursor-pointer"
            onClick={likehandler}
            stroke-linecap="round"
            stroke-linejoin="round"
            initial={{
              pathLength: 0,
            }}
            whileTap={{
              pathLength: [0, 1],
              transition: {
                duration: 0.7,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              },
            }}
            animate={{
              pathLength: 1,
              transition: { duration: 0.7 },
              fill: likeState ? "rgb(86, 9, 209)" : "",
            }}
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        {likeState && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="absolute w-2 h-3 top-0 right-0  "
          >
            <motion.path
              animate={{
                scale: 1.2,
                transition: { duration: 2 },
              }}
              fill="rgb(241, 230, 9)"
              className="shadow-yellow-800"
              d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z"
            />
          </svg>
        )}
      </div>
      <AnimatePresence>
        <motion.span
          initial={{ y: likeState ? -10 : 10 }}
          key={likes.length}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="cursor-pointer"
        >
          {likes.length}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default Likes;
