import axios from 'axios';
import { useState , useRef , useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginSuccess,logout } from "../../redux/authSlice";
import { useSelector } from "react-redux";
import { fetchCart,cleanCart } from '../../redux/cartSlice';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from "react-router-dom";
const Signin = ()=>{
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { token } = useParams();
    const [authentication , setAuthentication] = useState(false);
    const verifyEmailToken = async()=>{
    try{
        const verifyUser = await axios.get(`${backendUrl}/api/user/verify-email-token/`, {
                            params: {
                                token: token,
                               
                            },
                            withCredentials: true,
                        });
        if(verifyUser.data.success){
            setAuthentication(true);
        }
    }catch(err){
        
    }
    
    
    }
    const [LoginformData, setLoginFormData] = useState({
        userEmail: '',
        userPassword: ''
    });

    const dispatch = useDispatch();

    const [displaynameState , setdisplayNamestate] = useState(true);
    const [displayRegisterButton , setdisplayRegister] = useState(false);
    const [displayLoginButton , setdisplaylogin] = useState(false);
    const [verifyEmailMessage , setVerifyEmailMessage] = useState(false);
    const [verifyEmailUserId , setVerifyEmailUserId] = useState('');
    const [verifyMailButton , setVerifyMailButton] = useState(true);
    const [verificationMailSent , setverificationMailSent] = useState(false);
    const [ googleuser, setGoogleUser ] = useState([]);
    const [isLogingIn, setIsLogingIn] = useState(false);
    const handleLoginFormChange = (e)=>{
        const {name , value} = e.target;
        // console.log(name);
        // console.log(value);
        setLoginFormData({
            ...LoginformData,
            [name]:value
        });
    }
    useEffect(()=>{
        const script = document.createElement("script");
        
        const src = '/assets/js/main-shop.js';
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

        verifyEmailToken();
    },[])

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const ref = queryParams.get("ref") || "/";
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
            setIsLogingIn(true);
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
                    navigate(ref);
                    // console.log(userLogin.data.user);
                    // setUser(userLogin.data.user);
                    setdisplayNamestate(false);
                    // sessionStorage.setItem('user',JSON.stringify(userLogin.data.user));
                    // console.log();
                    // document.cookie = `user_token=${encodeURIComponent(JSON.stringify(userLogin.data.user.token))}; path=/;`;
                    // document.cookie = `user_name=${encodeURIComponent(JSON.stringify(userLogin.data.user.token))}; path=/;`;
                    // showloginForm(prevState => !prevState); // Toggle between true/false
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
            setIsLogingIn(false);
    
           
    
    }
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {setGoogleUser(codeResponse); console.log(codeResponse)},
        onError: (error) => console.log('Login Failed:', error)
    });
    // const [ googleuser, setGoogleUser ] = useState([]);
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
                        // showregisterForm(false);
                        // showloginForm(false);
                        
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

    return (
        <div id="signin" className="signin-container">
            <form onSubmit={Login} className="signin-form">
            <h2 className="signin-title">Sign In</h2>
            
            <label>Your Email</label>
            <input
                name="userEmail"
                value={LoginformData.userEmail}
                onChange={handleLoginFormChange}
                type="email"
                required
            />

            <label>Your Password</label>
            <input
                name="userPassword"
                value={LoginformData.userPassword}
                onChange={handleLoginFormChange}
                type="password"
                required
            />

            <Link to="/password-reset" className="forgot-password">
                Forgot password?
            </Link>

            {verifyEmailMessage && (
                <>
                <div style={{ color: 'red', marginTop: '10px' }}>
                    Email Verification Incomplete
                </div>
                <Link
                    to="#"
                    onClick={(e) => {
                    e.preventDefault();
                    sendTokenOnMail();
                    }}
                    style={{
                    pointerEvents: verifyMailButton ? 'auto' : 'none',
                    color: verifyMailButton ? 'blue' : 'gray',
                    display: 'inline-block',
                    marginTop: '5px',
                    }}
                >
                    Verify Email
                </Link>
                </>
            )}

            {verificationMailSent && (
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <img
                    height="50"
                    width="50"
                    src="https://res.cloudinary.com/bytesizedpieces/image/upload/v1656084931/article/a-how-to-guide-on-making-an-animated-loading-image-for-a-website/animated_loader_gif_n6b5x0.gif"
                    alt="Loading..."
                />
                </div>
            )}

            <input type="submit" disabled={isLogingIn} className="primary-btn" value="Login" />
            </form>

            <div className="google-btn">
            <button type="button" className="login-with-google-btn" onClick={() => login()}>
                Sign in with Google
            </button>
            </div>
        </div>
    );

}
export default Signin;