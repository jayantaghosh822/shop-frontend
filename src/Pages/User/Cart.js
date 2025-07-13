import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Cart = ()=>{
    const authuser = useSelector((state) => state.auth.user);
    const cart = useSelector((state) => state.cart);
    const [total , setTotal] = useState(0);
    const calculate =(cart)=>{
        console.log(cart.items);
        let cartTotal = 0;

        for (const key in cart.items) {
            const item = cart.items[key];
            // console.log();
            const price = item.metaData.price;
            const quantity = item.quan || 1;
            cartTotal += price * quantity;
        }
        setTotal(cartTotal);
    }
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



        calculate(cart);

    },[]);




    return(
       <>
  {/* Breadcrumb Section Begin */}
  <section className="breadcrumb-option">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb__text">
            <h4>Shopping Cart</h4>
            <div className="breadcrumb__links">
              <a href="./index.html">Home</a>
              <a href="./shop.html">Shop</a>
              <span>Shopping Cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Breadcrumb Section End */}
  {/* Shopping Cart Section Begin */}
  <section className="shopping-cart spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className="shopping__cart__table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cart && cart.items && Object.keys(cart.items).map((item)=>{
                    return(
                        <tr>
                            <td className="product__cart__item">
                                <div className="product__cart__item__pic">
                                <img src="img/shopping-cart/cart-1.jpg" alt="" />
                                </div>
                                <div className="product__cart__item__text">
                                <h6>{cart.items[item].metaData.name}</h6>
                                <h5>${cart.items[item].metaData.price}</h5>
                                </div>
                            </td>
                            <td class="quantity__item">
                                <div class="product__details__cart__option">
                                    <div class="quantity">
                                        <div class="pro-qty">
                                            <input type="text" value={cart.items[item].quan ?cart.items[item].quan:1 } />
                                            
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="cart__price">$ {cart.items[item]?.quan?cart.items[item].metaData.price*cart.items[item].quan:cart.items[item].metaData.price}</td>
                            <td className="cart__close">
                                <i className="fa fa-close" />
                            </td>
                        </tr>
                    )
                })}
               
               
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="continue__btn">
                <a href="#">Continue Shopping</a>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="continue__btn update__btn">
                <a href="#">
                  <i className="fa fa-spinner" /> Update cart
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="cart__discount">
            <h6>Discount codes</h6>
            <form action="#">
              <input type="text" placeholder="Coupon code" />
              <button type="submit">Apply</button>
            </form>
          </div>
          <div className="cart__total">
            <h6>Cart total</h6>
            <ul>
              <li>
                Subtotal <span>$ {total}</span>
              </li>
              <li>
                Total <span>$ {total}</span>
              </li>
            </ul>
            <a href="#" className="primary-btn">
              Proceed to checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Shopping Cart Section End */}
</>

    );
}

export default Cart;