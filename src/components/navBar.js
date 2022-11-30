import React, { useState } from "react";
// import { Link, Routes } from "react-router-dom";
import { useSelector } from "react-redux";


 const Navbar = () => {
  const items = useSelector((state) => state.cart);
    //  const {cartTotalQuantity} = useSelector(state => state.cart)

  return (
    <div>
        
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
        <a className="navbar-brand" href="/">Shop</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <a className="nav-link active" aria-current="/" href="/">Home</a>
            </li>
            {/* <li className="nav-item">
            <a className="nav-link"  href="/product">Product</a>
            </li>  */}
            <li className="nav-item">
              <div className="d-flex">
            <a className="nav-link" href="/cart">Cart</a>
            <span className="mark">{items.cartItems.length}</span>
              </div>
            </li>    
        </ul>
        
        </div>
    </div>
    </nav>
    
    </div>
    
       


    
  );
};

export default Navbar;
