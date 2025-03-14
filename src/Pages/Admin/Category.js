import React from 'react';
import { useEffect } from 'react';
import AdminSidebar from "../../Components/Admin/AdminSidebar";
// import useScript from "../../Hooks/jsLoader"; 
import CategoryForm from '../../Components/Admin/CategoryForm'; 

const CreateCategory = ()=>{
   
    return(
        <>
          <AdminSidebar />
         <CategoryForm />
        </>
       
    );
}
export default CreateCategory;