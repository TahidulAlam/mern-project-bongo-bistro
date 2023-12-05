/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import useMenu from "../../hooks/useMenu";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
const Shop = ({ categorykey }) => {
  const { menuData, isLoading } = useMenu();
  let menuCardData;
  // const menuData = menuData?.data;
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (Array.isArray(menuData)) {
    if (categorykey) {
      menuCardData = menuData.filter((dd) => dd.category === `${categorykey}`);
    } else {
      menuCardData = menuData;
    }
  }
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <div>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="grid grid-cols-4 gap-5 mb-10">
            {menuCardData?.map((dd) => (
              <ProductCard key={dd._id} data={dd} />
            ))}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Shop;
