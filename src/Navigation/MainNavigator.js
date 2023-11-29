import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


//! Pages
import Home from "../Pages/Home";
import BlogDetail from "../Pages/BlogDetail";
import DealProdDetail from "../Pages/DealProdDetail";


const MainNavigator = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/blog-detail" Component={BlogDetail}/>
        <Route path="/deal-product" Component={DealProdDetail} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainNavigator;
