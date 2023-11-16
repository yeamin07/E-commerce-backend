import '../App.css'
import { useContext } from 'react';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { updateOrder } from '../services/order';
import { AuthContext } from '../contexts/Auth';

const OrderItem = ({item}) => {
    const orderedDate = new Date(item.date).toLocaleDateString()
    const client = useQueryClient()

    const authContext = useContext(AuthContext)
    const username = authContext?.user?.username
    
    const updateOrderMutation = useMutation({
        mutationFn:updateOrder,
        onSuccess: () => {
            client.invalidateQueries(['orders']);
            client.invalidateQueries([`orders ${username}`]);
        }
    })

  return (
    <tr>
        <td><p>{item.user}</p></td>
        <td><p>{item.status}</p></td>
        <td>
            {item.status === 'Pending' && (
                <button onClick={()=> updateOrderMutation.mutate({
                    id: item.id,
                    payload: {status: "Cancelled"}
                })}>
                    Cancle Order
                </button>
            )}
        </td>
        <td>{orderedDate}</td>
        <td>{item.total}</td>
    </tr>
  )
}

export default OrderItem