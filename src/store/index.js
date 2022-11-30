import { configureStore} from "@reduxjs/toolkit";
// import cartSlice from "./cartSlice";
import productsReducer from "./products";
import cartReducer, { getTotals } from "./cartSlice";


export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer
  },
  devTools:true
});

store.dispatch(getTotals())
