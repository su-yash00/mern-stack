import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../store/products";
import { addToCart, addCart } from '../store/cartSlice'
import {NavLink, useNavigate} from 'react-router-dom';
const Product = ({ product }) => {
  const { title, price, description, category, image, rating, id } = product;
  const { rate } = rating;
  const dispatch = useDispatch();
  const navigate  = useNavigate()

  const deleteCurrentProduct = () => {
    dispatch(deleteProduct(id));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate('/cart');
  };


  return (
    <div className="col col-3 pb-5">
      <div className="card text-center">
        <img className="card-img-top mx-5" style={{height:'20vh', width:'12vw'}} src={image} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">
            {title.substring(0,20)} 
            <br/>
             ${price}
          </h5>
          <div className="badge badge-dark text-danger">{category}</div>
          <br/>
          <div className="btns">
          <button type="button" onClick={() => handleAddToCart(product)} className="btn btn-primary">Add to Cart</button>
          <NavLink to={`/products/${id}`} className="btn btn-outline-dark">
            Detail
          </NavLink>
          {/* <button type="button" onClick className="btn btn-primary">Detail</button> */}
          <button className="btn btn-danger" onClick={deleteCurrentProduct}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
