import React from "react";

const AllProductsPag = ({
  totalLength,
  itemPerPage,
  setCurrentPage,
  currentPage,
  currentPost,
}) => {
  const pageNum = [];

  for (let i = 1; i <= Math.ceil(totalLength / itemPerPage); i++) {
    pageNum.push(i);
  }

  const CustomPaginationNum = ({ onClick, pageNum, active }) => {
    return (
      <button
        className={`text-center w-8 h-8 hover:bg-header rounded-md cursor-pointer
        ${active ? "bg-header text-white" : "bg-gray-100"}`}
        onClick={onClick}
      >
        {pageNum}
      </button>
    );
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {pageNum.map((num) => (
        currentPost.length !== totalLength && (
          <CustomPaginationNum
            key={num}
            onClick={() => setCurrentPage(num)}
            active={num === currentPage}
            pageNum={num}
          />
        )
      ))}
    </div>
  );
};

export default AllProductsPag;