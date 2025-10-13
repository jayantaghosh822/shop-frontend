import { useState , useRef , useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginSuccess,logout } from "../../redux/authSlice";
import { validatePassword } from '../../Utils/ValiadatePass';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const Signup = ()=>{

    const [RegisterformData, setRegisterFormData] = useState({
            userFirstName: '',
            userLastName: '',
            userPhone: '',
            userEmail: '',
    });
    const [registerFormState , showregisterForm] = useState(false);
    const [showValidationError , setShowValidationError] = useState(false);
    const [ googleuser, setGoogleUser ] = useState([]);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {setGoogleUser(codeResponse); console.log(codeResponse)},
        onError: (error) => console.log('Login Failed:', error)
    });
    const [isRegistering, setIsRegistering] = useState(false);

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
            setIsRegistering(true); // 🔹 Disable button immediately
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
            setIsRegistering(false); // 🔹 Disable button immediately
           
    
    }

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




    return (
        <div id="signup" className="signup-container">
            <form onSubmit={Register} className="signup-form">
           

            <h2 className="signup-title">Create Account</h2>

            <label>Your First Name</label>
            <input
                name="userFirstName"
                value={RegisterformData.userFirstName}
                onChange={handleRegisterFormChange}
                onKeyPress={(e) => e.charCode !== 32}
                type="text"
                required
            />

            <label>Your Last Name</label>
            <input
                name="userLastName"
                value={RegisterformData.userLastName}
                onChange={handleRegisterFormChange}
                type="text"
                required
            />

            <label>Your Phone</label>
            <input
                name="userPhone"
                maxLength="10"
                minLength="10"
                value={RegisterformData.userPhone}
                onChange={handleRegisterFormChange}
                type="text"
                required
            />

            <label>Your Email</label>
            <input
                name="userEmail"
                value={RegisterformData.userEmail}
                onChange={handleRegisterFormChange}
                type="email"
                required
            />

            <label>Your Password</label>
            <input
                name="userPassword"
                value={RegisterformData.userPassword}
                onChange={handleRegisterFormChange}
                type="password"
                required
            />

            {validationError()}

            <input
                type="submit"
                className="primary-btn"
                value="Register"
                disabled={isRegistering}
            />


            <div className="google-btn">
                <button type="button" className="login-with-google-btn" onClick={login}>
                Sign up with Google
                </button>
            </div>
            </form>
        </div>
    );

}

export default Signup;