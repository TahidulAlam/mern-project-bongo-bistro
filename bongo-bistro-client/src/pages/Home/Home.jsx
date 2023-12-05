/* eslint-disable no-unused-vars */
import React from "react";

import Carouser from "./hero-banner/Carouser";
import CategorySlider from "./category/CategorySlider";
import Heading from "../../components/shared/Heading";
import AboutHome from "./aboutHome/AboutHome";
import Menu from "./menu/Menu";
import CallUs from "./menu/callus/CallUs";
import ChefRec from "./chefRec.jsx/ChefRec";
import FeatureBan from "./fambanner/FeatureBan";
import Review from "./review/Review";
import { Helmet } from "react-helmet-async";
import Container from "../../components/shared/Container";
const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bongo Bistros</title>
      </Helmet>

      <Container>
        <div data-aos="fade-up">
          <Carouser />
        </div>
      </Container>

      <Container>
        <div data-aos="fade-up">
          <div className="mt-20">
            <Heading
              mainTitle={"ORDER ONLINE"}
              subTitle={"From 11:00am to 10:00pm"}
            />
            <CategorySlider />
          </div>
        </div>
      </Container>

      <Container>
        <div data-aos="fade-up">
          <div className="mt-20">
            <AboutHome />
          </div>
        </div>
      </Container>

      <Container>
        <div data-aos="fade-up">
          <div className="mt-20">
            <Heading mainTitle={"FROM OUR MENU"} subTitle={"Check it out"} />
            <Menu categorykey={"popular"} />
          </div>
        </div>
      </Container>

      <Container>
        <div data-aos="fade-up">
          <div className="mt-20">
            <CallUs />
          </div>
        </div>
      </Container>

      <Container>
        <div data-aos="fade-up">
          <div className="mt-20">
            <Heading mainTitle={"CHEF RECOMMENDS"} subTitle={"Should Try"} />
            <ChefRec />
          </div>
        </div>
      </Container>
      <div data-aos="fade-up">
        <div className="mt-20">
          <FeatureBan />
        </div>
      </div>
      <Container>
        <div className="mt-20">
          <Heading
            mainTitle={"TESTIMONIALS"}
            subTitle={"What Our Clients Say"}
          />
          <div data-aos="fade-up">
            <Review />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
