import React from "react";
import { getOrderList } from "../Api/OrdereListApi";
import { useQuery } from "@tanstack/react-query";

const OrderHistory = () => {
  const { error, isPending, data } = useQuery({
    queryKey: ["order-list"],
    queryFn: getOrderList,
  });


  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const formatId = (id) => {
    const paddedId = String(id).padStart(9, "0");
    return paddedId.slice(-9);
  };

  const formatDate = (date) => {
    const format = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, format);
  };

  return (
    <div className="h-[100vh] mx-40 mt-12">
      <h1 className="relative flex justify-center items-center text-3xl font-bold">
        Order List
        <div className="h-1 w-28 flex bg-header absolute top-9" />
      </h1>
      {data.data.length !== 0 ? (
        <div>
          {data.data.map((order, orderIndex) => (
            <div key={orderIndex} className="mt-10 border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-gray-600 font-semibold">Order ID:</span>{" "}
                  {formatId(order._id)}
                </div>
                <div className="text-gray-500">{formatDate(order.date)}</div>
              </div>
              {order.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center justify-between bg-slate-300 rounded-md p-4 mb-4"
                >
                  <div className="w-28 h-28 relative flex justify-center items-center rounded-sm shadow-black shadow-sm bg-slate-300">
                    <img
                      src={item.img}
                      alt=""
                      className={`object-cover z-10 w-full h-full`}
                    />
                    <div className="w-20 h-20 rounded-full bg-[#ffffff] absolute" />
                  </div>
                  <div className="w-1/2 ml-4">
                    <div className="font-semibold">{item.name}</div>
                    <div>
                      <span className="text-gray-600">Price:</span> $
                      {item.price}
                    </div>
                    <div>
                      <span className="text-gray-600">Quantity:</span>{" "}
                      {item.quantity}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Total:</span> $
                    {item.price * item.quantity}
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-600 font-semibold">User ID:</span>{" "}
                  {formatId(order.userId)}
                </div>
                <div className="">
                  <div>Phone: {order.phone}</div>
                  <div>Address: {order.address}</div>
                  <div>City: {order.city}</div>
                </div>
                <div>
                  <div className="font-semibold">Total Price:</div>
                  <div>${order.totalPrice}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-40">
          <div className="">
            <text className="font-fontbody text-3xl text-comTxt">
              No Order List !!!
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
  );
};

export default OrderHistory;
