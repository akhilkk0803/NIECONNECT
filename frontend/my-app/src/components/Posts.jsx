import React from "react";
import PostPost from "./posts/PostPost";
import Masonry from "@mui/lab/Masonry";
import SinglePost from "./SinglePost";

const Posts = ({ post, setUserData, userData }) => {
  return (
    <>
      {/* <PostPost /> */}
      {post.map((el) => (
        <SinglePost
          el={el}
          key={el._id}
          setUserData={setUserData}
          userData={userData}
        />
      ))}
    </>
  );
};

export default Posts;
