import React from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { Remove, Add } from "@mui/icons-material";
import { decQty, incQty, setQty } from "../Redux/features/qtyControlSlide";

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart?.cartArr);
  const qty = useSelector((state) => state.qtyAndInstockController?.quantity);
  console.log("cart Item...", cart);
  const dispatch = useDispatch();

  const handleQtyChange = (event) => {
    const value = parseInt(event.target.value, 10);
    dispatch(setQty(isNaN(value) ? 1 : value));
  };

  const increaseQtyHandler = () => {
    dispatch(incQty());
  };

  const decreaseQtyHandler = () => {
    dispatch(decQty());
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
        const imgSrc =
          item.type === "TreasureProd" ? item.img : item.type[0].img;

        return (
          <div className="w-12 h-12 relative flex justify-center items-center rounded-sm shadow-black shadow-sm bg-slate-300">
            <img
              src={imgSrc}
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
      width: 250,
      renderCell: (params) => {
        const item = cart[params.row.id - 1];
        return (
          <div className="flex items-center">
            <div className="">{item.name}</div>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      renderCell: (params) => {
        const item = cart[params.row.id - 1];
        const prices =
          item.type === "TreasureProd" ? item.price : item.type[0].price;

        return <div>{prices}</div>;
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => decreaseQtyHandler()}
              className="bg-header px-2 py-1.5 rounded-lg hover:bg-hovcolor shadow-slate-600 shadow-md"
            >
              <Remove
                className="hover:text-white"
                style={{ width: "20px", height: "20px" }}
              />
            </button>
            <input
              type="text"
              value={qty}
              onChange={handleQtyChange}
              className="border w-12 py-1 shadow-slate-300 shadow-inner text-center rounded-md focus:outline-none focus:bg-slate-100"
            />
            <button
              onClick={() => increaseQtyHandler()}
              className="bg-header px-2 py-2 rounded-lg hover:bg-hovcolor shadow-slate-600 shadow-md"
            >
              <Add
                className="hover:text-white"
                style={{ width: "20px", height: "20px" }}
              />
            </button>
          </div>
        );
      },
    },
    { field: "total", headerName: "Total", width: 120 },
  ];

  //! Rows

  const rows = cart.map((item, index) => ({
    id: index + 1,
    quantity: qty,
  }));

  return (
    <div className="container mx-auto mt-12">
      <div className="text-center mt-12">
        <h1 className="relative flex justify-center items-center text-3xl font-bold">
          Shopping Cart
          <div className="h-1 w-28 flex bg-header absolute top-9" />
        </h1>
      </div>
      {cart.length > 0 ? (
        <div className="flex justify-center items-center mt-10">
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

          <div className="flex-1 bg-orange-600 p-6 text-white">
            <div className="text-xl font-bold mb-4">Order Summary</div>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>$subtotal</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Shipping:</span>
              <span>$shipping</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Total:</span>
              <span>$total</span>
            </div>
            <button className="mt-4 bg-white text-orange-600 py-2 px-4 rounded-full">
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-40">
          <div className=""> 
            <text className="font-fontbody text-3xl text-comTxt">No Cart Item !!!</text>
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
  );
};

export default ShoppingCart;
