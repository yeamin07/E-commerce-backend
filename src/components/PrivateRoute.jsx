import { useContext } from "react"
import { Navigate } from "react-router-dom"

import { AuthContext } from "../contexts/Auth"

const PrivateRoute = ({children}) => {
    const authcontext = useContext(AuthContext)
    const isLoggedIn = authcontext.isUserLoggedIn

  return isLoggedIn? children : <Navigate to='/'/>
}

export default PrivateRoute