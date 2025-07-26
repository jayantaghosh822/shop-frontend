import axios from 'axios';
import { useState , useRef , useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
const EmailVerificationConfirmed = ()=>{
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


    return(
        <div style={{ padding: "15rem 0px", textAlign: "center" }}>
            {authentication ?(
            <>
            <img src="/assets/sent-mail.gif" />
            <h1>Email Verification Confirmed</h1>
            <p>Thank you for verifying your email address!</p>
            <p>
                Your account is now active. You can <a href="#">log in</a> to your account.
            </p>
            </>
            ):(
            <>
            <img src="https://global.discourse-cdn.com/cloudflare/optimized/3X/8/5/851ba0bfa9d89583196780e735f36ecb792a454c_2_690x366.png" />
            
            </>
            )}
        </div>

    );
}
export default EmailVerificationConfirmed;