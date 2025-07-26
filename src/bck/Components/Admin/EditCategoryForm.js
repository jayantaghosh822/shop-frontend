import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditCategoryForm = () => {
    const { slug } = useParams(); // <-- this gives you the id from the URL
    const [categoryList, setCategoryList] = useState([]);
    const [error, setError] = useState(false);
    const [catId , setCatID] = useState('');
    const [Category, setCategoryForm] = useState({
        categoryName: '',
        categorySlug: '',
        categoryParentId: '',
    });

    useEffect(() => {
        const fetchCategoryDetails = async () => {
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await axios.get(`${backendUrl}/api/category/${slug}`);
            const category = (response.data.category);
            console.log(category);
            console.log(category._id);
            setCatID(category._id);
            setCategoryForm({
              categoryName: category.name,
              categorySlug: category.slug,
              categoryParentId:  category.parent,
            }); 
        } catch (err) {
            console.error(err);
            setError(true);
        }
        };
        fetchCategoryDetails();
        const Categories = async () => {
          try {
              const backendUrl = process.env.REACT_APP_BACKEND_URL;
              const response = await axios.get(`${backendUrl}/api/categories`);
              console.log(response.data.categories);
              setCategoryList(response.data.categories); // <-- assuming API returns a list
          } catch (err) {
              console.error(err);
              setError(true);
          }
          };
          Categories();
    }, []);

    const onChange = (event) => {
        const { name, value } = event.target;

        setCategoryForm({
            ...Category,
            [name]:value
        })
        
        
        
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
    console.log(catId); // or send it to backend
    const categoryFormat = {
      "name":Category.categoryName,
      "slug":Category.categorySlug,
      "parent":Category.categoryParentId?Category.categoryParentId:null
    }
    try {
      // alert (catId);
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.put(`${backendUrl}/api/category/edit/${catId}`,categoryFormat);
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
              value={Category.categorySlug}
              readOnly 
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
                <option key={cat._id} value={cat._id} >
                  {cat.name}
                </option>
              ))}
            </select>
            {error && (
                <div className="">An error occurred while fetching categories.</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default EditCategoryForm;
