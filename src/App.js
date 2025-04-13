import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/User/HomePage';
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
import React, { useEffect } from "react";
// Import jQuery if using it (since React doesn't include it by default)
// import $ from "jquery";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<HomePage />} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} /> */}
          <Route path="/store" element={<Store />} />
          <Route path="/:category/:subcategory" element={<Store />} />


            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<AdminDashboardHome />} />
              {/* <Route path="categories" element={<AllCategories />} /> */}
              <Route path="category" elemnt={<CategoryLayout />}>
               <Route index element={<AllCategories />} />
               <Route path="create" element={<CreateCategory/>} />
               <Route path="edit/:slug" element={<EditCategory/>} />
              </Route>
              <Route path="product" elemnt={<ProductLayout />}>
               {/* <Route index element={<AllProducts />} /> */}
               <Route path="create" element={<CreateProduct/>} />
               {/* <Route path="edit/:slug" element={<EditCategory/>} /> */}
              </Route>
              {/* <Route path="categories/all" element={<Categories />} /> */}
              
            </Route>



          {/* <Route path="/create-product" element={<CreateProduct />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
    // <Store />
  );
}

export default App;
