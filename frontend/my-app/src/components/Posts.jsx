import React from "react";
import PostPost from "./posts/PostPost";
import Masonry from "@mui/lab/Masonry";
import SinglePost from "./SinglePost";
// const post = [
//   {
//     image: [
//       "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=600",
//       "https://pics.craiyon.com/2023-06-20/7f9a15a54868484cb758093340ddb0e1.webp",
//       "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703894400&semt=sph",
//     ],
//     auth: {
//       name: "JANE",
//       dp: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
//     },
//     time: 4,
//     comment: [
//       {
//         sender: "Akhil KK",
//         message: "NICE PIC!",
//         src: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
//       },

//       {
//         sender: "Akhil KK",
//         message: "NICE PIC!",
//         src: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
//       },

//       {
//         sender: "Akhil KK",
//         message: "NICE PIC!",
//         src: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
//       },
//     ],
//     description:
//       "Beneath a starlit sky, whispers of the night echoed through ancient trees. Moonbeams danced on leaves, weaving tales in silver threads. Nature's nocturnal symphony serenaded the solitary wanderer, each step a silent ode to the mystical.",
//   },
//   {
//     image: [
//       "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=600",
//     ],
//     sender:
//       "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
//     name: "JANE",
//     time: 4,
//     comment: [
//       {
//         sender: "Akhil KK",
//         message: "NICE PIC!",
//         src: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
//       },
//       {
//         sender: "Akhil KK",
//         message: "NICE PIC!",
//         src: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
//       },
//     ],
//     description:
//       "Beneath a starlit sky, whispers of the night echoed through ancient trees. Moonbeams danced on leaves, weaving tales in silver threads. Nature's nocturnal symphony serenaded the solitary wanderer, each step a silent ode to the mystical.",
//   },
// ];
const Posts = ({ post }) => {
  return (
    <>
      {/* <PostPost /> */}
      {post.map((el) => (
        <SinglePost el={el} />
      ))}
    </>
  );
};

export default Posts;
