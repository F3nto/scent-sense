import React from "react";

const AllTreasurePag = ({
  totalLength,
  itemPerPage,
  setCurrentPage,
  currentPage,
  currentPost,
}) => {
  const pageNum = Math.ceil(totalLength / itemPerPage);

  const renderPaginationNumbers = () => {
    const delta = 2;
    const showEllipsis = delta * 2 + 1 < pageNum;

    const pages = [];

    for (let i = 1; i <= pageNum; i++) {
      if (
        i === 1 ||
        i === pageNum ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(
          <CustomPaginationNum
            key={i}
            onClick={() => setCurrentPage(i)}
            active={i === currentPage}
            pageNum={i}
          />
        );
      } else if (showEllipsis && pages[pages.length - 1] !== "...")
        pages.push("...");
    }

    return pages;
  };

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
      {renderPaginationNumbers()}
    </div>
  );
};

export default AllTreasurePag;
