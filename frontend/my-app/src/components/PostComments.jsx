import { Avatar } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Time from "./util/Time";
const PostComments = ({ comments }) => {
  const [show, setShow] = useState(false);

  console.log(comments);
  return (
    <div className="dark:text-white text-black">
      <hr />
      <AnimatePresence>
        {show && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            className="max-h-[350px] overflow-auto"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 1, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {comments.map((el) => (
              <motion.div
                className="flex gap-3 mt-3 bg-slate-400 px-6 py-3   rounded-2xl w-fit "
                variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
                transition={{ duration: 0.8 }}
              >
                <Avatar src={el.user.dp} radius="full" />
                <div>
                  <p className="text-sm font-semibold">{el.user.username}</p>
                  <Time currTime={el.createdAt} />
                  <p className="text-sm">{el.message}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}{" "}
      </AnimatePresence>
      {!show && comments.length > 0 && (
        <div className="flex gap-3 mt-3 bg-slate-400 px-6 py-3   rounded-2xl w-fit ">
          <Avatar src={comments[0].user.dp} radius="full" />
          <div>
            <p className="text-sm font-semibold">{comments[0].user.username}</p>
            <Time currTime={comments[0].createdAt} />
            <p className="text-sm">{comments[0].message}</p>
          </div>
        </div>
      )}
      {comments.length > 1 && (
        <button
          className="text-center btn-primary mt-3"
          onClick={() => setShow(!show)}
        >
          {show ? "View Less" : "View More"}{" "}
        </button>
      )}
      {}
    </div>
  );
};

export default PostComments;
