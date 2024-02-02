import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Remove, Add } from "@mui/icons-material";
import {
  incQty,
  decQty,
  setQty,
  setInstock,
} from "../Redux/features/qtyControlSlide";
import { useDispatch, useSelector } from "react-redux";
import Star from "../Components/Star/Star";
import { toast, Toaster } from "react-hot-toast";
import { addToCart } from "../Redux/features/addToCartSlide";
// import { useMutation, useMutationState } from "@tanstack/react-query";
// import axios from "axios";

//! Redux

const ProductDetail = () => {
  const location = useLocation();
  const {
    state: { item },
  } = location;

  const dispatch = useDispatch();

  const qty = useSelector((state) => state.qtyAndInstockController?.quantity);
  const cart = useSelector((state) => state.cart?.cartArr);

  const instockFromRedux = useSelector(
    (state) => state.qtyAndInstockController?.instock
  );

  console.log("instock from redux...", instockFromRedux);

  const [selectedSize, setSelectedSize] = useState(item.type[0].size);
  const [expanded, setExpanded] = useState(false);

  const truncateTxt = (txt, maxlength) => {
    return expanded
      ? txt
      : txt.length > maxlength
      ? txt.slice(0, maxlength) + "..."
      : txt;
  };

  const handleReadMore = () => {
    setExpanded((prev) => !prev);
  };

  const getInitialHeight = () => {
    return window.innerWidth >= 768 ? "100%" : "350px";
  };

  const [prodHeight, setProdHeight] = useState(getInitialHeight());

  const updateWindowdimension = useCallback(() => {
    setProdHeight(getInitialHeight());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      updateWindowdimension();
    };
    updateWindowdimension();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateWindowdimension]);

  // const updateInstock = () => {
  //   const selectedType = item.type.find((prod) => prod.size === selectedSize);
  //   dispatch(
  //     setInstock({ _id: selectedType._id, instock: selectedType.instock })
  //   );
  // };

  // const mutationKey = ["patch"];

  // const mutation = useMutation({
  //   mutationKey,
  //   mutationFn: () => {
  //     return axios.patch(
  //       `http://localhost:4000/api/v1/all-products/${item._id}`,
  //       {
  //         instock: instockFromRedux,
  //       }
  //     );
  //   },
  //   onSuccess: (data) => {
  //     console.log("API put success!", data);
  //   },
  //   onError: (error) => {
  //     console.error("API put fail!!!", error);
  //   },
  // });

  // const { isError, isSuccess } = mutation;

  const handleSizeChange = (newSize) => {
    setSelectedSize(newSize);
  };

  const increaseQtyHandler = () => {
    dispatch(incQty());
  };

  const decreaseQtyHandler = () => {
    dispatch(decQty());
  };

  const handleQtyChange = (event) => {
    const value = parseInt(event.target.value, 10);
    dispatch(setQty(isNaN(value) ? 1 : value));
  };

  // useEffect(() => {
  //   updateInstock();
  //   if(instockFromRedux) {
  //     mutation.mutate()
  //   }
  // }, [item, selectedSize]);

  const handleCart = (clickedItem) => {
    const existingCartItem = cart.find((item) => item._id === clickedItem._id);

    if (!existingCartItem) {
      dispatch(addToCart(clickedItem));
      toast.success("Added to Cart!!!");
    } else {
      toast.success("Item already in Cart!");
    }
  };

  const renderProdImages = () => {
    const selectedType = item.type.find((prod) => prod.size === selectedSize);
    return (
      <div className="w-full sm:w-1/2 flex sm:flex-none justify-center sm:justify-normal items-center">
        <img
          src={`${selectedType.img}`}
          className="object-cover shadow-slate-500 shadow-md"
          alt=""
          style={{ height: prodHeight }}
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
              onClick={() => handleSizeChange(prod.size)}
              className={`border w-20 h-10 rounded-md ${
                prod.size === selectedSize
                  ? "border-slate-500 bg-header shadow-slate-400 shadow-sm"
                  : "bg-slate-200 border-slate-500 hover:bg-header "
              }`}
            >
              <span className="font-fontbody text-md tracking-wider">
                {prod.size} ml
              </span>
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderProdDetail = () => {
    return (
      <div className="flex flex-1 flex-col ml-0 sm:-ml-8 space-y-6 items-center sm:items-start mt-6 sm:mt-0">
        <text className="font-fontbody text-2xl">{item.name}</text>
        <div className="flex items-center">
          <div className="w-32">
            <text className="font-fontbody text-comTxt text-xl tracking-wider">
              $ {item.type.find((prod) => prod.size === selectedSize).price}
            </text>
          </div>
          <div>
            <Star stars={item.star} />
          </div>
        </div>

        <div className="h-1 w-36 bg-header"></div>
        {renderProdSize()}
        <div className="w-full">
          <span className="font-fontbody text-comTxt">
            {truncateTxt(item.desc, 100)}
          </span>
          <button
            onClick={() => handleReadMore()}
            className="pl-0 sm:pl-4 hover:text-comTxt relative transition-all duration-300 ease-in group"
          >
            <span className="font-fontbody text-slate-700">
              {expanded ? "Read Less" : "Read More..."}
            </span>
            <span className="absolute inset-0 left-4 top-5 bg-slate-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </button>
        </div>
        <text className="font-fontbody text-comTxt text-lg">
          <span className="font-fontbody text-slate-700">Brand - </span>
          {item.brand}
        </text>
        <text className="font-fontbody text-comTxt text-lg">
          <span className="font-fontbody text-slate-700">Gender - </span>
          {item.gender}
        </text>

        <div className="flex items-center text-comTxt">
          <span className="font-fontbody text-slate-700">In Stock: </span>
          {instockFromRedux.map((prod) => (
            <span key={prod._id}>{prod.instock}</span>
          ))}
        </div>

        <div className="flex justify-center space-x-10">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => decreaseQtyHandler()}
              className="bg-header px-2 py-2 rounded-lg hover:bg-hovcolor shadow-slate-600 shadow-md"
            >
              <Remove className="hover:text-white" />
            </button>
            <input
              type="text"
              value={qty}
              onChange={handleQtyChange}
              className="border w-12 text-center border-slate-400 focus:outline-none focus:bg-slate-100"
            />
            <button
              onClick={() => increaseQtyHandler()}
              className="bg-header px-2 py-2 rounded-lg hover:bg-hovcolor shadow-slate-600 shadow-md"
            >
              <Add className="hover:text-white" />
            </button>
          </div>
          <div>
            <button
              onClick={() => handleCart(item)}
              className="px-5 bg-gradient-to-r from-header to-hovcolor py-2 rounded-lg hover:from-hovcolor hover:to-comTxt shadow-slate-600 shadow-md group"
            >
              <span className="font-fontbody group-hover:text-white">
                Add To Cart
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="mx-2 sm:mx-12 mt-12">
        <div className="flex flex-col sm:flex-row">
          {renderProdImages()}
          {renderProdDetail()}
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
};

export default ProductDetail;
