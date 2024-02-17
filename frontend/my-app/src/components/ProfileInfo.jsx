import React from "react";
const ProfileInfo = ({ socials }) => {
  return (
    <div>
      <div className="flex justify-center gap-5 items-center">
        <div className="flex flex-col items-center">
          <h5> {socials.posts.length}</h5>
          <p className="dark:text-slate-300">Posts</p>
        </div>
        <div className="flex flex-col items-center ">
          <div> {socials.followers.length}</div>
          <p className="dark:text-slate-300">Followers</p>
        </div>
        <div className="flex flex-col  items-center">
          <div> {socials.following.length}</div>
          <p className="dark:text-slate-300">Following</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
