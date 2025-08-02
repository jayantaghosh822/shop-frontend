import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/User/HomePage';
import ResetPassword from './Pages/User/ResetPassword';
import Store from './Pages/User/Category';
// import Store from './Pages/User/TestCategory';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminDashboardHome from './Pages/Admin/AdminDashboardHome';
import CategoryLayout from './Pages/Admin/CategoryLayout';
import CreateCategory from './Pages/Admin/CreateCategory';
import EditCategory from './Pages/Admin/EditCategory';
import AllCategories from './Pages/Admin/AllCategory';
import ProductLayout from './Pages/Admin/ProductLayout';
import CreateProduct from './Pages/Admin/CreateProduct';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { loginSuccess,logout,loginPopup } from "./redux/authSlice";
import React, { useEffect } from "react";
import axios from 'axios';
import RequireAuth from './Utils/RequireAuth';
import Layout from './Layouts/User/Layout';
import AdminLayout from './Layouts/Admin/AdminLayout';
import MyModal from './Pages/User/ModalTest';
import ErrorPage from './Components/Pages/404.js';
import Product from './Pages/User/Product.js';
// import { reduxAddToCart } from './redux/cartSlice';
// Import jQuery if using it (since React doesn't include it by default)
// import $ from "jquery";
import Cart from './Pages/User/Cart.js';
import CheckOut from './Pages/User/Checkout.js';
import EmailVerificationConfirmed from './Pages/User/EmailVerified.js';
import axiosInstance from '../src/Interceptor/axiosInstance.js'; // path to your interceptor file

const App = () => {
  const dispatch = useDispatch();
   useEffect(() => {
    const fetchUser = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const res = await axiosInstance.get(`${backendUrl}/api/user/me`, {
          withCredentials: true,
        });
        console.log(res);
        if (res.data?.user) {
          dispatch(loginSuccess({ user: res.data.user }));
        }
      } catch (err) {
        // console.error("User not logged in or token expired", err);
        // dispatch(loginPopup({ showForm: true }));
        // dispatch(logout()); // Optional: in case you want to clear auth state
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 Website layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="modal" element={<MyModal />} />
          <Route path="password-reset">
            <Route index element={<ResetPassword />} />
            <Route path=":userID/:token" element={<ResetPassword />} />
          </Route>
          <Route path="verify-email/:token" element={<EmailVerificationConfirmed />} />
          <Route path="store" element={<Store />} />
          <Route path=":category/:subcategory" element={<Store />} />
          <Route path="p/:p" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>

        {/* 🔐 Admin layout (protected) */}
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<AdminDashboardHome />} />
          <Route path="category" element={<CategoryLayout />}>
            <Route index element={<AllCategories />} />
            <Route path="create" element={<CreateCategory />} />
            <Route path="edit/:slug" element={<EditCategory />} />
          </Route>
          <Route path="product" element={<ProductLayout />}>
            <Route path="create" element={<CreateProduct />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
