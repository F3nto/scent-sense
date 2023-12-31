import React, { useState, useEffect } from "react";
import axios from "axios";
import TreasureGenderProd from "./TreasureGend && Brand/TreasureGenderProd";
import TreasureBrandProd from "./TreasureGend && Brand/TreasureBrandProd";
import AllTreasureProd from "./TreasureGend && Brand/AllTreasureProd";
import Footer from "../Components/Footer";

const TreasureProd = () => {
  const genders = ["Men", "Women", "Unisex"];
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedContent, setSelectedContent] = useState("all");

  const [treasureData, setTreasureData] = useState([]);

  useEffect(() => {
    const url = "http://localhost:4000/api/v1/treasure-products";

    axios.get(`${url}`).then((res) => {
      setTreasureData(res.data);
    });
  }, []);

  const handleGenderChange = (gender) => {
    setSelectedGender(gender === selectedGender ? null : gender);
    setSelectedBrand(null); //! Reset selected brand when changing gender
    setSelectedContent("gender");
  };

  //! Handle brand change and set selected content to "brand"
  const handleBrandChange = (brand) => {
    setSelectedBrand(brand === selectedBrand ? null : brand);
    setSelectedGender(null); //! Reset selected gender when changing brand
    setSelectedContent("brand");
  };

  const handleAllProdChange = () => {
    setSelectedContent("all")
    setSelectedBrand(null)
    setSelectedGender(null)
  }

  //! Render gender or brand content based on selected content
  const renderContent = () => {
    if (selectedContent === "all") {
      return <AllTreasureProd data={treasureData} />; //! Render all products initially
    }

    if (selectedContent === "gender") {
      const filteredData = treasureData.filter(
        (prod) => prod.gender === selectedGender
      );
      return <TreasureGenderProd data={filteredData} />;
    }

    if (selectedContent === "brand") {
      const filteredData = treasureData.filter(
        (prod) => prod.brand === selectedBrand
      );
      // Return or render brand content here
      return (
        <div>
          <TreasureBrandProd data={filteredData} />
        </div>
      );
    }
  };

  // Render brand buttons
  const renderBrandBtn = () => {
    const brands = [...new Set(treasureData.map((prod) => prod.brand))];

    return (
      <div className="mt-10">
        <h1 className="font-fontbody text-lg">Brand</h1>
        <div className="flex flex-col ml-4 mt-2 space-y-2">
          {brands.map((brand, index) => (
            <div key={index}>
              <button
                onClick={() => handleBrandChange(brand)}
                className={`relative transition-all duration-100 hover:text-comTxt ease-in group ${
                  selectedBrand === brand ? "text-comTxt" : "text-slate-700"
                }`}
              >
                <span className="font-fontbody">{brand}</span>
                <span
                  className={`absolute inset-0 top-5 bg-comTxt transform scale-x-0 group-hover:scale-x-100 transition-transform duration-100 ease-in
                  ${selectedBrand === brand ? "scale-x-100 bg-comTxt" : ""}`}
                ></span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="mt-10 flex">
        <div className="w-1/6 ml-6">
          <div className="">
            <div>
              <button
                onClick={() => handleAllProdChange()}
                className={`relative transition-all duration-100 hover:text-comTxt ease-in group ${
                  selectedContent === "all" ? "text-comTxt" : "text-slate-500"
                }`}
              >
                <span className="font-fontbody">All Perfumes</span>
                <span
                  className={`absolute inset-0 top-5 bg-comTxt transform scale-x-0 group-hover:scale-x-100 transition-transform duration-100 ease-in
                  ${selectedContent === "all" ? "scale-x-100 bg-comTxt" : ""}`}
                ></span>
              </button>
            </div>
            <h1 className="font-fontbody text-lg mt-10">Gender</h1>
            <div className="flex flex-col ml-4 mt-2 space-y-2">
              {genders.map((gender, index) => (
                <div key={index}>
                  <button
                    onClick={() => handleGenderChange(gender)}
                    className={`relative transition-all duration-100 hover:text-comTxt ease-in group ${
                      selectedGender === gender
                        ? "text-comTxt"
                        : "text-slate-500"
                    }`}
                  >
                    <span className="font-fontbody">{gender}</span>
                    <span
                      className={`absolute inset-0 top-5 bg-comTxt transform scale-x-0 group-hover:scale-x-100 transition-transform duration-100 ease-in
                  ${selectedGender === gender ? "scale-x-100 bg-comTxt" : ""}`}
                    ></span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {renderBrandBtn()}
        </div>
        <div>{renderContent()}</div>
      </div>
      <Footer />
    </>
  );
};

export default TreasureProd;
