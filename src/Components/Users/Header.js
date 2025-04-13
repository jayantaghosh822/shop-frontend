import React from 'react';
import { useState , useRef , useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { Outlet, Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

// import "react-toastify/dist/ReactToastify.css";
// import {NotificationContainer, NotificationManager} from 'react-notifications';

const Header = () => {
    const registerRef = useRef(null);
    const loginRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            
            if (
                registerRef.current && !registerRef.current.contains(event.target)
            ) {
                showregisterForm(false);
            }
            if (loginRef.current && !loginRef.current.contains(event.target)) {
                showloginForm(false);
            }
        }

        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Remove event listener on cleanup
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [displaynameState , setdisplayNamestate] = useState(true);
    const [displayRegisterButton , setdisplayRegister] = useState(false);
    const [displayLoginButton , setdisplaylogin] = useState(false);

    const [registerFormState , showregisterForm] = useState(false);
   
    const RegisterFormToggle = () =>{
        showregisterForm(prevState => !prevState); // Toggle between true/false
        // document.getElementById('signin').style.display = 'none';
    }
    const handleRegisterFormChange = (e)=>{
        const {name , value} = e.target;
        console.log(name);
        console.log(value);
        setRegisterFormData({
            ...RegisterformData,
            [name]:value
        });
    }
    const [RegisterformData, setRegisterFormData] = useState({
        userFirstName: '',
        userLastName: '',
        userPhone: '',
        userEmail: '',
    });
    
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

    const [loginFormState , showloginForm] = useState(false);
    const [user , setUser] = useState({});
    const LoginFormToggle = () =>{
        showloginForm(prevState => !prevState); // Toggle between true/false
        // document.getElementById('signin').style.display = 'none';
    }

    const [LoginformData, setLoginFormData] = useState({
        userEmail: '',
        userPassword: ''
    });


    const handleLoginFormChange = (e)=>{
        const {name , value} = e.target;
        console.log(name);
        console.log(value);
        setLoginFormData({
            ...LoginformData,
            [name]:value
        });
    }
    const dispatch = useDispatch();
    const Login = async (e)=>{
        // NotificationManager.success('Success message', 'Title here');
        e.preventDefault();
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        console.log("Backend URL:", LoginformData);
        const userDetails = {
            email: LoginformData.userEmail,
            pass: LoginformData.userPassword,
        }
        // toast("successful");
        // console.log(userDetails);
        try{
            const userLogin = await axios.post(backendUrl+'/api/user/login', userDetails , { withCredentials: true });
            console.log(userLogin);
            // toast.success("successful");
            // console.log(userRegisteration.data);
            if(userLogin.success==false){
                // alert("false");
                toast.error(userLogin.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else{
                toast.success(userLogin.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log(userLogin.data.user);
                setUser(userLogin.data.user);
                setdisplayNamestate(false);
                sessionStorage.setItem('user',JSON.stringify(userLogin.data.user));
                showloginForm(prevState => !prevState); // Toggle between true/false
                setdisplayRegister(true);
                setdisplaylogin(true);
                dispatch(loginSuccess({ user: userLogin.data.user }));
            }
        }catch(err){
            toast.error(err.response.data.error, {
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

    const [ googleuser, setGoogleUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {setUser(codeResponse); console.log(codeResponse)},
        onError: (error) => console.log('Login Failed:', error)
    });
      
    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

  return (
   
    <div>
         <ToastContainer />
        <div id="signup" className={registerFormState?'formshow':'formhide'} ref={registerRef}>
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
        <div id="signin" className={loginFormState?'formshow':'formhide'} ref={loginRef}>
            <form onSubmit={Login}>
                <button type="button" id="close-btn" onClick={LoginFormToggle}>×</button>
                <label>Your Email</label>
                    <input name="userEmail" value={LoginformData.userEmail} onChange={handleLoginFormChange} type="email" />
                <label>Your Password</label>
                    <input name="userPassword" value={LoginformData.userPassword} onChange={handleLoginFormChange} type="password" />
                <input type="submit" className="primary-btn" value="Login" />
            </form>
            <div class="google-btn">
                {
                    <>
                    {/* <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4="></img> */}
                <button type="button" class="login-with-google-btn" onClick={login}>
                    Sign in with Google
                </button>
                    </>
                
                }
             
            </div>
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
            <a href="#" onClick={RegisterFormToggle}>Sign up</a>
            <a href="#" onClick={LoginFormToggle}>Sign in</a>
            <a href="#" hidden={displaynameState}>{user.displayName}</a>
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
                    <a href="#" onClick={RegisterFormToggle} hidden={displayRegisterButton}>Sign up</a>
                    <a href="#" onClick={LoginFormToggle}  hidden={displayLoginButton}>Sign in</a>
                    <Link to="/admin">Admin Area</Link>
                    <a href="#" hidden={displaynameState}>{user.displayName}</a>
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
                    <li className="active">
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                     <Link to="/men/men-t-shirts">Store</Link>
                    </li>
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
