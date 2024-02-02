import React, { useState, useRef } from "react";
import { StarOutline, StarRate, StarHalf } from "@mui/icons-material";

const Star = ({ stars }) => {
  const [selectedRating, setSelectedRating] = useState(stars);

  const handleClick = (index) => {
    if (selectedRating === index + 0.5) {
      setSelectedRating(index + 1);
    } else {
      setSelectedRating(index + 0.5);
    }
  };

  const ratingStars = Array.from({ length: 5 }, (element, index) => {
    const rating = index + 1;
    return (
      <span
        key={index}
        onClick={() => handleClick(index)}
        className={`star-icon ${
          selectedRating >= rating
            ? "filled"
            : selectedRating >= rating - 0.5
            ? "half-filled"
            : ""
        }`}
      >
        {selectedRating >= rating ? (
          <StarRate style={{ width: "27px", height: "27px" }} className="text-orange-400" />
        ) : selectedRating >= rating - 0.5 ? (
          <StarHalf style={{ width: "27px", height: "27px" }} className="text-orange-400" />
        ) : (
          <StarOutline style={{ width: "27px", height: "27px" }} className="text-orange-400" />
        )}

      </span>
    );
  });

  return (
    <div className="icon-style flex items-center">
      {ratingStars} 
      <span className="rating-number ml-3 font-fontbody text-lg font-semibold text-comTxt">{selectedRating}-Ratings</span> 
    </div>
  );
};

export default Star;