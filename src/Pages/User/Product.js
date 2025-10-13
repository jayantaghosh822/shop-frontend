import { useEffect, useState } from "react";
import useScript from "../../Hooks/jsLoader";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCart,cleanCart } from '../../redux/cartSlice';
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reduxAddToCart } from '../../redux/cartSlice';
import { useSelector } from "react-redux";
const Product = () =>{
    const [product , setProduct] = useState({});
    const [sizes , listSizes] = useState([]);
    const [selectedSize , setSelectedSize] = useState({});
    const [priceRange , setPriceRange] = useState("");
    // const [addToCart , setAddToCart] = useState(false);
    const params = useParams();
   

    const fetchProduct = async()=>{
          const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const getProductByID = await axios.get(`${backendUrl}`+`/api/get-product-by-slug/${params.p}`);
            // console.log(getProductByID);
            setProduct(getProductByID.data.result);
            listSizes(getProductByID.data.result.size);
            
            const script = document.createElement("script");
            const src = '/assets/js/main.js';
            script.src = src;
            script.async = true;
            script.onload = () => {
                console.log(`${src} loaded.`);
                if (window.jQuery) {
                window.$ = window.jQuery; // Ensure jQuery is globally available
                }
                
            };
            script.onerror = () => console.error(`Error loading ${src}`);
            document.body.appendChild(script);
    }

    useEffect(()=>{
        
       fetchProduct();
        
    },[]);
 
    const [itemsInCart , setItemsInCart] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [selectedVariation, setSelectedVariation] = useState(null);
    const authuser = useSelector((state) => state.auth.user);
    console.log("category Page user",authuser);
    const dispatch = useDispatch();
    const addToCart= async()=>{
        // toast.success('tets', {
        //         position: "top-right",
        //         autoClose: 3000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        // console.log(selectedVariation);
        try{
        // if(!params.p || !product.name || !selectedSize.size || !selectedSize.price){

        //     return;
        // }
        const productData = {
            'productId': product._id,
            'variationId':selectedVariation._id,
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
            dispatch(fetchCart());
            // itemData = {
            //     'product': params.p,
            //     'metaData':{
            //         'name': product.name,
            //         'size': selectedSize.size,
            //         'sizeId':selectedSize._id
            //     },
            //     'price': selectedSize.price,
            //     'quan':1
            // }
            // console.log(itemData);
            // setItemsInCart(prev=>{
            //     return{
            //         ...prev,
            //         ...itemData
            //     }
            // });
        }else{
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
            dispatch(fetchCart());
        }

        
        


        // setModalShow(false);
       

        }catch(err){
            toast.error('Something Went Wrong', {
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
    let accumulatedPath = '';
    // console.log(selectedVariation);

   

    // When attribute is selected
    const handleAttributeSelect = (attrName, value) => {
        const updated = { ...selectedAttributes, [attrName]: value };
        setSelectedAttributes(updated);

        // Try to find variation that matches all selected attributes
        const matchedVariation = product.variations?.find(v =>
            Object.entries(updated).every(([key, val]) => v.attributes[key] === val)
        );
        setSelectedVariation(matchedVariation || null);
        // console.log("product",product);
        // console.log("selectedVariation",selectedVariation);
        // calculatePriceRange(product, selectedVariation);
    };

    // console.log(selectedAttributes);
    console.log(selectedVariation);
    // Calculate price
    const calculatePriceRange = (product, selectedVariation) => {
        if (!product?.variations?.length) return null;

        if (selectedVariation?.price) {
            return `$${selectedVariation.price}`;
        }

        const prices = product.variations.map(v => v.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        return min === max ? `$${min}` : `$${min} - $${max}`;
    };
    return(
        <>
            {/* Shop Details Section Begin */}
            <section className="shop-details">
                <div className="product__details__pic">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="product__details__breadcrumb">
                        

                        {
                       
                        product?.categorypath?.map((cat, index) => {
                        accumulatedPath += `/${cat.slug}`;

                        return (
                            <span key={cat.slug}>
                            <Link to={`${accumulatedPath}/`}>{cat.name}</Link>
                           
                            </span>
                        );
                        })}

                        
                        <span>{product.name}</span>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-lg-3 col-md-3">
                        <ul className="nav nav-tabs" role="tablist">
                        {product?.images?.galleryImages.map((img,ind)=>{
                            return(
                                <>
                                 <li className="nav-item" key={ind}>
                                    <a
                                    className={`nav-link ${ind === 0 ? 'active' : ''}`}
                                    data-toggle="tab"
                                    href={`#tabs-${ind+1}`}
                                    role="tab"
                                    >
                                    <div
                                        className="product__thumb__pic set-bg"
                                        data-setbg={img}
                                    ></div>
                                    </a>
                                </li>
                                </>
                            )
                        })}
                       
                       
                        </ul>
                    </div>
                    <div className="col-lg-6 col-md-9">
                        <div className="tab-content">
                        {product?.images?.galleryImages.map((img,ind)=>{
                            return(
                                <div className={`tab-pane fade ${ind === 0 ? 'show active' : ''}`} id={`tabs-${ind+1}`} role="tabpanel">
                                    <div className="product__details__pic__item">
                                    <img src={img} alt="" />
                                    </div>
                                </div>
                            );
                        
                        })}
                        
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="product__details__content">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                        <div className="product__details__text">
                        <h4>{product.name}</h4>
                        <div className="rating">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-o" />
                            <span> - 5 Reviews</span>
                        </div>
                        <h3>
                            {calculatePriceRange(product,selectedVariation)}
                        </h3>
                        {/* <p>
                            Coat with quilted lining and an adjustable hood. Featuring long
                            sleeves with adjustable cuff tabs, adjustable asymmetric hem
                            with elastic side tabs and a front zip fastening with placket.
                        </p> */}

                        <div className="product__details__option">
                            {product?.attributes?.map((attr) => (
                                <div key={attr._id} className="product__details__option__size">
                                <span>{attr.name}:</span>
                                {attr.values.map((value, index) => {
                                    const isActive = selectedAttributes[attr.name] === value;
                                    return (
                                    <label
                                        key={index}
                                        onClick={() => handleAttributeSelect(attr.name, value)}
                                        className={isActive ? "active" : ""}
                                    >
                                        {value}
                                    </label>
                                    );
                                })}
                                </div>
                            ))}
                        </div>

                        {/* {console} */}
                        <div className={`product__details__cart__option ${selectedVariation ? '' : 'disabled'}`}>
                            
                            <a href="" className="primary-btn" onClick={(e)=>{e.preventDefault(); addToCart()}}>
                            add to cart
                            </a>
                        </div>
                        {/* <div className="product__details__btns__option">
                            <a href="#">
                            <i className="fa fa-heart" /> add to wishlist
                            </a>
                            <a href="#">
                            <i className="fa fa-exchange" /> Add To Compare
                            </a>
                        </div> */}
                        <div className="product__details__last__option">
                            <h5>
                            <span>Guaranteed Safe Checkout</span>
                            </h5>
                            <img src="img/shop-details/details-payment.png" alt="" />
                            <ul>
                            <li>
                                <span>SKU:</span> 3812912
                            </li>
                            <li>
                                <span>Categories:</span> Clothes
                            </li>
                            <li>
                                <span>Tag:</span> Clothes, Skin, Body
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="product__details__tab">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                            <a
                                className="nav-link active"
                                data-toggle="tab"
                                href="#tabs-5"
                                role="tab"
                            >
                                Description
                            </a>
                            </li>
                            <li className="nav-item">
                            <a
                                className="nav-link"
                                data-toggle="tab"
                                href="#tabs-6"
                                role="tab"
                            >
                                Customer Previews(5)
                            </a>
                            </li>
                            <li className="nav-item">
                            <a
                                className="nav-link"
                                data-toggle="tab"
                                href="#tabs-7"
                                role="tab"
                            >
                                Additional information
                            </a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="tabs-5" role="tabpanel">
                            <div className="product__details__tab__content">
                                <p className="note">
                                Nam tempus turpis at metus scelerisque placerat nulla
                                deumantos solicitud felis. Pellentesque diam dolor,
                                elementum etos lobortis des mollis ut risus. Sedcus
                                faucibus an sullamcorper mattis drostique des commodo
                                pharetras loremos.
                                </p>
                                <div className="product__details__tab__content__item">
                                <h5>Products Infomation</h5>
                                <p>
                                    A Pocket PC is a handheld computer, which features many
                                    of the same capabilities as a modern PC. These handy
                                    little devices allow individuals to retrieve and store
                                    e-mail messages, create a contact file, coordinate
                                    appointments, surf the internet, exchange text messages
                                    and more. Every product that is labeled as a Pocket PC
                                    must be accompanied with specific software to operate
                                    the unit and must feature a touchscreen and touchpad.
                                </p>
                                <p>
                                    As is the case with any new technology product, the cost
                                    of a Pocket PC was substantial during it’s early
                                    release. For approximately $700.00, consumers could
                                    purchase one of top-of-the-line Pocket PCs in 2003.
                                    These days, customers are finding that prices have
                                    become much more reasonable now that the newness is
                                    wearing off. For approximately $350.00, a new Pocket PC
                                    can now be purchased.
                                </p>
                                </div>
                                <div className="product__details__tab__content__item">
                                <h5>Material used</h5>
                                <p>
                                    Polyester is deemed lower quality due to its none
                                    natural quality’s. Made from synthetic materials, not
                                    natural like wool. Polyester suits become creased easily
                                    and are known for not being breathable. Polyester suits
                                    tend to have a shine to them compared to wool and cotton
                                    suits, this can make the suit look cheap. The texture of
                                    velvet is luxurious and breathable. Velvet is a great
                                    choice for dinner party jacket and can be worn all year
                                    round.
                                </p>
                                </div>
                            </div>
                            </div>
                            <div className="tab-pane" id="tabs-6" role="tabpanel">
                            <div className="product__details__tab__content">
                                <div className="product__details__tab__content__item">
                                <h5>Products Infomation</h5>
                                <p>
                                    A Pocket PC is a handheld computer, which features many
                                    of the same capabilities as a modern PC. These handy
                                    little devices allow individuals to retrieve and store
                                    e-mail messages, create a contact file, coordinate
                                    appointments, surf the internet, exchange text messages
                                    and more. Every product that is labeled as a Pocket PC
                                    must be accompanied with specific software to operate
                                    the unit and must feature a touchscreen and touchpad.
                                </p>
                                <p>
                                    As is the case with any new technology product, the cost
                                    of a Pocket PC was substantial during it’s early
                                    release. For approximately $700.00, consumers could
                                    purchase one of top-of-the-line Pocket PCs in 2003.
                                    These days, customers are finding that prices have
                                    become much more reasonable now that the newness is
                                    wearing off. For approximately $350.00, a new Pocket PC
                                    can now be purchased.
                                </p>
                                </div>
                                <div className="product__details__tab__content__item">
                                <h5>Material used</h5>
                                <p>
                                    Polyester is deemed lower quality due to its none
                                    natural quality’s. Made from synthetic materials, not
                                    natural like wool. Polyester suits become creased easily
                                    and are known for not being breathable. Polyester suits
                                    tend to have a shine to them compared to wool and cotton
                                    suits, this can make the suit look cheap. The texture of
                                    velvet is luxurious and breathable. Velvet is a great
                                    choice for dinner party jacket and can be worn all year
                                    round.
                                </p>
                                </div>
                            </div>
                            </div>
                            <div className="tab-pane" id="tabs-7" role="tabpanel">
                            <div className="product__details__tab__content">
                                <p className="note">
                                Nam tempus turpis at metus scelerisque placerat nulla
                                deumantos solicitud felis. Pellentesque diam dolor,
                                elementum etos lobortis des mollis ut risus. Sedcus
                                faucibus an sullamcorper mattis drostique des commodo
                                pharetras loremos.
                                </p>
                                <div className="product__details__tab__content__item">
                                <h5>Products Infomation</h5>
                                <p>
                                    A Pocket PC is a handheld computer, which features many
                                    of the same capabilities as a modern PC. These handy
                                    little devices allow individuals to retrieve and store
                                    e-mail messages, create a contact file, coordinate
                                    appointments, surf the internet, exchange text messages
                                    and more. Every product that is labeled as a Pocket PC
                                    must be accompanied with specific software to operate
                                    the unit and must feature a touchscreen and touchpad.
                                </p>
                                <p>
                                    As is the case with any new technology product, the cost
                                    of a Pocket PC was substantial during it’s early
                                    release. For approximately $700.00, consumers could
                                    purchase one of top-of-the-line Pocket PCs in 2003.
                                    These days, customers are finding that prices have
                                    become much more reasonable now that the newness is
                                    wearing off. For approximately $350.00, a new Pocket PC
                                    can now be purchased.
                                </p>
                                </div>
                                <div className="product__details__tab__content__item">
                                <h5>Material used</h5>
                                <p>
                                    Polyester is deemed lower quality due to its none
                                    natural quality’s. Made from synthetic materials, not
                                    natural like wool. Polyester suits become creased easily
                                    and are known for not being breathable. Polyester suits
                                    tend to have a shine to them compared to wool and cotton
                                    suits, this can make the suit look cheap. The texture of
                                    velvet is luxurious and breathable. Velvet is a great
                                    choice for dinner party jacket and can be worn all year
                                    round.
                                </p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            {/* Shop Details Section End */}
            {/* Related Section Begin */}
            {/* <section className="related spad">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <h3 className="related-title">Related Product</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6 col-sm-6">
                    <div className="product__item">
                        <div
                        className="product__item__pic set-bg"
                        data-setbg="img/product/product-1.jpg"
                        >
                        <span className="label">New</span>
                        <ul className="product__hover">
                            <li>
                            <a href="#">
                                <img src="img/icon/heart.png" alt="" />
                            </a>
                            </li>
                            <li>
                            <a href="#">
                                <img src="img/icon/compare.png" alt="" />{" "}
                                <span>Compare</span>
                            </a>
                            </li>
                            <li>
                            <a href="#">
                                <img src="img/icon/search.png" alt="" />
                            </a>
                            </li>
                        </ul>
                        </div>
                        <div className="product__item__text">
                        <h6>Piqué Biker Jacket</h6>
                        <a href="#" className="add-cart">
                            + Add To Cart
                        </a>
                        <div className="rating">
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                        </div>
                        <h5>$67.24</h5>
                        <div className="product__color__select">
                            <label htmlFor="pc-1">
                            <input type="radio" id="pc-1" />
                            </label>
                            <label className="active black" htmlFor="pc-2">
                            <input type="radio" id="pc-2" />
                            </label>
                            <label className="grey" htmlFor="pc-3">
                            <input type="radio" id="pc-3" />
                            </label>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-sm-6">
                    <div className="product__item">
                        <div
                        className="product__item__pic set-bg"
                        data-setbg="img/product/product-2.jpg"
                        >
                        <ul className="product__hover">
                            <li>
                            <a href="#">
                                <img src="img/icon/heart.png" alt="" />
                            </a>
                            </li>
                            <li>
                            <a href="#">
                                <img src="img/icon/compare.png" alt="" />{" "}
                                <span>Compare</span>
                            </a>
                            </li>
                            <li>
                            <a href="#">
                                <img src="img/icon/search.png" alt="" />
                            </a>
                            </li>
                        </ul>
                        </div>
                        <div className="product__item__text">
                        <h6>Piqué Biker Jacket</h6>
                        <a href="#" className="add-cart">
                            + Add To Cart
                        </a>
                        <div className="rating">
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                        </div>
                        <h5>$67.24</h5>
                        <div className="product__color__select">
                            <label htmlFor="pc-4">
                            <input type="radio" id="pc-4" />
                            </label>
                            <label className="active black" htmlFor="pc-5">
                            <input type="radio" id="pc-5" />
                            </label>
                            <label className="grey" htmlFor="pc-6">
                            <input type="radio" id="pc-6" />
                            </label>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-sm-6">
                    <div className="product__item sale">
                        <div
                        className="product__item__pic set-bg"
                        data-setbg="img/product/product-3.jpg"
                        >
                        <span className="label">Sale</span>
                        <ul className="product__hover">
                            <li>
                            <a href="#">
                                <img src="img/icon/heart.png" alt="" />
                            </a>
                            </li>
                            <li>
                            <a href="#">
                                <img src="img/icon/compare.png" alt="" />{" "}
                                <span>Compare</span>
                            </a>
                            </li>
                            <li>
                            <a href="#">
                                <img src="img/icon/search.png" alt="" />
                            </a>
                            </li>
                        </ul>
                        </div>
                        <div className="product__item__text">
                        <h6>Multi-pocket Chest Bag</h6>
                        <a href="#" className="add-cart">
                            + Add To Cart
                        </a>
                        <div className="rating">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-o" />
                        </div>
                        <h5>$43.48</h5>
                        <div className="product__color__select">
                            <label htmlFor="pc-7">
                            <input type="radio" id="pc-7" />
                            </label>
                            <label className="active black" htmlFor="pc-8">
                            <input type="radio" id="pc-8" />
                            </label>
                            <label className="grey" htmlFor="pc-9">
                            <input type="radio" id="pc-9" />
                            </label>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-sm-6">
                    <div className="product__item">
                        <div
                        className="product__item__pic set-bg"
                        data-setbg="img/product/product-4.jpg"
                        >
                        <ul className="product__hover">
                            <li>
                            <a href="#">
                                <img src="img/icon/heart.png" alt="" />
                            </a>
                            </li>
                            <li>
                            <a href="#">
                                <img src="img/icon/compare.png" alt="" />{" "}
                                <span>Compare</span>
                            </a>
                            </li>
                            <li>
                            <a href="#">
                                <img src="img/icon/search.png" alt="" />
                            </a>
                            </li>
                        </ul>
                        </div>
                        <div className="product__item__text">
                        <h6>Diagonal Textured Cap</h6>
                        <a href="#" className="add-cart">
                            + Add To Cart
                        </a>
                        <div className="rating">
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                        </div>
                        <h5>$60.9</h5>
                        <div className="product__color__select">
                            <label htmlFor="pc-10">
                            <input type="radio" id="pc-10" />
                            </label>
                            <label className="active black" htmlFor="pc-11">
                            <input type="radio" id="pc-11" />
                            </label>
                            <label className="grey" htmlFor="pc-12">
                            <input type="radio" id="pc-12" />
                            </label>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>  */}
            {/* Related Section End */}
        </>

    );
}

export default Product;