import React from 'react';
import { useState , useRef , useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginSuccess,logout } from "../../redux/authSlice";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { validatePassword } from '../../Utils/ValiadatePass';
import { fetchCart,cleanCart } from '../../redux/cartSlice';
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from 'react-router-dom';
// import {NotificationContainer, NotificationManager} from 'react-notifications';

const Header = () => {
    const authuser = useSelector((state) => state.auth.user);
    // const [preLoader , setPreLoader] = useState(true);
    const location = useLocation();
    const preloaderRef = useRef(null);
    const loaderRef = useRef(null);
    // useEffect(()=>{
    //     // setPreLoader(true);
    //     preloaderRef.current.removeAttribute("style");
    //     loaderRef.current.removeAttribute("style");
    // },[location])
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
        // console.log(name);
        // console.log(value);
        setRegisterFormData({
            ...RegisterformData,
            [name]:value
        });
        // alert(name);
        if(name == 'userPassword'){
            if(!validatePassword(value)){
                    setShowValidationError(true);
            }else{
                setShowValidationError(false);
            }
        }
        
    }
    const [showValidationError , setShowValidationError] = useState(false);
    const validationError = () => {
        return (
            showValidationError?
            <div style={{ color: 'red' }}>
              Password does not meet the requirements. Please include at least 8 characters,
              with at least one uppercase letter, one lowercase letter, one number, and one special character.
            </div>:
            <div>
                Your password must include at least 8 characters,
                with at least one uppercase letter, one lowercase letter, one number, and one special character.
            </div>
          
        );
    };

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
        // console.log("Backend URL:", RegisterformData);
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
    // const [googleUser , setGoogleUser] = useState({
    //     "name":'',
    //     "email":'',
    //     "userType":''
    // });
    const LoginFormToggle = () =>{
        showloginForm(prevState => !prevState); // Toggle between true/false
        // const [verifyEmailMessage , setVerifyEmailMessage] = useState(false);
        // const [verificationMailSent , setverificationMailSent] = useState(false);
        // const [verifyMailButton , setVerifyMailButton] = useState(true);
        setVerifyEmailMessage(false);
        setVerifyMailButton(true);
            // document.getElementById('signin').style.display = 'none';
    }

    const [LoginformData, setLoginFormData] = useState({
        userEmail: '',
        userPassword: ''
    });


    const handleLoginFormChange = (e)=>{
        const {name , value} = e.target;
        // console.log(name);
        // console.log(value);
        setLoginFormData({
            ...LoginformData,
            [name]:value
        });
    }
    const dispatch = useDispatch();
    const [verifyEmailUserId , setVerifyEmailUserId] = useState('');
    const Login = async (e)=>{
        // NotificationManager.success('Success message', 'Title here');
        e.preventDefault();
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        console.log(process.env);
        const userDetails = {
            email: LoginformData.userEmail,
            pass: LoginformData.userPassword,
        }
        // toast("successful");
        // console.log(userDetails);
        try{
            const userLogin = await axios.post(backendUrl+'/api/user/login', userDetails , { withCredentials: true });
           
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
                // console.log(userLogin.data.user);
                // setUser(userLogin.data.user);
                setdisplayNamestate(false);
                // sessionStorage.setItem('user',JSON.stringify(userLogin.data.user));
                // console.log();
                // document.cookie = `user_token=${encodeURIComponent(JSON.stringify(userLogin.data.user.token))}; path=/;`;
                // document.cookie = `user_name=${encodeURIComponent(JSON.stringify(userLogin.data.user.token))}; path=/;`;
                showloginForm(prevState => !prevState); // Toggle between true/false
                setdisplayRegister(true);
                setdisplaylogin(true);
                dispatch(loginSuccess({ user: userLogin.data.user }));
                dispatch(fetchCart());
            }
        }catch(err){
            if(err.response.data.error=='email not verified'){
                setVerifyEmailMessage(true);
                setVerifyEmailUserId(err.response.data.userId);
                return;
            }
           
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
        onSuccess: (codeResponse) => {setGoogleUser(codeResponse); console.log(codeResponse)},
        onError: (error) => console.log('Login Failed:', error)
    });

    // const login = ()=>{
    //     return 'abcd';
    // }
      
    useEffect(
        () => {
            if (googleuser && googleuser.access_token) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleuser.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${googleuser.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then(async(res) => {
                        const backendUrl = process.env.REACT_APP_BACKEND_URL;
                        // console.log(res.data);
                        let userDetails = {
                            'displayname':res.data.email,
                            'email':res.data.email,
                            'firstname':res.data.given_name,
                            'lastname':res.data.family_name,
                        }
                        try{
                        const userLoginByGoogle = await axios.post(backendUrl+'/api/user/auth-google', userDetails , { withCredentials: true });
                        // console.log(userLoginByGoogle.data.user);
                        showregisterForm(false);
                        showloginForm(false);
                       
                        dispatch(loginSuccess({ user: userLoginByGoogle.data.user }));
                        dispatch(fetchCart());
                        toast.success(userLoginByGoogle.data.message, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
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
                        
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ googleuser ]
    );

    // log out function to log the user out of google and set the profile array to null
    const LogOut = async () => {
        googleLogout();
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const res = await axios.post(
            backendUrl + '/api/user/log-out',
            {},
            { withCredentials: true }
            );
            alert("logging out ");
            dispatch(logout());
            dispatch(cleanCart());
            setCartData([]);
        } catch (err) {
            console.log(err);
            if (err.response?.status === 403 || err.response?.status === 401) {
            dispatch(logout());
            dispatch(cleanCart());
            setCartData([]);
            }
        }
    };


    const [cartData, setCartData] = useState([]);
    // const [cartArr , setCartArr] = useState([]);
    const cart = useSelector((state) => state.cart);
    let cartTotal = 0;
    console.log(cart);
    if (Array.isArray(cart.items) && cart.items.length > 0) {
        (cart.items).map((item , index)=>{
            console.log(item);
            cartTotal = cartTotal + item.quan*item.variation.price;
        })
    }
    

    console.log(cartTotal);
    
  

const [cartFetched, setCartFetched] = useState(false);

useEffect(() => {
  console.log("beforetofetch", authuser);
  if (!cartFetched) {
    setCartFetched(true);
    dispatch(fetchCart());
  }
}, [dispatch, authuser, cartFetched]);


    const loginFormPopup = useSelector((state) => state.auth.showLoginForm);
    useEffect(()=>{
       console.log(loginFormPopup);
       if(loginFormPopup){
        showloginForm(true); 
       }
        
    },[loginFormPopup])

    // const [cartSidebar , setCartSidebar] = useState(false);

    const handleCartCheckOut = ()=>{
        if(!authuser){
            showloginForm(true);
            document.getElementById('cart-close').click();
        }
        
    }

    const [verifyEmailMessage , setVerifyEmailMessage] = useState(false);
    const [verificationMailSent , setverificationMailSent] = useState(false);
    const [verifyMailButton , setVerifyMailButton] = useState(true);
    const sendTokenOnMail = async()=>{
        // verifyEmailUserId
        try{
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        setverificationMailSent(true);
        setVerifyMailButton(false);
        const sendEmail =  await axios.get(`${backendUrl}/api/user/send-verification-email/`, {
                            params: {
                                userID: verifyEmailUserId,
                               
                            },
                            withCredentials: true,
                        });
        console.log(sendEmail);
        toast.success(sendEmail.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setverificationMailSent(false);
        setVerifyMailButton(true);
        }catch(err){
            setverificationMailSent(false);
            setVerifyMailButton(true);
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


    useEffect(() => {
        console.log('Path changed to:', location.pathname);
        showregisterForm(false);
        showloginForm(false);
    // 👉 Run your code here
    // e.g. scroll to top, track pageview, reset state, etc.

    }, [location.pathname]); // runs only when the path changes
  return (
   
    <div>
         <ToastContainer />
        <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasCart" aria-labelledby="My Cart">
            <div class="offcanvas-header justify-content-center">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" id="cart-close" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
            <div class="order-md-last">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="" style={{ color: '#0e0e0d' }}>Your cart</span>
                <span class="" style={{ color: '#0e0e0d' }}>({Object.keys(cart.items).length})</span>
                </h4>
                <ul class="list-group mb-3">
                {console.log("cartdataaaa",cart)}
                {cart && Array.isArray(cart.items) && cart.items.length>0 && cart.items.map((item,i)=>(
                    
                    <li key={i} className="list-group-item d-flex justify-content-between lh-sm align-items-center">
                        <div className="d-flex align-items-center">
                            <img
                                src={`${item.product.image}`} // <- Ensure you have `image` in your cart item's metaData
                                
                                style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '10px', borderRadius: '8px' }}
                            />
                            <div>
                                <h6 className="my-0">{item.product.name}</h6>
                                <small className="text-body-secondary">
                                    {Object.entries(item.variation.attributes).map(([key, value]) => (
                                        <span key={key}>
                                        {key}: {value}
                                        </span>
                                    ))} 
                                    {" "}× {item.quan}
                                </small>
                            </div>
                        </div>
                        <span className="text-body-secondary">${item.variation.price}</span>
                    </li>
                ))}
               
                {/* <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                    <h6 class="my-0">Fresh grapes</h6>
                    <small class="text-body-secondary">Brief description</small>
                    </div>
                    <span class="text-body-secondary">$8</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                    <h6 class="my-0">Heinz tomato ketchup</h6>
                    <small class="text-body-secondary">Brief description</small>
                    </div>
                    <span class="text-body-secondary">$5</span>
                </li> */}
                <li class="list-group-item d-flex justify-content-between">
                    <span>Total</span>
                    <strong>${cartTotal}</strong>
                </li>
                </ul>

               <button class="w-100 btn btn-primary btn-lg" onClick={(e)=>{e.preventDefault() ; handleCartCheckOut();}} type="submit" style={{ backgroundColor: '#0e0e0d' }}> <Link to="/cart">Go To Cart</Link></button>
            </div>
            </div>
        </div>
        <div id="signup" className={registerFormState?'formshow':'formhide'} ref={registerRef}>
            <form onSubmit={Register}>
                <button type="button" id="close-btn" onClick={RegisterFormToggle}>×</button>
                <label>Your First Name</label>
                    <input name="userFirstName" onkeypress="return event.charCode != 32" value={RegisterformData.userFirstName} onChange={handleRegisterFormChange} type="text" />
                <label>Your Last Name</label>
                    <input name="userLastName" value={RegisterformData.userLastName} onChange={handleRegisterFormChange} type="text" />
                <label>Your Phone</label>
                    <input name="userPhone" maxlength="10" minlength="10" value={RegisterformData.userPhone} onChange={handleRegisterFormChange} type="text" />
                <label>Your Email</label>
                    <input name="userEmail" value={RegisterformData.userEmail} onChange={handleRegisterFormChange} type="email" />
                <label>Your Password</label>
                    <input name="userPassword" value={RegisterformData.userPassword} onChange={handleRegisterFormChange} type="password" />
                {validationError()}
                <input type="submit" className="primary-btn" value="Register" />
                <div class="google-btn">
                {
                    <>
                   
                <button type="button" class="login-with-google-btn" onClick={login}>
                    Sign in with Google
                </button>
                    </>
                
                }
             
            </div>
            </form>
        </div>

        <div id="signin" className={loginFormState?'formshow':'formhide'} ref={loginRef}>
            <form onSubmit={Login}>
                <button type="button" id="close-btn" onClick={LoginFormToggle}>×</button>
                <label>Your Email</label>
                    <input name="userEmail" value={LoginformData.userEmail} onChange={handleLoginFormChange} type="email" />
                <label>Your Password</label>
                    <input name="userPassword" value={LoginformData.userPassword} onChange={handleLoginFormChange} type="password" />
                <Link to="/password-reset">forgot password?</Link>
                {console.log("verifyEmailMessage",verifyEmailMessage)}
                {verifyEmailMessage && (
                    <>
                    <div style={{ color: 'red' }}>Email Verification Incomplete</div>
                    
                    <Link style={{
                    pointerEvents: verifyMailButton ? 'auto' : 'none',
                    color: verifyMailButton ? 'blue' : 'gray',
                    }} href="#" onClick={(e)=>{sendTokenOnMail()}}>Verify Email</Link>
                    
                    </>
                    
                )}
                {verificationMailSent && (
                    <>
                    <img height="50" width="50" src="https://res.cloudinary.com/bytesizedpieces/image/upload/v1656084931/article/a-how-to-guide-on-making-an-animated-loading-image-for-a-website/animated_loader_gif_n6b5x0.gif"></img>
                    </>
                )}
                
                
                <input type="submit" className="primary-btn" value="Login" />
            </form>
            <div class="google-btn">
                {
                    <>
                   
                <button type="button" class="login-with-google-btn" onClick={() => login()}>
                    Sign in with Google
                </button>
                    </>
                
                }
             
            </div>
        </div>
        {/* Page Preloder */}
        {/* <div id="preloder"  ref={preloaderRef} >
            <div className="loader" ref={loaderRef} />
        </div> */}
        {/* Offcanvas Menu Begin */}
        {console.log('headre user',authuser)}
        <div className="offcanvas-menu-overlay" />
        <div className="offcanvas-menu-wrapper">
        <div className="offcanvas__option">
            <div className="offcanvas__links">
           
            <a href="#" onClick={(e) => { e.preventDefault(); RegisterFormToggle(); }}>{authuser?(authuser.name):'Sign up'}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); LoginFormToggle(); }}>Sign in</a>
            <a href="#" hidden={displaynameState}>{authuser?(authuser.displayName):''}</a>
            <a href="" onClick={(e) => { e.preventDefault(); LogOut(); }}>
                Logout
            </a>
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
                    <a href="#" >{authuser?(authuser.displayname):''}</a>
                    {/* {console.log(authuser)} */}
                    {
                    (!authuser) && (
                        <>
                        <a href="#" onClick={(e) => { e.preventDefault(); RegisterFormToggle(); }} >Sign up</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); LoginFormToggle(); }} >Sign in</a>
                        </>
                    )
                    }
                    
                    {/* <Link to="/admin">Admin Area</Link> */}
                    {/* <Link to="/modal">Modla</Link> */}
                    {/* <a href="#" hidden={displaynameState}>{user.displayName}</a> */}
                    {
                        authuser && (
                            <>
                                <a href="" onClick={(e) => { e.preventDefault(); LogOut(); }}>Logout</a>
                            </>
                        )
                    }
                    
                    </div>
                    <div className="header__top__hover">
                    {/* <span>Usd <i className="arrow_carrot-down" /></span>
                    <ul>
                        <li>USD</li>
                        <li>EUR</li>
                        <li>USD</li>
                    </ul> */}
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
                <Link to="/"><img src="/assets/img/logo.png" alt="" /></Link>
                </div>
            </div>
            <div className="col-lg-6 col-md-6">
                <nav className="header__menu mobile-menu">
                <ul>
                    <li className="active">
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                     <Link to="/men/men-t-shirts">Men T-Shirts</Link>
                    </li>
                    <li>
                     <Link to="/men/men-jeans">Men Denims</Link>
                    </li>
                    <li>
                     <Link to="/men/men-shirts">Men Shirts</Link>
                    </li>
                    {/* <li><a href="#">Pages</a>
                    <ul className="dropdown">
                        <li><Link to="/about-us">About Us</Link></li>
                        <li><a href="./shop-details.html">Shop Details</a></li>
                        <li><a href="./shopping-cart.html">Shopping Cart</a></li>
                        <li><a href="./checkout.html">Check Out</a></li>
                        <li><a href="./blog-details.html">Blog Details</a></li>
                    </ul>
                    </li> */}
                    
                    {/* <li><a href="./contact.html">Contacts</a></li> */}
                </ul>
                </nav>
            </div>
            <div className="col-lg-3 col-md-3">
                <div className="header__nav__option">
                {/* <a href="#" className="search-switch"><img src="/assets/img/icon/search.png" alt="" /></a> */}
                {/* <a href="#"><img src="/assets/img/icon/heart.png" alt="" /></a> */}
                {/* <a href="#"><img src="/assets/img/icon/cart.png" alt="" /> <span>0</span></a> */}
                {/* <li class="d-none d-lg-block"> */}
                
                <a href="index.html" class="text-uppercase mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">cart ({Object.keys(cart.items).length})
                </a>
                {/* </li> */}
                {/* <div className="price">$0.00</div> */}
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
