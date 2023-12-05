/* eslint-disable no-unused-vars */
import React from "react";
import { FaUsers } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
const AllUsers = () => {
  const Axios = useAxiosSecure();
  const { data: usersData = [], refetch } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const res = await Axios.get("/api/bb/users");
      return res.data;
    },
  });
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
        Axios.delete(`/api/bb/users/${id}`).then((res) => {
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
  const handleRule = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.patch(`/api/bb/users/admin/${user._id}`).then((res) => {
          if (res.data.acknowledged) {
            refetch();
            Swal.fire({
              //   title: "Deleted!",
              text: `${user.name} is Admin now`,
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  {/* <input type="checkbox" className="checkbox" /> */}
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.map((user, index) => (
              <tr key={user._id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    {/* <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src="" alt="Avatar" />
                      </div>
                    </div> */}
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <h1 className="font-bold">Admin</h1>
                  ) : (
                    <button
                      className="btn bg-red-500 text-2xl text-white hover:text-black"
                      onClick={() => handleRule(user)}
                    >
                      <FaUsers />
                    </button>
                  )}
                </td>
                <th>
                  <button
                    className="btn text-lg bg-red-500 text-white hover:text-black"
                    onClick={() => handleDelete(user._id)}
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

export default AllUsers;
