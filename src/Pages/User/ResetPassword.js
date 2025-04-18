import React from 'react';
import Layout from '../../Layouts/User/Layout';
import useScript from "../../Hooks/jsLoader";
import axios from 'axios';
import { useState , useRef , useEffect } from 'react';
const ResetPassword = () => {
    useScript([
        "/assets/js/main.js",
    ]);
    const [emailFormState , showEmailForm] = useState(true);
    const [resetPassFormState , showResetPassForm] = useState(false);
    const [EmailFormData, setEmailFormData] = useState({
           userEmail: '',
    });
    const [passFormData, setPassFormData] = useState({
        userPassword: '',
    });
    const SendEmail= async()=>{
        alert(EmailFormData.userEmail);
        try{
            const email = EmailFormData.userEmail;
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const userSendPassResetLink = await axios.post(backendUrl+'/api/user/send-pasword-reset-link',
                {vemail: EmailFormData.userEmail},
                { withCredentials: true });
        }catch(err){

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

    const ResetPassword = ()=>{
        alert(passFormData.userEmail);
    }

    const handlePasswordResetFormChange=(e)=>{
        const {name , value} = e.target;
        // alert(name);
        // alert(value);
        setPassFormData({
            ...passFormData,
            [name]:value
        })

    }
  return (
    <Layout>
    <div className="overlay">
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

            <h2>Reset Password</h2>
            <label>A password reset link will be sent to your registered email</label>
            <input
            name="userPassword"
            value={resetPassFormState.userPassword}
            onChange={handlePasswordResetFormChange}
            type="email"
            placeholder="susan@hotmail.com"
            />
            <button onClick={ResetPassword}>Send Password Reset Link</button>
        </div>
    </div>
    </Layout>
  );
};

export default ResetPassword;
