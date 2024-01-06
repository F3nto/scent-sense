import React from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart?.cartArr);
  console.log("cart Item...", cart);

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
      renderCell: (params) => (
        <div className="flex items-center">
          <div className="">{cart[params.row.id - 1].name}</div>
        </div>
      ),
    },
    { field: "price", 
    headerName: "Price", 
    width: 120,
    renderCell : (params) => {
      const item = cart[params.row.id - 1];
      const prices = item.type === "TreasureProd" ? item.price : item.type[0].price;

      return (
        <div>{prices}</div>
      );
     }  
   },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "total", headerName: "Total", width: 120 },
  ];
  

 
  const rows = cart.map((item, index) => ({
    id: index + 1,
    quantity: "quantity", // Replace with actual quantity
    total: "total", // Replace with actual total
  }));

  return (
    <div className="container mx-auto mt-12">
      <div className="text-center mt-12">
        <h1 className="relative inline-block text-3xl font-bold">
          Shopping Cart
          <div className="h-1 w-20 bg-header absolute top-9" />
        </h1>
      </div>

      <div className="flex justify-center items-center mt-10">
        <div style={{ height: 400, width: "70%" }}>
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
    </div>
  );
};

export default ShoppingCart;
