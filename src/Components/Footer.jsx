import React from "react";
import {
  FacebookSharp,
  Instagram,
  Twitter,
  CopyrightTwoTone,
} from "@mui/icons-material";
const Footer = () => {
  return (
    <footer className="h-[50vh] border-t-header border shadow-header shadow-inner">
      <div className="mx-14 flex justify-between">
        <div className="mt-4">
          <img
            className="object-cover w-60 ml-12"
            src={require("../Assets/images/officiallogo.png")}
            alt="official logo"
          />
          <div className="mt-4">
            <text className="font-fontbody text-comTxt font-semibold text-lg tracking-wide">
              Timeless allure for the discerning spirit
            </text>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-3 ">
            <button>
              <FacebookSharp style={{ width: "30px", height: "30px" }} />
            </button>
            <button>
              <Instagram style={{ width: "30px", height: "30px" }} />
            </button>
            <button>
              <Twitter style={{ width: "30px", height: "30px" }} />
            </button>
          </div>
        </div>
        <div className="mt-5 mr-10">
          <h1 className="font-fontbody text-comTxt font-semibold text-xl tracking-wider">
            Quick Menu
          </h1>

          <div className="text-center mt-5">
            <button className="relative group">
              <text className="font-fontbody text-comTxt text-md tracking-wider">
                Treasures
              </text>
              <span className="absolute inset-0 top-5 bg-header transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </button>
          </div>
          <div className="text-center mt-5">
            <button className="relative group">
              <text className="font-fontbody text-comTxt text-md tracking-wider">
                Best Seller
              </text>
              <span className="absolute inset-0 top-5 bg-header transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </button>
          </div>
          <div className="text-center mt-5">
            <button className="relative group">
              <text className="font-fontbody text-comTxt text-md tracking-wider">
                New Arrivals
              </text>
              <span className="absolute inset-0 top-5 bg-header transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </button>
          </div>
          <div className="text-center mt-5">
            <button className="relative group">
              <text className="font-fontbody text-comTxt text-md tracking-wider">
                Top Rated
              </text>
              <span className="absolute inset-0 top-5 bg-header transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </button>
          </div>
        </div>
        <div className="mt-5">
          <text className="font-fontbody text-comTxt font-semibold text-xl tracking-wider">
            Help & Information
          </text>

          <div className="text-center mt-5">
            <button className="relative group">
              <text className="font-fontbody text-comTxt text-md tracking-wider">
                Contact Us
              </text>
              <span className="absolute inset-0 top-5 bg-header transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </button>
          </div>
          <div className="text-center mt-3">
            <button className="relative group">
              <text className="font-fontbody text-comTxt text-md tracking-wider">
                Delivery
              </text>
              <span className="absolute inset-0 top-5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out bg-header"></span>
            </button>
          </div>
          <div className="text-center mt-3">
            <button className="relative group">
              <text className="font-fontbody text-comTxt text-md tracking-wider">FAQs</text>
              <span className="absolute inset-0 top-5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out bg-header"></span>
            </button>
          </div>
          <div className="text-center mt-3">
            <button className="relative group">
              <text className="font-fontbody text-comTxt text-md tracking-wider">
                Terms and Conditions
              </text>
              <span className="absolute inset-0 top-5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out bg-header"></span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center border-t-header border py-2 mt-14 space-x-2">
        <h2 className="font-fontbody text-comTxt text-lg">Copy right</h2>
        <CopyrightTwoTone />
        <text>2024 </text>
        <text className="font-fontbody text-comTxt">Scent-Sense.</text>
        <text>All rights reserved</text>
      </div>
    </footer>
  );
};

export default Footer;
