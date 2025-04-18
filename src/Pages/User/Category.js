import React from 'react';
import { useState , useRef , useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useScript from "../../Hooks/jsLoader";
import Layout from "../../Layouts/User/Layout";
import { useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../redux/authSlice";
const Store = () =>{
    useScript([
        "/assets/js/main.js",
    ]);

    //set products and filterLists
    const [catProducts,setCatProducts] = useState([]);
    const [productBrands,setBrands] = useState([]);
    const [productPrices,setPrices] = useState([]);
    const [productSizes,setSizes] = useState([]);
    const [productColors,setColors] = useState([]);
    //set products and filterLists

    //filtering products
    const [filterBrands,setfilterBrands] = useState([]);
    const [filterPrices,setfilterPrices] = useState([]);
    const [filterSizes,setfilterSizes] = useState([]);
    const [filterColors,setfilterColors] = useState([]);
    //filtering products

    const { category, subcategory } = useParams();
    // alert(category);
    // alert(subcategory);
    useEffect(() => {
        const fetchProductByCat = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
          try {
            const response = await axios.get(`${backendUrl}/api/product-by-category`, {
                withCredentials: true,
                params: {
                  category: subcategory,
                }
            });
            setCatProducts(response.data.products);
            let priceArray= [];
            let sizeArray = [];
            response.data.products.forEach(pro => {
                const size = pro.size;
                const prices = size.map(eachSize => eachSize.price);
                sizeArray[sizeArray.length] = size;
               

                const min = Math.min(...prices);
                const max = Math.max(...prices);
              
                if(!(priceArray.includes(min))){
                    priceArray[priceArray.length] = min;
                }
                if(!(priceArray.includes(max))){
                    priceArray[priceArray.length] = max;
                }
               
            });
           
            setPrices(priceArray);
            let sizes = [];
            if(sizeArray.length>0){
             
                sizeArray.forEach(prosizes => {
                    prosizes.forEach(size => {
                        if(!sizes.includes(size.size)){
                            sizes[sizes.length] = size.size
                        }
                    })
                });
                setSizes(sizes);
               
            }
           
            setBrands(response.data.brands);
            setColors(response.data.colors);
           
          } catch (err) {
            console.error(err);
          }
        };
      
        fetchProductByCat();
    }, []);

    
    const toggleBrand = (brandId)=> {
        alert(brandId);
        setfilterBrands(prev => {
          const isSelected = prev.some(b => b === brandId);
          if (isSelected) {
            return prev.filter(b => b !== brandId);
          } else {
            return [...prev, brandId];
          }
        });
    };

    const renderPriceHtml = () => {
        if (!productPrices || productPrices.length === 0) return null;
      
        const min = Math.min(...productPrices);
        const max = Math.max(...productPrices);
        const step2 = 100;
        let current = Math.floor(min / step2) * step2; // Round down to nearest hundred
        let priceRanges = [];

        while (current < max) {
        const next = current + step2;
        priceRanges.push(`${current}-${next}`);
        current = next;
        }
        let priceFilterList = [];
        priceRanges.forEach(price => {
            priceFilterList.push(
                <li key={price}  onClick={(e) => {
                    e.preventDefault();
                    togglePrices(price);
                    }}>
                  <a href="#" className={filterPrices.some(p => p === price) ? "brandselected" : "brandnotselected"} >${price}</a>
                </li>
            );
        });

        return priceFilterList;
    };

    const togglePrices = (price) => {
     
        setfilterPrices(prev => {
          const isSelected = prev.some(p => p === price);
          if (isSelected) {
            return prev.filter(p => p !== price);
          } else {
            return [...prev, price];
          }
        });
    };


    const renderSizeHtml = () => {
        if (!productSizes || productSizes.length === 0) return null;
      
       
        let sizeArray = [];
        let sizeFilterList = [];
     
            productSizes.forEach(size => {
               
                  
                    sizeFilterList.push(
                        <label htmlFor="" className={filterSizes.some(s => s === size) ? "active" : ""} key={size} onClick={(e) => {
                            e.preventDefault();
                            toggleSizes(size);
                            }}
                        >{size} 
                            <input type="radio" id="xs" />
                        </label>
                    );
             
               
            });
            

        return sizeFilterList;
        // You can generate multiple ranges dynamically if you want
        
    };
      
    const toggleSizes = (size) => {
       

        setfilterSizes(prev => {
          const isSelected = prev.some(s => s === size);
          if (isSelected) {
            return prev.filter(s => s !== size);
          } else {
            return [...prev, size];
          }
        });
    };

    const toggleColors = (color) => {
    

        setfilterColors(prev => {
          const isSelected = prev.some(c => c === color);
          if (isSelected) {
            return prev.filter(c => c !== color);
          } else {
            return [...prev, color];
          }
        });
    };

    const getPrice = (size) => {
        if (!Array.isArray(size) || size.length === 0) return "N/A";
    
        const prices = size.map(eachSize => eachSize.price);
        
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        
        return `${min}-${max}`;
    };


    useEffect(()=>{
        console.log('brands',filterBrands);
        console.log('prices',filterPrices);
        console.log('SIZERS',filterSizes);
        console.log('colors',filterColors);
    },[filterBrands,filterPrices,filterSizes,filterColors])

    return(
        <>
         <Layout>
            <div>
                {/* Breadcrumb Section Begin */}
                <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb__text">
                        <h4>Shop</h4>
                        <div className="breadcrumb__links">
                            <link to="/"></link>
                            <span>Shop</span>
                            <span>Shop</span>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
                {/* Breadcrumb Section End */}
                {/* Shop Section Begin */}
                <section className="shop spad">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-3">
                        <div className="shop__sidebar">
                        <div className="shop__sidebar__search">
                            <form action="#">
                            <input type="text" placeholder="Search..." />
                            <button type="submit"><span className="icon_search" /></button>
                            </form>
                        </div>
                        <div className="shop__sidebar__accordion">
                            <div className="accordion" id="accordionExample">
                            

                            <div className="card">
                                <div className="card-heading">
                                <a data-toggle="collapse" data-target="#collapseTwo">Branding</a>
                                </div>
                                <div id="collapseTwo" className="collapse show" data-parent="#accordionExample">
                                <div className="card-body">
                                    <div className="shop__sidebar__brand">
                                    <ul>
                                        
                                        {productBrands.map((brand)=>{
                                            return(
                                                <li key={brand._id}>
                                                    <a
                                                        href="#"
                                                        className={filterBrands.some(b => b === brand._id) ? "brandselected" : "brandnotselected"}
                                                        onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleBrand(brand._id);
                                                        }}
                                                    >
                                                        {brand.name}
                                                    </a>
                                                </li>
                                            );
                                           
                                        })}
                                        
                                        
                                    </ul>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-heading">
                                <a data-toggle="collapse" data-target="#collapseThree">Filter Price</a>
                                </div>
                                <div id="collapseThree" className="collapse show" data-parent="#accordionExample">
                                <div className="card-body">
                                    <div className="shop__sidebar__price">
                                      
                                    <ul>
                                        {renderPriceHtml()}
                                    </ul>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="card">
                                
                                <div className="card-heading">
                                <a data-toggle="collapse" data-target="#collapseFour">Size</a>
                                </div>
                                <div id="collapseFour" className="collapse show" data-parent="#accordionExample">
                                <div className="card-body">
                                    <div className="shop__sidebar__size">
                                    {renderSizeHtml()}
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-heading">
                                <a data-toggle="collapse" data-target="#collapseFive">Colors</a>
                                </div>
                                <div id="collapseFive" className="collapse show" data-parent="#accordionExample">
                                <div className="card-body">
                                    <div className="shop__sidebar__size">
                                        {productColors.map((color)=>{
                                            return(
                                                <label htmlFor="" key={color._id} className={filterColors.some(c=>color._id==c)?'box-color active':'box-color'}  onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleColors(color._id);
                                                    }} >{color.name}
                                                    <input type="radio" id="" />
                                                </label>
                                            );
                                        })}
                                   
                                    
                                    </div>
                                </div>
                                </div>
                            </div>
                            {/* <div className="card">
                                <div className="card-heading">
                                <a data-toggle="collapse" data-target="#collapseSix">Tags</a>
                                </div>
                                <div id="collapseSix" className="collapse show" data-parent="#accordionExample">
                                <div className="card-body">
                                    <div className="shop__sidebar__tags">
                                    <a href="#">Product</a>
                                    <a href="#">Bags</a>
                                    <a href="#">Shoes</a>
                                    <a href="#">Fashio</a>
                                    <a href="#">Clothing</a>
                                    <a href="#">Hats</a>
                                    <a href="#">Accessories</a>
                                    </div>
                                </div>
                                </div>
                            </div> */}
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="shop__product__option">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="shop__product__option__left">
                                <p>Showing 1–12 of 126 results</p>
                            </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="shop__product__option__right">
                                <p>Sort by Price:</p>
                                <select>
                                <option value>Low To High</option>
                                <option value>$0 - $55</option>
                                <option value>$55 - $100</option>
                                </select>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                       
                        { catProducts.map((elem)=>{
                            return(
                            <div key={elem._id} className="col-lg-4 col-md-6 col-sm-6">
                                <div className="product__item">
                                <div className="product__item__pic set-bg" data-setbg={elem.images.mainImage}>
                                    <ul className="product__hover">
                                    <li><a href="#"><img src="/assets/img/icon/heart.png" alt="" /></a></li>
                                    {/* <li><a href="#"><img src="/assets/img/icon/compare.png" alt="" /> <span>Compare</span></a>
                                    </li>
                                    <li><a href="#"><img src="/assets/img/icon/search.png" alt="" /></a>
                                    </li> */}
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6>{elem.name}</h6>
                                    <a href="#" className="add-cart">+ Add To Cart</a>
                                    <div className="rating">
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                    <i className="fa fa-star-o" />
                                    </div>
                                    <h5>${getPrice(elem.size)}</h5>
                                    <div className="product__color__select">
                                    {/* <label htmlFor="pc-4">
                                        <input type="radio" id="pc-4" />
                                    </label>
                                    <label className="active black" htmlFor="pc-5">
                                        <input type="radio" id="pc-5" />
                                    </label>
                                    <label className="grey" htmlFor="pc-6">
                                        <input type="radio" id="pc-6" />
                                    </label> */}
                                    </div>
                                </div>
                                </div>
                            </div>
                            );
                           
                        })}
                       
                        
                        </div>
                        <div className="row">
                        <div className="col-lg-12">
                            <div className="product__pagination">
                            <a className="active" href="#">1</a>
                            <a href="#">2</a>
                            <a href="#">3</a>
                            <span>...</span>
                            <a href="#">21</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
                {/* Shop Section End */}
            </div>
        </Layout>
        </>
    );
}
export default Store;