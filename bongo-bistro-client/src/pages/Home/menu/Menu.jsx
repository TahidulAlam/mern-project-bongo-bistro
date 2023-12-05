/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuCard from "./MenuCard";
import useMenu from "../../../hooks/useMenu";
const Menu = ({ categorykey }) => {
  const { menuData, isLoading } = useMenu();
  let menuCardData;
  // const menuData = menuData?.data;
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (Array.isArray(menuData)) {
    if (categorykey) {
      menuCardData = menuData.filter((dd) => dd.category === `${categorykey}`);
    } else {
      menuCardData = menuData;
    }
  }
  return (
    <div>
      <div className="grid grid-cols-2 gap-10">
        {menuCardData?.slice(0, 4)?.map((dd) => (
          <MenuCard key={dd._id} data={dd}></MenuCard>
        ))}
      </div>
      <div className="text-center p-5">
        <Link to={`/ourShop/${categorykey}`}>
          <button className="btn border-b-2 border-b-black">
            {" "}
            View full Menu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
