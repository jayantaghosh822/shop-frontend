import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/User/HomePage';
import ResetPassword from './Pages/User/ResetPassword';
import Store from './Pages/User/Category';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminDashboardHome from './Pages/Admin/AdminDashboardHome';
import CategoryLayout from './Pages/Admin/CategoryLayout';
import CreateCategory from './Pages/Admin/CreateCategory';
import EditCategory from './Pages/Admin/EditCategory';
import AllCategories from './Pages/Admin/AllCategory';
import ProductLayout from './Pages/Admin/ProductLayout';
import CreateProduct from './Pages/Admin/CreateProduct';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { loginSuccess,logout } from "./redux/authSlice";
import React, { useEffect } from "react";
import axios from 'axios';
import RequireAuth from './Utils/RequireAuth';
// Import jQuery if using it (since React doesn't include it by default)
// import $ from "jquery";

const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const verifyUser = async()=> {
      try{
         
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const userStatus = await axios.get(backendUrl+'/api/user/verify-user' , { withCredentials: true });
        if(userStatus.data.success){
          // if(userStatus.data.user){
            dispatch(loginSuccess({ user: userStatus.data.user }));
          // }
         
          // dispatch(loginSuccess({ loading: false }));
        }
        
      }catch(err){
        console.log(err);
      }
     
    }
    verifyUser();
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<HomePage />} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} /> */}
          <Route path="/password-reset" element={<ResetPassword />}>
            <Route index element={<ResetPassword />} />
            <Route path=":userID/:token" element={<ResetPassword />} />
          </Route>
         
          <Route path="/store" element={<Store />} />
          <Route path="/:category/:subcategory" element={<Store />} />


            {/* <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<AdminDashboardHome />} />
              <Route path="category" elemnt={<CategoryLayout />}>
               <Route index element={<AllCategories />} />
               <Route path="create" element={<CreateCategory/>} />
               <Route path="edit/:slug" element={<EditCategory/>} />
              </Route>
              <Route path="product" elemnt={<ProductLayout />}>
             
               <Route path="create" element={<CreateProduct/>} />
              
              </Route>
              
              
            </Route> */}

            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminDashboard />
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



          {/* <Route path="/create-product" element={<CreateProduct />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
    // <Store />
  );
}

export default App;
