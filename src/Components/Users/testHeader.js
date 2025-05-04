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
// import {NotificationContainer, NotificationManager} from 'react-notifications';

const Header = () => {
    const authuser = useSelector((state) => state.auth.user);
   
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

    // const [LoginformData, setLoginFormData] = useState({
    //     userEmail: '',
    //     userPassword: ''
    // });


    // const handleLoginFormChange = (e)=>{
    //     const {name , value} = e.target;
    //     console.log(name);
    //     console.log(value);
    //     setLoginFormData({
    //         ...LoginformData,
    //         [name]:value
    //     });
    // }
    // const dispatch = useDispatch();
    // const Login = async (e)=>{
    //     // NotificationManager.success('Success message', 'Title here');
    //     e.preventDefault();
    //     const backendUrl = process.env.REACT_APP_BACKEND_URL;
    //     const userDetails = {
    //         email: LoginformData.userEmail,
    //         pass: LoginformData.userPassword,
    //     }
    //     // toast("successful");
    //     // console.log(userDetails);
    //     try{
    //         const userLogin = await axios.post(backendUrl+'/api/user/login', userDetails , { withCredentials: true });
           
    //         // toast.success("successful");
    //         // console.log(userRegisteration.data);
    //         if(userLogin.success==false){
    //             // alert("false");
    //             toast.error(userLogin.message, {
    //                 position: "top-right",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             });
    //         }else{
    //             toast.success(userLogin.data.message, {
    //                 position: "top-right",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             });
    //             console.log(userLogin.data.user);
    //             setUser(userLogin.data.user);
    //             setdisplayNamestate(false);
    //             // sessionStorage.setItem('user',JSON.stringify(userLogin.data.user));
    //             // console.log();
    //             // document.cookie = `user_token=${encodeURIComponent(JSON.stringify(userLogin.data.user.token))}; path=/;`;
    //             // document.cookie = `user_name=${encodeURIComponent(JSON.stringify(userLogin.data.user.token))}; path=/;`;
    //             showloginForm(prevState => !prevState); // Toggle between true/false
    //             setdisplayRegister(true);
    //             setdisplaylogin(true);
    //             dispatch(loginSuccess({ user: userLogin.data.user }));
    //         }
    //     }catch(err){
    //         toast.error(err.response.data.error, {
    //             position: "top-right",
    //             autoClose: 3000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         });
    //     }

       

    // }

    // const [ googleuser, setGoogleUser ] = useState([]);
    // const [ profile, setProfile ] = useState([]);

    // const login = useGoogleLogin({
    //     onSuccess: (codeResponse) => {setUser(codeResponse); console.log(codeResponse)},
    //     onError: (error) => console.log('Login Failed:', error)
    // });
      
    // useEffect(
    //     () => {
    //         if (user) {
    //             axios
    //                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${user.access_token}`,
    //                         Accept: 'application/json'
    //                     }
    //                 })
    //                 .then(async(res) => {
    //                     const backendUrl = process.env.REACT_APP_BACKEND_URL;
    //                     // console.log(res.data);
    //                     let userDetails = {
    //                         'displayname':res.data.email,
    //                         'email':res.data.email,
    //                         'firstname':res.data.given_name,
    //                         'lastname':res.data.family_name,
    //                     }
    //                     try{
    //                     const userLoginByGoogle = await axios.post(backendUrl+'/api/user/auth-google', userDetails , { withCredentials: true });
    //                     // console.log(userLoginByGoogle.data.user);
    //                     // showregisterForm(prevState => !prevState);
    //                     showloginForm(prevState => !prevState);
                       
    //                     dispatch(loginSuccess({ user: userLoginByGoogle.data.user }));
    //                     toast.success(userLoginByGoogle.data.message, {
    //                         position: "top-right",
    //                         autoClose: 3000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                         draggable: true,
    //                         progress: undefined,
    //                     });
    //                     }catch(err){
    //                         toast.error(err.response.data.error, {
    //                             position: "top-right",
    //                             autoClose: 3000,
    //                             hideProgressBar: false,
    //                             closeOnClick: true,
    //                             pauseOnHover: true,
    //                             draggable: true,
    //                             progress: undefined,
    //                         });
    //                     }
                        
    //                 })
    //                 .catch((err) => console.log(err));
    //         }
    //     },
    //     [ user ]
    // );

    // log out function to log the user out of google and set the profile array to null
    // const LogOut = () => {
    //     googleLogout();
    //     const backendUrl = process.env.REACT_APP_BACKEND_URL;
    //     axios.post(backendUrl+'/api/user/log-out', {} , { withCredentials: true })
    //     .then(res=>{
    //         alert("logging out ");
    //         dispatch(logout());
    //         // dispatch(cleanCart());
    //     })
        
    //     // setProfile(null);
    // };

    // const [cartArr , setCartArr] = useState([]);
    const cart = useSelector((state) => state.cart);
    console.log(cart);
    
    useEffect(() => {
        if (user) {
            console.log("my user1",user);
        // dispatch(fetchCart());
        }
    }, [ user])

    useEffect(() => {
        const addLocalItemsToCart = async()=>{
            // console.log(JSON.parse(localStorage.getItem('cartItems')));
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const unSavedCartItems = JSON.parse(localStorage.getItem('unSavedCartItems'));
            if(unSavedCartItems){
            await axios.post(`${backendUrl}/api/add-local-items-to-cart/`, {
                unSavedCartItems: unSavedCartItems
                }, {
                withCredentials: true
            });
            localStorage.removeItem('unSavedCartItems');
            }
            // dispatch(fetchCart());
            
        }
        if (user) {
            console.log("my user2",user);
           
            // addLocalItemsToCart();
            // dispatch(fetchCart());
        }
    }, [user])


  return (
   
    <div>
         <ToastContainer />
        <Link to="/men/men-t-shirts">Men T-Shirts</Link>
        <Link to="/">Home</Link>
    </div>
  );
};

export default Header;
