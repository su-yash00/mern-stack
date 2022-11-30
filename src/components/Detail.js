import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {useParams} from "react-router"
import {addToCart} from "../store/cartSlice"
import {useNavigate} from 'react-router-dom';


const Detail = () => {
    const {id} = useParams();
    const [product,setProduct] = useState({})
    const [loading,setLoading] = useState(false)
    const { title, price, description, category, image, rating } = product;
    const dispatch = useDispatch()
    const navigate  = useNavigate()


    const handleAddToCart = () => {
        dispatch(addToCart(product));
        navigate('/cart');
      };

    useEffect(()=> {
        const getProduct = async () => {
            setLoading(true)
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    setProduct(await response.json())  
    setLoading(false)     
    }
    getProduct();
        }, [])



const Loading = () => {
    return (
        <>
           Loading....
        </>
       
      )

}

const ShowProduct = ({product}) => {
    return(
       <>
       <div className="col-md-6">
        <img src={image} alt={title} height="400px" width="400px"/>
       </div>
       <div className="col-md-6">
        <h4 className='text-uppercase text-black-50'>
            {category}
        </h4>
        <h1 className="display-5">{title}</h1>
        <p className="lead fw-bolder">
            Rating {rating && rating.rate}
        </p>
        <h3 className='display-6 fw-bold my-4'>$ {price}</h3>
        <p className='lead'>{description}</p>
        <button type="button" onClick={handleAddToCart} className="btn btn-outline-dark  px-3">Add to Cart</button>
                
       </div>
       </>
       
    )
}

  return (
    <div>
        <div className="container py-5">
            <div className="row py-5">
                {loading ? <Loading/> : <ShowProduct/>}
            </div>
        </div>
    </div>
  )
}

export default Detail

