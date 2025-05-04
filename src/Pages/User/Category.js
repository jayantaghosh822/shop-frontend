import React from 'react';
import { useState , useRef , useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useScript from "../../Hooks/jsLoader";
import Layout from "../../Layouts/User/Layout";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom"; // if you're using react-router-dom v6
import { useDispatch } from "react-redux";
import { reduxAddToCart } from '../../redux/cartSlice';
import { useSelector } from "react-redux";

import { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};



const Store = () =>{
    const [proSizes,setProSizes] = useState([]);
    const [sizesChosenForProducts , setSizesChosenForProducts] = useState({});
    const [itemsInCart , setItemsInCart] = useState([]);

    const cart = useSelector((state) => state.cart);
    console.log(cart);
    // useEffect(()=>{
    //     console.log(itemsInCart);
    //     console.log(cart);
    // },[cart])
    const toggleProductSizeActiveClass = (proID , proName, sizeID ,size ,price)=> {
        // alert(proID);
        // alert(sizeID);
        const ifSizeExists = Object.entries(sizesChosenForProducts).some(
            ([key, value]) => key==proID && value.sizeId == sizeID
        );
        setSizesChosenForProducts(prev => 
            {
                if(!ifSizeExists){
                    return {
                        ...prev,
                        [proID]: {
                        name: proName,
                        size,
                        sizeId: sizeID,
                        price
                        }
                    };
                }else{
                    const sizesUnderPro ={ ...prev};
                    delete sizesUnderPro[proID];

                    // console.log("my sizes under pro",sizesUnderPro);
                    return sizesUnderPro;
                    
                }
               
            }
        );
        const prosizeId = `${proID}-${sizeID}`;
        // setProSizes(prev => {
        //   const isSelected = prev.some(s => s === prosizeId);
        //   if (isSelected) {
        //     return prev.filter(s => s !== prosizeId);
        //   } else {
        //     return [...prev, prosizeId];
        //   }
        // });
    };

    // const  addToCartVisibility = (proId)=>{
    //     return true;
    // }
    const MyVerticallyCenteredModal =(props)=>{
        // console.log(props);
        let disabled = true;
        
        if(props.productData.name){
            // console.log(props);
            // console.log(proSizes);
            disabled = !(Object.entries(sizesChosenForProducts).some(
                ([key, value]) => key==props.productData._id
            ));
            // console.log("productID",props.productData._id);
            // console.log("cart butt",disabled);
            return (
                <Modal
                  {...props}
                  size="sm"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                     <h6>{props.productData.name}</h6>
                     {/* <img height="50" width="50" src={props.productData.images.mainImage}></img> */}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {/* <h4>Centered Modal</h4> */}
                    <div class="product__details__option__size">
                        <span>Size:</span>
                        {props.productData.size.map((size)=>{
                            // {console.log(size.size)}
                            return(
                            <label for="xxl" onClick={(e) => {
                                e.preventDefault();
                                // alert('test');
                                toggleProductSizeActiveClass(props.productData._id,props.productData.name,size._id,size.size,size.price);
                                }} className={Object.values(sizesChosenForProducts).some(
                                    product => product.sizeId === size._id
                                  )?'active':''}>{size.size}
                                <input type="radio" id="xxl" />
                            </label>
                            );
                        })}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                  
                    <button disabled={disabled} class="w-100 btn btn-primary btn-lg" onClick={(e) => {
                                                        e.preventDefault();
                                                        // alert('test');
                                                        addToCart(props.productData._id);
                    }} type="submit" style={{ backgroundColor: '#0e0e0d' }}>Add To Cart</button>

                  </Modal.Footer>
                </Modal>
              );
        }
     
    }
    const authuser = useSelector((state) => state.auth.user);
    console.log("category Page user",authuser);
    const dispatch = useDispatch();
    const addToCart= async(itemId)=>{
        try{
        const productData = {
            'product': itemId,
            'metaData':{
                'name': sizesChosenForProducts[itemId].name,
                'size': sizesChosenForProducts[itemId].size,
                'price': sizesChosenForProducts[itemId].price
            },
            'quan':1
            
        };
        let itemData = {};
        if(authuser){
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const addToCart = await axios.post(`${backendUrl}/api/add-to-cart/`, {
                productData: productData
              }, {
                withCredentials: true
            });
            toast.success(addToCart.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            itemData = {
                [addToCart.data.itemSaved._id] :{
                    'productId':addToCart.data.itemSaved.product,
                    'metaData':addToCart.data.itemSaved.metaData
                }
            }
            console.log(itemData);
            setItemsInCart(prev=>{
                return{
                    ...prev,
                    ...itemData
                }
            });
        }else{
            const tempId = `temp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
            itemData = {
                [tempId]:{
                    'productId':itemId,
                    'metaData':{
                        'name': sizesChosenForProducts[itemId].name,
                        'size': sizesChosenForProducts[itemId].size,
                        'price': sizesChosenForProducts[itemId].price
                    }
                }
            }
            setItemsInCart(prev=>{
                return{
                    ...prev,
                    ...itemData
                }
            });
        }

        
        


        setModalShow(false);
       
        dispatch(reduxAddToCart({ itemData,authuser }));
        }catch(err){

        }
       
        
        
    }

    useScript([
        "/assets/js/main.js",
    ]);
    const [modalShow, setModalShow] = useState(true);

    //set products and filterLists
    const [catProducts,setCatProducts] = useState([]);
    const [productBrands,setBrands] = useState([]);
    const [productPrices,setPrices] = useState([]);
    const [productSizes,setSizes] = useState([]);
    const [productColors,setColors] = useState([]);
    const [pageInfo , setPageInfo] = useState({});
    let [currentPage , setCurrentPage] = useState(null);
    const [filtersReady, setFiltersReady] = useState(false);
    // const [totalPages , setTotalPages] = useState(0);
    //set products and filterLists
    
    //filtering products
    const [filterBrands,setfilterBrands] = useState([]);
    const [filterPrices,setfilterPrices] = useState([]);
    const [filterSizes,setfilterSizes] = useState([]);
    const [filterColors,setfilterColors] = useState([]);
    //filtering products

    const { category, subcategory } = useParams();

    // alert(subcategory);
    
    const toggleBrand = (brandId)=> {
        // alert(brandId);
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
        const step2 = 500;
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
      
    //    console.log(productSizes);
        let sizeArray = [];
        let sizeFilterList = [];
     
            productSizes.forEach(size => {
               
                  
                    sizeFilterList.push(
                        <label htmlFor="" className={filterSizes.some(s => s === size.size) ? "active" : ""} key={size.size} onClick={(e) => {
                            e.preventDefault();
                            toggleSizes(size.size);
                            }}
                        >{size.size} 
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

    const renderPageNumbers = ()=>{
        // console.log(pageInfo);
        let storeLinks = [];
        for(let i=1 ; i<=pageInfo.totalPages ; i++){
            storeLinks.push(
                <a href="#" onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i);
                    pageChangefilterProducts(i);
                    }}  className={i==pageInfo.currentPage?'active':''}>{i}</a>
            );
        }
        if(storeLinks.length>5){
            storeLinks.push(
                <>
                 <span>...</span>
                 <a href="#">21</a>
                </>
               
            );
        }
        // console.log(storeLinks);
        return(
            <div className="col-lg-12">
                <div className="product__pagination">
                {storeLinks}
               
             
                </div>
            </div>
        );
        
    }
    const navigate = useNavigate();
    const location = useLocation();
    
    //set filters states from url when reloadede
    // useEffect(() => {
    //     const searchParams = new URLSearchParams(location.search);
    //     const brandsFromUrl = searchParams.get('brands')?.split(',') || [];
    //     const colorsFromUrl = searchParams.get('colors')?.split(',') || [];
    //     const sizesFromUrl = searchParams.get('sizes')?.split(',') || [];
    //     const pricesFromUrl = searchParams.get('prices')?.split(',') || [];
      
    //     if (brandsFromUrl.length) setfilterBrands(brandsFromUrl);
    //     if (colorsFromUrl.length) setfilterColors(colorsFromUrl);
    //     if (sizesFromUrl.length) setfilterSizes(sizesFromUrl);
    //     if (pricesFromUrl.length) setfilterPrices(pricesFromUrl);
    //     setFiltersReady(true); // ✅ only after setting all
    // }, []); // <-- empty dependency array! runs only once
    


    //subcategory on change
    useEffect(() => {
        if (!subcategory) return;
        // alert(subcategory);
        const searchParams = new URLSearchParams(location.search);
        const brandsFromUrl = searchParams.get('brands')?.split(',') || [];
        const colorsFromUrl = searchParams.get('colors')?.split(',') || [];
        const sizesFromUrl = searchParams.get('sizes')?.split(',') || [];
        const pricesFromUrl = searchParams.get('prices')?.split(',') || [];

        if (brandsFromUrl.length) setfilterBrands(brandsFromUrl); // this happens when we are reloadig the page
        else setfilterBrands([]); //on clicking new category the query is getting blank,  so emptying the states 

        if (colorsFromUrl.length) setfilterColors(colorsFromUrl);// this happens when we are reloadig the page
        else setfilterColors([]); //on clicking new category the query is getting blank,  so emptying the states


        if (sizesFromUrl.length) setfilterSizes(sizesFromUrl); // this happens when we are reloadig the page
        else setfilterSizes([]); //on clicking new category the query is getting blank,  so emptying the states

        if (pricesFromUrl.length) setfilterPrices(pricesFromUrl); // this happens when we are reloadig the page
        else setfilterPrices([]); //on clicking new category the query is getting blank,  so emptying the states

        setFiltersReady(true);
    }, [subcategory]);  // 👈 whenever the slug/category changes

    
    //main query filter
    useEffect(()=>{

        const filterProducts= async()=>{

            try{
                if (!filtersReady){return;} // ⛔ don't fetch until filters loaded
                // console.log('brands',filterBrands);
                // console.log('prices',filterBrands);
                // console.log('SIZERS',filterSizes);
                // console.log('colors',filterColors);
                

                const searchParams = new URLSearchParams(location.search);
                const brandsFromUrl = searchParams.get('brands')?.split(',') || [];
                const colorsFromUrl = searchParams.get('colors')?.split(',') || [];
                // console.log(brandsFromUrl);
                // console.log(colorsFromUrl);
                setLoading(true);
                const backendUrl = process.env.REACT_APP_BACKEND_URL;
                const filterProducts = await axios.get(`${backendUrl}/api/filter-products/`, {
                    params: {
                        cat: subcategory,
                        brands: filterBrands,
                        prices: filterPrices,
                        sizes: filterSizes,
                        colors: filterColors,
                        currentPage: null
                    },
                    withCredentials: true,
                });
                setLoading(false);
                setCatProducts(filterProducts.data.products);
                const products = (filterProducts.data.products);
                // console.log(products);
                setPageInfo({
                    currentPage: filterProducts.data.currentPage,
                    totalPages: filterProducts.data.totalPages,
                    totalProducts: filterProducts.data.total_products,
                });
                const minPrice = filterProducts.data.lowestPrice;
                const maxPrice = filterProducts.data.highestPrice;
                setPrices([minPrice, maxPrice]);
                setSizes(filterProducts.data.sizes);
                setBrands(filterProducts.data.brands);
                setColors(filterProducts.data.colors);
               
                const queryParams = new URLSearchParams();

                if (filterBrands.length > 0) queryParams.append('brands', filterBrands.join(','));
                if (filterPrices.length > 0) queryParams.append('prices', filterPrices.join(','));
                if (filterSizes.length > 0) queryParams.append('sizes', filterSizes.join(','));
                if (filterColors.length > 0) queryParams.append('colors', filterColors.join(','));

                const queryString = queryParams.toString();
                if (filterBrands.length > 0 || filterPrices.length > 0 || filterSizes.length > 0 || filterColors.length > 0){
                    navigate(`${location.pathname}?${queryString}`, { replace: true });
                }
                if (filterBrands.length == 0 && filterPrices.length == 0 && filterSizes.length == 0 && filterColors.length == 0){
                    navigate(`${location.pathname}`, { replace: true });
                }
            
            }catch(err){
                // console.log('brands',err);
            }
        }
        
        filterProducts();
          

    },[filtersReady,filterBrands,filterPrices,filterSizes,filterColors]);

   


    const pageChangefilterProducts= async(pageno)=>{
        // alert("pagechamged");
        // alert(subcategory);
        try{

            // console.log('brands',filterBrands);
            // console.log('prices',filterBrands);
            // console.log('SIZERS',filterSizes);
            // console.log('colors',filterColors);
            setLoading(true);
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const filterProducts = await axios.get(`${backendUrl}/api/filter-products/`, {
                params: {
                    cat: subcategory,
                    brands: filterBrands,
                    prices: filterPrices,
                    sizes: filterSizes,
                    colors: filterColors,
                    currentPage: pageno
                },
                withCredentials: true,
            });
            setLoading(false);
            setCatProducts(filterProducts.data.products);
            setPageInfo({
                currentPage: filterProducts.data.currentPage,
                totalPages: filterProducts.data.totalPages,
                totalProducts: filterProducts.data.total_products,
            });
            
        }catch(err){
            // console.log('brands',err);
        }
    }


    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    const MyLoader = ()=> {
        if(loading){
            return (
                <div style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(255, 255, 255, 0.7)", // optional: light background overlay
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999, // make sure it's on top
                }}>
                  <ClipLoader
                    color="red"
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              );
        }else{
            return;
        }
       
    }



    const [producModalData , setProducModalData] = useState({});
    
    return(
        <>
       {MyLoader()}
        <>
{/* {console.log(sizesChosenForProducts)} */}
{/* {console.log(itemsInCart)} */}
            <div >
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
                            {/* {console.log(productPrices)} */}
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
                                {/* { console.log(catProducts.currentPage)} */}
                                <p>Showing {(pageInfo.currentPage - 1) * 3 + 1}–{Math.min(pageInfo.currentPage * 3, pageInfo.totalProducts)} of {pageInfo.totalProducts} results</p>
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
                                    <h6 >{elem.name}</h6>
                                    {/* {console.log(cart)} */}
                                    {(Object.entries(cart.items).some(
                                             ([key, value]) => value.productId==elem._id
                                    ))?
                                    <a href="#opneprobox" className="add-cart">Added To Cart</a>:
                                    <a href="#opneprobox" onClick={() => {setModalShow(true);setProducModalData(elem);}} className="add-cart">+ Add To Cart</a>
                                    }
                                    {/* <a href="#opneprobox" onClick={() => {setModalShow(true);setProducModalData(elem);}} className="add-cart">+ Add To Cart</a> */}
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
                        {renderPageNumbers()}
                        </div>
                    </div>
                    </div>
                </div>
                </section>

                <MyVerticallyCenteredModal
                    show={modalShow}
                    size="sm"
                    onHide={() => setModalShow(false)}
                    productData={producModalData}
                />
                {/* Shop Section End */}
            </div>
        </>
        
        </>
    );
}
export default Store;