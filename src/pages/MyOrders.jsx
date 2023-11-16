import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"

import { getOrderByUsername } from "../services/order"
import Header from '../components/Header'
import '../App.css'
import OrderItem from "../components/OrderItem"

import { AuthContext } from "../contexts/Auth"

const MyOrders = () => {
  const authContext = useContext(AuthContext)
  const username = authContext?.user?.username

  const { data } = useQuery({
    queryKey: [`orders ${username}`],
    queryFn: () => getOrderByUsername(username)
  })

  return (
    <>
      <Header />
      <div className="account-setting__content">
        <div className="account-setting__content__title">
          <h4>My Orders</h4>
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
              </tr>
            </thead>
            <tbody>
              {data?.map(item => (
               <OrderItem key={item.id} item={item}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default MyOrders