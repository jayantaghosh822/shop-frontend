import React from 'react';
import { useEffect , useState } from 'react';
import AdminSidebar from "./AdminSidebar";
import useScript from "../../Hooks/jsLoader"; 
const CategoryForm = ()=>{
    
    const [Category , setCategoryForm] = useState({
        categoryName:'',
        categorySlug:'',
        categoryParentId:''
    });
    const onChange = (event)=>{
        let name = event.target.name;
        let value = event.target.value;
        setCategoryForm({
            ...Category,
            [name]:value
        })
    }
    const categoryFormSubmit = (event)=>{
        event.preventDefault();
        console.log(Category);
    }
    return(
       
        <>
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <form onSubmit={categoryFormSubmit} class="form-container">
          
          
            <div class="center-form">
                 <div className="form-group">
                    <label htmlFor="inputEmail4">Category Name</label>
                    <input type="text" name="categoryName" onChange={onChange} value={Category.categoryName} className="form-control" id="inputEmail4" placeholder="Jeans" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword4">Category Slug</label>
                    <input type="text" name="categorySlug" className="form-control"  onChange={onChange} value={Category.categorySlug} id="inputPassword4" placeholder="jeans" />
                </div>
                <div class="form-group">
                    <label class="mr-sm-2" for="inlineFormCustomSelect">Parent Category</label>
                    <select class="custom-select mr-sm-2" name="categoryParentId"  onChange={onChange} value={Category.categoryParentId} id="inlineFormCustomSelect">
                        <option selected>Choose...</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </div>
                
           
                
           
        </form>
        </main>
        
        </>
        
    )
}
export default CategoryForm;