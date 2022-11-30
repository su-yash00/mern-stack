import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./components/Product";
import { fetchProducts, searchProduct, sortProductByTitle, sortProductByPrice  } from "./store/products";
import {
  selectProducrs,
  selectProducrsLoading
} from "./store/products/selectors";
import "./index.css";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Navbar from "./components/navBar";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Detail from "./components/Detail";

export default function App() {
  const [isAscending, setIsAscending] = useState(false);
  const [priceSort, setPriceSort] = useState(false);


  const data = useSelector(selectProducrs);
  const loading = useSelector(selectProducrsLoading);
  const dispatch = useDispatch();
  const handleFetchProducts = () => {
    dispatch(fetchProducts());
  };

  //Search functions...
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    if (!searchTerm) {
      handleFetchProducts();
      return;
    }
    dispatch(searchProduct(searchTerm));
  };



const handleSortByTitle = () => {
  dispatch(sortProductByTitle(isAscending));
  setIsAscending(!isAscending);
};


const handleSortByPrice = () => {
  dispatch(sortProductByPrice(priceSort));
  setPriceSort(!priceSort);

}

  //fetch products on componenet mount
  useEffect(() => {
    handleFetchProducts();
  }, []);

  if (loading) return "Loading....";

  return (
    <>
    <BrowserRouter>
    <ToastContainer/>
    <Navbar/>
    <Routes>
      <Route path="/" element={
        <div className="container p-5">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="search"
              onChange={handleSearch}
            />
            <button type="submit" className="btn btn-primary">
              search
            </button>
          </div>
        </form>
        <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-warning my-4" onClick={handleSortByTitle}>Sort Title</button>
        <button type="button" className="btn btn-warning my-4 mx-2" onClick={handleSortByPrice}>Sort Price</button>
        </div>
        <div className="row">
          {data.map((pd) => (
            <Product product={pd} key={pd.id} />
          ))}
        </div>
      </div>
      }/>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route exact path="/products/:id" element={<Detail/>}></Route>
    </Routes>
    
    </BrowserRouter>
    </>
    
  );
}
