import { Navigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { useSelector } from "react-redux";

const RequireAuth =  ({ children }) => {
  const authuser = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.loading);
 
//   if(authuser){
//     if()
//   }
  let userType = authuser?(authuser.userType):null;
 
  let isLoggedIn = userType?true:false; // or from context/state
 
//   userType = isLoggedIn?isLoggedIn.userType:false;
 
//   let userType = 
  const location = useLocation();

    

    // if (isLoading && authuser == null) {
    //     // You can show a loader or return null
       
    //     return <Navigate to="/" state={{ from: location }} replace />;  
    // }

    console.log(isLoading);
    console.log(userType);
    console.log(isLoggedIn);
    if(isLoading){
        return <div>Loading...</div>; 
    }

    if(userType =='customer' || userType == null){
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // if ( userType=='customer' && !isLoggedIn) {
    //     return <Navigate to="/" state={{ from: location }} replace />;
    // }

   

    return children;
};

export default RequireAuth;