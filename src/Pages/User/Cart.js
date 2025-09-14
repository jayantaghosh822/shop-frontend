import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import axiosInstance from '../../Interceptor/axiosInstance'; // path to your interceptor file
import { useDispatch } from "react-redux";
import { loginSuccess,logout,loginPopup } from "../../redux/authSlice";
import { fetchCartReducer } from "../../redux/cartSlice";
import { Outlet, Link } from "react-router-dom";

const Cart = ()=>{
    const authuser = useSelector((state) => state.auth.user);
    const reduxCart = useSelector((state) => state.cart);
    const [cart , setCart] = useState([]);
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

    const getCartItems = async () => {
          try{
                const backendUrl = process.env.REACT_APP_BACKEND_URL;
                const cartData = await axiosInstance.post(
                    `${backendUrl}/api/get-user-cart-data`,
                    { cart:reduxCart },   // body
                    { withCredentials: true } // config
                );
    
            console.log(cartData.data);
            if(authuser){
              setCart(cartData.data);
            }else{
              setCart([]);
            }
          }catch(err){
        
            if(err.response.status == 403 || err.response.status == 401)
            {
              console.error("User not logged in or token expired", err);
              dispatch(loginPopup({ showForm: true }));
            }

          }
            
    };
    useEffect(()=>{
      console.log(reduxCart);
      if(!authuser){
        setCart([]);
      }
      if(Array.isArray(reduxCart.items)){
        console.log('oklkkkkkkkk');
          getCartItems();
      }
    },[reduxCart]);

    
    const dispatch = useDispatch();
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

    const removeItem = async(id) =>{
      alert(id);
      const cartId = cart.cartId;
      alert(cartId);
      // return;
      try{
        const itemDelete = await axiosInstance.delete(`/api/remove-cart-item/`,{
          params:{itemId:id,cartId:cartId}
        });

        console.log(itemDelete);
        dispatch(fetchCartReducer(itemDelete.data.updatedCart.items));
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


    console.log(cart);
    let cartTotal = 0;
    if (Array.isArray(cart.structuredCart) && cart.structuredCart.length > 0) {
   
        (cart.structuredCart).map((item , index)=>{
            cartTotal = cartTotal + item.variation.price*item.quan;
        })
        // console.log(total);
        // setTotal(total);
    }
    console.log(cartTotal);

    // 🔹 Update item quantity in backend
    const updateQuan = async (id, type) => {
      try {
        const cartItems = await axiosInstance.patch(`/api/update-item/${id}`, {
          action: type, // "inc" or "dec"
        });

        console.log("Updated cart:", cartItems.data);
        dispatch(fetchCartReducer(cartItems.data.cart.items));
      } catch (err) {
        console.error("Error updating quantity:", err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          dispatch(loginPopup({ showForm: true }));
        }
      }
    };

    // 🔹 Increase quantity
    const incQuan = async (id) => {
      try {
        await updateQuan(id, "inc");
      } catch (err) {
        console.error("Error increasing quantity:", err);
      }
    };

    // 🔹 Decrease quantity
    const decQuan = async (id,quan) => {
      if(quan<2)
        return;
      try {
        await updateQuan(id, "dec");
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
                  {cart && Array.isArray(cart.structuredCart) && cart.structuredCart.length > 0 && cart.structuredCart.map((item, i) => (
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
                              <span className="fa fa-angle-up dec qtybtn" onClick={() => incQuan(item._id)}></span>
                              <input
                                type="text"
                                readOnly
                                value={item.quan}
                                onChange={(e) => updateQuan(item._id, parseInt(e.target.value))}
                              />
                              <span className="fa fa-angle-down inc qtybtn" onClick={() => decQuan(item._id,item.quan)}></span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="cart__price">
                        $ {item.variation?.price && item.quan ? item.variation.price * item.quan : item.variation?.price}
                      </td>

                      <td className="cart__close">
                        <i className="fa fa-close" onClick={() => removeItem(item._id)} />
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
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="continue__btn update__btn">
                <a href="#" onClick={(e)=>{e.preventDefault(); updateCart();}}>
                  <i className="fa fa-spinner"/> Update cart
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="cart__discount">
            <h6>Discount codes</h6>
            <form action="#">
              <input type="text" placeholder="Coupon code" />
              <button type="submit">Apply</button>
            </form>
          </div>
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
  {/* Shopping Cart Section End */}
</>

    );
}

export default Cart;