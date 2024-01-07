import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
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
import { addToCart, removeFromCart } from "../../Redux/features/addToCartSlide"; 

const NewArrival = () => {
  const [newArriProd, setNewArriProd] = useState([]);

  const dispatch = useDispatch();

  const wishList = useSelector((state) => state.wishList?.wishListArr);
  const cart = useSelector((state) => state.cart?.cartArr);


  useEffect(() => {
    let url = "http://localhost:4000/api/v1/new-arrival";

    axios
      .get(`${url}`)
      .then((res) => {
        setNewArriProd(res.data);
      })
      .catch((err) => {
        console.log("error...", err);
      });
  }, []);

  const getInitialHeight = () => {
    return window.innerWidth >= 768 ? "300px" : "230px";
  };

  const updateWindowDimensions = useCallback(() => {
    setNewArriProdHeight(getInitialHeight());
  }, []);

  const [newArrProdHeight, setNewArriProdHeight] = useState(getInitialHeight());

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
    if (wishList.find((wishListItem) => wishListItem._id === clickedItem._id)) {
      dispatch(removeWishList(clickedItem._id));
    } else {
      dispatch(addToWishList(clickedItem));
    }
  };

  const handleShoppingCart = (clickedItem) => {
    if (cart.find((cartItem) => cartItem._id === clickedItem._id)) {
      dispatch(removeFromCart(clickedItem._id))
    } else {
      dispatch(addToCart(clickedItem))
    }
  }

  return (
    <div className="mt-12">
      <div className="flex flex-wrap justify-between items-center"> 
        {newArriProd.map((item, index) => (
          <div
            key={index}
            className="border border-slate-400 rounded-tr-md rounded-tl-md my-2"
          >
            <div className="relative overflow-hidden flex justify-center items-center rounded-tr-md rounded-tl-md bg-slate-200 group">
              <img
                src={`${item.type[0].img}`}
                className="object-cover z-10 group-hover:scale-105 transition-transform duration-500 ease-linear"
                style={{ width: "100%", height: newArrProdHeight }}
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
                  <button
                  onClick={() => handleShoppingCart(item)}
                  className="flex justify-center items-center w-10 h-10 hover:bg-header hover:scale-110 hover:shadow-white transition-all duration-200 ease-in bg-white shadow-black shadow-md rounded-full">
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
                ${item.type[0].price}
              </text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;
