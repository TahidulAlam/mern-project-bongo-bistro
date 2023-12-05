/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Heading = ({ mainTitle, subTitle }) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-center text-yellow-500 font-light">
        ---{subTitle}---
      </h1>
      <h1 className="text-center font-base text-3xl border-t-yellow-900 border-y m-4 p-5 border-b-yellow-900 w-1/3 border-opacity-50">
        {mainTitle}
      </h1>
    </div>
  );
};

export default Heading;
