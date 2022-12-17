import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'

const UpdateProduct = () => {
    const [title,setTitle]= useState('')
    const [image,setImage]= useState('')
    const [description,setDescription]= useState('')
    const [price,setPrice]= useState('')
    const [category,setCategory]= useState('')
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
      getProductDetails()
    },[])

    const getProductDetails = async ()=>{
      console.warn(params)
      let result = await fetch(`http://localhost:8080/product/getProduct/${params.id}`)
      result = await result.json();
      console.warn(result)
      setTitle(result.title)
      setPrice(result.price)
      setDescription(result.description)
      setCategory(result.category)
    }
    
    const updateProduct= async ()=>{
      console.warn(title,price,description,category)
      let result = await fetch(`http://localhost:8080/product/updateproduct/${params.id}`,{
        method:'Put',
        body:JSON.stringify({title,price,description,category}),
        headers:{
          'Content-Type':"application/json"
        }
      })
      result = await result.json()
      console.warn(result)
      // navigate('/')
      window.location.href = '/'
       }


  return ( 
    <div>
      <h3 className='text-center my-5'>Update Product</h3>
      
    <div className='container'>
   <div className="col-md-6">
    <input type="text" value={title} className="form-control" onChange={(e)=>{setTitle(e.target.value)}} placeholder='title'/>
  </div>
  <div className="col-md-6 my-3">
    <input type="text" value={price} className="form-control" onChange={(e)=>{setPrice(e.target.value)}} placeholder='price'/>
  </div>
   {/* <div className="col-md-6 my-3">
    <input type="file" value={image} className="form-control" onChange={(e)=>{setImage(e.target.value)}} placeholder='price'/>
  </div>  */}
  <div className="col-md-6">
    <input type="text" value={description} className="form-control" onChange={(e)=>{setDescription(e.target.value)}} placeholder="description"/>
  </div>
  <div className="col-md-6 my-3">
    <input type="text" value={category} className="form-control" onChange={(e)=>{setCategory(e.target.value)}} placeholder="category"/>
  </div>
  <div className="col-md-6">
    <button type="submit" onClick={updateProduct} className="btn btn-primary">Update Product</button>
  </div> 
  </div>
 

  
    </div>
  )
}

export default UpdateProduct
