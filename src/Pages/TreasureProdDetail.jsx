import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";

const TreasureProdDetail = () => {
  const location = useLocation();

  const {
    state: { item },
  } = location;

  const [expanded, setExpanded] = useState(false);
  const [qty, setQty] = useState(1);
  const [hoverState, setHoverState] = useState({
    remove: false,
    add: false,
  });

  const handleMouseEnter = (btnName) => {
    setHoverState((prevState) => ({
      ...prevState,
      [btnName]: true,
    }));
  };

  const handleMouseLeave = (btnName) => {
    setHoverState((prevState) => ({
      ...prevState,
      [btnName]: false,
    }));
  };

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

  const increaseQtyHandler = () => {
    setQty(qty + 1);
  };

  const decreaseQtyHandler = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleQtyChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQty(isNaN(value) ? 1 : value)

  }

  return (
    <div className="mx-12 mt-12">
      <div className="flex">
        <div className="w-1/2">
          <img
            src={require(`../Assets/images/TreasureProd/${item.img}`)}
            className="object-cover shadow-slate-500 shadow-md"
            alt=""
          />
        </div>

        <div className="flex flex-1 flex-col -ml-8 space-y-6">
          <text className="font-fontbody text-2xl">{item.name}</text>
          <text className="font-fontbody text-comTxt text-xl tracking-wider">
            {item.price}
          </text>

          <div className="h-1 w-36 bg-header"></div>

          <div className="w-full">
            <span className="font-fontbody text-comTxt">
              {truncateTxt(item.desc, 100)}
            </span>

            <button
              onClick={() => handleReadMore()}
              className="pl-4 hover:text-comTxt relative transition-all duration-300 ease-in group"
            >
              <span className="font-fontbody text-slate-700">
                {expanded ? "Read Less" : "Read More..."}
              </span>
              <span className="absolute inset-0 left-4 top-5 bg-slate-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </button>
          </div>
          <text className="font-fontbody text-comTxt text-lg">
            <span className="font-fontbody text-slate-700">Brand -</span>
            {item.brand}
          </text>
          <text className="font-fontbody text-comTxt text-lg">
            <span className="font-fontbody text-slate-700">Gender -</span>
            {item.gender}
          </text>

          <div className="flex space-x-10">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => decreaseQtyHandler()}
                onMouseEnter={() => handleMouseEnter("remove")}
                onMouseLeave={() => handleMouseLeave("remove")}
                className="bg-header px-2 py-2 rounded-lg hover:bg-hovcolor shadow-slate-600 shadow-md"
              >
                <Remove
                  style={{ color: hoverState.remove ? "#fff" : "#000" }}
                />
              </button>
              <input
                type="text"
                value={qty}
                onChange={handleQtyChange}
                className="border w-12 text-center border-slate-400 focus:outline-none focus:bg-slate-100"
              />
              <button
                onClick={() => increaseQtyHandler()}
                onMouseEnter={() => handleMouseEnter("add")}
                onMouseLeave={() => handleMouseLeave("add")}
                className="bg-header px-2 py-2 rounded-lg hover:bg-hovcolor shadow-slate-600 shadow-md"
              >
                <Add style={{ color: hoverState.add ? "#fff" : "#000" }} />
              </button>
            </div>
            <div>
              <button className="px-5 bg-gradient-to-r from-header to-hovcolor py-2 rounded-lg hover:from-hovcolor hover:to-comTxt shadow-slate-600 shadow-md group">
                <span className="font-fontbody group-hover:text-white">
                  Add To Cart
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreasureProdDetail;
