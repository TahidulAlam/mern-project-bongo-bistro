/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../components/headers/Navbar";
import { Outlet } from "react-router-dom";
import Footers from "../components/footers/Footers";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const MainLayouts = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <Outlet></Outlet>
        </div>
        <div className="mt-auto">
          <Footers></Footers>
        </div>
      </div>
    </div>
  );
};

export default MainLayouts;
