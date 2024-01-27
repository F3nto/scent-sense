import React, { useState, useRef } from "react";
import { StarOutline, StarRate, StarHalf } from "@mui/icons-material";

const Star = ({ stars }) => {
  const [selectedRating, setSelectedRating] = useState(stars);
  const starRef = useRef();

  const handleMouseMove = (e) => {
    if (!starRef.current) return;

    const starRect = starRef.current.getBoundingClientRect();
    const starWidth = starRect.width / 5;
    const offsetX = e.clientX - starRect.left;
    let newRating = Math.ceil(offsetX / starWidth);

    if (e.clientX - starRect.left - starWidth * (newRating - 0.5) < 0) {
      newRating -= 0.5;
    }

    setSelectedRating(newRating);
  };

  const handleComfirmRating = () => {
    setSelectedRating(stars);
  };

  const ratingStars = Array.from({ length: 5 }, (element, index) => {
    const number = index + 0.5; 
    return (
      <span
        key={index}
        onMouseMove={handleMouseMove}
        onClick={handleComfirmRating}
        className={`star-icon ${
          selectedRating >= index + 1
            ? "filled"
            : selectedRating >= number
            ? "half-filled"
            : ""
        }`}
      >
        {selectedRating >= index + 1 ? (
          <StarRate style={{width:"30px", height:"30px"}} className="text-orange-300" />
        ) : selectedRating >= number ? (
          <StarHalf style={{width:"30px", height:"30px"}} className="text-orange-300" />
        ) : (
          <StarOutline style={{width:"30px", height:"30px"}} className="text-orange-300" />
        )}
      </span>
    );
  });

  return (
    <div className="icon-style flex items-center" ref={starRef}>
      {ratingStars}
    </div>
  );
};

export default Star;