import '../App.css'
import { useMutation,useQueryClient } from '@tanstack/react-query';
import {icons} from '../assets'
import { removeOrder,updateOrder } from '../services/order';

const OrderRow = ({item}) => {
    const orderedDate = new Date(item.date).toLocaleDateString()
    const client = useQueryClient()
    
    const updateOrderMutation = useMutation({
        mutationFn:updateOrder,
        onSuccess: () => {
            client.invalidateQueries(['orders'])
        }
    })
    const removeOrderMutation = useMutation({
        mutationFn:removeOrder,
        onSuccess: () => {
            client.invalidateQueries(['orders'])
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
                    payload: {status: "Delivered"}
                })}>
                    Make Delivered
                </button>
            )}
        </td>
        <td>{orderedDate}</td>
        <td>{item.total}</td>
        <td>
            <img src={icons.crossIcon} className='product-icon' onClick={()=> removeOrderMutation.mutate(item.id)} />
        </td>
    </tr>
  )
}

export default OrderRow