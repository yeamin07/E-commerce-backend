import { useContext } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProductById } from '../services/product'
import Header from '../components/Header'

import { CartContext } from '../contexts/cart'
import { ADD_TO_CART } from '../actions/cart'

const ProductDetails = () => {
  const {dispatchCartAction} = useContext(CartContext)
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: [`products/${id}`, id],
    queryFn: () => getProductById(id)
  })
  console.log(data);
  return (
    <div>
      <Header />
      {data !== null && (
        <div className='details-box d-flex'>
          <div className="image-section">
            <img src={data?.photo} alt={data?.name} className='details-box__image' />
          </div>
          <div className="details-section">
            <h1 className='details-section__product-title'>{data?.name}</h1>
            <br />
            <br />
            <h2 className='details-section__product-title'>
              Details:
            </h2>
            <p>{data?.description}</p>
            <br/>
            <br/>
            <h3 className='details-section__product-title'>
              Price:
            </h3>
            <p>{data?.price}</p>
            <div className="ingredient__btn">
              <button className='btn btn-primary'
              onClick={(e)=> {
                e.preventDefault()
                dispatchCartAction({
                  type: ADD_TO_CART,
                  payload: data
                })
              }}>ADD TO CART</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails