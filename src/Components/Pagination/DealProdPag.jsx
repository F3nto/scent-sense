import React from "react";

const DealProdPag = ({
  totalLength,
  itemPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalLength / itemPerPage); i++) {
    //! (16/8) if(2.5) output 3, if(2.125) output 3 // 1,2
    pageNumbers.push(i);
  }

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
      {pageNumbers.map((pageNum) => (
        <CustomPaginationShape
          key={pageNum}
          onClick={() => setCurrentPage(pageNum)}
          active={pageNum === currentPage}
        />
      ))}
    </div>
  );
};

export default DealProdPag;
