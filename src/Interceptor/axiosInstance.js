
// import { store } from '../redux/store'; // ✅ correct
// import { loginPopup } from '../redux/authSlice';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true, // Important for sending cookies
});

// Track refresh token request to avoid multiple refreshes
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};
// const dispatch = useDispatch();
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    // const authuser = useSelector((state) => state.auth.user);
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
        console.log(error);
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // console.log(authuser); 
        console.log("trying to send refresh");
        const res = await axios.get(`${backendUrl}/api/user/refresh-token`, {
           withCredentials: true,
        });
        
        isRefreshing = false;
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (err) {
        console.log(err);
        isRefreshing = false;
        processQueue(err, null);
        // You can redirect to login page here if needed
        // store.dispatch(loginPopup({ showForm: true }));
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
