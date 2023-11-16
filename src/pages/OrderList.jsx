import { useQuery } from "@tanstack/react-query"
import { getAllOrders } from "../services/order"
import Header from '../components/Header'
import '../App.css'
import OrderRow from "../components/OrderRow"

const OrderList = () => {
  const { data } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders
  })

  return (
    <>
      <Header />
      <div className="account-setting__content">
        <div className="account-setting__content__title">
          <h4>All Orders</h4>
        </div>
        <div className="product-table-container">
          <table>
            <thead>
              <tr>
                <th>User Id</th>
                <th>Status</th>
                <th>Status Action</th>
                <th>Date</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {data?.map(item => (
                <OrderRow key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default OrderList