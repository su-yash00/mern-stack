import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./components/Product";
import {
  fetchProducts,
  searchProduct,
  sortProduct,
  sortProductPrice,
} from "./store/products";
import {
  selectProducrs,
  selectProducrsLoading,
} from "./store/products/selectors";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct"

function App() {
  const data = useSelector(selectProducrs);
  const loading = useSelector(selectProducrsLoading);
  const dispatch = useDispatch();
  const handleFetchProducts = () => {
    dispatch(fetchProducts());
  };

  //Search functions...
  const handleSearch = async (e) => {
    e.preventDefault();
    // const searchTerm = e.target.value;
    // if (!searchTerm) {
    //   handleFetchProducts();
    //   return;
    // }
    // dispatch(searchProduct(searchTerm));
    let key = e.target.value
    let result = await fetch(`http://localhost:8080/product/search/${key}`)
    result = await result.json()
    if(result){
      fetchProducts(result)
    }
  };



  //fetch products on componenet mount
  useEffect(() => {
    handleFetchProducts();
  }, []);

  const [isAscending, setIsAscending] = useState(false);

  const [sortPrice, setsortPrice] = useState(false);

  // Sort Function...

  const handleSort = () => {
    dispatch(sortProduct(isAscending));
    setIsAscending(!isAscending);
  };

  const handleSortPrice = () => {
    dispatch(sortProductPrice(sortPrice));
    setsortPrice(!sortPrice);
  };

  if (loading) return "Loading....";

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="container p-5">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="input-group mb-3">
                    <input
                      type="search"
                      className="form-control border-success"
                      placeholder="Search By Name"
                      onChange={handleSearch}
                    />
                  </div>
                </form>

                <button
                  type="submit"
                  className="btn btn-primary my-2"
                  onClick={handleSort}
                >
                  Sort By Title
                </button>

                <button
                  type="submit"
                  className="btn btn-primary mx-2"
                  onClick={handleSortPrice}
                >
                  Sort By Price
                </button>

                <div className="row">
                  {data.map((pd) => (
                    <Product product={pd} key={pd._id} />
                  ))}
                </div>
              </div>
            }
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path='/update/:id'  element={<UpdateProduct/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;