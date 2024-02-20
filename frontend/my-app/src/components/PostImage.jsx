import React, { useState } from "react";
import { TriangleRightIcon, TriangleLeftIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { url } from "../url";
const PostImage = ({ el }) => {
  const [curr, setCurr] = useState(0);
  const [dir, setDir] = useState("left");
  const n = el.length;
  return (
    <div className="flex items-center justify-center mt-3 ">
      <AnimatePresence>
        <div
          className="
        sm:w-full md:w-1/2
        relative "
        >
          <motion.img
            src={url + "public/post/" + el[curr]}
            key={el[curr]}
            exit={{ x: dir == "left" ? -1000 : 300, opacity: 0 }}
            transition={{ duration: 0.1 }}
            initial={{ x: dir == "left" ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            alt="post"
            className=" object-center 
             w-full  mb-3 
             h-auto rounded-md
             aspect-square
         "
          />
          {n > 1 && (
            <>
              {" "}
              <TriangleLeftIcon
                className="arrow left-0"
                height={30}
                width={30}
                onClick={() => {
                  setDir("left");
                  setCurr((prev) => (prev == 0 ? n - 1 : prev - 1));
                }}
              />
              <TriangleRightIcon
                height={30}
                width={30}
                className="arrow right-0"
                onClick={() => {
                  setDir("right");
                  setCurr((prev) => (prev + 1) % n);
                }}
              />
              <div className="absolute bottom-3 right-[50%]">
                <div className="flex gap-3 justify-center items-center">
                  {[...new Array(n)].map((_, i) => (
                    <div
                      className={` mr-3 rounded-[50%] bg-white p-[4px] ${
                        curr == i ? "bg-white" : "bg-blue-700"
                      } cursor-pointer shadow-lg`}
                      onClick={() => {
                        setDir(curr > i ? "left" : "right");
                        setCurr(i);
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default PostImage;
