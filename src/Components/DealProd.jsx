import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import DealProdPag from "./Pagination/DealProdPag";
import { useNavigate } from "react-router-dom";
import {
  FavoriteBorderOutlined,
  ShoppingCart,
  Search,
} from "@mui/icons-material";
//! redux
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeWishList } from "../Redux/features/wishListSlide";
import { addToCart, removeFromCart } from "../Redux/features/addToCartSlide";

const DealProd = () => {
  const [dealData, setDealData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList?.wishListArr);

  const cart = useSelector((state) => state.cart?.cartArr);

  const getInitialItemPerPage = () => {
    if (window.innerWidth <= 640) {
      return 2;
    } else if (window.innerWidth <= 934) {
      return 3;
    } else {
      return 4;
    }
  };

  const getInitialProdHeight = () => {
    return window.innerWidth >= 768 ? "300px" : "230px";
  };

  const updateWindowDimensions = useCallback(() => {
    setItemPerPage(getInitialItemPerPage());
    setProdHeight(getInitialProdHeight());
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
  const [itemPerPage, setItemPerPage] = useState(getInitialItemPerPage());
  const [prodHeight, setProdHeight] = useState(getInitialProdHeight());
  const lastItemIndex = currentPage * itemPerPage; //! 1 * 4 = 4
  const firstItemIndex = lastItemIndex - itemPerPage; //! 4 - 4 = 0

  const currentPosts = dealData.slice(firstItemIndex, lastItemIndex);
  console.log();

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

  const handleShoppingCart = (clickedItem) => {
    if (cart.find((cartItem) => cartItem._id === clickedItem._id)) {
      dispatch(removeFromCart(clickedItem._id));
    } else {
      dispatch(addToCart(clickedItem));
    }
  };

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
            className="flex flex-col border border-slate-300 rounded-tr-md rounded-tl-md"
          >
            <div className="relative overflow-hidden flex justify-center items-center rounded-tr-md rounded-tl-md bg-slate-200 group">
              <img
                src={`${item.type[0].img}`}
                alt=""
                className={`object-cover z-10 group-hover:scale-105 transition-transform duration-500 ease-linear`}
                style={{ width: "100%", height: prodHeight }}
              />
              <div className="w-52 h-52 rounded-full bg-[#ffffff] absolute" />

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
                        src={require("../Assets/icons/heart.png")}
                        style={{ width: "25px", height: "25px" }}
                        alt=""
                      />
                    ) : (
                      <FavoriteBorderOutlined />
                    )}
                  </button>
                  <button
                    onClick={() => handleShoppingCart(item)}
                    className="flex justify-center items-center w-10 h-10 hover:bg-header hover:scale-110 hover:shadow-white transition-all duration-200 ease-in bg-white shadow-black shadow-md rounded-full"
                  >
                    {cart.some((cartItem) => cartItem._id === item._id) ? (
                      <div className="text-[#9a4528]">
                        <ShoppingCart />
                      </div>
                    ) : (
                      <ShoppingCart />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center mt-2">
              <text className="font-fontbody font-semibold text-md">
                {item.name}
              </text>
            </div>
            <div className="text-center mt-2">
              <text className="font-fontbody text-md text-gray-700">
                {item.type[0].price}
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
