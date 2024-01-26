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
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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

  const handleSearchFocus = (focusedState) => {
    setIsSearchFocused(focusedState);
  };
  return (
    <main
      className={`overlay ${
        isSearchFocused
          ? "bg-[rgba(0,0,0,0.2)] transition-all duration-700 ease-in"
          : ""
      }`}
    >
      <Header onSearchFocus={handleSearchFocus} />
      <TitleBar
        onTitleClick={handleTitleClick}
        isSearchFocused={isSearchFocused}
      />
      <Slider isSearchFocused={isSearchFocused} />
      <DealProd isSearchFocused={isSearchFocused} />
      <BntrProd isSearchFocused={isSearchFocused} />
      <div ref={blogRef}>
        <Blogs isSearchFocused={isSearchFocused} />
      </div>
      <Footer isSearchFocused={isSearchFocused} />
    </main>
  );
};

export default Home;
