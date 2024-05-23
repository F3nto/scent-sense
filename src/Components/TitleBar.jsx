import React, { useState } from "react";
import { Widgets, KeyboardArrowDownOutlined } from "@mui/icons-material";
import CategoriesModal from "../Modal/CategoriesModal";

const TitleBar = ({ onTitleClick, isSearchFocused }) => {
  const [acitveTitle, setActiveTitle] = useState("Home");
  const [openModal, setOpenModal] = useState(false);

  const handleTitleClick = (title) => {
    setActiveTitle(title);
    onTitleClick(title);
  };

  const isTitleActive = (title) => {
    return title === acitveTitle ? "text-comTxt" : "";
  };

  const handleCategories = () => {
    setOpenModal(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setOpenModal(false);
    }, 300);
  };

  return (
    <>
      <div
        onMouseLeave={() => handleMouseLeave()}
        className={`bg-[#eaf4f4] w-full h-16 items-center mt-4 hidden md:sm:flex relative
    ${isSearchFocused && "-z-10"}`}
      > 
        <button
          onMouseEnter={() => handleCategories()}
          className="ml-12 bg-slate-300 hover:bg-slate-400 hover:text-white py-5 px-5"
        >
          <div className="flex items-center">
            <Widgets />
            <p className="ml-2">All Categories</p>
          </div>
        </button>

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
        {openModal && (
          <div
            className={`absolute inset-0 z-10 ${
              isSearchFocused && setOpenModal(false)
            } left-12 top-[65px]`}
          >
            <CategoriesModal onClose={() => setOpenModal(false)} />
          </div>
        )}
      </div>
    </>
  );
};

export default TitleBar;
