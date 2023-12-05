/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

const ProductCard = ({ data }) => {
  const axiosPost = useAxios();
  const { user } = useAuth();
  const { refetch } = useCart();
  const { image, price, recipe, name, _id } = data || {};
  const handleBuyNow = async (_id) => {
    const productData = {
      image,
      price,
      name,
      email: user?.email,
      menuId: _id,
    };
    try {
      const response = await axiosPost.post("/api/bb/cart", productData);
      const result = response.data;
      if (result.acknowledged) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product add to cart successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        // refetch();
      } else {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "something wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div data-aos="zoom-in">
        <div className="card w-auto flex flex-col justify-between h-[350px] bg-base-100 shadow-xl">
          <figure>
            <img src={image} alt="food" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>
              Price : <span className="font-semibold">{price}</span>
            </p>
            <div className="card-actions justify-end">
              {user?.email ? (
                <button
                  className="btn btn-primary"
                  onClick={() => handleBuyNow(_id)}
                >
                  Order Now
                </button>
              ) : (
                <Link to={"/login"}>
                  <button className="btn btn-primary">Buy Now</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
