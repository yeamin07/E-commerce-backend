import { useContext } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth'


const Header = () => {
  const authContext = useContext(AuthContext)
  return (
    <div className="header">
      <div className="container">
        <nav className='header__navbar'>
          <ul>
            <li><Link to='/'>Home</Link></li>
            {!authContext.isUserLoggedIn && (
              <li><Link to='/signup'>SignUp</Link></li>
            )}
            {!authContext.isUserLoggedIn && (
              <li><Link to='/login'>Login</Link></li>
            )}
            {authContext.isUserLoggedIn && (authContext?.user?.special_user === 'super-admin' || authContext?.user?.special_user === 'admin') && (
              <li><Link to='/admin/products'>Products</Link></li>
            )}
            {authContext.isUserLoggedIn && (authContext?.user?.special_user === 'super-admin' || authContext?.user?.special_user === 'admin') && (
              <li><Link to='/admin/users'>Users</Link></li>
            )}

            <li><Link to='/cart'>Cart</Link></li>
            {authContext.isUserLoggedIn && (
              <li><Link to='/my-orders'>My Orders</Link></li>
            )}
            {authContext.isUserLoggedIn && (authContext?.user?.special_user === 'super-admin' || authContext?.user?.special_user === 'admin') && (
              <li><Link to='/order-list'>Order List</Link></li>
            )}
            {authContext.isUserLoggedIn && (authContext?.user?.special_user === 'super-admin' || authContext?.user?.special_user === 'admin') && (
              <li><Link to='/admin/product-add-form'>Add Product</Link></li>
            )}

            <li>
              {authContext.isUserLoggedIn && (
                <button className='btn btn-info' onClick={() => authContext.logout()}>
                  LogOut
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header