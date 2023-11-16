import { useRef, useContext } from "react"
import { useMutation,useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";

import { AuthContext } from './../contexts/Auth';
import { CartContext } from './../contexts/cart';
import { createOrder } from './../services/order';
import Header from '../components/Header'


const AddressForm = () => {
  const navigate = useNavigate()
  const addressInputRef = useRef()
  const {cart} = useContext(CartContext)
  const authContext = useContext(AuthContext)
  const client = useQueryClient()

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      client.invalidateQueries(['orders'])
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const order = {
      user: authContext?.user?.id,
      address: addressInputRef.current.value,
      items : cart.map(item => ({product:item.id, quantity:item.quantity}))
    }
    createOrderMutation.mutate(order)
    navigate('/order-list')
  }


  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <label htmlFor="shippingAddress">Shipping Address:</label>
        <br />
        <br />
        <input type="text" name="shippingAddress" ref={addressInputRef} />
        <br />
        <br />
        <input type="submit" value="Place an Order" />
      </form>
    </div>
  )
}

export default AddressForm