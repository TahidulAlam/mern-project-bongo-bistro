/* eslint-disable no-unused-vars */
import React from "react";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";
const useReview = () => {
  const axiosInstance = useAxios();
  const getReview = async () => {
    const url = "/api/bb/reviews";
    const res = axiosInstance.get(url);
    return res;
  };
  const {
    data: reviewData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviewData"],
    queryFn: getReview,
  });
  return { reviewData, isLoading, error };
};

export default useReview;
