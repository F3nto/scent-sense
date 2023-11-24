import React, { useEffect, useState } from "react";
import axios from "axios";

const PromoSession = () => {
  const [promodata, setPromoData] = useState([]);

  useEffect(() => {
    const url = "http://localhost:4000/api/v1/promo";

    axios
      .get(`${url}`)
      .then((res) => {
        setPromoData(res.data);
      })
      .catch((err) => {
        console.log("error...", err);
      });
  }, []);
  const getInitialHeight = () => {
    return window.innerWidth >= 768 ? "100%" : "200px";
  };

  const updateWindowDimensions = () => {
    setPromoImgHeight(getInitialHeight());
  };

  useEffect(() => {
    const handleResize = () => {
      updateWindowDimensions();
    };

    updateWindowDimensions();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [promoImgHeight, setPromoImgHeight] = useState(getInitialHeight());

  return (
    <div className="mx-2 mt-12 sm:md:mx-12">
      {promodata.map((item) => (
        <>
          <div
            key={item._id}
            className="relative flex justify-center items-center "
          >
            <img
              src={require(`../Assets/images/promosession/${item.img}`)}
              className="w-full object-cover"
              style={{ height: promoImgHeight }}
              alt=""
            />
            <div className="absolute inset-0 top-1/2 left-28">
              <text className="font-fontbody text-3xl ">
                {item.discount}% off Products
              </text>
            </div>
            <div className="absolute mt-28">
              <button className="relative text-black hover:text-[#b56d50] transition-all duration-300 group">
                <text className="font-fontbody text-2xl font-semibold underline-offset-8 underline hover:no-underline">
                  Shop Now
                </text>
                <span className="absolute inset-0 h-1 top-8 bg-[#b56d50] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in" />
              </button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default PromoSession;
