import React, { useState } from "react";
import {
  Home,
  ShoppingBag,
  Pages,
  RateReview,
  Info,
  Widgets,
  Man,
  Woman,
  ArrowDropDown,
  ArrowRightSharp,
  Favorite,
  ShoppingCart,
  Diamond,
} from "@mui/icons-material";

const Drawer = ({ onClose }) => {
  const [hoverState, setHoverState] = useState({
    home: false,
    shop: false,
    page: false,
    blogs: false,
    about: false,
    favorite: false,
    cart: false,
    categories: false,
    man: false,
    woman: false,
    treasure: false,
  });

  const handleMouseEnter = (btnName) => {
    setHoverState((prevState) => ({
      ...prevState,
      [btnName]: true,
    }));
  };

  const handleMouseLeave = (btnName) => {
    setHoverState((prevState) => ({
      ...prevState,
      [btnName]: false,
    }));
  };

  const [showForMenAndWomen, setShowForMenAndWomen] = useState(false);
  const handleCategories = () => {
    setShowForMenAndWomen((prev) => !prev);
  };

  return (
    <div
      className={`absolute inset-0 -left-4 -top-4 ${
        showForMenAndWomen ? "h-[125vh]" : "h-[100vh]"
      } w-72 bg-slate-300 shadow-lg 
    z-10 `}
    >
      <div className="flex-col flex justify-center items-center ">
        <div className="relative w-full h-32 bg-gradient-to-br from-neutral-300 to-header shadow-header shadow-md">
          <div className="absolute -bottom-8 left-24 w-16 h-16 bg-header shadow-black shadow-sm rounded-full flex justify-center items-center">
            <h1 className="font-fontbody text-3xl">P</h1>
          </div>
        </div>
        <div className="space-y-4 mt-14 w-10/12">
          <div className="">
            <button
              className="hover:bg-header rounded-xl hover:shadow-white shadow-md
                          w-full py-1.5 flex items-center transition-all duration-200 ease-linear"
              onMouseEnter={() => handleMouseEnter("home")}
              onMouseLeave={() => handleMouseLeave("home")}
            >
              <Home
                className="ml-8"
                style={{ color: hoverState.home ? "white" : "#6C4639" }}
              />
              <text
                className={`font-fontbody text-lg ml-1.5 text-${
                  hoverState.home ? "white" : "comTxt"
                }`}
              >
                Home
              </text>
              <ArrowRightSharp
                style={{
                  width: "30px",
                  height: "30px",
                  marginLeft: "40%",
                  color: hoverState.home ? "white" : "#6C4639",
                }}
              />
            </button>
          </div>
          <div className="">
            <button
              onMouseEnter={() => handleMouseEnter("shop")}
              onMouseLeave={() => handleMouseLeave("shop")}
              className="hover:bg-header rounded-xl hover:shadow-white shadow-md  
                               w-full py-1.5 flex items-center transition-all duration-200 ease-linear"
            >
              <ShoppingBag
                className="ml-8"
                style={{ color: hoverState.shop ? "white" : "#6C4639" }}
              />
              <text
                className={`font-fontbody text-lg ml-1.5 text-${
                  hoverState.shop ? "white" : "comTxt"
                }`}
              >
                Shop
              </text>
              <ArrowRightSharp
                style={{
                  width: "30px",
                  height: "30px",
                  marginLeft: "43%",
                  color: hoverState.shop ? "white" : "#6C4639",
                }}
              />
            </button>
          </div>
          <div className="">
            <button
              onMouseEnter={() => handleMouseEnter("page")}
              onMouseLeave={() => handleMouseLeave("page")}
              className="hover:bg-header rounded-xl hover:shadow-white shadow-md
                               w-full py-1.5 flex items-center transition-all duration-200 ease-linear"
            >
              <Pages
                className="ml-8"
                style={{ color: hoverState.page ? "white" : "#6C4639" }}
              />
              <text
                className={`font-fontbody text-lg ml-1.5 text-${
                  hoverState.page ? "white" : "comTxt"
                }`}
              >
                Page
              </text>
              <ArrowRightSharp
                style={{
                  width: "30px",
                  height: "30px",
                  marginLeft: "43%",
                  color: hoverState.page ? "white" : "#6C4639",
                }}
              />
            </button>
          </div>
          <div className="">
            <button
              onMouseEnter={() => handleMouseEnter("blogs")}
              onMouseLeave={() => handleMouseLeave("blogs")}
              className="hover:bg-header rounded-xl hover:shadow-white shadow-md
              w-full py-1.5 flex items-center transition-all duration-200 ease-linear"
            >
              <RateReview
                className="ml-8"
                style={{ color: hoverState.blogs ? "white" : "#6C4639" }}
              />
              <text
                className={`font-fontbody text-lg ml-1.5 text-${
                  hoverState.blogs ? "white" : "comTxt"
                }`}
              >
                Blogs
              </text>
              <ArrowRightSharp
                style={{
                  width: "30px",
                  height: "30px",
                  marginLeft: "41%",
                  color: hoverState.blogs ? "white" : "#6C4639",
                }}
              />
            </button>
          </div>
          <div className="">
            <button
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={() => handleMouseLeave("about")}
              className="hover:bg-header rounded-xl hover:shadow-white shadow-md
              w-full py-1.5 flex items-center transition-all duration-200 ease-linear"
            >
              <Info
                className="ml-8"
                style={{ color: hoverState.about ? "white" : "#6C4639" }}
              />
              <text
                className={`font-fontbody text-lg ml-1.5 text-${
                  hoverState.about ? "white" : "comTxt"
                }`}
              >
                About
              </text>
              <ArrowRightSharp
                style={{
                  width: "30px",
                  height: "30px",
                  marginLeft: "39%",
                  color: hoverState.about ? "white" : "#6C4639",
                }}
              />
            </button>
          </div>
          <div className="">
            <button
              onMouseEnter={() => handleMouseEnter("favorite")}
              onMouseLeave={() => handleMouseLeave("favorite")}
              className="hover:bg-header rounded-xl hover:shadow-white shadow-md
              w-full py-1.5 flex items-center transition-all duration-200 ease-linear"
            >
              <Favorite
                className="ml-8"
                style={{ color: hoverState.favorite ? "white" : "#6C4639" }}
              />
              <text
                className={`font-fontbody text-lg ml-1.5 text-${
                  hoverState.favorite ? "white" : "comTxt"
                }`}
              >
                Favorite
              </text>
              <ArrowRightSharp
                style={{
                  width: "30px",
                  height: "30px",
                  marginLeft: "32%",
                  color: hoverState.favorite ? "white" : "#6C4639",
                }}
              />
            </button>
          </div>
          <div className="">
            <button
              onMouseEnter={() => handleMouseEnter("cart")}
              onMouseLeave={() => handleMouseLeave("cart")}
              className="hover:bg-header rounded-xl hover:shadow-white shadow-md
              w-full py-1.5 flex items-center transition-all duration-200 ease-linear"
            >
              <ShoppingCart
                className="ml-8"
                style={{ color: hoverState.cart ? "white" : "#6C4639" }}
              />
              <text
                className={`font-fontbody text-lg ml-1.5 text-${
                  hoverState.cart ? "white" : "comTxt"
                }`}
              >
                Cart
              </text>
              <ArrowRightSharp
                style={{
                  width: "30px",
                  height: "30px",
                  marginLeft: "45%",
                  color: hoverState.cart ? "white" : "#6C4639",
                }}
              />
            </button>
          </div>
          <div className="">
            <button
              onClick={() => handleCategories()}
              onMouseEnter={() => handleMouseEnter("categories")}
              onMouseLeave={() => handleMouseLeave("categories")}
              className={`hover:bg-header rounded-xl hover:shadow-white shadow-md
              w-full py-1.5 flex items-center transition-all duration-200 ease-linear
              ${showForMenAndWomen && "bg-header"}
              `}
            >
              <Widgets
                className="ml-8"
                style={{
                  color:
                    hoverState.categories || showForMenAndWomen
                      ? "white"
                      : "#6C4639",
                }}
              />
              <text
                className={`font-fontbody text-lg ml-1.5 text-${
                  hoverState.categories || showForMenAndWomen
                    ? "white"
                    : "comTxt"
                }`}
              >
                All categories
              </text>
              <ArrowDropDown
                style={{
                  width: "30px",
                  height: "30px",
                  marginLeft: "30px",
                  color:
                    hoverState.categories || showForMenAndWomen
                      ? "white"
                      : "#6C4639",
                }}
              />
            </button>
          </div>
          {showForMenAndWomen && (
            <>
              <div className="space-y-6 mt-14 w-full">
                <button
                  onMouseEnter={() => handleMouseEnter("man")}
                  onMouseLeave={() => handleMouseLeave("man")}
                  className="hover:bg-header rounded-xl hover:shadow-white shadow-md 
              w-full py-1.5 flex items-center transition-all duration-200 ease-linear"
                >
                  <Man
                    className="ml-8"
                    style={{ color: hoverState.man ? "white" : "#6C4639" }}
                  />
                  <text
                    className={`font-fontbody text-lg ml-1.5 text-${
                      hoverState.man ? "white" : "comTxt"
                    }`}
                  >
                    For Men
                  </text>
                </button>
              </div>
              <div className="space-y-6 mt-14 w-full">
                <button
                  onMouseEnter={() => handleMouseEnter("woman")}
                  onMouseLeave={() => handleMouseLeave("woman")}
                  className="hover:bg-header rounded-xl hover:shadow-white shadow-md
              w-full py-1.5 flex items-center transition-all duration-200 ease-linear"
                >
                  <Woman
                    className="ml-8"
                    style={{ color: hoverState.woman ? "white" : "#6C4639" }}
                  />
                  <text
                    className={`font-fontbody text-lg ml-1.5 text-${
                      hoverState.woman ? "white" : "comTxt"
                    }`}
                  >
                    For Women
                  </text>
                </button>
              </div>
              <div className="space-y-6 mt-14 w-full">
                <button
                  onMouseEnter={() => handleMouseEnter("treasure")}
                  onMouseLeave={() => handleMouseLeave("treasure")}
                  className="hover:bg-header rounded-xl hover:shadow-white shadow-md
              w-full py-1.5 flex items-center transition-all duration-200 ease-linear"
                >
                  <Diamond
                    className="ml-8"
                    style={{ color: hoverState.treasure ? "white" : "#6C4639" }}
                  />
                  <text
                    className={`font-fontbody text-lg ml-1.5 text-${
                      hoverState.treasure ? "white" : "comTxt"
                    }`}
                  >
                    Treasure
                  </text>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
