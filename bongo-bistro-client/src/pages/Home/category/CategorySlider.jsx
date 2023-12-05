/* eslint-disable no-unused-vars */
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";
import slide from "../../../assets/home/slide1.jpg";
import slide1 from "../../../assets/home/slide2.jpg";
import slide2 from "../../../assets/home/slide3.jpg";
import slide3 from "../../../assets/home/slide4.jpg";
import slide4 from "../../../assets/home/slide5.jpg";
// import required modules
import { Pagination } from "swiper/modules";
const CategorySlider = () => {
  return (
    <div>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            className="rounded-lg border-4 hover:border-red-500"
            src={slide}
            alt=""
          />
          <p className="text-4xl -mt-10 font-thin text-center">Salad</p>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded-lg border-4 hover:border-red-500"
            src={slide1}
            alt=""
          />
          <p className="text-4xl -mt-10 font-thin text-center">Salad</p>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded-lg border-4 hover:border-red-500"
            src={slide2}
            alt=""
          />
          <p className="text-4xl -mt-10 font-thin text-center">Salad</p>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded-lg border-4 hover:border-red-500"
            src={slide3}
            alt=""
          />
          <p className="text-4xl -mt-10 font-thin text-center">Salad</p>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded-lg border-4 hover:border-red-500"
            src={slide4}
            alt=""
          />
          <p className="text-4xl -mt-10 font-thin text-center">Salad</p>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CategorySlider;
