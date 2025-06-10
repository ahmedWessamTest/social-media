import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
import { CommentProvider } from "./contexts/commentContext";
import BlankLayout from "./layouts/blank-layout/blankLayout";
import { PostsProvider } from "./contexts/postsContext";
import UserProfile from "./pages/userProfile/userProfile";
import Register from "./pages/Register/Register";
import SignIn from "./pages/Sign in/SignIn";
import NotFound from "./pages/NotFount/NotFound"

const router = createBrowserRouter([
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "*", // ✅ Catch-all route inside layout
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*", // ✅ Catch-all route outside layout (e.g. /random-url)
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
