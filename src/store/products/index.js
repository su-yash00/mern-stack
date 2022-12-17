import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from '../../env';
import axios from 'axios'

export const productState = {
  loading: false,
  error: "",
  products: [],
};



//async api calling this is also a  action
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(`${BASE_URL}/product`);
    const data = await response.json();
    return data;
 
  }
);



export const deleteProductById = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
   try {
    const res = await fetch(`http://localhost:8080/product/${id}`, {
      method : 'Delete'
   })
    thunkAPI.dispatch(deleteProduct(id));
    return true;
  }
  catch(error){}
}

);

export const addProductWithReduxThunk = createAsyncThunk (
"product/add",
async(product, thunkAPI) =>{
  try{
    const result = await fetch(`${BASE_URL}/product`,{
      method:'Post',
      body: JSON.stringify(product),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const tempProduct = await result.json()
    thunkAPI.dispatch(add(tempProduct));

    return tempProduct
  }catch (error){

  }
}
)


//Product slice
export const productsSlice = createSlice({
  name: "products",
  initialState: productState,
  reducers: {
    // to mutate or change the redux state datas...
    deleteProduct: (state, action) => {
      const productId = action.payload;
      const tempProducts = [...state.products].filter(
        (pd) => pd._id !== productId
      );
      state.products = tempProducts;
    },

    // updateProduct: (state,action) =>{
    //  const product = action.payload 
    // }



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

    add(state, action) {
      state.products.push(action.payload);
    },

    // to sort the products..
    sortProduct: (state, action) => {
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

    sortProductPrice: (state, action) => {
      const type = action.payload;
      if (type) {
        const sortPrice = [...state.products].sort((a, b) => a.price - b.price);
        state.products = sortPrice;
      } else {
        const sortPrice = [...state.products].sort((a, b) => b.price - a.price);
        state.products = sortPrice;
      }
    },
  },
  //maintain redux state for asyc apis
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
  },
});

//export actions
export const {
  deleteProduct,
  searchProduct,
  add,
  sortProduct,
  sortProductPrice,
} = productsSlice.actions;

export default productsSlice.reducer;