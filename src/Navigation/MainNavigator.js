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
import SignUp from "../Auth/SignUp";
import MyAccount from "../Auth/MyAccount";
import OrderHistory from "../History/OrderHistory";
import DeliveryInfo from "../History/DeliveryInfo";


const MainNavigator = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path = "/sign-up" Component={SignUp} />
        <Route path="/blog-detail" Component={BlogDetail}/>
        <Route path="/all-products" Component={AllProd}/>
        <Route path="/treasure-products" Component={TreasureProd}/>
        <Route path="/product-detail" Component={ProductDetail} />
        <Route path="/treasure-product-detail" Component={TreasureProdDetail} />
        <Route path="/my-account" Component={MyAccount} />
        <Route path="/order-history" Component={OrderHistory}/>
        <Route path="/shopping-cart" Component={ShoppingCart} />
        <Route path="/delivery-info" Component={DeliveryInfo}/>
      </Routes>
    </BrowserRouter>
  );
};

export default MainNavigator;
