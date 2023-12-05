/* eslint-disable no-unused-vars */
import React from "react";
import Heading from "../../../components/shared/Heading";
import useCart from "../../../hooks/useCart";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cartData, isLoading, error, refetch } = useCart();
  const axiosDelete = useAxios();
  const totalPrice = cartData.reduce((x, y) => x + y.price, 0);
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
        axiosDelete.delete(`/api/bb/cart/${id}`).then((res) => {
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
  return (
    <div>
      <Heading mainTitle={"MANAGE ALL ITEMS"} subTitle={"Hurry Up"} />
      <div className="flex justify-between items-center w-11/12 mx-auto">
        <h1 className="text-4xl font-semibold p-5">
          Total items: {cartData?.length}
        </h1>
        <h1 className="text-4xl font-semibold p-5">Total Cost: {totalPrice}</h1>
        {cartData.length > 0 ? (
          <Link to={"/dashboard/payment"}>
            <button className="btn btn-neutral text-base font-semibold">
              Pay Now
            </button>
          </Link>
        ) : (
          <Link>
            <button
              disabled
              className="btn btn-neutral text-base font-semibold"
            >
              Pay Now
            </button>
          </Link>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-amber-300">
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartData?.map((dd, index) => (
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
                      <div className="text-sm opacity-50">{dd?.name}</div>
                    </div>
                  </div>
                </td>
                <td>{dd?.price}</td>
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

export default Cart;
