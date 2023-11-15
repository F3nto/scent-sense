import axios from "axios";
import React, { useState, useEffect } from "react";

const NewArrival = () => {
  const [newArriProd, setNewArriProd] = useState([]);

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

  return (
    <div className="mt-12 flex flex-wrap justify-around items-center">
      {newArriProd.map((item, index) => (
        <div
          key={index}
          className="border border-slate-400 rounded-tr-md rounded-tl-md my-2"
        >
          <div className="relative overflow-hidden flex justify-center items-center rounded-tr-md rounded-tl-md bg-slate-300">
            <img
              src={require(`../../Assets/images/newArrivalProd/${item.img}`)}
              className="object-cover z-10 hover:scale-105 transition-transform duration-500 ease-linear"
              style={{ width: "100%", height: "300px" }}
              alt=""
            />

            <div className="w-52 h-52 rounded-full bg-[#ffffff] absolute"></div>
          </div>
          <div className="text-center mt-2">
            <text className="font-fontbody font-semibold text-md">
              {item.name}
            </text>
          </div>
          <div className="text-center mt-2">
            <text className="font-fontbody text-md text-gray-700">
              ${item.price}
            </text>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewArrival;
