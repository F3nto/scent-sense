import React, { useState } from "react";
import { getAllProd } from "../Api/AllProdApi";
import { getTreasureProd } from "../Api/TreasureProdApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const CategoriesModal = ({ onClose }) => {
  const navigate = useNavigate();

  const {
    error: allProdError,
    isPending: allProdPending,
    data: allProdData,
  } = useQuery({
    queryKey: ["All-Products"],
    queryFn: getAllProd,
  });

  const {
    error: treasureProdError,
    isPending: treasureProdPending,
    data: treasureProdData,
  } = useQuery({
    queryKey: ["Treasure-products"],
    queryFn: getTreasureProd,
  });

  if (allProdPending || treasureProdPending) return "Loading...";

  if (allProdError)
    return "An error has occurred for All Products: " + allProdError.message;
  if (treasureProdError)
    return (
      "An error has occurred for Treasure Products: " +
      treasureProdError.message
    );

  const customOrder = ["Men", "Women", "Unisex"];

  const orderedGenders = customOrder.filter((gender) =>
    allProdData.some((prod) => prod.gender === gender)
  );

  const orderedTreasureProdGenders = customOrder.filter((gender) =>
    treasureProdData.some((prod) => prod.gender === gender)
  );

  const getCountForGender = (gender) => {
    if (allProdData) {
      const filteredData = allProdData.filter((prod) => prod.gender === gender);
      return filteredData.length;
    }
    return 0;
  };

  const getCountForTreasureProdGender = (gender) => {
    if (treasureProdData) {
      const filteredData = treasureProdData.filter(
        (prod) => prod.gender === gender
      );
      return filteredData.length;
    }

    return 0;
  };

  const handleAllProdGender = (gender) => {
    navigate(`/all-products?gender=${gender}`);
  };

  const handleTreasureProdGender = (gender) => {
    navigate(`/treasure-products?gender=${gender}`);
  };

  return (
    <div
      onMouseLeave={onClose}
      className="bg-slate-300 w-2/3 relative p-4 flex rounded-tr-3xl rounded-br-3xl items-center shadow-black shadow-sm"
    >
      <section>
        <div className="space-y-3">
          {orderedGenders.map((gender, index) => (
            <div key={index} className="">
              <button
                onClick={() => handleAllProdGender(gender)}
                className="pl-4 hover:text-comTxt relative group flex flex-col justify-start"
              >
                <span className="font-fontbody text-md tracking-wide">
                  For {gender} ({getCountForGender(gender)})
                </span>
                <span className="absolute inset-0 top-5 left-4 bg-comTxt transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </button>
            </div>
          ))}
        </div>
        <div className="space-y-3 mt-3">
          {orderedTreasureProdGenders.map((gender, index) => (
            <div key={index} className="">
              <button
                onClick={() => handleTreasureProdGender(gender)}
                className="pl-4 hover:text-comTxt relative group flex flex-col justify-start"
              >
                <span className="font-fontbody text-md tracking-wide">
                  Treasure Set For {gender} (
                  {getCountForTreasureProdGender(gender)})
                </span>
                <span className="absolute inset-0 top-5 left-4 bg-comTxt transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </button>
            </div>
          ))}
        </div>
      </section>
      <div className="absolute right-0">

         <img src={require("../Assets/images/cateimg.jpg")} className="object-cover rounded-tr-3xl rounded-br-3xl shadow-slate-400 shadow-md" style={{width:"500px", height:"234px"}} alt="" />
      </div>
    </div>
  );
};

export default CategoriesModal;
