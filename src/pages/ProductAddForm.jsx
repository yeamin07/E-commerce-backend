import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import '../App.css'
import { createProduct } from "../services/product"
import Header from '../components/Header'

const ProductAddForm = () => {
  const client = useQueryClient()
  const navigate = useNavigate()

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    photo: '',
  })

  const createProductMutation = useMutation({
    mutationFn: (obj)=> createProduct(obj),
    onSuccess: ()=> {
      client.invalidateQueries(['products'])
      navigate('/admin/products')
  }
  })

  const handleChange = (e) => {
    setProduct({...product,[e.target.name]: e.target.value})
  }
  const handlePhoto = (e) => {
    setProduct({...product, photo: e.target.files[0]})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name',product.name)
    formData.append('price',product.price)
    formData.append('description',product.description)
    formData.append('photo',product.photo)

    createProductMutation.mutate(formData)
  }

  return (
    <>
      <Header />
      <form
        encType="multipart/form-data"
        className="input-form"
        onSubmit={handleSubmit}>
        <p>Product Name</p>
        <input onChange={handleChange} type="text" required name="name" value={product.name} />
        <br />

        <p>Product Price</p>
        <input onChange={handleChange} type="number" required name="price" value={product.price} />
        <br />

        <p>Product Description</p>
        <input onChange={handleChange} type="text" required name="description" value={product.description} />
        <br />

        <p>Product URL</p>
        <input onChange={handlePhoto} type="file" required name="photo" />
        <br />
        <input type="submit" value='Submit' className="btn btn-primary" />
      </form>
    </>
  )
}

export default ProductAddForm