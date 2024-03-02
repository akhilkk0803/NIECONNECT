import React, { useState } from "react";
import { url } from "../../url";
import { TrashIcon } from "@radix-ui/react-icons";
import { Input, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AddPost = () => {
  const toast = useToast();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user?.user?.username);
  const [post, setPost] = useState({
    caption: null,
    hashtag: null,
  });
  const [uploaded, setUploaded] = useState([]);
  const Rtoast = (title, desc, status) => {
    toast({
      title: title,
      description: desc,
      status: status,
      duration: 5000,
      isClosable: true,
      position: "top-left",
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!post.caption) {
      Rtoast(
        "Please enter all the details",
        "caption/images are missing",
        "error"
      );
      return;
    }
    if (uploaded.length === 0) {
      Rtoast("SELECT AT LEAST ONE IMAGE", "THE MORE THE BETTER", "error");
      return;
    }
    setLoading(true);
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
    setLoading(false);
    navigate("/profile/" + user);
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
    <div className="p-4 flex justify-center items-center w-full h-[70vh] ">
      <form className="flex flex-col gap-3  shadow-[ rgba(0, 0, 0, 0.24) 0px 3px 8px]">
        <h2 className="text-center">Create Post</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="caption">Caption</label>
          <Input
            type="text"
            name="caption"
            placeholder="Jane Doe"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="hashtag">HashTags</label>
          <Input
            type="textarea"
            name="hashtag"
            placeholder="#first #new"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="">Images</label>
          <Input type="file" multiple onChange={handleImages} />
        </div>
        {/* priview */}
        <div>
          {uploaded.length > 0 && (
            <div className="flex gap-3">
              {uploaded.map((el) => (
                <div className="relative">
                  <img
                    key={el}
                    src={`${el}`}
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
        </div>
        <div className="flex justify-center">
          <button
            onClick={submitHandler}
            className="button "
            disabled={loading}
          >
            {loading ? "Loading..." : "submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
