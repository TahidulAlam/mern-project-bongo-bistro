/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Parallax, Background } from "react-parallax";

const MenuCover = ({ bgImg, content, contentTitle }) => {
  return (
    <div>
      <Parallax bgImage={bgImg} strength={500}>
        <div className="h-[500px] object-cover w-full">
          <div className="absolute hero-overlay w-2/4 h-1/2 mx-auto top-1/3 left-1/4 flex flex-col items-center justify-center">
            <div className="text-5xl text-white uppercase text-center">
              {contentTitle}
            </div>
            {content}
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default MenuCover;
