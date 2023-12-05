/* eslint-disable no-unused-vars */
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";
const useMenu = () => {
  const axiosInstance = useAxios();
  const getData = async () => {
    const url = "/api/bb/menu";
    const res = await axiosInstance.get(url);
    return res.data;
  };
  const {
    data: menuData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allmenuData"],
    queryFn: getData,
  });
  return { menuData, isLoading, error, refetch };
};

export default useMenu;
