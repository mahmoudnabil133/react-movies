import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
// import Posts from "./pages/Posts";
// import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage.jsx"
import SignupPage from "./pages/SignupPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path:"login",
        element: <LoginPage/>,
      },
      {
        path:"signup",
        element: <SignupPage/>,
      },
    //   {
    //     path: "posts",
    //     element: <Posts />,
    //     loader: async () => {
    //       const res = await fetch("/api/posts");
    //       return res.json();
    //     },
    //   },
    //   {
    //     path: "posts/:postId",
    //     element: <Post />,
    //     loader: async ({ params }) => {
    //       const res = await fetch(`/api/posts/${params.postId}`);
    //       return res.json();
    //     },
    //   },
    ],
  },
]);

export default router;