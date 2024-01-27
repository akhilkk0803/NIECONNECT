import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Avatar, Button, Flex, Popover, TextArea } from "@radix-ui/themes";
import React from "react";
import { useState } from "react";
import { url } from "../url";
import { token } from "../getToken";
import Likes from "./Likes";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import defaultLogo from "../imgs/Default_pfp.svg.png";

const PostAction = ({ el, addComment, len }) => {
  const toast = useToast();
  const id = useSelector((state) => state.user?.user?._id);
  const dp = useSelector((state) => state.user?.user?.dp);
  console.log(id);
  //const id = "659ea669191d7a4537fa7c94";
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(el.Likes);
  const [likeState, setLikeState] = useState(
    !el.Likes.filter((el) => el === id).length > 0
  );
  const likehandler = async () => {
    try {
      if (!id) {
        throw new Error("LOGIN IN TO LIKE");
      }
      const res = await fetch(
        url + "post/like?like=" + likeState + "&postId=" + el._id,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await res.json();
      setLikes(data.Likes);
      setLikeState((prev) => !prev);
    } catch (error) {
      return toast({
        title: error.message,
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  const submitComment = async () => {
    try {
      if (!id) {
        throw new Error("LOGIN IN TO COMMENT");
      }
      if (comment.trim().length === 0) {
        throw new Error("INVALID COMMENT");
      }
      const res = await fetch(url + "post/comment", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: comment, postId: el._id }),
      });
      const post = await res.json();
      addComment(post);
    } catch (error) {
      return toast({
        title: error.message,
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  return (
    <>
      <Likes likes={likes} likehandler={likehandler} likeState={!likeState} />
      <div className="flex gap-2  items-center">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="blue"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
            fill="blue"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span>{len}</span>
      </div>

      <div>
        <Popover.Root>
          <Popover.Trigger>
            <Button className="button">
              <ChatBubbleIcon width="16" height="16" />
              Comment
            </Button>
          </Popover.Trigger>
          <Popover.Content style={{ width: 360 }}>
            <div className="flex gap-3">
              <Avatar size="2" src={dp ? dp : defaultLogo} radius="full" />
              <div>
                <TextArea
                  placeholder="Write a comment…"
                  style={{ height: 80 }}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Flex gap="3" mt="3" justify="between">
                  <Popover.Close>
                    <Button className="button" onClick={submitComment}>
                      Comment
                    </Button>
                  </Popover.Close>
                </Flex>
              </div>
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>
    </>
  );
};

export default PostAction;
