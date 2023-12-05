/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const ChefRecCard = ({ data }) => {
  const { image, price, recipe, name } = data || {};
  return (
    <div>
      <div className="card w-96  bg-slate-100">
        <figure>
          <img src={image} className="w-full" alt="food" />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-center">{name}</h2>
          <p className="text-center">{recipe.slice(0, 80)}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefRecCard;
