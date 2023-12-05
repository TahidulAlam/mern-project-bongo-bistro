/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Ratings = ({ ratings, totalStars, onStarClick, TextSize }) => {
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    const starStyle = {
      color: i <= ratings ? "gold" : "gray",
    };

    stars.push(
      <label key={i}>
        <input
          type="radio"
          name="ratings"
          className="mask mask-star hidden"
          checked={i === ratings}
          onChange={() => onStarClick(i)}
        />
        <span
          className={TextSize}
          role="img"
          aria-label="star"
          style={starStyle}
        >
          ★
        </span>
      </label>
    );
  }
  return <div className="ratings">{stars}</div>;
};

export default Ratings;
