import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import "react-toastify/dist/ReactToastify.css";
// import {NotificationContainer, NotificationManager} from 'react-notifications';

const Header = () => {
    const [registerFormState , showregisterForm] = useState(false);
    const RegisterFormToggle = () =>{
        showregisterForm(prevState => !prevState); // Toggle between true/false
        // document.getElementById('signin').style.display = 'none';
    }
    const [RegisterformData, setRegisterFormData] = useState({
        userFirstName: '',
        userLastName: '',
        userPhone: '',
        userEmail: '',
    });

    const handleRegisterFormChange = (e)=>{
        const {name , value} = e.target;
        console.log(name);
        console.log(value);
        setRegisterFormData({
            ...RegisterformData,
            [name]:value
        });
    }
    const Register = async (e)=>{
        // NotificationManager.success('Success message', 'Title here');
        e.preventDefault();
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        console.log("Backend URL:", RegisterformData);
        const userDetails = {
            firstname: RegisterformData.userFirstName,
            lastname: RegisterformData.userLastName,
            displayname: RegisterformData.userEmail,
            phone: RegisterformData.userPhone, 
            email: RegisterformData.userEmail,
            password: RegisterformData.userPassword,
        }
        // toast("successful");
        // console.log(userDetails);
        try{
            const userRegisteration = await axios.post(backendUrl+'/api/user/register', userDetails);
            // console.log(userRegisteration);
            // toast.success("successful");
            // console.log(userRegisteration.data);
            if(userRegisteration.data.success==false){
                // alert("false");
                toast.error(userRegisteration.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else{
                toast.success(userRegisteration.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                showregisterForm(prevState => !prevState); // Toggle between true/false
            }
        }catch(err){
            toast.error(err.response.data.message, {
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
  return (
   
    <div>
         <ToastContainer />
        <div id="signin" className={registerFormState?'formshow':'formhide'}>
            <form onSubmit={Register}>
                <button type="button" id="close-btn" onClick={RegisterFormToggle}>×</button>
                <label>Your First Name</label>
                    <input name="userFirstName" value={RegisterformData.userFirstName} onChange={handleRegisterFormChange} type="text" />
                <label>Your Last Name</label>
                    <input name="userLastName" value={RegisterformData.userLastName} onChange={handleRegisterFormChange} type="text" />
                <label>Your Phone</label>
                    <input name="userPhone" value={RegisterformData.userPhone} onChange={handleRegisterFormChange} type="text" />
                <label>Your Email</label>
                    <input name="userEmail" value={RegisterformData.userEmail} onChange={handleRegisterFormChange} type="email" />
                <label>Your Password</label>
                    <input name="userPassword" value={RegisterformData.userPassword} onChange={handleRegisterFormChange} type="password" />
                <input type="submit" className="primary-btn" value="Register" />
            </form>
        </div>
        {/* Page Preloder */}
        <div id="preloder">
        <div className="loader" />
        </div>
        {/* Offcanvas Menu Begin */}
        <div className="offcanvas-menu-overlay" />
        <div className="offcanvas-menu-wrapper">
        <div className="offcanvas__option">
            <div className="offcanvas__links">
            <a href="#signin" data-fancybox>Sign in</a>
            <a href="#">FAQs</a>
            </div>
            <div className="offcanvas__top__hover">
            <span>Usd <i className="arrow_carrot-down" /></span>
            <ul>
                <li>USD</li>
                <li>EUR</li>
                <li>USD</li>
            </ul>
            </div>
        </div>
        <div className="offcanvas__nav__option">
            <a href="#" className="search-switch"><img src="img/icon/search.png" alt="" /></a>
            <a href="#"><img src="img/icon/heart.png" alt="" /></a>
            <a href="#"><img src="img/icon/cart.png" alt="" /> <span>0</span></a>
            <div className="price">$0.00</div>
        </div>
        <div id="mobile-menu-wrap" />
        <div className="offcanvas__text">
            <p>Free shipping, 30-day return or refund guarantee.</p>
        </div>
        </div>
        {/* Offcanvas Menu End */}
        {/* Header Section Begin */}
        <header className="header">
        <div className="header__top">
            <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-7">
                <div className="header__top__left">
                    <p>Free shipping, 30-day return or refund guarantee.</p>
                </div>
                </div>
                <div className="col-lg-6 col-md-5">
                <div className="header__top__right">
                    <div className="header__top__links">
                    <a href="#" onClick={RegisterFormToggle}>Sign in</a>
                    <a href="#">FAQs</a>
                    </div>
                    <div className="header__top__hover">
                    <span>Usd <i className="arrow_carrot-down" /></span>
                    <ul>
                        <li>USD</li>
                        <li>EUR</li>
                        <li>USD</li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
            <div className="col-lg-3 col-md-3">
                <div className="header__logo">
                <a href="./index.html"><img src="/assets/img/logo.png" alt="" /></a>
                </div>
            </div>
            <div className="col-lg-6 col-md-6">
                <nav className="header__menu mobile-menu">
                <ul>
                    <li className="active"><a href="./index.html">Home</a></li>
                    <li><a href="./shop.html">Shop</a></li>
                    <li><a href="#">Pages</a>
                    <ul className="dropdown">
                        <li><a href="./about.html">About Us</a></li>
                        <li><a href="./shop-details.html">Shop Details</a></li>
                        <li><a href="./shopping-cart.html">Shopping Cart</a></li>
                        <li><a href="./checkout.html">Check Out</a></li>
                        <li><a href="./blog-details.html">Blog Details</a></li>
                    </ul>
                    </li>
                    <li><a href="./blog.html">Blog</a></li>
                    <li><a href="./contact.html">Contacts</a></li>
                </ul>
                </nav>
            </div>
            <div className="col-lg-3 col-md-3">
                <div className="header__nav__option">
                <a href="#" className="search-switch"><img src="/assets/img/icon/search.png" alt="" /></a>
                <a href="#"><img src="/assets/img/icon/heart.png" alt="" /></a>
                <a href="#"><img src="/assets/img/icon/cart.png" alt="" /> <span>0</span></a>
                <div className="price">$0.00</div>
                </div>
            </div>
            </div>
            <div className="canvas__open"><i className="fa fa-bars" /></div>
        </div>
        </header>
        {/* Header Section End */}
    </div>
  );
};

export default Header;
