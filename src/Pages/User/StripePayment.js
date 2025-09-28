import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../Interceptor/axiosInstance";
import { loginPopup } from "../../redux/authSlice";

const StripePayment = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement("script");
    const src = "/assets/js/main.js";
    script.src = src;
    script.async = true;
    script.onload = () => {
      console.log(`${src} loaded.`);
      if (window.jQuery) {
        window.$ = window.jQuery;
      }
    };
    script.onerror = () => console.error(`Error loading ${src}`);
    document.body.appendChild(script);

    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/stripe-payment-status/${sessionId}`
      );
      console.log("Fetched order:", res.data);
      setOrderDetails(res.data); // assuming backend returns the order JSON
    } catch (err) {
      console.log(err);
      if (err.response?.status === 403 || err.response?.status === 401) {
        console.error("User not logged in or token expired", err);
        dispatch(loginPopup({ showForm: true }));
      }
    }
  };

  if (!orderDetails) {
    return <p className="text-center mt-5">Loading invoice...</p>;
  }

  const { seller, customer, shippingAddress, invoiceDate, orderNo, items, subTotal, discount , shipping, tax, total, status } = orderDetails;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css"
        integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA="
        crossOrigin="anonymous"
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                {/* Invoice Header */}
                <div className="invoice-title">
                  <h4 className="float-end font-size-15">
                    Invoice {orderNo}{" "}
                    <span className="badge bg-success font-size-12 ms-2">
                      {status}
                    </span>
                  </h4>
                  <div className="mb-4">
                    <h2 className="mb-1 text-muted">{seller.name}</h2>
                  </div>
                  <div className="text-muted">
                    <p className="mb-1">{seller.address}</p>
                    <p className="mb-1">
                      <i className="uil uil-envelope-alt me-1" /> {seller.email}
                    </p>
                    <p>
                      <i className="uil uil-phone me-1" /> {seller.phone}
                    </p>
                  </div>
                </div>

                <hr className="my-4" />

                {/* Customer & Order Info */}
                <div className="row">
                  <div className="col-sm-6">
                    <div className="text-muted">
                      <h5 className="font-size-16 mb-3">Billed To:</h5>
                      <h5 className="font-size-15 mb-2">{customer.name}</h5>
                      <p className="mb-1">
                        {customer.addressLine1}, {customer.addressLine2}
                      </p>
                      <p className="mb-1">{customer.email}</p>
                      <p>{customer.phone}</p>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="text-muted text-sm-end">
                      <div>
                        <h5 className="font-size-15 mb-1">Invoice No:</h5>
                        <p>{orderNo}</p>
                      </div>
                      <div className="mt-4">
                        <h5 className="font-size-15 mb-1">Invoice Date:</h5>
                        <p>{invoiceDate}</p>
                      </div>
                      <div className="mt-4">
                        <h5 className="font-size-15 mb-1">Shipping To:</h5>
                        <p>
                          {shippingAddress.name}, {shippingAddress.addressLine1},{" "}
                          {shippingAddress.addressLine2}, {shippingAddress.city},{" "}
                          {shippingAddress.state} - {shippingAddress.postalCode},{" "}
                          {shippingAddress.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="py-2">
                  <h5 className="font-size-15">Order Summary</h5>
                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-centered mb-0">
                      <thead>
                        <tr>
                          <th style={{ width: 70 }}>No.</th>
                          <th>Item</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th className="text-end" style={{ width: 120 }}>
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <div>
                                <h5 className="text-truncate font-size-14 mb-1">
                                  {item.description}
                                </h5>
                              </div>
                            </td>
                            <td>
                              ₹ {(item.price.unit_amount / 100).toFixed(2)}
                            </td>
                            <td>{item.quantity}</td>
                            <td className="text-end">
                              ₹ {((item.price.unit_amount * item.quantity) / 100).toFixed(2)}
                            </td>
                          </tr>
                        ))}

                        {/* Totals */}
                        <tr>
                          <th colSpan={4} className="text-end">
                            Sub Total
                          </th>
                          <td className="text-end">
                            ₹ {(subTotal / 100).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <th colSpan={4} className="border-0 text-end">
                            Discount :
                          </th>
                          <td className="border-0 text-end">₹ {discount}</td>
                        </tr>
                        <tr>
                          <th colSpan={4} className="border-0 text-end">
                            Shipping :
                          </th>
                          <td className="border-0 text-end">₹ {shipping/100}</td>
                        </tr>
                        <tr>
                          <th colSpan={4} className="border-0 text-end">
                            Tax :
                          </th>
                          <td className="border-0 text-end">₹ {tax}</td>
                        </tr>
                        <tr>
                          <th colSpan={4} className="border-0 text-end">
                            Total
                          </th>
                          <td className="border-0 text-end">
                            <h4 className="m-0 fw-semibold">
                              ₹ {(total / 100).toFixed(2)}
                            </h4>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Print & Send Buttons */}
                  <div className="d-print-none mt-4">
                    <div className="float-end">
                      <a
                        href="javascript:window.print()"
                        className="btn btn-success me-1"
                      >
                        <i className="fa fa-print" />
                      </a>
                      <a
                        href={orderDetails.stripeReceiptUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary w-md"
                      >
                        View Stripe Receipt
                      </a>
                    </div>
                  </div>
                </div>
                {/* End Summary */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StripePayment;
