import React, { useEffect, useState } from "react";
import axios from "axios";
import DealProdPag from "./Pagination/DealProdPag";

const DealProd = () => {
  const [dealData, setDealData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const getInitialItemPerPage = () => {
    return window.innerWidth <= 768 ? 2 : 4;
  };

  const getInitialProdHeight = () => {
    return window.innerWidth >= 768 ? "300px" : "230px";
  };

  const updateWindowDimensions = () => {
    setItemPerPage(getInitialItemPerPage());
    setProdHeight(getInitialProdHeight());
  };
  useEffect(() => {
    const handleResize = () => {
      updateWindowDimensions();
    };
    updateWindowDimensions();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [itemPerPage, setItemPerPage] = useState(getInitialItemPerPage());
  const [prodHeight, setProdHeight] = useState(getInitialProdHeight());
  const lastItemIndex = currentPage * itemPerPage; //! 1 * 4 = 4
  const firstItemIndex = lastItemIndex - itemPerPage; //! 4 - 4 = 0

  const currentPosts = dealData.slice(firstItemIndex, lastItemIndex);

  useEffect(() => {
    const url = "http://localhost:4000/api/v1/deal";

    axios
      .get(`${url}`)
      .then((res) => {
        setDealData(res.data);
      })
      .catch((err) => {
        console.log("error...", err);
      });
  }, []);

  return (
    <div className="mt-12 mx-2 sm:md:mx-12 bg-[#ffffff]">
      <h1 className="font-fontbody text-2xl font-semibold text-center relative flex justify-center items-center">
        Get Your Daily Dose of Luxury
        <div className="h-1 w-32 bg-header absolute top-9" />
      </h1>

      <div className="flex items-center space-x-6 mt-12">
        {currentPosts.map((item, index) => (
          <div
            key={index}
            className="flex flex-col border border-slate-400 rounded-tr-md rounded-tl-md"
          >
            <div className="relative overflow-hidden flex justify-center items-center rounded-tr-md rounded-tl-md bg-slate-200">
              <img
                src={require(`../Assets/images/dealProd/${item.img}`)}
                alt=""
                className="object-cover z-10 hover:scale-105 transition-transform duration-500 ease-linear"
                style={{ width: "100%", height: prodHeight }}
              />
              <div className="w-52 h-52 rounded-full bg-[#ffffff] absolute" />
            </div>
            <div className="text-center mt-2">
              <text className="font-fontbody font-semibold text-md">
                {item.name}
              </text>
            </div>
            <div className="text-center mt-2">
              <text className="font-fontbody text-md text-gray-700">
                ${item.price}
              </text>
            </div>
          </div>
        ))}
      </div>
      <DealProdPag
        totalLength={dealData.length}
        itemPerPage={itemPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default DealProd;
