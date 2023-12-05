/* eslint-disable no-unused-vars */
import React from "react";
import fambanBg from "../../../assets/home/featured.jpg";
import famban from "../../../assets/home/featured.jpg";
// import Heading from "../../../components/Heading";
import "./index.css";
import Heading from "../../../components/shared/Heading";
const FeatureBan = () => {
  return (
    <div>
      <div className="parralax-bg h-[600px] bg-fixed hero-overlay w-[100%]">
        <div className=" z-10 mt-10 w-3/4 mx-auto">
          <div>
            <Heading subTitle={"Check it out"} mainTitle={"FROM OUR MENU"} />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <img src={famban} alt="" />
            </div>
            <div>
              <h1>March 20, 2023</h1>
              <p>WHERE CAN I GET SOME?</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                voluptate facere, deserunt dolores maiores quod nobis quas
                quasi. Eaque repellat recusandae ad laudantium tempore
                consequatur consequuntur omnis ullam maxime tenetur.
              </p>
              <button className="btn bg-transparent border-x-0 border-t-0 border-b-2 border-b-black">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureBan;
