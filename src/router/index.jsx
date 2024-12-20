import { useRoutes } from "react-router-dom";
import Home from "@/pages/home/Home";
import Latest from "@/pages/latest/Latest";
import NotFound from "../pages/not-found/NotFound";
import Detail from "../pages/detail/Detai";
import Layout from "../pages/layout/Layout";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/latest",
          element: <Latest />,
        },
        {
          path: "/product/:id",
          element: <Detail />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
};
export default Router;
