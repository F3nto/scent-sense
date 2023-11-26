import React from "react";
import {
  Home,
  ShoppingBag,
  Pages,
  RateReview,
  Info,
  Widgets,
  Man,
  Woman,
} from "@mui/icons-material";

const Drawer = ({ onClose }) => {
  return (
    <div
      className="absolute inset-0 -left-4 -top-4 h-[100vh] w-72 bg-slate-300 shadow-lg 
    z-10 transition-all duration-300 ease-in"
    >
      <div className="flex-col flex justify-center items-center ">
        <div className="relative w-full h-32 bg-gradient-to-br from-neutral-300 to-header shadow-header shadow-md">
          <div className="absolute -bottom-8 left-24 w-16 h-16 bg-header shadow-black shadow-sm rounded-full flex justify-center items-center">
            <h1 className="font-fontbody text-3xl">P</h1>
          </div>
        </div>
        <div className="space-y-4 mt-14 w-10/12">
          <div className="">
            <button className="hover:bg-header bg-white rounded-xl hover:shadow-white shadow-md
                               w-full py-1.5 flex items-center transition-all duration-200 ease-linear">
              <Home className="ml-8" />
              <text className="font-fontbody text-lg ml-1.5">Home</text>
            </button>
          </div>
          <div className="">
            <button className="hover:bg-header bg-white rounded-xl hover:shadow-white shadow-md  
                               w-full py-1.5 flex items-center transition-all duration-200 ease-linear">
              <ShoppingBag className="ml-8" />
              <text className="font-fontbody text-lg ml-1.5">Shop</text>
            </button>
          </div>
          <div className="">
            <button className="hover:bg-header bg-white rounded-xl hover:shadow-white shadow-md
                               w-full py-1.5 flex items-center transition-all duration-200 ease-linear">
              <Pages className="ml-8" />
              <text className="font-fontbody text-lg ml-1.5">Page</text>
            </button>
          </div>
          <div className="">
            <button
              className="hover:bg-header bg-white rounded-xl hover:shadow-white shadow-md
              w-full py-1.5 flex items-center transition-all duration-200 ease-linear"
            >
              <RateReview className="ml-8" />
              <text className="font-fontbody text-lg ml-1.5">Blogs</text>
            </button>
          </div>
          <div className="">
            <button
              className="hover:bg-header bg-white rounded-xl hover:shadow-white shadow-md
              w-full py-1.5 flex items-center transition-all duration-200 ease-linear"
            >
              <Info className="ml-8" />
              <text className="font-fontbody text-lg ml-1.5">About</text>
            </button>
          </div>
          <div className="">
            <button
              className="hover:bg-header bg-white rounded-xl hover:shadow-white shadow-md
              w-full py-1.5 flex items-center transition-all duration-200 ease-linear"
            >
              <Widgets className="ml-8" />
              <text className="font-fontbody text-lg ml-1.5">
                All categories
              </text>
            </button>
          </div>
          <div className="space-y-6 mt-14 w-full">
            <button
              className="hover:bg-header bg-white rounded-xl hover:shadow-white shadow-md 
              w-full py-1.5 flex items-center transition-all duration-200 ease-linear"
            >
              <Man className="ml-8" />
              <text className="font-fontbody text-lg ml-1.5">For Men</text>
            </button>
          </div>
          <div className="space-y-6 mt-14 w-full">
            <button
              className="hover:bg-header bg-white rounded-xl hover:shadow-white shadow-md
              w-full py-1.5 flex items-center transition-all duration-200 ease-linear"
            >
              <Woman className="ml-8" />
              <text className="font-fontbody text-lg ml-1.5">For Women</text>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
