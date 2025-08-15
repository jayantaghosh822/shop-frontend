import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from '../../Interceptor/axiosInstance'; // path to your interceptor file
import { useDispatch } from "react-redux";
import { loginSuccess,logout,loginPopup } from "../../redux/authSlice";
import { useLocation } from 'react-router-dom';

const StripePayment = () =>{
    const [orderDetails , setOrderDetails] = useState(null);
        const location = useLocation();
        const queryParams = new URLSearchParams(location.search);
        const sessionId = queryParams.get('session_id');
        const [orderTotal , setOrderTotal] = useState(0);
        useEffect(()=>{
           
            const script = document.createElement("script");
                    const src = '/assets/js/main.js';
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
            fetchOrder();
            


        },[]);

        useEffect(()=>{
            if (orderDetails && Array.isArray(orderDetails.items) && orderDetails.items.length > 0) {
                let total = 0;
                (orderDetails.items).map((item , index)=>{
                    total = total + item.price*item.quan;
                })
                console.log(total);
                setOrderTotal(total);
            }
        },[orderDetails])
        const dispatch = useDispatch();
        const fetchOrder = async()=>{
            try{
                const fetchPaymentDetails = await axiosInstance.get(`/api/stripe-payment-status/${sessionId}`);
                console.log(fetchPaymentDetails);
                // setOrderDetails(fetchOrder.data.order);
            }catch(err){
                console.log(err);
                if(err.response.status == 403 || err.response.status == 401)
                {
                    console.error("User not logged in or token expired", err);
                    dispatch(loginPopup({ showForm: true }));
                }
            }
           
        }
        console.log(orderDetails);
    return(
    <>
        <div className="container-fluid">
            <div className="container">
                {/* Title */}
                <div className="d-flex justify-content-between align-items-center py-3">
                <h2 className="h5 mb-0">
                    <a href="#" className="text-muted" /> Order #{}
                </h2>
                </div>
                {/* Main content */}
                <div className="row">
                <div className="col-lg-12">
                    {/* Details */}
                    <div className="card mb-4">
                    <div className="card-body">
                        <div className="mb-3 d-flex justify-content-between">
                        <div>
                            <span className="me-3">{orderDetails?.createdAt && new Date(orderDetails.createdAt).toLocaleDateString()} {orderDetails?.createdAt && new Date(orderDetails.createdAt).toLocaleTimeString()}</span>
                            <span className="me-3">#{}</span>
                            <span className="me-3">{orderDetails?.paymentMethod}</span>
                            <span className="badge rounded-pill bg-info">SHIPPING</span>
                        </div>
                        <div className="d-flex">
                            <button className="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text">
                            <i className="bi bi-download" />{" "}
                            <span className="text">Invoice</span>
                            </button>
                            <div className="dropdown">
                            <button
                                className="btn btn-link p-0 text-muted"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                <i className="bi bi-three-dots-vertical" />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                <a className="dropdown-item" href="#">
                                    <i className="bi bi-pencil" /> Edit
                                </a>
                                </li>
                                <li>
                                <a className="dropdown-item" href="#">
                                    <i className="bi bi-printer" /> Print
                                </a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </div>
                        <table className="table table-borderless">
                        <tbody>
                            {console.log(orderDetails)}
                            {orderDetails && Array.isArray(orderDetails.items) && orderDetails.items.map((item)=>{
                                return(
                                    <tr>
                                        <td>
                                            <div className="d-flex mb-2">
                                            <div className="flex-shrink-0">
                                                <img
                                                src={item.image}
                                                alt=""
                                                width={35}
                                                className="img-fluid"
                                                />
                                            </div>
                                            <div className="flex-lg-grow-1 ms-3">
                                                <h6 className="small mb-0">
                                                
                                                {item.metaData.name}
                                                
                                                </h6>
                                                <span className="small">Size: {item.metaData.size}</span>
                                            </div>
                                            </div>
                                        </td>
                                        <td>{item.quan}</td>
                                        <td className="text-end">${item.quan * item.price}</td>
                                    </tr>
                                )
                            })}
                            

                        </tbody>
                        {console.log(orderTotal)}
                        <tfoot>
                            <tr>
                            <td colSpan={2}>Subtotal</td>
                            <td className="text-end">${orderTotal}</td>
                            </tr>
                            <tr>
                            <td colSpan={2}>Shipping</td>
                            <td className="text-end">$20.00</td>
                            </tr>
                            
                            <tr className="fw-bold">
                            <td colSpan={2}>TOTAL</td>
                            <td className="text-end">${orderTotal+20}</td>
                            </tr>
                        </tfoot>
                        </table>
                    </div>
                    </div>
                    {/* Payment */}
                    <div className="card mb-4">
                    <div className="card-body">
                        <div className="row">
                        <div className="col-lg-6">
                            <h3 className="h6">Payment Method</h3>
                            <p>
                            {orderDetails?.paymentMethod} <br />
                            Total: ${orderTotal+20}{" "}
                            <span className="badge bg-success rounded-pill">{orderDetails?.orderStatus}</span>
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <h3 className="h6">Billing address</h3>
                            <address>
                            
                            <strong>{orderDetails?.shippingAddress?.name}</strong>
                            <br />
                            {orderDetails?.shippingAddress?.addressLine1} {orderDetails?.shippingAddress?.addressLine2}
                            <br />
                            {orderDetails?.shippingAddress?.city} {orderDetails?.shippingAddress?.state} {orderDetails?.shippingAddress?.country}
                            <br />
                            <abbr title="Phone">M:</abbr> {orderDetails?.shippingAddress?.phone}
                            </address>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                
                </div>
            </div>
        </div>
    </>
    )
}

export default StripePayment;