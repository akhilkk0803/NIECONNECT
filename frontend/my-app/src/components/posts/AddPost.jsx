import React, { useState } from "react";
import { url } from "../../url";
import { TrashIcon } from "@radix-ui/react-icons";
import { useToast } from "@chakra-ui/react";
import {token} from "../../getToken";
const AddPost = () => {
  const toast = useToast();
  const [post, setPost] = useState({
    caption: null,
    hashtag: null,
  });
  const [uploaded, setUploaded] = useState([]);
  const createToast = (title, desc, status) => {
    toast({
      title: title,
      description: desc,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!post.caption || !uploaded) {
      createToast(
        "Please enter all the details",
        "caption/images are missing",
        "error"
      );
      return;
    }
    await fetch(url + "post/new", {
      method: "POST",
      body: JSON.stringify({
        ...post,
        image: uploaded,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  };
  const handleImages = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    [...files].forEach((file) => formData.append("photos", file));
    console.log(formData);
    const res = await fetch(url + "post/upload/pic", {
      method: "POST",
      body: formData,
    });
    const file = await res.json();
    setUploaded((prev) => [...file, ...prev]);
  };
  const deleteHandler = async (img) => {
    await fetch(url + "post/pic", {
      method: "DELETE",
      body: JSON.stringify({ img }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setUploaded(uploaded.filter((curr) => img != curr));
  };
  const handleChange = (e) => {
    setPost((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <form>
      <input type="text" name="caption" onChange={handleChange} />
      <br />
      <input type="textarea" name="hashtag" onChange={handleChange} />
      <input type="file" multiple onChange={handleImages} />
      {/* priview */}

      {uploaded.length > 0 && (
        <div className="flex gap-3">
          {uploaded.map((el) => (
            <div className="relative">
              <img
                key={el}
                src={`${url}public/${el}`}
                className="w-32 rounded-2xl "
                alt=""
              />
              <TrashIcon
                className="absolute text-red-600 cursor-pointer right-0 bottom-0 bg-white"
                onClick={() => deleteHandler(el)}
              />
            </div>
          ))}
        </div>
      )}

      <button onClick={submitHandler}>submit</button>
    </form>
  );
};

export default AddPost;
