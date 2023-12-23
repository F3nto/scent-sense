import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Search,
  FavoriteBorderOutlined,
  ShoppingCart,
} from "@mui/icons-material";
//! redux
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeWishList,
} from "../../Redux/features/wishListSlide";

const BestSeller = () => {
  const [bestSellerProd, setBestSellerProd] = useState([]);

  const dispatch = useDispatch();

  const wishList = useSelector((state) => state.wishList?.wishListArr);

  useEffect(() => {
    const url = "http://localhost:4000/api/v1/bestseller";

    axios
      .get(`${url}`)
      .then((res) => {
        setBestSellerProd(res.data);
      })
      .catch((err) => {
        console.log("error...", err);
      });
  }, []);

  const getInitialHeight = () => {
    return window.innerWidth >= 768 ? "300px" : "230px";
  };

  const updateWindowDimensions = useCallback(() => {
    setBestProdHeight(getInitialHeight());
  }, []);

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

  const [bestProdHeight, setBestProdHeight] = useState(getInitialHeight());

  const navigate = useNavigate();
  const handleClickView = (item) => {
    const queryParams = {
      _id: item._id,
      name: item.name,
    };

    const url = `/product-detail?${new URLSearchParams(
      queryParams
    ).toString()}`;
    navigate(url, { state: { item } });
  };

  const handleFavorite = (clickedItem) => {
    if (wishList.find((item) => item._id === clickedItem._id)) {
      dispatch(removeWishList(clickedItem._id));
    } else {
      dispatch(addToWishList(clickedItem));
    }
  };

  return (
    <div className="mt-12">
      <div className="flex flex-wrap justify-between items-center">
        {bestSellerProd.map((item, index) => (
          <div
            key={index}
            className="border border-slate-400 rounded-tr-md rounded-tl-md my-2"
          >
            <div className="relative overflow-hidden flex justify-center items-center rounded-tr-md rounded-tl-md bg-slate-200 group">
              <img
                src={require(`../../Assets/images/bestSellerProd/${item.type[0].img}`)}
                className="object-cover z-10 group-hover:scale-105 transition-transform duration-500 ease-linear"
                style={{ width: "100%", height: bestProdHeight }}
                alt=""  
              />
              <div className="w-52 h-52 rounded-full bg-[#ffffff] absolute"></div>

              <div className="absolute right-1 z-10 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in">
                <div className="space-y-3">
                  <button
                    onClick={() => handleClickView(item)}
                    className="flex justify-center items-center w-10 h-10 hover:bg-header hover:scale-110 hover:shadow-white transition-all duration-200 ease-in bg-white shadow-black shadow-md rounded-full"
                  >
                    <Search />
                  </button>
                  <button
                    onClick={() => handleFavorite(item)}
                    className="flex justify-center items-center w-10 h-10 hover:bg-header hover:scale-110 hover:shadow-white transition-all duration-200 ease-in bg-white shadow-black shadow-md rounded-full"
                  >
                    {wishList.some(
                      (wishListItem) => wishListItem._id === item._id
                    ) ? (
                      <img
                        src={require("../../Assets/icons/heart.png")}
                        style={{ width: "25px", height: "25px" }}
                        alt=""
                      />
                    ) : (
                      <FavoriteBorderOutlined />
                    )}
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
                ${item.type[0].price}
              </text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
