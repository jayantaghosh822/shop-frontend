import React from 'react';
import Layout from '../../Layouts/User/Layout';
import useScript from "../../Hooks/jsLoader";
import axios from 'axios';
import { useState , useRef , useEffect } from 'react';
import { useParams } from "react-router-dom";
import { validatePassword } from '../../Utils/ValiadatePass';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    useScript([
        "/assets/js/main.js",
    ]);
    const navigate = useNavigate();
    const { userID, token } = useParams();
    // alert(userID);
    // alert(token);
    const [emailFormState , showEmailForm] = useState(!(userID && token)?true:false);
    const [resetPassFormState , showResetPassForm] = useState((userID && token)?true:false);
    const [showValidationError , setShowValidationError] = useState(false);
    const [passMismatchError, setPassMismatchError] = useState(false);
    const [EmailFormData, setEmailFormData] = useState({
           userEmail: '',
    });
    const [passFormData, setPassFormData] = useState({
        userPassword: '',
        userConfirmedPassword: ''
    });

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
      
    const SendEmail= async()=>{
        // alert(EmailFormData.userEmail);
        try{
            const email = EmailFormData.userEmail;
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const userSendPassResetLink = await axios.post(backendUrl+'/api/user/send-pasword-reset-link',
                {vemail: EmailFormData.userEmail},
                { withCredentials: true });
                toast.success(userSendPassResetLink.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
        }catch(err){
            console.log(err)
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
    const handleEmailFormChange=(e)=>{
        const {name , value} = e.target;
        // alert(name);
        // alert(value);
        setEmailFormData({
            ...EmailFormData,
            [name]:value
        })

    }

    const ResetPassword = async()=>{
        // alert(passFormData.userPassword);
        // alert(passFormData.userConfirmedPassword);
        const validatedPassword = validatePassword(passFormData.userPassword);
        // alert(Argha10111998);
        if(!validatedPassword){
            // alert("not valid");
            setShowValidationError(true);
            return;
        }else{
            setShowValidationError(false);
        }
        if(passFormData.userPassword!=passFormData.userConfirmedPassword){
            // alert("pass word did'nt match");
            setPassMismatchError(true);
            return;
        }else{
            setPassMismatchError(false);
        }
        try{
            const password = passFormData.userPassword;
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const userSendPassToReset = await axios.post(backendUrl+'/api/user/reset-password',
                {
                    userId: userID,
                    resetToken: token,
                    vpass: password
                },
                { withCredentials: true });
            toast.success(userSendPassToReset.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(()=>{
                navigate('/');
            },1500);
            
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

    const handlePasswordResetFormChange=(e)=>{
        const {name , value} = e.target;
        // alert(name);
        // alert(value);
        setPassFormData({
            ...passFormData,
            [name]:value
        });
        console.log(name);
       console.log(passFormData[name]);
        if(!validatePassword(value)){
            setShowValidationError(true);
        }else{
            setShowValidationError(false);
        }
        

    }
  return (
    <Layout>
    <div className="overlay">
        {/* {alert(emailFormState)} */}
        <div className={emailFormState?'reset-box':'reset-box d-none'}>

            <h2>Reset Password</h2>
            <label>A password reset link will be sent to your registered email</label>
            <input
            name="userEmail"
            value={EmailFormData.userEmail}
            onChange={handleEmailFormChange}
            type="email"
            placeholder="susan@hotmail.com"
            />
            <button onClick={SendEmail}>Send Password Reset Link</button>
        </div>
        <div className={resetPassFormState?'reset-box':'reset-box d-none'}>
        {/* {alert(resetPassFormState)} */}
            <h2>Reset Password</h2>
            <label>Enter password</label>
            <input
            name="userPassword"
            value={resetPassFormState.userPassword}
            onChange={handlePasswordResetFormChange}
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            type="text"
            placeholder=""
            />
            <label>Confirm password</label>
            <input
            name="userConfirmedPassword"
            value={resetPassFormState.userPassword}
            onChange={handlePasswordResetFormChange}
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            type="text"
            placeholder=""
            />
            {passMismatchError && (
            <div style={{ color: 'red' }}>Passwords didn't match</div>
            )}
            {validationError()}
            <button onClick={ResetPassword}>Reset Password</button>
        </div>
    </div>
    </Layout>
  );
};

export default ResetPassword;
