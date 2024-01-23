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
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

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
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
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
