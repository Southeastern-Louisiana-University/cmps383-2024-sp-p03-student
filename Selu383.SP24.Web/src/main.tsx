import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/home";
import Help from "./routes/help";
import MainLayout from "./routes/_layout";
import HotelDetails from "./routes/home/hotel-details";
import FindHotel from "./routes/home/FindHotel";
import Login from "./routes/home/Login";
import { CachePolicies, Provider } from "use-http";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [],
      },
      { path: "/find-hotel", element: <FindHotel /> },
      { path: "/login", element: <Login /> },
      { path: "/hotel-details/:foo", element: <HotelDetails /> },
      {
        path: "/help",
        element: <Help />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider options={{ cache: CachePolicies.NO_CACHE, cacheLife: 16 }}>
    <RouterProvider router={router} />
  </Provider>
);
