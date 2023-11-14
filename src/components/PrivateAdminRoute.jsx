import { useContext } from "react"
import { Navigate } from "react-router-dom"

import { AuthContext } from "../contexts/Auth"

const PrivateAdminRoute = ({children}) => {
    const authcontext = useContext(AuthContext)
    const isLoggedIn = authcontext?.isUserLoggedIn
    const role = authcontext?.user?.special_user

  return (
    isLoggedIn && (role && (role === 'admin' || role === 'super-admin')) ? children : <Navigate to='/' />
  )
}

export default PrivateAdminRoute