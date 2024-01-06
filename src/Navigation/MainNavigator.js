import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//! Pages
import Home from "../Pages/Home";
import BlogDetail from "../Pages/BlogDetail";
import AllProd from "../Pages/AllProd";
import TreasureProd from "../Pages/TreasureProd"; 
import ProductDetail from "../Pages/ProductDetail";
import TreasureProdDetail from "../Pages/TreasureProdDetail";
import ShoppingCart from "../Pages/ShoppingCart";


const MainNavigator = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/blog-detail" Component={BlogDetail}/>
        <Route path="/all-products" Component={AllProd}/>
        <Route path="/treasure-products" Component={TreasureProd}/>
        <Route path="/product-detail" Component={ProductDetail} />
        <Route path="/treasure-product-detail" Component={TreasureProdDetail} />

        <Route path="/shopping-cart" Component={ShoppingCart} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainNavigator;
