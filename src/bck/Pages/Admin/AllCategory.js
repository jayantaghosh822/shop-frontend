import React from 'react';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AllCategories = ()=>{
   const [Categories , setCategories] = useState([]);

    const fetchCategories = async ()=>{
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const response = await axios.get(`${backendUrl}/api/categories/`);
    setCategories(response.data.categories);
    }
    
   useEffect(()=>{
     fetchCategories();
   },[])

   const deleteCategory= async(id)=>{
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const response = await axios.delete(`${backendUrl}/api/category/delete/${id}`);
    console.log(response);
    if(response.data.success){
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        fetchCategories();
    }else{
        toast.error(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
   }
    return(
        <>
        <ToastContainer />
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Category Name</th>
                <th scope="col">Category Slug</th>
                <th scope="col">Handle</th>
                </tr>
            </thead>
            {Categories.map((elem) => {
                return (
                    <tr>
                    <td>{elem.name}</td>
                    <td>{elem.slug}</td>
                    <td><Link to={`edit/${elem.slug}`}>Edit</Link> <button href="" onClick={() => deleteCategory(elem._id)}>Delete</button></td>
                    </tr>
                );
            }) }
            <tbody>

                
            </tbody>
        </table>
        </>
       
    );
}
export default AllCategories;