import React from "react";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";

const WishlistItem = ({ item, onClick }) => {
  const imgUrl = item.type === "TreasureProd" ? item.img : item.type[0].img;

  return (
    <div className="">
      <button
        onClick={onClick}
        className="flex items-center my-6 ml-4 hover:bg-slate-300 w-full rounded-xl"
      >
        <div className="relative flex justify-center items-center rounded-sm shadow-black shadow-sm bg-slate-300">
          <img
            src={imgUrl}
            alt=""
            className={`object-cover z-10`}
            style={{ width: "50px", height: "50px" }}
          />
          <div className="w-10 h-10 rounded-full bg-[#ffffff] absolute" />
        </div>
        <div className="ml-4">
          <span className="font-fontbody">{item.name}</span>
        </div>
      </button>
    </div>
  );
};

const FavoriteModal = ({ onClose }) => {
  const wishList = useSelector((state) => state.wishList?.wishListArr);
  const navigate = useNavigate();

  const handleClickView = (item) => {
    const queryParams = {
      _id: item._id,
      name: item.name,
    };

    const url =
      item.differFolder === "TreasureProd"
        ? `/treasure-product-detail?${new URLSearchParams(
            queryParams
          ).toString()}`
        : `/product-detail?${new URLSearchParams(queryParams).toString()}`;

    navigate(url, { state: { item } });
  };

  return (
    <div className="absolute shadow-slate-500 shadow-md right-0 z-20 w-96 h-full mt-4 overflow-y-auto bg-[#FFFAF9]">
      <div className="absolute right-2 top-2">
        <button className="" onClick={onClose}>
          <Close />
        </button>
      </div>
      <div className="mt-6 ">
        <h1 className="relative flex justify-center items-center font-fontbody text-xl font-semibold text-center">
          Favorite Item
          <div className="h-1 w-20 bg-header absolute top-7" />
        </h1>
      </div>

      <div className="">
        {wishList.length > 0 ? (
          wishList.map((item, index) => (
            <WishlistItem
              key={index}
              item={item}
              onClick={() => handleClickView(item)}
            />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center mt-40">
            <div className="">
              <text className="font-fontbody">No WishList Item !!!</text>
            </div>
            <div className="">
              <img
                src={require("../Assets/images/logo-black.png")}
                className="object-cover w-80"
                alt=""
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteModal;
