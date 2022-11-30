import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const productState = {
  loading: false,
  error: "",
  products: []
};

//how to create an action
// createAction//

//async api calling this is also a  action
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    //reduxt thunk data pass
    return data;
  }
);

//Product slice
export const productsSlice = createSlice({
  name: "products",
  initialState: productState,
  reducers: {
    // to mutate or change the redux state datas...
    deleteProduct: (state, action) => {
      const productId = action.payload;
      console.log(action)
      const tempProducts = [...state.products].filter(
        (pd) => pd.id !== productId
      );
      state.products = tempProducts;
    },
    //to search the product
    searchProduct: (state, action) => {
      const searchTerm = action.payload;
      if (!searchTerm) {
        return;
      }
      const searchedProduct = [...state.products].filter((pd) =>
        pd.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      state.products = searchedProduct;
    },
    //to sort the products..
    sortProductByTitle: (state, action) => {
      const type = action.payload;
      if (type) {
        const sortProduct = [...state.products].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        state.products = sortProduct;
      } else {
        const sortProduct = [...state.products].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        state.products = sortProduct;
      }
    },
    //local
    sortProductByPrice: (state, action) => {
      const type = action.payload;
      if (type) {
        const sortProductPrice = [...state.products].sort((a, b) => a.price - b.price); 
        state.products = sortProductPrice;
      } else {
        const sortProductPrice = [...state.products].sort((a, b) => b.price - a.price);
        state.products = sortProductPrice;
      }
    }
  },
  //maintin redux state for asyc apis
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.error = "";
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = "";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.payload;
      });
  }
});

//export actions
export const { deleteProduct, searchProduct, sortProductByPrice, sortProductByTitle  } = productsSlice.actions;

export default productsSlice.reducer;
