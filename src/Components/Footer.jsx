import React from "react";
import { FacebookSharp, Instagram, Twitter } from "@mui/icons-material";
const Footer = () => {
  return (
    <footer className="h-[50vh] border-t-header border shadow-header shadow-inner">
      <div className="mx-12 flex justify-between">
        <div className="mt-4">
          <img
            className="object-cover w-60"
            src={require("../Assets/images/officiallogo.png")}
            alt=""
          />
          <div className="mt-4">
            <text className="font-fontbody text-comTxt font-semibold text-md">
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
        <div className="mt-5">
          <h1 className="font-fontbody text-comTxt font-semibold text-xl">
            Quick Menu
          </h1>

          <div className="text-center mt-5">
            <button className="relative group">
              <text className="font-fontbody text-comTxt text-md">
                Treasures
              </text>
              <span className="absolute inset-0 top-5 bg-header transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </button>
          </div>
          <div className="text-center mt-5">
            <button className="relative group">
              <text className="font-fontbody text-comTxt text-md">
                Best Seller
              </text>
              <span className="absolute inset-0 top-5 bg-header transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </button>
          </div>
          <div className="text-center mt-5">
            <button className="relative group">
              <text className="font-fontbody text-comTxt text-md">
                New Arrivals
              </text>
              <span className="absolute inset-0 top-5 bg-header transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </button>
          </div>
          <div className="text-center mt-5">
            <button className="relative group">
              <text className="font-fontbody text-comTxt text-md">
                Top Rated
              </text>
              <span className="absolute inset-0 top-5 bg-header transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </button>
          </div>
        </div>
        <div className="mt-5">
          <text className="font-fontbody text-comTxt font-semibold text-xl">
            Help & Information
          </text>

          <div className="text-center mt-3">
            <button className="font-fontbody text-comTxt text-md">
              Contact Us
            </button>
          </div>
          <div className="text-center mt-3">
            <button className="font-fontbody text-comTxt text-md">
              Delivery
            </button>
          </div>
          <div className="text-center mt-3">
            <button className="font-fontbody text-comTxt text-md">FAQs</button>
          </div>
          <div className="text-center mt-3">
            <button className="font-fontbody text-comTxt text-md">
              Terms and Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
