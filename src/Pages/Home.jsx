import React, { useRef, useState } from "react";
import Header from "../Components/Header";
import TitleBar from "../Components/TitleBar";
import Slider from "../Components/Slider";
import DealProd from "../Components/DealProd";
// import PromoSession from "../Components/PromoSession";
import BntrProd from "../Components/BntrProd";
import Blogs from "../Components/Blogs/Blogs";
import Footer from "../Components/Footer";

const Home = () => {
  const blogRef = useRef(null);

  const handleTitleClick = (title) => {
    switch (title) {
      case "Blogs":
        blogRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Header setIsSearchFocused={setIsSearchFocused} />
      <TitleBar onTitleClick={handleTitleClick} />
      <Slider />
      <DealProd />
      {/* <PromoSession /> */}
      <BntrProd />
      <div ref={blogRef}>
        <Blogs />
      </div>

      <Footer />
    </>
  );
};

export default Home;
