/* eslint-disable no-unused-vars */
import React from "react";
import { Carousel } from "react-responsive-carousel";
import ReviewCard from "./ReviewCard";
import useReview from "../../../hooks/useReview";
const Review = () => {
  const { reviewData, isLoading, error } = useReview();
  const review = reviewData?.data;
  return (
    <div className="w-2/3 mx-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Carousel dynamicHeight>
          {review?.map((dd) => (
            <ReviewCard key={dd._id} data={dd}></ReviewCard>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Review;
