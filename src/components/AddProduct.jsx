import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { addProductWithReduxThunk} from "../store/products";

const AddProduct = () => {
    const [title,setTitle]= useState('')
    const [image,setImage]= useState('')
    const [description,setDescription]= useState('')
    const [price,setPrice]= useState('')
    const [category,setCategory]= useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const addProduct= async ()=>{
        // console.warn(title,image,description,category,price)
        // let result = await fetch(`${BASE_URL}/product`,{
        //   method:'Post',
        //   body: JSON.stringify({title,image,description,category,price}),
        //   headers:{
        //     "Content-Type":"application/json"
        //   }
        // })
        // result = await result.json()
        // console.warn(result)
        // window.location.href = '/' 
        // redirect('/')
        dispatch(addProductWithReduxThunk({title,image,description,category,price}))
        navigate('/')
      }

// const imageUploader = async (e) => {
//   let image
//   let reader = new FileReader()
//   reader.readAsDataURL(e.target.files[0])
//   reader.onload = () => {
//      image = result.result
//   }

  
//   await fetch(`http://localhost:8080/uploads`, {method: "POST",
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify(image)
//   })
  // .then(res => res.json())
  // .then(data => {
      
  //     })
  
   const imageUploader = async (e) =>{
    const file =  e.target.files[0];
   
    let fd = new FormData();
    fd.append('image', file);
  
    fetch('http://localhost:8080/upload', {
      method: 'POST', body: fd
    }).then(async (res) =>{
      // console.log(await res .json())
      const response = await res.json()
      const imgId = response.image._id
      console.log(imgId)
      setImage(imgId)
    })
    .catch(err => {
      console.error(err);
    });
     
   }

  return (
    <div>
      <h3 className='text-center my-5'>Add Product</h3>
      
      {/* <form  action="/products/addProduct" className="container g-3  " method="post"> */}
      <div className='container'>
  <div className="col-md-6">
    <input type="text" className="form-control" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='title'/>
  </div>
  <div className="col-md-6 my-3">
    <input type="text" value={price} className="form-control" onChange={(e)=>{setPrice(e.target.value)}} placeholder='price'/>
  </div>
  <div className="col-md-6 my-3">
    <input type="file"  className="form-control" onChange={imageUploader} placeholder='image'/>
  </div>
  <div className="col-md-6">
    <textarea type="text" className="form-control" value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="description"/>
  </div>
  <div className="col-md-6 my-3">
    <input type="text" className="form-control" value={category}  onChange={(e)=>{setCategory(e.target.value)}} placeholder="category"/>
  </div>

  <div className="col-md-6">
    <button type="submit" onClick={addProduct} className="btn btn-primary">Add Product</button>
  </div>
  </div>
{/* </form> */}
    </div>
  )
}

export default AddProduct
