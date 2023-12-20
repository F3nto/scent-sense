import React, { useState } from "react";
import { Widgets, KeyboardArrowDownOutlined } from "@mui/icons-material";

const TitleBar = ({onTitleClick}) => {
  const [acitveTitle, setActiveTitle] = useState("Home");

  const handleTitleClick = (title) => {
    setActiveTitle(title);
    onTitleClick(title);
  };

  const isTitleActive = (title) => {
    return title === acitveTitle ? "text-comTxt" : "";
  };

  return (
    <div className="bg-[#eaf4f4] w-full h-16 items-center mt-4 hidden md:sm:flex relative">
      <div className="ml-12 bg-slate-300 hover:bg-slate-400 hover:text-white py-5 px-5">
        <button className="flex items-center">
          <Widgets />
          <p className="ml-2">All Categories</p>
        </button>
      </div>

      <div className="flex items-center w-1/2 space-x-10 ml-14">
        <div>
          <button
            onClick={() => handleTitleClick("Home")}
            className={`font-fontbody flex items-center hover:text-comTxt ${isTitleActive(
              "Home"
            )}`}
          >
            <p className="font-fontbody">Home</p>
          </button>
        </div>
        <div>
          <button
            onClick={() => handleTitleClick("Shop")}
            className={`font-fontbody flex items-center hover:text-comTxt ${isTitleActive(
              "Shop"
            )}`}
          >
            <p>Shop</p>
            <div>
              <KeyboardArrowDownOutlined />
            </div>
          </button>
        </div>
        <div>
          <button
            onClick={() => handleTitleClick("Blogs")}
            className={`font-fontbody flex items-center hover:text-comTxt ${isTitleActive(
              "Blogs"
            )}`}
          >
            <p>Blogs</p>
            <div>
              <KeyboardArrowDownOutlined />
            </div>
          </button>
        </div>
        <div>
          <button
            onClick={() => handleTitleClick("About")}
            className={`font-fontbody flex items-center hover:text-comTxt ${isTitleActive(
              "About"
            )}`}
          >
            <p>About</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
