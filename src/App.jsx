import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/home";
import { CommentProvider } from "./contexts/commentContext";
import BlankLayout from "./layouts/blank-layout/blankLayout";
import { PostsProvider } from "./contexts/postsContext";
import Register from "./pages/Register/Register";
import SignIn from "./pages/Sign in/SignIn";
import NotFound from "./pages/NotFount/NotFound";
import UserProfile from "./pages/userProfile/userProfile";

const router = createHashRouter([
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      {
        path:"/",
        element: <Home />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <PostsProvider>
      <CommentProvider>
        <RouterProvider router={router} />
      </CommentProvider>
    </PostsProvider>
  );
}

export default App;
