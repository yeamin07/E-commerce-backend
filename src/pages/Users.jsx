import { useQuery } from "@tanstack/react-query"
import Header from '../components/Header'
import { getAllUsers } from "../services/user"
import UserRow from "../components/UserRow"
import '../App.css'

const Users = () => {
  const {data} = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  })

  return (
   <>
    <Header />
    <div className="account-setting__content">
      <div className="account-setting__content__title">
        <h4>User List</h4>
      </div>
      <div className="product-table-container">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Role Option</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(item => (
              <UserRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
   </>
  )
}

export default Users