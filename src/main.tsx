import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Product from "./components/Product.tsx";
import Products from "./components/Products.tsx";
import HomePage from "./components/HomePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/Products/:name",
        element: <Products />,
      },
      {
        path: "/Product/:id",
        element: <Product />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
