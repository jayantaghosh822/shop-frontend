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
const Store = ({ children }) =>{
    useScript([
        "/assets/js/main.js",
    ]);
    const [catProducts,setCatProducts] = useState([]);
    const [productBrands,setBrands] = useState([]);
    const [productColors,setColors] = useState([]);
    const [productPrices,setPrices] = useState([]);
    const { category, subcategory } = useParams();
    // alert(category);
    // alert(subcategory);
    useEffect(() => {
        const fetchProductByCat = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
          try {
            const response = await axios.get(`${backendUrl}/api/product-by-category`, {
              params: {
                category: subcategory,
              }
            });
            setCatProducts(response.data.products);
            let priceArray = [];
            response.data.products.forEach(pro => {
                const size = pro.size;
                const prices = size.map(eachSize => eachSize.price);
                // console.log(prices);
                const min = Math.min(...prices);
                const max = Math.max(...prices);
                console.log(min);
                console.log(max);
                if(!(priceArray.includes(min))){
                    priceArray[priceArray.length] = min;
                }
                if(!(priceArray.includes(max))){
                    priceArray[priceArray.length] = max;
                }
               
            });
           
            setPrices(priceArray);
            setBrands(response.data.brands);
            setColors(response.data.colors);
            console.log(response);
          } catch (err) {
            console.error(err);
          }
        };
      
        fetchProductByCat();
    }, []);

    const getPrice = (size) => {
        if (!Array.isArray(size) || size.length === 0) return "N/A";
    
        const prices = size.map(eachSize => eachSize.price);
        
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        
        return `${min}-${max}`;
    };
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
                                                <li><a href="#">{brand.name}</a></li>
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
                                        {console.log(productPrices)}
                                    <ul>
                                        <li><a href="#">$0.00 - $50.00</a></li>
                                        <li><a href="#">$50.00 - $100.00</a></li>
                                        <li><a href="#">$100.00 - $150.00</a></li>
                                        <li><a href="#">$150.00 - $200.00</a></li>
                                        <li><a href="#">$200.00 - $250.00</a></li>
                                        <li><a href="#">250.00+</a></li>
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
                                    <label htmlFor="xs">xs
                                        <input type="radio" id="xs" />
                                    </label>
                                    <label htmlFor="sm">s
                                        <input type="radio" id="sm" />
                                    </label>
                                    <label htmlFor="md">m
                                        <input type="radio" id="md" />
                                    </label>
                                    <label htmlFor="xl">xl
                                        <input type="radio" id="xl" />
                                    </label>
                                    <label htmlFor="2xl">2xl
                                        <input type="radio" id="2xl" />
                                    </label>
                                    <label htmlFor="xxl">xxl
                                        <input type="radio" id="xxl" />
                                    </label>
                                    <label htmlFor="3xl">3xl
                                        <input type="radio" id="3xl" />
                                    </label>
                                    <label htmlFor="4xl">4xl
                                        <input type="radio" id="4xl" />
                                    </label>
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
                                                <label htmlFor="xs" className="box-color">{color.name}
                                                    <input type="radio" id="xs" />
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
                        {console.log(catProducts)}
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