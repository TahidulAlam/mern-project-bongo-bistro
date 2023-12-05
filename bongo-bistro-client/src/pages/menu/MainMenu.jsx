/* eslint-disable no-unused-vars */
import React from "react";
// import MenuCover from "../../components/shared/MenuCover";
import bgImgban from "../../assets/menu/banner3.jpg";
import Container from "../../components/shared/Container";

import Heading from "../../components/shared/Heading";
import Menu from "../Home/menu/Menu";
import MenuCover from "../../components/shared/MenuCover";
const MainMenu = () => {
  const content = (
    <>
      <div>
        <p className="text-center text-white uppercase">
          Would you like to try a dish?
        </p>
      </div>
    </>
  );
  return (
    <div>
      <Container>
        <MenuCover
          bgImg={bgImgban}
          content={content}
          contentTitle={"FROM OUR MENU"}
        />
        <div className="mt-20">
          <Heading mainTitle={"FROM OUR MENU"} subTitle={"Check it out"} />
          <Menu categorykey={"popular"} />
        </div>
      </Container>
      <Container>
        <MenuCover bgImg={bgImgban} content={content} contentTitle={"SALAD"} />
        <div className="mt-20">
          <Heading mainTitle={"SALAD"} subTitle={"Check it out"} />
          <Menu categorykey={"salad"} />
        </div>
      </Container>
      <Container>
        <MenuCover
          bgImg={bgImgban}
          content={content}
          contentTitle={"DESSART"}
        />
        <div className="mt-20">
          <Heading mainTitle={"DESSART"} subTitle={"Check it out"} />
          <Menu categorykey={"dessert"} />
        </div>
      </Container>
      <Container>
        <MenuCover bgImg={bgImgban} content={content} contentTitle={"SOUP"} />
        <div className="mt-20">
          <Heading mainTitle={"SOUP"} subTitle={"Check it out"} />
          <Menu categorykey={"soup"} />
        </div>
      </Container>
    </div>
  );
};

export default MainMenu;
