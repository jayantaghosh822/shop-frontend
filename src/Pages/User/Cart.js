import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import axiosInstance from '../../Interceptor/axiosInstance'; // path to your interceptor file
import { useDispatch } from "react-redux";
import { loginSuccess,logout,loginPopup } from "../../redux/authSlice";
import { fetchCartReducer } from "../../redux/cartSlice";
import { fetchCart,cleanCart } from '../../redux/cartSlice';
import { Outlet, Link } from "react-router-dom";

const Cart = ()=>{
    const authuser = useSelector((state) => state.auth.user);
    const reduxCart = useSelector((state) => state.cart);
    const [cart , setCart] = useState({
      cartId:'',
      structuredCart:[]
    });
    // const [cartTotal , setTotal] = useState(0);
    // const calculate =(cart)=>{
    //     console.log(cart.items);
    //     let cartTotal = 0;

    //     for (const key in cart.items) {
    //         const item = cart.items[key];
    //         // console.log();
    //         const price = item.metaData.price;
    //         const quantity = item.quan || 1;
    //         cartTotal += price * quantity;
    //     }
    //     setTotal(cartTotal);
    // }
    const dispatch = useDispatch();
    // const getCartItems = async () => {
    //     if(authuser){
    //       try{
    //         const backendUrl = process.env.REACT_APP_BACKEND_URL;
    //         let cartData = '';
    //         if(authuser){
    //              cartData = await axiosInstance.post(
    //                 `${backendUrl}/api/get-user-cart-data`,
    //                 { cart:reduxCart },   // body
    //                 { withCredentials: true } // config
    //             );
    //         }
                
               
    
    //         console.log(cartData.data);
    //         // if(authuser){
    //           setCart(cartData.data);
    //         // }else{
    //         //   setCart([]);
    //         // }
    //       }catch(err){
        
    //         if(err.response.status == 403 || err.response.status == 401)
    //         {
    //           console.error("User not logged in or token expired", err);
    //           dispatch(loginPopup({ showForm: true }));
    //         }

    //       }
    //     }else{
    //       //   const backendUrl = process.env.REACT_APP_BACKEND_URL;
    //       //   let cartData = '';
    //       //   cartData = await axios.post(
    //       //     `${backendUrl}/api/get-cart-data`,
    //       //     { cart:reduxCart },   // body
    //       //     { withCredentials: true } // config
    //       //   );
    //       // setCart(cartData.data);
    //     }
            
    // };
    // useEffect(()=>{
    //   console.log(reduxCart);
    //   // if(!authuser){
    //   //   setCart([]);
    //   // }
    //   if(Array.isArray(reduxCart.items)){
    //     console.log('oklkkkkkkkk');
    //       getCartItems();
    //   }
    // },[reduxCart]);

    
    // const dispatch = useDispatch();
    // const fetchCart = async()=>{
    //   try{
    //     const cartItems = await axiosInstance.get(`/api/get-cart-items/`);
    //     console.log(cartItems);
    //     setCart(cartItems.data.cartItems);
    //     dispatch(fetchCartReducer(cartItems.data.cartItems));
    //   }catch(err){
        
    //     if(err.response.status == 403 || err.response.status == 401)
    //     {
    //       console.error("User not logged in or token expired", err);
    //       dispatch(loginPopup({ showForm: true }));
    //     }

    //   }
     
          
    // }
    useEffect(()=>{

        const script = document.createElement("script");
                const src = '/assets/js/main.js';
                script.src = src;
                script.async = true;
                script.onload = () => {
                    console.log(`${src} loaded.`);
                    if (window.jQuery) {
                    window.$ = window.jQuery; // Ensure jQuery is globally available
                    }
                    // if (onLoadCallback) onLoadCallback();
                };
        script.onerror = () => console.error(`Error loading ${src}`);
        document.body.appendChild(script);


        //fetchCart();
        // calculate(cart);

    },[]);

    const removeItem = async(id,productId , variationId) =>{
      alert(id);
      // const cartId = cart.cartId;
      // alert(cartId);
      // return;
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      try{
        if(authuser){
          await axios.delete(backendUrl+`/api/remove-cart-item`, {
            params: { itemId: id },
            withCredentials: true 
          });
        }else{
          await axios.delete(backendUrl+`/api/remove-cart-item`, {
            data: {
              productId: productId,
              variationId: variationId
            }
          },{ withCredentials: true });
        }
        

        // console.log(itemDelete);
        dispatch(fetchCart());
      }catch(err){
        console.error("User not logged in or token expired", err);
        if(err.response.status == 403 || err.response.status == 401)
        dispatch(loginPopup({ showForm: true }));
      }
    }

    const updateCart = async()=>{
      try{
        const cartItems = await axiosInstance.get(`/api/get-cart-items/`);
        console.log(cartItems);
        dispatch(fetchCartReducer(cartItems.data.cartItems));
      }catch(err){
        console.error("User not logged in or token expired", err);
        if(err.response.status == 403 || err.response.status == 401)
        dispatch(loginPopup({ showForm: true }));
        // dispatch(logout()); // Optional: in case you want to clear auth state
      }
    }


    console.log(reduxCart);
    let cartTotal = 0;
    if (Array.isArray(reduxCart.items) && reduxCart.items.length > 0) {
   
      console.log('got inside');
        (reduxCart.items).map((item , index)=>{
          console.log(item);
            cartTotal = cartTotal + item.variation.price*item.quan;
        })
        // console.log(total);
        // setTotal(total);
    }
    console.log(cartTotal);

    const [quantityUpdateButton , setUpdating] = useState(false);
    // 🔹 Update item quantity in backend
    const updateQuan = async (id, productId,variationId,type) => {
      console.log(id,productId,variationId);
      // if (quantityUpdateButton) return; // prevent double click
      // setUpdating(true);
      try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const cartItems = await axios.patch(backendUrl+`/api/update-item`, {
          action: type,          // "inc" or "dec"
          itemId: id,
          productId: productId,
          variationId: variationId
      },{ withCredentials: true } );
      // setUpdating(false);

        // console.log("Updated cart:", cartItems.data);
        dispatch(fetchCart());
      } catch (err) {
        console.error("Error updating quantity:", err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          dispatch(loginPopup({ showForm: true }));
        }
      }
      
    };

   
    // 🔹 Increase quantity
    const incQuan = async (id,productId,variationId) => {
      console.log(id,productId,variationId);
      try {
        if(quantityUpdateButton) return;
        await updateQuan(id,productId,variationId, "inc");
      } catch (err) {
        console.error("Error increasing quantity:", err);
      }
     
    };

    // 🔹 Decrease quantity
    const decQuan = async (id,productId,variationId,quan) => {
      if(quantityUpdateButton) return;
      if(quan<2)
        return;
      try {
        await updateQuan(id,productId,variationId, "dec");
      } catch (err) {
        console.error("Error decreasing quantity:", err);
      }

    };


    
    // console.log(cartTotal);
    return(
       <>
  {/* Breadcrumb Section Begin */}
  <section className="breadcrumb-option">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb__text">
            <h4>Shopping Cart</h4>
            <div className="breadcrumb__links">
              <a href="./index.html">Home</a>
              <a href="./shop.html">Shop</a>
              <span>Shopping Cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Breadcrumb Section End */}
  {/* Shopping Cart Section Begin */}
  {console.log('before empty caty',cart)}
  {reduxCart.items && Array.isArray(reduxCart.items) && reduxCart.items.length === 0 && (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh", // full screen height
        textAlign: "center",
        paddingBottom: "80px" // optional spacing from footer
      }}
    >
      <img
        src="/assets/vecteezy_ecommerce-shopping-trolly-flat-concept-design_16073190.jpg"
        alt="Empty Cart"
        style={{ maxWidth: "400px", maxHeight: "300px", objectFit: "contain" }}
      />
      <h2 style={{ marginTop: "20px", fontSize: "1.5rem", color: "#333" }}>
        Your shopping cart is empty
      </h2>
      <button 
        style={{ 
          marginTop: "20px", 
          padding: "12px 24px", 
          backgroundColor: "#007bff", 
          color: "#fff", 
          border: "none", 
          borderRadius: "8px", 
          cursor: "pointer",
          fontSize: "1rem"
        }}
        onClick={() => window.location.href = "/"} 
      >
        Continue Shopping
      </button>
    </div>
  )}





  {reduxCart.items && Array.isArray(reduxCart.items) && reduxCart.items.length>0 &&(
  <section className="shopping-cart spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className="shopping__cart__table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {console.log(cart)}
                  {reduxCart.items && Array.isArray(reduxCart.items) && reduxCart.items.length > 0 && reduxCart.items.map((item, i) => (
                    <tr key={item._id}>
                      <td className="product__cart__item">
                        <div className="product__cart__item__pic">
                          <img height="70" width="50" src={item.product.image} alt={item.product.name} />
                        </div>
                        <div className="product__cart__item__text">
                          <h6>{item.product?.name}</h6>

                          {/* show all attributes like size, color etc */}
                          {item.variation?.attributes &&
                            Object.entries(item.variation.attributes).map(([attrName, attrValue]) => (
                              <p key={attrName}>
                                {attrName}: <strong>{attrValue}</strong>
                              </p>
                            ))
                          }
                        </div>
                      </td>

                      <td className="quantity__item">
                        <div className="product__details__cart__option">
                          <div className="quantity">
                            <div className="pro-qty">
                              <span className="fa fa-angle-up dec qtybtn" onClick={() => incQuan(item._id,item.product.id, item.variation.id )}></span>
                              <input
                                type="text"
                                readOnly
                                value={item.quan}
                                onChange={(e) => updateQuan(item._id,item.product._id, item.variation._id,  parseInt(e.target.value))}
                              />
                              <span className="fa fa-angle-down inc qtybtn" onClick={() => decQuan(item._id,item.product.id, item.variation.id ,item.quan)}></span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="cart__price">
                        $ {item.variation?.price && item.quan ? item.variation.price * item.quan : item.variation?.price}
                      </td>

                      <td className="cart__close">
                        <i className="fa fa-close" onClick={() => removeItem(item._id,item.product.id, item.variation.id)} />
                      </td>
                    </tr>
                  ))}

               
               
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="continue__btn">
                <Link to="/">Continue Shopping</Link>
              </div>
            </div>
            {/* <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="continue__btn update__btn">
                <a href="#" onClick={(e)=>{e.preventDefault(); updateCart();}}>
                  <i className="fa fa-spinner"/> Update cart
                </a>
              </div>
            </div> */}
          </div>
        </div>
        <div className="col-lg-4">
          {/* <div className="cart__discount">
            <h6>Discount codes</h6>
            <form action="#">
              <input type="text" placeholder="Coupon code" />
              <button type="submit">Apply</button>
            </form>
          </div> */}
          <div className="cart__total">
            <h6>Cart total</h6>
            <ul>
              <li>
                Subtotal <span>$ {cartTotal}</span>
              </li>
              <li>
                Total <span>$ {cartTotal}</span>
              </li>
            </ul>
            <Link to="/checkout" className="primary-btn">
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
  )}
  {/* Shopping Cart Section End */}
</>

    );
}

export default Cart;