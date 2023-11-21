import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const handleReadMore = () => {
    navigate(`/blog-detail`);
  };

  return (
    <div className="mx-12 mt-12 h-[100vh]">
      <h1 className="relative flex justify-center items-center font-fontbody text-2xl font-semibold text-center">
        Blogs
        <div className="h-1 w-16 bg-header absolute top-9" />
      </h1>
      <div className="flex items-center justify-around mt-10 space-x-4">
        {blogData.map((item, index) => (
          <div key={index}>
            <div className="">
              <img
                src={require(`../../Assets/images/Blog/${item.img}`)}
                className="object-cover"
                style={{ width: "100%", height: "400px" }}
                alt=""
              />
            </div>
            <div className="text-gray-500">{formatDate(item.date)}</div>
            <div className="w-full h-24">
              <div className="h-12 text-center">
                <text className="font-semibold text-lg text-comTxt font-fontbody">
                  {item.title}
                </text>
              </div>
              <div className="w-full mt-2">
                <span className="text-gray-600 text-sm font-fontbody">
                  {truncateTxt(item.overview, 75)}
                </span>
                <button
                  className="pl-4 hover:text-comTxt relative transition-all duration-300 ease-in group"
                  onClick={() => handleReadMore()}
                >
                  <text className="font-fontbody">Read More...</text>
                  <span className="h-1 w-22 absolute inset-0 left-4 top-5 bg-comTxt transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in"></span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
