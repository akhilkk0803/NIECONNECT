import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Avatar, Button, Flex, Popover, TextArea } from "@radix-ui/themes";
import React from "react";
import { useState } from "react";
import { url } from "../url";
import { token } from "../getToken";

const PostAction = ({ el }) => {
  const [comment, setComment] = useState("");
  const submitComment = () => {
    fetch(url + "post/comment", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: comment, postId: el._id }),
    })
      .then((res) => res.json())
      .then((post) => console.log(post));
  };
  return (
    <>
      <div className="flex items-center gap-2  ">
        {" "}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
            fill="red"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span>{el.Likes.length}</span>
      </div>
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
        <span>{el.comments.length}</span>
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
              <Avatar
                size="2"
                src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                fallback="A"
                radius="full"
              />
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
