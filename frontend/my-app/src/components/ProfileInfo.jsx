import React, { useState } from "react";
import { url } from "../url";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
const ProfileInfo = ({ socials }) => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <div className="flex justify-center gap-5 items-center">
        <div className="flex flex-col items-center">
          <h5> {socials.posts.length}</h5>
          <p className="dark:text-slate-300">Posts</p>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer "
          onClick={() => {
            onOpen();
            setType("Followers");

            setData(socials.followers);
          }}
        >
          <div> {socials.followers.length}</div>
          <p className="dark:text-slate-300">Followers</p>
        </div>
        <div
          className="flex flex-col cursor-pointer  items-center "
          onClick={() => {
            onOpen();
            setType("Following");
            setData(socials.following);
          }}
        >
          <div> {socials.following.length}</div>
          <p className="dark:text-slate-300">Following</p>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInRight"
        size="md"
      >
        <ModalOverlay />
        <ModalContent>
          <div className=" border-2 border-slate-700 rounded-md">
            <ModalHeader className="bg-black text-slate-100">
              {type}
            </ModalHeader>
            <ModalCloseButton
              style={{
                backgroundColor: "rgb(226 232 240)",
              }}
            />
            <div className="flex flex-col gap-1 bg-black p-4">
              {data.map((el) => (
                <div>
                  <NavLink to={"/profile/" + el.username} onClick={onClose}>
                    <div
                      className="flex bg-slate-900 p-4 hover:bg-slate-950
                    rounded-lg
                    "
                    >
                      <Avatar
                        src={url + "public/dp/" + el.dp}
                        size="md"
                        className="mx-4 border-2 border-red-300"
                      />
                      <div>
                        <p className=" text-slate-300 mb-1"> {el.username}</p>
                        <p className="text-slate-400">{el.name}</p>
                      </div>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileInfo;
