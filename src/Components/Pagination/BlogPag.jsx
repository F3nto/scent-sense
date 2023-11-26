import React from "react";

const BlogPag = ({
  totalLength,
  itemPerPage,
  setCurrentPage,
  currentPage,
  currentPost,
}) => {
  console.log("total length...", totalLength);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalLength / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  const CustomPaginationShape = ({ onClick, active }) => {
    return (
      <div
        className={`w-4 h-4 rounded-sm cursor-pointer
            ${active ? "bg-header" : "bg-gray-400"}`}
        onClick={onClick}
      ></div>
    );
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {pageNumbers.map((pageNum) => (
        <>
          {currentPost.length !== totalLength ? (
            <CustomPaginationShape
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              active={pageNum === currentPage}
            />
          ) : null}
        </>
      ))}
    </div>
  );
};

export default BlogPag;
