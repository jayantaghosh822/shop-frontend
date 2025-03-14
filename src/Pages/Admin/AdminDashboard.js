import React from 'react';
import { useEffect } from 'react';
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import useScript from "../../Hooks/jsLoader"; 
const AdminDashboard = ()=>{
    
    return(
       
        <>
        {/* <AdminSidebar /> */}
        <Outlet />
        </>
        
    )
}
export default AdminDashboard;