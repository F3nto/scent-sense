import React, { useCallback, useEffect, useState } from "react";

import {
  Search,
  FavoriteBorderOutlined,
  ShoppingCart,
} from "@mui/icons-material";

const TreasureGenderProd = ({ data }) => {
  const getInitialHeight = () => {
    return window.innerWidth >= 768 ? "300px" : "230px";
  };

  const updateWindowDimensions = useCallback(() => {
    setProdHeight(getInitialHeight());
  });

  useEffect(() => {
    const handleResize = () => {
      updateWindowDimensions();
    };
    updateWindowDimensions();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateWindowDimensions]);

  const [prodHeight, setProdHeight] = useState(getInitialHeight());
  return (
    <div>
      <div className="grid grid-cols-4 mr-10">
        {data.map((item, index) => (
          <div key={index} className="px-2">
            <div className="border border-slate-400 rounded-tr-md rounded-tl-md my-2">
              <div className="relative overflow-hidden flex justify-center items-center rounded-tr-md rounded-tl-md bg-slate-200 group">
                <img
                  src={require(`../../Assets/images/TreasureProd/${item.img}`)}
                  className="object-cover z-10 group-hover:scale-105 transition-transform duration-500 ease-linear"
                  style={{ width: "100%", height: prodHeight }}
                  alt=""
                />

                <div className="rounded-full w-60 h-60 bg-[#ffffff] absolute"></div>

                <div className="absolute right-1 z-10 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in">
                  <div className="space-y-3">
                    <button className="flex justify-center items-center w-10 h-10 hover:bg-header hover:scale-110 hover:shadow-white transition-all duration-200 ease-in bg-white shadow-black shadow-md rounded-full">
                      <Search />
                    </button>
                    <button className="flex justify-center items-center w-10 h-10 hover:bg-header hover:scale-110 hover:shadow-white transition-all duration-200 ease-in bg-white shadow-black shadow-md rounded-full">
                      <FavoriteBorderOutlined />
                    </button>
                    <button className="flex justify-center items-center w-10 h-10 hover:bg-header hover:scale-110 hover:shadow-white transition-all duration-200 ease-in bg-white shadow-black shadow-md rounded-full">
                      <ShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-center items-center">
                <div className="h-12 w-52 text-center">
                  <text className="font-fontbody font-semibold text-md">
                    {item.name}
                  </text>
                </div>
              </div>
              <div className="text-center">
                <text className="font-fontbody text-md text-comTxt">
                  ${item.price}
                </text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreasureGenderProd;
