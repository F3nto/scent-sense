import React, { useState, useEffect } from "react";
import { ShoppingCart, Person, Favorite } from "@mui/icons-material";
import Drawer from "./Drawer/Drawer";
const Header = () => {
  const [isClickMenu, setIsClickMenu] = useState(false);

  const handleClickMenu = () => {
    setIsClickMenu((prev) => !prev);
  };

  const closeDrawer = () => {
    setIsClickMenu(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsClickMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex bg-header p-7 ">
        <span className="font-fontbody pl-5">Welcome to Scent sense.</span>
      </div>
      <div className="flex justify-between items-center mx-4 md:mx-12 mt-4 relative">
        <div>
          <img
            className="object-cover w-48 md:sm:w-60"
            src={require("../Assets/images/officiallogo.png")}
            alt=""
          />
        </div>
        <div className="items-center relative hidden md:sm:flex">
          <input
            className="border-2 border-slate-300 rounded-xl h-10 px-4 w-96"
            type="text"
            placeholder="Search..."
          />
          <button className="absolute right-0 bg-header py-2 px-5 rounded-tr-xl rounded-br-xl">
            <img
              className="w-6 h-6"
              src={require("../Assets/icons/search.png")}
              alt=""
            />
          </button>
        </div>
        <div className="px-3 hidden md:sm:flex items-center">
          <button>
            <Favorite style={{ width: "40px", height: "35px" }} />
          </button>
          <button className="px-6">
            <ShoppingCart style={{ width: "40px", height: "35px" }} />
          </button>
          <button>
            <Person style={{ width: "40px", height: "40px" }} />
          </button>
        </div>
        <div className="flex md:ml-32 sm:ml-20 md:sm:hidden">
          <div className="w-12 h-12 rounded-full bg-white hover:bg-header flex justify-center items-center shadow-lg hover:shadow-lg shadow-header">
            <img
              className="w-6 h-6"
              src={require("../Assets/icons/search.png")}
              alt=""
            />
          </div>
        </div>
        <div className="flex md:sm:hidden mr-5">
          <div
            className={`
          ${
            isClickMenu
              ? "bg-header flex justify-center items-center w-12 h-12 rounded-full"
              : "w-12 h-12 rounded-full bg-white hover:bg-header flex justify-center items-center shadow-lg hover:shadow-lg shadow-header"
          }`}
          >
            <button
              onClick={() => handleClickMenu()}
              className="humbuger-menu flex flex-col items-end p-4 focus:outline-none"
            >
              <div
                className={`h-1 w-7 my-0.5 rounded-md bg-slate-700 transition-transform duration-500 ease-in-out
            ${isClickMenu ? "transform rotate-45 translate-y-2" : ""}`}
              ></div>

              <div
                className={`h-1 w-7 my-0.5 rounded-md bg-slate-700 transition-opacity duration-700 ease-in-out
            ${isClickMenu ? "opacity-0" : "opacity-100"}`}
              ></div>

              <div
                className={`h-1 w-7 my-0.5 rounded-md bg-slate-700 transition-transform duration-500 ease-in-out
            ${isClickMenu ? "transform -rotate-45 -translate-y-2" : ""}`}
              ></div>
            </button>
          </div>
        </div>
        {isClickMenu ? <Drawer onClose={() => closeDrawer()} /> : null}
      </div>
    </>
  );
};

export default Header;
