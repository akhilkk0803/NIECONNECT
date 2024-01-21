import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Profile from "./components/Profile";
import Home from "./components/Home";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Dept from "./components/Dept";
import Clubs from "./components/Clubs";
import AddPost from "./components/posts/AddPost";
import Error from "./Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <Error />,
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "profile/:username",
          element: <Profile />,
        },
        {
          path: "dept",
          element: <Dept />,
        },
        {
          path: "clubs",
          element: <Clubs />,
        },
        {
          path: "post/new",
          element: <AddPost />,
        },
      ],
    },
  ]);
  return (
    <Theme>
      <RouterProvider router={router}></RouterProvider>
    </Theme>
  );
}

export default App;
