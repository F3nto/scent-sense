import React from "react";
import { useSelector } from "react-redux";

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart?.cartArr);

  return (
    <div className="container mx-auto mt-12">
      <div className="text-center mt-12">
        <h1 className="relative inline-block text-3xl font-bold">
          Shopping Cart
          <div className="h-1 w-20 bg-header absolute top-9" />
        </h1>
      </div>

      <div className="flex justify-center items-center mt-10">
        <table className="w-2/3">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Item</th>
              <th className="py-2 px-4 text-center">Price</th>
              <th className="py-2 px-4 text-center">Quantity</th>
              <th className="py-2 px-4 text-center">Total</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-4 px-4 flex items-center">
                  <div className="flex-shrink-0 w-12 h-12">
                    <div className="relative flex justify-center items-center rounded-sm shadow-black shadow-sm bg-slate-300">
                      <img
                        src={require(`../Assets/images/AllProd/${item.type[0].img}`)}
                        alt=""
                        className={`object-cover z-10 w-full h-full`  }
                      />
                      <div className="w-10 h-10 rounded-full bg-[#ffffff] absolute" />
                    </div>
                  </div>
                  <div className="ml-4">{item.name}</div>
                </td>
                <td className="py-4 px-4 text-center">${item.type[0].price}</td>
                <td className="py-4 px-4 text-center">quantity</td>
                <td className="py-4 px-4 text-center">total</td>
              </tr>
            ))}
          </tbody>
        </table>

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
