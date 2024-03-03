import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
// import { Remove, Add } from "@mui/icons-material";
// import { addToCart } from "../Redux/features/addToCartSlide";
// import { updateInstock } from "../Redux/features/instockSlice";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import DeliveryInfo from "../History/DeliveryInfo";
import Footer from "../Components/Footer"
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const ShoppingCart = () => {
  const cart = useSelector((state) => state?.cart?.cartArr);
  const user = useSelector((state) => state.user?.userArr)
  

  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const instock = useSelector((state) => state.instock?.instock);

  const allTotal = cart.reduce((total, item) => {
    const itemTotal = item.price * item.qty;
    return total + itemTotal;
  }, 0);
 
  const formRef = useRef(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" });
      }
    }, 1000); 
  
    return () => clearTimeout(timeout); 
  }, []);
  

  //! payment integration

  const handleBuyNow = async () => {
    const stripe = await loadStripe(
      "pk_test_51OkzgqImpQsfXZBiF0eWVW4ukWHIFGms07voQguixso5kD9Eak5ka5MPQ3W303092gnWYjE95m7LW481QRFCOmsn00AtXb1NjH"
    );
    const body = { product: cart, allTotalPrice: allTotal };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch("http://localhost:4000/api/checkout", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if ((await result).error) {
      console.log((await result).error);
    }
  };

  //! columns

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "img",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        const item = cart[params.row.id - 1];
        return (
          <div className="w-12 h-12 relative flex justify-center items-center rounded-sm shadow-black shadow-sm bg-slate-300">
            <img
              src={item.img}
              alt=""
              className={`object-cover z-10 w-full h-full`}
            />
            <div className="w-10 h-10 rounded-full bg-[#ffffff] absolute" />
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Item",
      width: 200,
      renderCell: (params) => {
        const item = cart[params.row.id - 1]; // is happen item.type.
        return (
          <div className="flex items-center">
            <div className="">{item.name}</div>
          </div>
        );
      },
    },
    {
      field: "Bottle Size",
      headerName: "Bottle Size",
      width: 100,
      renderCell: (params) => {
        const item = cart[params.row.id - 1]; // is happen item.type.
        return (
          <div className="flex items-center">
            {item.type === "TreasureProd" ? (
              <div className="">set</div>
            ) : (
              <div className="">{item.size} ml</div>
            )}
          </div>
        );
      },
    },
    {
      field: "Instock",
      headerName: "Instock",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex items-center">{params?.row?.instock - 1}</div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      renderCell: (params) => {
        const item = cart[params.row.id - 1];
        return <div>$ {item.price}</div>;
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 120,
      renderCell: (params) => {
        return <div>{params?.row?.quantity}</div>;
      },
    },
    {
      field: "total",
      headerName: "Total Price",
      width: 120,
      renderCell: (params) => {
        const item = cart[params.row.id - 1];
        const total = item.price * item.qty;
        return <div>$ {total}</div>;
      },
    },
  ];

  //! Rows

  const rows = cart?.map((item, index) => ({
    id: index + 1,
    instock: instock[item._id],
    quantity: (
      <div className="flex items-center justify-center">
        {/* <button
          onClick={() => decreaseQtyHandler(item._id)}
          className="bg-header px-2 py-1.5 rounded-lg hover:bg-hovcolor shadow-slate-600 shadow-md"
        >
          <Remove className="hover:text-white" />
        </button> */}
        <input
          value={item.qty}
          className="border w-12 py-1 shadow-slate-300 shadow-inner text-center rounded-md focus:outline-none focus:bg-slate-100"
        />
        {/* <button
          onClick={() => increaseQtyHandler(item._id)}
          className="bg-header px-2 py-2 rounded-lg hover:bg-hovcolor shadow-slate-600 shadow-md"
        >
          <Add className="hover:text-white" />
        </button> */}
      </div>
    ),
  }));

  return (
    <>
    <div className="container mx-12 mt-12 h-[150vh]" >
      <div className="text-center mt-12">
        <h1 className="relative flex justify-center items-center text-3xl font-bold">
          Shopping Cart
          <div className="h-1 w-28 flex bg-header absolute top-9" />
        </h1>
      </div>
      {cart?.length > 0 ? (
        <div className="flex flex-col justify-between items-center mt-10">
          <div
            style={{ height: 400, width: "70%", backgroundColor: ["#eaf4f4"] }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection={false}
              disableSelectionOnClick
            />
          </div>

          <div ref={formRef}  className="flex items-center justify-center w-full">
            <div className="w-1/2">
              <DeliveryInfo
              onFormCompletionChange={setIsFormCompleted}
              allTotal = {allTotal} 
              />
            </div>

            <div className="w-80">
              <div className="bg-slate-600 p-6 text-white">
                <div className="text-xl font-bold mb-4">Order Summary</div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>$subtotal</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Shipping:</span>
                  <span>free shipping</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>All Total:</span>
                  <span>$ {allTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleBuyNow()}
                  disabled={!isFormCompleted} 
                  className={`mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full ${
                    !isFormCompleted ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <text className="font-semibold">Buy Now</text>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-40">
          <div className="">
            <text className="font-fontbody text-3xl text-comTxt">
              No Cart Item !!!
            </text>
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
    <Footer />
    </>
  );
};

export default ShoppingCart;
