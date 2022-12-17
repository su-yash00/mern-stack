import React, {useState,} from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeItems } from "../store/cart";
import { deleteProduct, fetchProducts } from "../store/products";
import { deleteProductById} from "../store/products";

const Product = ({ product }) => {
  // const {products, loading} = useSelector((state) => state.products)
  const { title, price, category, image, _id } = product;
  const id = _id;
  const dispatch = useDispatch();

//  useEffect(()=>{
//   dispatch(fetchProducts())
//  }, [])

  const deleteCurrentProduct =  () => {
    // let result = await  fetch(`http://localhost:8080/product/${id}`,{
    //   method:'delete'
    // })
    // result = await result.json() 
    if(window.confirm("Are you sure you want to delete")){

      dispatch(deleteProductById(_id));
    }
  }

  const handleAdd = (product) => {
    dispatch(addToCart(product));
  };

   return (
    // <div className="container">
    //   <div className="row">
    //     <div className="card-deck">
    //       {
    //         products.map((product)=>(
    //           <div>
    //             {product.title}
    //           </div>
    //         ))
    //       }
    //     </div>
    //   </div>
    // </div>

    <div className="col col-4 pb-5">
      <div className="card">
        <img
          className="card-img-top"
          src={image}
          alt="Card img cap"
        />
        <div className="card-body">
          <h5 className="card-title">
            {title.slice(0, 45)}... - ${price}
          </h5>
          <div className="badge badge-dark text-danger">{category}</div>
          <span className="btn btn-danger my-2" onClick={deleteCurrentProduct}>
            Delete
          </span>
          <span
            className="btn btn-primary mx-1"
            onClick={() => handleAdd(product)}
          >
            Add to cart
          </span>
          <Link to={`/details/${product._id}`} className="btn btn-primary my-1">
            {" "}
            Product Details
          </Link>
          <Link to={`/update/${product._id}`} className="btn btn-primary my-1 mx-3">
            {" "}
            Update
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;