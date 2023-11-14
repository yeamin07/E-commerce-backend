import '../App.css'
import { useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { CartContext } from "../contexts/cart"
import { AuthContext } from '../contexts/Auth'
import Header from '../components/Header'
import CartItem from "../components/CartItem"
import { CLEAR_CART } from '../actions/cart'

const Cart = () => {
  const { cart, dispatchCartAction } = useContext(CartContext)
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  let totalAmount = 0
  cart.forEach(item => totalAmount += item.price * item.quantity);

  return (
    <>
      <Header />
      <div className="account-setting__content">
        <div className="account-setting__content__title">
          <h4 className='d-flex justify-content-center'>Product List in your Cart</h4>
        </div>
        <div className="product-table-container">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
        <h5 className='mt-4 d-flex justify-content-center'>Your total price will be {totalAmount}</h5>
        <div className="d-flex justify-content-around">
          <div className="mt-50">
            <button onClick={()=> {
              dispatchCartAction({
                type: CLEAR_CART
              })
            }} className='btn btn-primary'>
              Clear Cart
            </button>
          </div>
          <div className="mt-50">
            <button type="button" className='btn btn-primary'
            onClick={()=> {
              if(!authContext.isUserLoggedIn){
                alert(`Please login to place a order`)
                return ;
              }
              navigate('/order-placing-form')
            }}
            >
              Place Order
            </button>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Cart