import React from 'react';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";

const AllCategories = ()=>{
   const [Categories , setCategories] = useState([]);
   useEffect(()=>{
     const fetchCategories = async ()=>{
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/api/categories/`);
        setCategories(response.data.categories);
     }
     fetchCategories();
   },[])

   const deleteCategory= async(id)=>{
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const response = await axios.delete(`${backendUrl}/api/category/delete/${id}`);
   }
    return(
        <>
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
                    <td><Link to={`edit/${elem.slug}`}>Edit</Link> <a href="javascript:void(0);" onClick={() => deleteCategory(elem._id)}>Delete</a></td>
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