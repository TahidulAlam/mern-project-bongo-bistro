/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from "react";
import Heading from "../../../components/shared/Heading";

import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdSystemUpdateAlt } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const ManageItems = () => {
  const { menuData, isLoading, error, refetch } = useMenu();
  const axiosDelete = useAxiosSecure();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosDelete.delete(`/api/bb/menu/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleUpdate = (id) => {
    console.log(id);
  };
  return (
    <div>
      <Heading mainTitle={"MANAGE ALL ITEMS"} subTitle={"Hurry Up"} />
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold p-5 w-2/5">
          Total items: {menuData?.length}
        </h1>
        <div className=" w-3/5">
          <form className="flex items-center">
            <label for="voice-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-100 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 21 21"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="voice-search"
                className="bg-gray-50 text-black border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="Search Mockups, Logos, Design Templates..."
                required
              ></input>
              <button
                type="button"
                className="absolute inset-y-0 end-0 flex items-center pe-3"
              >
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
                  />
                </svg>
              </button>
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-amber-300">
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {menuData?.map((dd, index) => (
              <tr key={dd._id} className="w-full">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={dd?.image} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{dd?.name}</div>
                      <div className="text-sm opacity-50">{dd?.category}</div>
                    </div>
                  </div>
                </td>
                <td>{dd?.price}</td>
                <th>
                  <Link to={`/dashboard/updateItem/${dd._id}`}>
                    <button
                      className="btn text-lg bg-red-500 text-white hover:text-black"
                      onClick={() => handleUpdate(dd._id)}
                    >
                      <MdSystemUpdateAlt />
                    </button>
                  </Link>
                </th>
                <th>
                  <button
                    className="btn text-lg bg-red-500 text-white hover:text-black"
                    onClick={() => handleDelete(dd._id)}
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
