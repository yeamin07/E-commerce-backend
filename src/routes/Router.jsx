import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './../pages/Home';
import Cart from './../pages/Cart';
import Login from './../pages/Login';
import SignUp from './../pages/SignUp';
import AddressForm from './../pages/AddressForm';
import MyOrders from './../pages/MyOrders';
import OrderList from './../pages/OrderList';
import ProductAddForm from './../pages/ProductAddForm';
import Users from './../pages/Users';
import ProductEditForm from './../pages/ProductEditForm';
import Products from './../pages/Products';
import ProductDetails from "../pages/ProductDetails";

import PrivateRoute from "../components/PrivateRoute";
import PrivateAdminRoute from "../components/PrivateAdminRoute";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                <Route path="/order-placing-form" element={
                    <PrivateRoute>
                        <AddressForm />
                    </PrivateRoute>
                } />

                <Route path="/my-orders" element={
                    <PrivateRoute>
                        <MyOrders />
                    </PrivateRoute>
                } />

                <Route path="/order-list" element={
                    <PrivateAdminRoute>
                        <OrderList />
                    </PrivateAdminRoute>
                } />

                <Route path="/admin/product-add-form" element={
                    <PrivateAdminRoute>
                        <ProductAddForm />
                    </PrivateAdminRoute>
                } />

                <Route path="/admin/users" element={
                    <PrivateAdminRoute>
                        <Users />
                    </PrivateAdminRoute>
                } />

                <Route path="/admin/product-edit-form/:id" element={
                    <PrivateAdminRoute>
                        <ProductEditForm />
                    </PrivateAdminRoute>
                } />

                <Route path="/admin/products" element={
                    <PrivateAdminRoute>
                        <Products />
                    </PrivateAdminRoute>
                } />
                <Route path="/products/:id" element={<ProductDetails />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router