import React from "react";
import Header from "../Components/Header";
import TitleBar from "../Components/TitleBar";
import Slider from "../Components/Slider";
import DealProd from "../Components/DealProd";
import PromoSession from "../Components/PromoSession";
import BntrProd from "../Components/BntrProd";
import Blogs from "../Components/Blogs/Blogs";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <TitleBar />
      <Slider />
      <DealProd />
      <PromoSession />
      <BntrProd />
      <Blogs />
      <Footer />
    </> 
  );
};

export default Home;
