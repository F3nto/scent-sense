import React, { useState } from "react";
import BestSeller from "./BntrProd/BestSeller";
import NewArrival from "./BntrProd/NewArrival";
import TopRated from "./BntrProd/TopRated";

const BntrProd = () => {
  const [activeTab, setActiveTab] = useState("");

  const handleClickTab = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "bestSeller":
        return <BestSeller />;

      case "newArrivals":
        return <NewArrival />;

      case "topRated":
        return <TopRated />;

      default:
        return null;
    }
  };

  return (
    <div className="mx-12 mt-12 h-[100vh]">
      <div className="flex items-center justify-center space-x-8">
        <button
          onClick={() => handleClickTab("bestSeller")}
          className={`px-5 py-3 rounded-3xl bg-slate-500 hover:bg-header text-white hover:text-black`}
        >
          <span className="font-fontbody">Best Seller</span>
        </button>
        <button
          onClick={() => handleClickTab("newArrivals")}
          className="px-5 py-3 rounded-3xl bg-slate-500 hover:bg-header text-white hover:text-black"
        >
          <span className="font-fontbody">New Arrivals</span>
        </button>
        <button
          onClick={() => handleClickTab("topRated")}
          className="px-5 py-3 rounded-3xl bg-slate-500 hover:bg-header text-white hover:text-black"
        >
          <span className="font-fontbody">Top rated</span>
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default BntrProd;
