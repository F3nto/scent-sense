import React from "react";

const DealProdPag = ({
  totalLength,
  itemPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pageNum = Math.ceil(totalLength / itemPerPage);

  const renderPaginationShapes = () => {
    const delta = 2; 
    const showEllipsis = delta * 2 + 1 < pageNum;

    const shapes = [];

    for (let i = 1; i <= pageNum; i++) {
      if (
        i === 1 ||
        i === pageNum ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        shapes.push(
          <CustomPaginationShape
            key={i}
            onClick={() => setCurrentPage(i)}
            active={i === currentPage}
          />
        );
      } else if (showEllipsis && shapes[shapes.length - 1] !== "...")
        shapes.push("...");
    }

    return shapes;
  };

  const CustomPaginationShape = ({ onClick, active }) => {
    return (
      <div
        className={`w-4 h-4 rounded-full cursor-pointer ${
          active ? "bg-header" : "bg-gray-400"
        }`}
        onClick={onClick}
      ></div>
    );
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {renderPaginationShapes()}
    </div>
  );
};

export default DealProdPag;
