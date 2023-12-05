/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const MenuCard = ({ data }) => {
  const { image, price, recipe, name } = data || {};
  return (
    <div>
      <div data-aos="zoom-in">
        <div className="flex gap-5">
          <img className="w-32" src={image} alt="" />
          <div>
            <div className="flex justify-between">
              <h1 className="uppercase text-lg">{name}------------</h1>
              <p className="text-yellow-700">{price}</p>
            </div>
            <p className="text-slate-700 font-normal">{recipe}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
