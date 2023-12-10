import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


//! Pages
import Home from "../Pages/Home";
import BlogDetail from "../Pages/BlogDetail";
import DealProdDetail from "../Pages/DealProdDetail";
import BestSellerDetail from "../Pages/BestSellerDetail";
import NewArrivalDetail from "../Pages/NewArrivalDetail";
import AllProd from "../Pages/AllProd";
import TreasureProd from "../Pages/TreasureProd";


const MainNavigator = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/blog-detail" Component={BlogDetail}/>
        <Route path="/deal-product" Component={DealProdDetail} />
        <Route path="/best-seller-product" Component={BestSellerDetail} />
        <Route path="/newarrival-product" Component={NewArrivalDetail}/>
        <Route path="/all-products" Component={AllProd}/>
        <Route path="/treasure-products" Component={TreasureProd}/>
       
      </Routes>
    </BrowserRouter>
  );
};

export default MainNavigator;
