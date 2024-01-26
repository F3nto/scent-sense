import React, { useState } from "react";
import { getAllProd } from "../Api/AllProdApi";
import { getTreasureProd } from "../Api/TreasureProdApi";
import { useQuery } from "@tanstack/react-query";

const CategoriesModal = ({ onClose }) => {
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

  return (
    <div
      onMouseLeave={onClose}
      className="bg-slate-300 w-72 p-4 shadow-black shadow-sm"
    >
      <section>
        <div className="space-y-3">
          {orderedGenders.map((gender, index) => (
            <div key={index} className="">
              <button className="pl-4 hover:text-comTxt relative group flex flex-col justify-start">
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
              <button className="pl-4 hover:text-comTxt relative group flex flex-col justify-start">
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
    </div>
  );
};

export default CategoriesModal;
