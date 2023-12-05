/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Ratings from "../../../components/shared/Ratings";

const ReviewCard = ({ data }) => {
  const { rating, name, details } = data || {};
  return (
    <div>
      <div className="p-20 flex flex-col gap-10">
        <Ratings ratings={rating} totalStars={5} TextSize={"text-5xl"} />
        <p>{details}</p>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
