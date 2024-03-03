import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  FavoriteBorderOutlined,
  ShoppingCart,
} from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//! redux
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeWishList,
} from "../../Redux/features/wishListSlide";
import { addToCart, removeFromCart } from "../../Redux/features/addToCartSlide";
import {getOrderList} from "../../Api/AllOrderListApi";
import { getAllProd } from "../../Api/AllProdApi";

const BestSeller = () => {
  const dispatch = useDispatch();

  const wishList = useSelector((state) => state.wishList?.wishListArr);
  const cart = useSelector((state) => state.cart?.cartArr);

  const getInitialHeight = () => {
    return window.innerWidth >= 768 ? "300px" : "230px";
  };

  const getInitialWidth = () => {
    return window.innerWidth <= 493 ? "200px" : "100%";
  };

  const updateWindowDimensions = useCallback(() => {
    setBestProdHeight(getInitialHeight());
    setBestProdWidth(getInitialWidth());
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
  const [bestProdWidth, setBestProdWidth] = useState(getInitialWidth());
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

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

  const {
    error: orderError,
    isPending: orderPending,
    data: orderData,
  } = useQuery({
    queryKey: ["all-order-lists"],
    queryFn: getOrderList,
  });

  const {
    error: bestProdErr,
    isPending: bestProdPending,
    data: allProductsData,
  } = useQuery({
    queryKey: ["all-products"],
    queryFn: getAllProd,
  
  });

  useEffect(() => {
    if (!orderPending && !orderError && !bestProdPending && !bestProdErr) {
      const productsMap = {};
      orderData.forEach((order) => {
        order.items.forEach((item) => {
          if (productsMap[item.productId]) {
            productsMap[item.productId] += item.quantity;
          } else {
            productsMap[item.productId] = item.quantity;
          }
        });
      });

      const bestSellerIds = Object.keys(productsMap).filter(
        (productId) => productsMap[productId] > 30
      );

      const bestSellerProductsData = allProductsData.filter(product => {
        return product.type.some(type => bestSellerIds.includes(type._id));
      });
      setBestSellerProducts(bestSellerProductsData);
      console.log("Best Seller Products:", bestSellerProducts);
    }
  }, [orderData, allProductsData, orderPending, orderError, bestProdPending, bestProdErr]);

  if (orderPending || bestProdPending) return "Loading...";
  if (orderError || bestProdErr) return "An error has occurred";

  return (
    <div className="mt-12">
      <div className="flex flex-wrap justify-between items-center">
        {bestSellerProducts.map((item, index) => (
          <div
            key={index}
            className="border border-slate-400 rounded-tr-md rounded-tl-md my-2"
          >
            <div className="relative overflow-hidden flex justify-center items-center rounded-tr-md rounded-tl-md bg-slate-200 group">
              <img
                src={`${item.type[0].img}`}
                className="object-cover z-10 group-hover:scale-105 transition-transform duration-500 ease-linear"
                style={{ width: bestProdWidth, height: bestProdHeight }}
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