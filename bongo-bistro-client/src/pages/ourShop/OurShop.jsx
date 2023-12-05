/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import MenuCover from "../../components/shared/MenuCover";
import bgImgban from "../../assets/home/banner.jpg";
// import Container from "../../components/shared/Container";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Menu from "../Home/menu/Menu";
import MenuCover from "../../components/shared/MenuCover";
import Container from "../../components/shared/Container";
import ProductCard from "./ProductCard";
import useMenu from "../../hooks/useMenu";
import Shop from "./Shop";
import { useParams } from "react-router-dom";

// MenuCover
// Container
const OurShop = () => {
  const { category } = useParams();

  const tabList = ["popular", "salad", "pizza", "soup", "dessert", "drinks"];
  const initialIndex = tabList.indexOf(category);

  const [tabIndex, setTabIndex] = useState(initialIndex);
  const capital = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  const content = (
    <>
      <div className="flex flex-col justify-center items-center p-20 gap-5">
        <h1 className="text-5xl text-white uppercase text-center">Our Menu</h1>
        <p className="text-center text-white uppercase">
          Would you like to try a dish?
        </p>
      </div>
    </>
  );
  return (
    <div>
      <Container>
        <MenuCover bgImg={bgImgban} content={content} />
      </Container>
      <Container>
        <Tabs
          defaultIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
          className={"flex justify-center items-center flex-col mt-5"}
        >
          <TabList>
            {tabList.map((tl, index) => (
              <Tab key={index}>{capital(tl)}</Tab>
            ))}
          </TabList>

          {tabList.map((tl, index) => (
            <TabPanel key={index}>
              <div className="py-10">
                <Shop categorykey={tl} />
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </Container>
    </div>
  );
};

export default OurShop;
