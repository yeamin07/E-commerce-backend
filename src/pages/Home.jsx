import React from 'react'
import { useQuery } from '@tanstack/react-query'
import '../App.css'

import Header from '../components/Header'
import { getAllProducts } from '../services/product'
import CarouselCom from '../components/CarouselCom'
import ProductCard from '../components/ProductCard'


const Home = () => {
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts
  })

  if (isLoading) {
    return <h1>Loading......</h1>
  }
  return (
    <>
      <div>
        <Header />
        <div className="page-banner__details">
          <div className="bg-primary-subtle">
            <h1 className='d-flex justify-content-center py-2'
              style={{ fontFamily: 'sans-serif' }}
            >Yeamin's UrbanTrendzStore</h1>
            <CarouselCom />
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="section__head">
              <div className="product__details__title">
                <h1>All Products</h1>
              </div>
            </div>
            {products.length !== 0 &&  (
            <div className="section__content">
              <div className="grid three">
                {products?.map(item => (
                   <ProductCard product={item}/>
                ))}
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home