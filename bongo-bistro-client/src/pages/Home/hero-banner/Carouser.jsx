/* eslint-disable no-unused-vars */
import React from "react";
import { Carousel } from "react-responsive-carousel";
import ban1 from "../../../assets/home/01.jpg";
import ban2 from "../../../assets/home/02.jpg";
import ban3 from "../../../assets/home/03.png";
import ban4 from "../../../assets/home/04.jpg";

import "./index.css";
const Carouser = () => {
  return (
    <div>
      <Carousel showArrows={true} showThumbs={true}>
        <div>
          <img alt="" src={ban1} />
        </div>
        <div>
          <img alt="" src={ban2} />
        </div>
        <div>
          <img alt="" src={ban3} />
        </div>
        <div>
          <img alt="" src={ban4} />
        </div>
      </Carousel>
    </div>
  );
};

export default Carouser;
