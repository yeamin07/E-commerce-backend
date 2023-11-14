import { useContext } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'

import { CartContext } from '../contexts/cart'
import { ADD_TO_CART } from '../actions/cart'

const ProductCard = ({product}) => {
    const {dispatchCartAction} = useContext(CartContext)
    const navigate = useNavigate()

  return (
    <div onClick={()=>navigate(`/products/${product.id}`)} className='ingredient'>
        <div className="ingredient__image">
            <figure>
                <img src={product.photo} alt={product.name} />
            </figure>
        </div>
        <div className="ingredient__title">
            <h3>{product.name}</h3>
        </div>
        <div className="ingredient__content">
            <p>{product.description.split(' ').slice(0, 20).join(' ')}...</p>
            <p><span>${product.price}</span></p>
        </div>
        <div className="ingredient__btn">
            <button className='btn btn-primary'
            onClick={(e)=> {
                e.preventDefault()
                e.stopPropagation()
                dispatchCartAction({
                    type: ADD_TO_CART,
                    payload: product
                })
            }}>ADD TO CART</button>
        </div>
    </div>
  )
}

export default ProductCard