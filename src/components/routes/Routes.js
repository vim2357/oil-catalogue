import React, { useState } from "react";
import { Route, Routes, BrowserRouter, Link  } from "react-router-dom";
import Header from "../home/Header";
import Signup from "../signup/Signup";
import Login from "../login/Login";
import AddProduct from "../addproduct/AddProduct";
import Cart from "../cart/Cart"
const Routess = () => {
    return (
    <>
    <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/cart" element={<Cart />} />
    </Routes>
        
        </>
    )
}

export default Routess