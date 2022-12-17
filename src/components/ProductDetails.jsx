import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../store/products"; 
import { Link } from "react-router-dom";
import { addToCart } from '../store/cart'

const ProductDetails = () => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Product, setProduct] = useState([]);
    const [Loading, setLoading] = useState(false);

    const [error, setError] = useState('');
    
    const getProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(`http://localhost:8080/product/${id}`);
        const productDetails = await response.json();

        if(response.status === 200) {
          setProduct(productDetails);
          setLoading(false);
          return;
        } else {
          setLoading(false);
          setError(productDetails.message)
        }
      } catch (error) {
        
      }
    };

    const handleAddToCart = () => {
        dispatch(addToCart(Product));
        navigate("/Cart")
    
    
      };
  
    useEffect(() => {
      getProduct();
    }, []);
    
    const loading = useSelector(state => state.cart)
//   useEffect(() => {
//     if (id && id !== "") fetchProductDetail(id);
//     return () => {
//       dispatch(deleteProduct());
//     };
//   }, [id]);

if(!Loading && error) return error;

  return (
    <>
    <div className="container">
      <div className="row">
        {Loading ? (
          <div> Loading...</div>
        ) : (
          <>
            <div className="col-md-6 my-4">
              <img
                src={Product.image}
                alt={Product.title}
                style={{
                  width: "100%",
                  height: "auto"
                }}
              />
            </div>

            <div className="col-md-6 pt-3">
              <h4 className="text-uppercase text-black-50">
                {" "}
                {Product.category}{" "}
              </h4>
              <h6> {Product.title}</h6>
              {/* <p className="lead">
                Rating: {Product.rating && Product.rating.rate}{" "}
                <i className="fa-solid fa-star"></i>
              </p> */}
              <p className="lead" dangerouslySetInnerHTML={
                {__html: Product.description}
              } style={{
                fontSize: 14
              }}/>
            </div>
          </>
        )}
        <span className="btn btn-warning" onClick={() => handleAddToCart()}><Link to={'/cart'}>Add to Cart</Link></span>
      </div>
    </div>
  </>
  );
};

export default ProductDetails;