import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//   <React.StrictMode>
//       <Provider store={store}>
       
//       </Provider>
//    </React.StrictMode>

<GoogleOAuthProvider clientId="451957419077-asb1d8pjs04s6klb2sns604ndkri6vr6.apps.googleusercontent.com">
<Provider store={store}>
<App />
</Provider>
</GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
