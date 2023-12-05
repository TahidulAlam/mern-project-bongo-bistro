/* eslint-disable no-unused-vars */
import React from "react";
import ban from "../../../assets/home/banner.jpg";
import Container from "../../../components/shared/Container";
const AboutHome = () => {
  return (
    <Container>
      <div className="relative">
        <img className="object-cover h-[550px] w-[100%]" src={ban} alt="" />
        <div className="bg-white text-center flex flex-col justify-center items-center absolute top-1/4 p-20 w-4/5 mx-auto left-0 right-0">
          <h1 className="text-3xl p-2 uppercase">Bongo Binstro</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, libero accusamus laborum deserunt ratione dolor
            officiis praesentium! Deserunt magni aperiam dolor eius dolore at,
            nihil iusto ducimus incidunt quibusdam nemo.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default AboutHome;
