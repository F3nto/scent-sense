import React from "react";
import { Widgets, KeyboardArrowDownOutlined } from "@mui/icons-material";

const TitleBar = () => {
  return (
    <div className="bg-[#eaf4f4] w-full h-16 items-center mt-4 hidden md:sm:flex">
      <div className="ml-12 bg-slate-300 py-5 px-5">
        <button className="flex items-center">
          <Widgets />
          <p className="ml-2">All Categories</p>
        </button>
      </div>

      <div className="flex justify-evenly items-center w-1/2 px-6">
        <div>
          <button className="font-fontbody flex items-center">  
            <p>Home</p>
            <div>
              <KeyboardArrowDownOutlined />
            </div>
          </button>
        </div>  
        <div>
          <button className="font-fontbody flex items-center">
            <p>Shop</p>
            <div>
              <KeyboardArrowDownOutlined />
            </div>
          </button>
        </div>
        <div>
          <button className="font-fontbody flex items-center">
            <p>Page</p>
            <div>
              <KeyboardArrowDownOutlined />
            </div>
          </button>
        </div>
        <div>
          <button className="font-fontbody flex items-center">
            <p>Blogs</p>
            <div>
              <KeyboardArrowDownOutlined />
            </div>
          </button>
        </div>
        <div>
          <button className="font-fontbody">
            <p>About</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
