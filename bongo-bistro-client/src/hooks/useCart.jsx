/* eslint-disable no-unused-vars */
import React from "react";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useCart = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const getData = async () => {
    const url = `/api/bb/cart/?email=${user?.email}`;
    const res = await axiosInstance.get(url);
    return res.data;
  };
  const {
    data: cartData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cartData", user?.email],
    queryFn: getData,
  });
  return { cartData, isLoading, error, refetch };
};

export default useCart;
