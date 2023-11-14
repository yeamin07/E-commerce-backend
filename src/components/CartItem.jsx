import '../App.css'
import { useContext, useState } from "react";
import { icons } from '../assets'
import { REMOVE_ITEM_FROM_CART, MODIFY_QUNATITY_OF_A_ITEM } from "../actions/cart";
import { CartContext } from "../contexts/cart";



const CartItem = ({ item }) => {
    const [quantity, setQuantity] = useState(item.quantity)
    const { dispatchCartAction } = useContext(CartContext)

    const decreaseQuantity = (item) => {
        if (item.quantity > 1) {
            setQuantity((prevQuantity) => {
                dispatchCartAction({
                    type: MODIFY_QUNATITY_OF_A_ITEM,
                    payload: { id: item.id, quantity: prevQuantity - 1 }
                })
                return prevQuantity - 1
            })
        }
    }

    const increaseQuantity = (item) => {
        if(item.quantity >= 1) {
            setQuantity((prevQuantity) => {
                dispatchCartAction({
                    type:MODIFY_QUNATITY_OF_A_ITEM,
                    payload: {id: item.id, quantity: prevQuantity + 1}
                })
                return prevQuantity + 1
            })
        }
    }

    return (
        <tr>
            <td>
                <div className="product">
                    <img src={item.photo} alt={item.name} className="product-img" />
                </div>
            </td>
            <td>
                <p>{item.name}</p>
            </td>
            <td>
                <p>$ {item.price}</p>
            </td>
            <td>
                <div className="qty_input">
                    <button
                        className="qty-count qty-count--minus"
                        data-action="minus"
                        type="button"
                        onClick={() => decreaseQuantity(item)}>
                        <figure>
                            <img className='fig-img' src={icons.minusIcon} alt="" />
                        </figure>
                    </button>

                    <input type="number" name="product-qty" className="input-qty"
                    value={quantity} min="1"
                    onChange={(e) => {
                        if(parseInt(e.target.value) > 1){
                            setQuantity(parseInt(e.target.value))
                            dispatchCartAction({
                                type:MODIFY_QUNATITY_OF_A_ITEM,
                                payload: {id:item.id, quantity: parseInt(e.target.value)}
                            })
                        }
                    }} />

                    <button
                        className="qty-count qty-count--plus"
                        data-action="add"
                        type="button"
                        onClick={() => increaseQuantity(item)}>
                        <figure>
                            <img className='fig-img' src={icons.plusIcon} alt="" />
                        </figure>
                    </button>
                </div>
            </td>
            <td>$ {item.quantity? item.price * item.quantity : 0}</td>
            <td>
                <img src={icons.crossIcon} alt="" className="cross-icon"
                onClick={() => {
                    dispatchCartAction({
                        type: REMOVE_ITEM_FROM_CART,
                        payload: item.id
                    })
                }} />
            </td>
        </tr>
    )
}

export default CartItem