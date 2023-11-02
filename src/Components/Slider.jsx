import React, { useState, useEffect } from "react";

const Slider = () => {
  let phts = [
    { img: require("../Assets/images/per1-3.jpg") },
    { img: require("../Assets/images/per1-4.jpg") },
    { img: require("../Assets/images/per1-6.jpg") },
  ];

  const [slideIndex, setSlideIndex] = useState(0);
  // const leftSlider = () => {
  //   setSlideIndex((idx) => (idx === 0 ? phts.length - 1 : idx - 1));
  // };

  const handleDotClick = (index) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    let rightSlider = () => {
      setSlideIndex((idx) => (idx === phts.length - 1 ? 0 : idx + 1));
    };

    const carousel = setInterval(rightSlider, 20000);

    return () => clearInterval(carousel);
  }, [phts.length]);

  return (
    <div className="mx-12 mt-3 flex">
      <div className="w-2/3 bg-slate-600 relative overflow-hidden">
        <img
          src={phts[slideIndex].img}
          className="kenburns-animation opacity-75 object-cover "
          style={{ height: "610px" }}
          alt=""
        />
        <div className="dots flex absolute bottom-0 left-96">
          {phts.map((_, index) => (
            <span
              key={index}
              className={`dot w-2 h-2 m-1 px-2 rounded-md bg-gray-300 ${
                index === slideIndex ? "dot-active bg-slate-600" : ""
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
        <div className="absolute inset-0 top-2/4 left-12 flex-col">
          <div className="animation-custom">
            <text className="font-fontbody text-white font-semibold text-4xl ">
              Find Your Scent
            </text>
          </div>

          <button className="relative text-white hover:text-[#f7bba3] transition-all duration-300 ease-in font-fontbody font-semibold text-xl group">
            <span className="underline underline-offset-4 hover:no-underline">
              Shop Now
            </span>
            <span className="absolute top-6 inset-0 bg-[#f7bba3] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in"></span>
          </button>
        </div>
      </div>
      <div className="flex-1 ml-4 flex-col">
        <div className="bg-slate-400 relative overflow-hidden">
          <div className="transform scale-100 hover:scale-125 transition-all ease-in-out duration-700">
            <img
              src={require("../Assets/images/pick-1-1.jpg")}
              className="object-cover opacity-70"
              style={{ width: "100%", height: "300px" }}
              alt=""
            />
          </div>
          <div className="absolute top-28 left-5 flex-col">
            <div>
              <text className="font-fontbody font-semibold text-white text-3xl">
                Pick Your Items
              </text>
            </div>
            <button className="relative text-white hover:text-[#f7bba3] transition-all duration-300 ease-in font-fontbody font-semibold text-xl group">
              <span className="underline underline-offset-4 hover:no-underline">
                Explore Products
              </span>
              <span className="absolute top-6 inset-0 bg-[#f7bba3] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in"></span>
            </button>
          </div>
        </div>
        <div className="" style={{ marginTop: "10px" }}>
          <div className="bg-slate-400 relative overflow-hidden">
            <div className="transform scale-100 hover:scale-125 transition-all ease-in-out duration-700">
              <img
                src={require("../Assets/images/persets.jpg")}
                style={{ width: "100%", height: "300px" }}
                className="object-cover opacity-70"
                alt=""
              />
              
            </div>
            <div className="absolute top-28 left-5 flex-col">
                <div>
                  <text className="font-fontbody font-semibold text-white text-3xl">
                    Scented Treasures
                  </text>
                </div>
                <button className="relative text-white hover:text-[#f7bba3] transition-all duration-300 ease-in font-fontbody font-semibold text-xl group">
                  <span className="underline underline-offset-4 hover:no-underline">
                    Explore Products
                  </span>
                  <span className="absolute top-6 inset-0 bg-[#f7bba3] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in"></span>
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
