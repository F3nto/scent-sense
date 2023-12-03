import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Remove, Add } from "@mui/icons-material";

const BestSellerDetail = () => {
  const location = useLocation();
  const {
    state: { item },
  } = location;

  const [selectedSize, setSelectedSize] = useState(item.type[0].size);

  const renderProdImages = () => {
    const selectedType = item.type.find((prod) => prod.size === selectedSize);
    return (
      <div className="w-1/2">
        <img
          src={require(`../Assets/images/bestSellerProd/${selectedType.img}`)}
          className="object-cover border border-slate-600"
          alt=""
        />
      </div>
    );
  };

  const renderProdSize = () => {
    return (
      <div className="flex item-center space-x-6">
        {item.type.map((prod, index) => (
          <div key={index}>
           <button
              onClick={() => setSelectedSize(prod.size)}
              className={`border w-16 h-10 rounded-md ${
                prod.size === selectedSize
                  ? "border-slate-500 bg-header shadow-slate-400 shadow-sm" 
                  : "bg-slate-200 border-slate-500 hover:bg-header "
              }`}
            >
              <span className="font-fontbody text-md tracking-wider">{prod.size}</span>
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderProdDetail = () => {
    return(
    <div className="flex flex-1 flex-col -ml-8 space-y-6">
      <text className="font-fontbody text-2xl">{item.name}</text>
      <text className="font-fontbody text-comTxt text-xl tracking-wider">
        $ {item.type.find((prod) => prod.size === selectedSize).price}
      </text>
      <div className="h-1 w-36 bg-header"></div>
      {renderProdSize()}
      <p className="font-fontbody">{item.desc}</p>

      <text className="font-fontbody text-comTxt text-lg">
        <span className="font-fontbody text-slate-700">Brand - </span>
        {item.brand}
      </text>
      <text className="font-fontbody text-comTxt text-lg">
        <span className="font-fontbody text-slate-700">Gender - </span>
        {item.gender}
      </text>

      <div className="flex items-center justify-center space-x-5">
        <button className=" bg-header px-1.5 py-1 rounded-sm">
          <Remove style={{ color: "#6C4639" }} />
        </button>
        <text>1</text>
        <button className="bg-header px-1.5 py-1 rounded-sm">
          <Add style={{ color: "#6C4639" }} />
        </button>
      </div>
    </div>
    )
  };

  return (
    <div className="mx-12 mt-12">
      <div className="flex">
        {renderProdImages()}
        {renderProdDetail()}
      </div>
    </div>
  );
};

export default BestSellerDetail;
