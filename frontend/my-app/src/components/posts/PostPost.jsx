import React from "react";
import defaultLogo from "../../imgs/Default_pfp.svg.png";
import { Avatar } from "@radix-ui/themes";
const items = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="orange"
        class="bi bi-images"
        viewBox="0 0 16 16"
      >
        <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
        <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10" />
      </svg>
    ),
    title: "Photo",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="red"
        class="bi bi-play-btn-fill"
        viewBox="0 0 16 16"
      >
        <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2m6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
      </svg>
    ),
    title: "Photo",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        fill="blue"
        class="bi bi-emoji-smile"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
      </svg>
    ),
    title: "Feeling",
  },
];
const PostPost = () => {
  return (
    <div className="bg-white rounded-2xl p-6 dark:text-black ">
      <div className="p-1 mb-2">
        <Avatar src={defaultLogo} size="3" />
        <span>
          <input
            className="p-3 bg-gray-300  w-[70%] ml-3 rounded-full placeholder:text-center "
            placeholder="Whats on your mind?"
          />
        </span>
      </div>
      <hr />
      <div className="flex justify-center gap-10 mt-3 ">
        {items.map((el) => (
          <div className="flex gap-2 items-center">
            <div>{el.icon}</div>
            <div>{el.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPost;
