import React, {useEffect} from 'react'
import { useSelector } from "react-redux"
import {Link} from "react-router-dom"
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux"
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from "../store/cartSlice"


function Cart() {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTotals())
    }, [cart, dispatch])

    const handleRemoveFromCart = (cartItem) => {
      dispatch(removeFromCart(cartItem)) 
    }

    const handleDecreaseCart = (cartItem) => {
        dispatch(decreaseCart(cartItem))

    }
    const handleIncreaseQuantity = (cartItem) => {
        dispatch(addToCart((cartItem)))
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }

  return (
    <div className='cart-container'>
      <h2>Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
            <p>Your cart is currently empty</p>
            <div className="start-shopping">
                <Link to="/">
                    <BiArrowBack/>
                    <span>Shop Now</span>
                </Link>

            </div>

        </div>
      ): (
      <div>
        <div className="titles">
            <h3 className='product-title'>Product</h3>
            <h3 className='product-price'>Price</h3>
            <h3 className='product-quantity'>Quantity</h3>
            <h3 className='product-total'>Total</h3>
        </div>
        <div className="cart-items">
            {
                cart.cartItems?.map(cartItem => (
                    <div className="cart-item" key={cartItem.id}>
                        <div className="cart-product">
                            <img src={cartItem.image} alt={cartItem.title} />
                            <div>
                                <h3>{cartItem.title}</h3>
                                <p>{cartItem.category}</p>
                                {/* <span>rating: {cartItem.rating.rate}</span> */}
                                <button className="mx-5" onClick={()=> handleRemoveFromCart(cartItem)}>Remove</button>
                            </div>
                        </div>
                        <div className="cart-product-price">${cartItem.price}</div>
                        <div className="cart-product-quantity">
                            <button onClick={()=> handleDecreaseCart(cartItem)}>-</button>
                            <div className="count">{cartItem.cartQuantity}</div>
                            <button onClick={()=>handleIncreaseQuantity(cartItem)}>+</button>
                        </div>
                        <div className="cart-product-totalprice">
                            ${(cartItem.price * cartItem.cartQuantity).toFixed(2)}
                        </div>
                    </div>
                    ))}
        </div>
        <div className="cart-summary">
            <button className="clear-cart" onClick={() => handleClearCart()}>Clear</button>
            <div className="cart-checkout">
                <div className="subtotal">
                    <span>Total :</span>
                    <span className="amount">${cart.cartTotalAmount.toFixed(2)}</span>
                </div>
                    <button>Checkout</button>
                    <div className="continue-shopping">
                    <Link to="/">
                       <BiArrowBack/>
                    <span>Continue</span>
                    </Link>

                </div>
            </div>
        </div>
      </div>
      )}
    </div>

  )
}

export default Cart
