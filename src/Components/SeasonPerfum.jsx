import React, { useEffect, useState } from "react";

const SeasonPerfum = () => {
  let phts = [
    { img: require("../Assets/images/winter.jpg") },
    { img: require("../Assets/images/rainy.jpeg") },
    { img: require("../Assets/images/autumn1.jpg") },
  ];

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    let rightSlider = () => {
      setSlideIndex((idx) => (idx === phts.length - 1 ? 0 : idx + 1));
    };

    const carousel = setInterval(rightSlider, 5000);
    return () => clearInterval(carousel);
  }, [phts.length]);

  return (
    <div className="mt-3 flex mb-10 bg-[#ffffff] border border-slate-200 shadow-black shadow-sm">
      <div className="w-full mx-12 relative overflow-hidden py-10">
        <img
          src={phts[slideIndex].img}
          className="w-full object-cover"
          style={{ height: "450px" }}
        />
      </div>
    </div>
  );
};

export default SeasonPerfum;
