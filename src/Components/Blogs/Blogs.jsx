import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BlogPag from "../Pagination/BlogPag";

const Blogs = () => {
  const [blogData, setBlogData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = "http://localhost:4000/api/v1/blog";

    axios
      .get(`${url}`)
      .then((res) => {
        setBlogData(res.data);
      })
      .catch((err) => {
        console.log("error...", err);
      });
  }, []);

  const truncateTxt = (txt, maxlength) => {
    return txt.length > maxlength ? txt.slice(0, maxlength) + "..." : txt;
  };
                      
  const formatDate = (date) => {
    const format = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, format);
  };

 

  const getInitialItemPerPage = () => {
    return window.innerWidth >= 768 ? 3 : 2;
  };

  const getInitialCustomHeight = () => {
    return window.innerWidth >= 768 ? "400px" : "300px";
  }

  const updateWindowDimension = useCallback(() => {
    setItemPerPage(getInitialItemPerPage());
    setCustomHeight(getInitialCustomHeight());
  },[]);

  useEffect(() => {
    const handleResize = () => {
      updateWindowDimension();
    };
    updateWindowDimension();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateWindowDimension]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(getInitialItemPerPage());
  const [customHeight, setCustomHeight] = useState(getInitialCustomHeight());

  const lastItemIndex = currentPage * itemPerPage;       //! 1 * 3 =  3
  const firstItemIndex = lastItemIndex - itemPerPage;     //! 3 - 3 = 0

  const currentPost = blogData.slice(firstItemIndex, lastItemIndex);



  const handleReadMore = (item) => {
    const queryParams = {
      _id : item._id,
      title : item.title
    }

    const url = `/blog-detail?${new URLSearchParams(queryParams).toString()}`

    navigate(url, {state : {item}})
  };  

  return (
    <div className="mx-2 md:sm:mx-12 mt-12">
      <h1 className="relative flex justify-center items-center font-fontbody text-2xl font-semibold text-center">
        Blogs
        <div className="h-1 w-16 bg-header absolute top-9" />
      </h1>
      <div className="flex mt-10 space-x-4">
        {currentPost.map((item, index) => (
          <div key={index}>
            <div className="">
              <img
                src={require(`../../Assets/images/Blog/${item.img}`)}
                className="object-cover"
                style={{ width: "100%", height: customHeight }}
                alt=""
              />
            </div>
            <div className="text-gray-500 text-sm">{formatDate(item.date)}</div>
            <div className="w-full">
              <div className="w-full h-16 text-center">
                <text className="font-semibold text-sm sm:md:text-lg text-comTxt font-fontbody">
                  {item.title}
                </text>
              </div>
              <div className="w-full">
                <span className="text-gray-600 text-sm font-fontbody">
                  {truncateTxt(item.overview, 75)}
                </span>
                <button
                  className="pl-4 hover:text-comTxt relative transition-all duration-300 ease-in group"
                  onClick={() => handleReadMore(item)}
                >
                  <text className="font-fontbody">Read More...</text>
                  <span className="absolute inset-0 left-4 top-5 bg-comTxt transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in"></span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BlogPag
        totalLength={blogData.length}
        itemPerPage={itemPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        currentPost = {currentPost}
      />
    </div>
  );
};

export default Blogs;
