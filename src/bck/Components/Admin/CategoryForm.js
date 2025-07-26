import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const CategoryForm = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [error, setError] = useState(false);

  const [Category, setCategoryForm] = useState({
    categoryName: '',
    categorySlug: '',
    categoryParentId: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/api/categories`);
        console.log(response);
        setCategoryList(response.data.categories); // <-- assuming API returns a list
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };
    fetchCategories();
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    if(name == 'categoryName'){
      setCategoryForm({
        ...Category,
        [name]: convertFirstLetterToUppercase(value),
        ['categorySlug']:convertToSlug(value),
      });
    }else{
      setCategoryForm({
        ...Category,
        [name]:value
      })
    }
    
    
    }
   
  const convertFirstLetterToUppercase = (title) =>{
    let formattedTitle = '';
    for (let index in title) {
      // console.log(char);
      if((title[index-1] == ' ' && title[index]!=' ') || index==0){
        formattedTitle = formattedTitle+title[index].toUpperCase();
      }else{
        formattedTitle = formattedTitle+title[index];
      }
      
    }
    return formattedTitle;
  }
  const convertToSlug = (name) =>{
      return (name.split(" ").join('-')).toLowerCase();
  }
  const categoryFormSubmit = async(event) => {
    event.preventDefault();
    console.log(Category); // or send it to backend
    const categoryFormat = {
      "name":Category.categoryName,
      "slug":Category.categorySlug,
      "parent":Category.categoryParentId?Category.categoryParentId:null
    }
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/api/save-category`,categoryFormat);
      console.log(response);
      if(response.data.success){
        // alert("success");
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
      
      // setCategoryList(response.data.categories); // <-- assuming API returns a list
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // setError(true);
    }
  };

  return (
    <>
     
     <ToastContainer />
      <form onSubmit={categoryFormSubmit} className="form-container">
        <div className="center-form">
          <div className="form-group">
            <label htmlFor="categoryName">Category Name</label>
            <input
              type="text"
              name="categoryName"
              onChange={onChange}
              value={Category.categoryName}
              className="form-control"
              id="categoryName"
              placeholder="Jeans"
            />
          </div>

          <div className="form-group">
            <label htmlFor="categorySlug">Category Slug</label>
            <input
              type="text"
              name="categorySlug"
              className="form-control"
              onChange={onChange}
              value={Category.categorySlug}
              id="categorySlug"
              placeholder="jeans"
            />
          </div>
           
          <div className="form-group">
            <label htmlFor="categoryParentId">Parent Category</label>
            <select
              className="custom-select"
              name="categoryParentId"
              onChange={onChange}
              value={Category.categoryParentId}
              id="categoryParentId"
            >
              <option value="">Choose...</option>
              {categoryList.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {error && (
                <div className="">An error occurred while fetching categories.</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
