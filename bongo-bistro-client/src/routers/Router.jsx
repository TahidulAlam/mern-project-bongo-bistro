/* eslint-disable no-unused-vars */
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home/Home";
import MainMenu from "../pages/menu/MainMenu";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import OurShop from "../pages/ourShop/OurShop";
import Contact from "../pages/Home/contact/Contact";
import Dashboard from "../pages/dashboard/Dashboard";
import Cart from "../pages/dashboard/userDashBoard/Cart";
import Reservation from "../pages/dashboard/userDashBoard/Reservation";
import PaymentHistory from "../pages/dashboard/userDashBoard/PaymentHistory";
import AddReview from "../pages/dashboard/userDashBoard/AddReview";
import UserHome from "../pages/dashboard/userDashBoard/UserHome";
import Mybooking from "../pages/dashboard/userDashBoard/Mybooking";
import AdminHome from "../pages/dashboard/adminDashBoard/AdminHome";
import AddItems from "../pages/dashboard/adminDashBoard/AddItems";
import ManageItems from "../pages/dashboard/adminDashBoard/ManageItems";
import ManageBookings from "../pages/dashboard/adminDashBoard/ManageBookings";
import AllUsers from "../pages/dashboard/adminDashBoard/AllUsers";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import UpdateItems from "../pages/dashboard/adminDashBoard/UpdateItems";
import PayMent from "../pages/dashboard/userDashBoard/PayMent";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <MainMenu></MainMenu>,
      },
      {
        path: "/ourShop/:category",
        element: <OurShop></OurShop>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
    ],
  },
  { path: "/login", element: <Login></Login> },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // User dash board route
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>,
          </PrivateRoute>
        ),
      },
      {
        path: "reservation",
        element: (
          <PrivateRoute>
            <Reservation></Reservation>,
          </PrivateRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>,
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <PayMent></PayMent>,
          </PrivateRoute>
        ),
      },
      {
        path: "addReview",
        element: (
          <PrivateRoute>
            <AddReview></AddReview>,
          </PrivateRoute>
        ),
      },
      {
        path: "userHome",
        element: (
          <PrivateRoute>
            <UserHome></UserHome>,
          </PrivateRoute>
        ),
      },
      {
        path: "mybooking",
        element: (
          <PrivateRoute>
            <Mybooking></Mybooking>,
          </PrivateRoute>
        ),
      },
      // Admin DashBoard
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>,
          </AdminRoute>
        ),
      },
      {
        path: "addItems",
        element: (
          <AdminRoute>
            <AddItems></AddItems>,
          </AdminRoute>
        ),
      },
      {
        path: "manageItems",
        element: (
          <AdminRoute>
            <ManageItems></ManageItems>,
          </AdminRoute>
        ),
      },
      {
        path: "updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItems></UpdateItems>,
          </AdminRoute>
        ),
        loader: async ({ params }) => {
          const Data = await fetch(
            `http://localhost:5000/api/bb/menu/${params.id}`
          );
          return Data;
        },
      },
      {
        path: "manageBookings",
        element: (
          <AdminRoute>
            <ManageBookings></ManageBookings>,
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>,
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default Router;
