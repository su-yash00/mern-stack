import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
    },

    removeItems(state, action) {
      const nextCartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      state.cartItems = nextCartItems;
    },

    decreaseCart(state, action) {
      //   const itemIndex = state.cartItems.findIndex(
      //     (item) => item._id === action.payload._id
      //   );

      //   if (state.item[itemIndex].cartQuantity > 1) {
      //     state.item[itemIndex].cartQuantity -= 1;
      //   } else if (state.item[itemIndex].cartQuantity === 1) {
      //     const nextCartItems = state.cartItems.filter(
      //       (item) => item._id !== action.payload._id
      //     );
      //     state.cartItems = nextCartItems;
      //   }

      const productID = action.payload;
      const tempProduct = [...state.cartItems]
        .map((pd) => {
          if (pd._id === productID) {
            pd.cartQuantity -= 1;
          }
          return pd;
        })
        .filter((pd) => pd.cartQuantity >= 1);
      state.cartItems = tempProduct;
    },
  },

  // AllTotal(state, action) {
  //   let { total, quantity } = state.cartItems.reduce(
  //     //(callback function, initial value =  object)
  //     (cartTotal, cartItem) => {
  //       const { price, cartQuantity } = cartItem;
  //       const itemTotal = price * cartQuantity;

  //       cartTotal.total += itemTotal;
  //       cartTotal.quantity += cartQuantity;

  //       return cartTotal;
  //     },
  //     {
  //       total: 0,
  //       quantity: 0,
  //     }
  //   );

  //   state.cartTotalQuantity = quantity;
  //   state.cartTotalAmount = total;
  // },
});

export const { addToCart, removeItems, decreaseCart } = CartSlice.actions;

export default CartSlice.reducer;