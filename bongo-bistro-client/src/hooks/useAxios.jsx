/* eslint-disable no-unused-vars */
import axios from "axios";
const axiosInstance = axios.create({
  //   baseURL: "https://booknin-server.vercel.app",
  baseURL: "http://localhost:5000",
  // withCredentials: true,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
