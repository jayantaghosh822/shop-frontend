import { useEffect, useState } from "react";
import axiosInstance from '../../Interceptor/axiosInstance'; // path to your interceptor file
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginSuccess,logout,loginPopup } from "../../redux/authSlice";
import { useNavigate } from 'react-router-dom';

const CheckOut = ()=>{

    const [userDetails , setUserDetails] = useState({});
    const authuser = useSelector((state) => state.auth.user);
    const cart = useSelector((state) => state.cart);
    const [paymentMethod , setPaymentMethod] = useState(null);
    const dispatch = useDispatch();
    // console.log(authuser);
    useEffect(()=>{
        setUserDetails(authuser);
    },[authuser]);
    const [cartTotal , setCartTotal] = useState(0);
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

       
       
        // fetchCart();
        // calculate(cart);
     
      if (Array.isArray(cart.items) && cart.items.length > 0) {
          let total = 0;
          (cart.items).map((item , index)=>{
              total = total + item.price*item.quan;
          })
          console.log(cartTotal);
          setCartTotal(total);
      }
      console.log(cartTotal);

    },[cart]);
    
    const handleUserDetailsChangeForm = (e)=>{
        const {name,value} = e.target;
        console.log(name,value);
        setUserDetails({
             ...userDetails,
            [name] : value
        }
        );
    }

    console.log(userDetails);

    console.log(cart);


    const addPaymentMethod = (e)=>{
      console.log(e);
      if(e.target.checked){
        setPaymentMethod(e.target.value)
      }else{
        setPaymentMethod(null)
      }
      // setPaymentMethod
    }
    console.log(paymentMethod);
    const navigate = useNavigate();
    const placeOrder = async()=>{
      try{
        const order = await axiosInstance.post(`/api/place-order/`,{
          paymentMethod:paymentMethod,
          userDetails:userDetails
        });
        console.log(order);
        if(order.status == 201){
          if(order.data.paymentMethod == 'cod'){
            navigate(`/order-successful/${order.data.orderId}`);
          }else if(order.data.paymentMethod == 'stripe'){
            window.location.href = order.data.paymentUrl;
          }
         
        }
        // dispatch(fetchCartReducer(cartItems.data.cartItems));
      }catch(err){
        console.error(err);
        if(err.response.status == 403 || err.response.status == 401)
          {
            console.error("User not logged in or token expired", err);
            dispatch(loginPopup({ showForm: true }));
          }

      }
    }
    return (
      <div>
        {/* Breadcrumb Section Begin */}
        <section className="breadcrumb-option">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb__text">
                  <h4>Check Out</h4>
                  <div className="breadcrumb__links">
                    <a href="./index.html">Home</a>
                    <a href="./shop.html">Shop</a>
                    <span>Check Out</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Breadcrumb Section End */}
        {/* Checkout Section Begin */}
        <section className="checkout spad">
          <div className="container">
            <div className="checkout__form">
              <form action="#">
                <div className="row">
                  <div className="col-lg-8 col-md-6">
                    <h6 className="coupon__code"><span className="icon_tag_alt" /> Have a coupon? <a href="#">Click
                        here</a> to enter your code</h6>
                    <h6 className="checkout__title">Billing Details</h6>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>Fist Name<span>*</span></p>
                          <input type="text" name="firstname" value={userDetails?.firstname} onChange={(e)=>handleUserDetailsChangeForm(e)}/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>Last Name<span>*</span></p>
                          <input type="text" name="lastname" value={userDetails?.lastname} onChange={(e)=>handleUserDetailsChangeForm(e)}/>
                        </div>
                      </div>
                    </div>
                    <div className="checkout__input">
                      <p>Country<span>*</span></p>
                      <input type="text" name="country" value={userDetails?.country} onChange={(e)=>handleUserDetailsChangeForm(e)}/>
                    </div>
                    <div className="checkout__input">
                      <p>Address<span>*</span></p>
                      <input type="text" name="streetaddress" value={userDetails?.streetaddress} onChange={(e)=>handleUserDetailsChangeForm(e)} placeholder="Street Address" className="checkout__input__add" />
                      <input type="text" name="appartment" value={userDetails?.appartment} onChange={(e)=>handleUserDetailsChangeForm(e)} placeholder="Apartment, suite, unite ect (optinal)" />
                    </div>
                    <div className="checkout__input">
                      <p>Town/City<span>*</span></p>
                      <input type="text" name="city" value={userDetails?.city} onChange={(e)=>handleUserDetailsChangeForm(e)}/>
                    </div>
                    <div className="checkout__input">
                      <p>Country/State<span>*</span></p>
                      <input type="text" name="state" value={userDetails?.state} onChange={(e)=>handleUserDetailsChangeForm(e)} />
                    </div>
                    <div className="checkout__input">
                      <p>Postcode / ZIP<span>*</span></p>
                      <input type="text" name="pin" value={userDetails?.pin} onChange={(e)=>handleUserDetailsChangeForm(e)}/>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>Phone<span>*</span></p>
                          <input type="text" name="phone" value={userDetails?.phone} onChange={(e)=>handleUserDetailsChangeForm(e)}/>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>Email<span>*</span></p>
                          <input type="text" name="email" value={userDetails?.email} onChange={(e)=>handleUserDetailsChangeForm(e)}/>
                        </div>
                      </div>
                    </div>
                    {/* <div className="checkout__input__checkbox">
                      <label htmlFor="acc">
                        Create an account?
                        <input type="checkbox" id="acc" />
                        <span className="checkmark" />
                      </label>
                      <p>Create an account by entering the information below. If you are a returning customer
                        please login at the top of the page</p>
                    </div> */}
                    {/* <div className="checkout__input">
                      <p>Account Password<span>*</span></p>
                      <input type="text" />
                    </div> */}
                    <div className="checkout__input__checkbox">
                      <label htmlFor="diff-acc">
                        Note about your order, e.g, special noe for delivery
                        <input type="checkbox" id="diff-acc" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="checkout__input">
                      <p>Order notes<span>*</span></p>
                      <input type="text" placeholder="Notes about your order, e.g. special notes for delivery." />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="checkout__order">
                      <h4 className="order__title">Your order</h4>
                      <div className="checkout__order__products">Product <span>Total</span></div>
                      {/* {console.log(cart)} */}
                      <ul className="checkout__total__products">
                        {cart && Array.isArray(cart.items) && cart.items.length>0 && cart.items.map((item , ind)=>{
                          return(
                             <li>{ind+1}. {item.quan} x {item.metaData?.name} <span>$ {item.quan * item.price}</span></li>
                          )
                          
                        })}
                       
                       
                      </ul>
                      <ul className="checkout__total__all">
                        <li>Subtotal <span>${cartTotal}</span></li>
                        <li>Total <span>${cartTotal}</span></li>
                      </ul>
                      {/* <div className="checkout__input__checkbox">
                        <label htmlFor="acc-or">
                          Create an account?
                          <input type="checkbox" id="acc-or" />
                          <span className="checkmark" />
                        </label>
                      </div> */}
                      
                      <div className="checkout__input__checkbox" >
                        <label htmlFor="payment">
                          Cash on delivery
                          <input type="checkbox" name="cod" value="cod" id="payment" onChange={(e)=>{addPaymentMethod(e)}} disabled={paymentMethod=='cod'||paymentMethod==null?false:true}/>
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="checkout__input__checkbox" >
                        <label htmlFor="stripe">
                          stripe
                          <input type="checkbox" name="stripe" value="stripe" id="stripe" onChange={(e)=>{addPaymentMethod(e)}} disabled={paymentMethod=='stripe'||paymentMethod==null?false:true}/>
                          <span className="checkmark" />
                        </label>
                      </div>
                      <button type="submit" className="site-btn" onClick={(e)=>{e.preventDefault() ; placeOrder()}}>PLACE ORDER</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        {/* Checkout Section End */}
      </div>
    );
}
export default CheckOut;