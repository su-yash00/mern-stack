import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const items = useSelector((state) => state.cart);
  // state = whole application state

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container -fluid">
          <Link className="navbar-brand" to="/">
            {" "}
            MyStore
          </Link>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                {" "}
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/cart">
                {" "}
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/add">
                {" "}
                Add Product
              </Link>
            </li>
          </ul>
          <span className="navbar-text">
            {" "}
            Cart Items: {items.cartItems.length}
          </span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;