/* eslint-disable no-unused-vars */
import React from "react";
import useMenu from "../../../hooks/useMenu";
import ChefRecCard from "./ChefRecCard";

const ChefRec = () => {
  const menuData = useMenu();
  // const filteredMenuData = menuData.filter((dd) => dd.category === "offered");
  // const menuCardData = filteredMenuData.slice(0, 3);
  return (
    <div>
      <div className="grid grid-cols-3 gap-10 ">
        {/* {menuCardData.map((dd) => (
          <ChefRecCard key={dd._id} data={dd}></ChefRecCard>
        ))} */}
      </div>
    </div>
  );
};

export default ChefRec;
