import React from 'react';
import Layout from '../../Layouts/User/Layout';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScript from "../../Hooks/jsLoader";
const HomePage = () => {
  useScript([
     "/assets/js/main.js",
  ]);
  return (
    <>
        <div>
        {/* Hero Section Begin */}
        <section className="hero">
          <div className="hero__slider owl-carousel">
            <div className="hero__items set-bg" data-setbg="/assets/img/hero/hero-1.jpg">
              <div className="container">
                <div className="row">
                  <div className="col-xl-5 col-lg-7 col-md-8">
                    <div className="hero__text">
                      {/* <h6>Summer Collection</h6> */}
                      <h2>Men T-Shirts Collections</h2>
                      <p>A specialist label creating luxury essentials. Ethically crafted with an unwavering
                        commitment to exceptional quality.</p>
                      <Link to="/men/men-t-shirts" className="primary-btn">Shop now <span className="arrow_right" /></Link>
                      <div className="hero__social">
                        <a href="#"><i className="fa fa-facebook" /></a>
                        <a href="#"><i className="fa fa-twitter" /></a>
                        <a href="#"><i className="fa fa-pinterest" /></a>
                        <a href="#"><i className="fa fa-instagram" /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero__items set-bg" data-setbg="/assets/img/hero/hero-2.jpg">
              <div className="container">
                <div className="row">
                  <div className="col-xl-5 col-lg-7 col-md-8">
                    <div className="hero__text">
                      {/* <h6>Summer Collection</h6> */}
                      <h2>Men Shirt Collections</h2>
                      <p>A specialist label creating luxury essentials. Ethically crafted with an unwavering
                        commitment to exceptional quality.</p>
                      <Link to="/men/men-shirts" className="primary-btn">Shop now <span className="arrow_right" /></Link>
                      <div className="hero__social">
                        <a href="#"><i className="fa fa-facebook" /></a>
                        <a href="#"><i className="fa fa-twitter" /></a>
                        <a href="#"><i className="fa fa-pinterest" /></a>
                        <a href="#"><i className="fa fa-instagram" /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Hero Section End */}
        {/* Banner Section Begin */}
        <section className="banner spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 offset-lg-4">
                <div className="banner__item">
                  <div className="banner__item__pic">
                    <img src="/assets/img/banner/banner-1.jpg" alt="" />
                  </div>
                  <div className="banner__item__text">
                    <h2>Clothing Collections Men Jackets</h2>
                    <Link to="/men/men-jackets">Shop now</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="banner__item banner__item--middle">
                  <div className="banner__item__pic">
                    <img src="http://res.cloudinary.com/dychqyphl/image/upload/v1760255012/product_gallery_0_1760255010046.webp" alt="" />
                  </div>
                  <div className="banner__item__text">
                    <h2>Men Denims</h2>
                    <Link to="/men/men-jeans">Shop now</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="banner__item banner__item--last">
                  <div className="banner__item__pic">
                    <img src="/assets/img/banner/banner-3.jpg" alt="" />
                  </div>
                  <div className="banner__item__text">
                    <h2>Men Shoes Spring 2030</h2>
                    <Link to="/men/men-shoes">Shop now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Banner Section End */}
        {/* Product Section Begin */}
        {/* <section className="product spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <ul className="filter__controls">
                  <li className="active" data-filter="*">Best Sellers</li>
                  <li data-filter=".new-arrivals">New Arrivals</li>
                  <li data-filter=".hot-sales">Hot Sales</li>
                </ul>
              </div>
            </div>
            <div className="row product__filter">
              <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                <div className="product__item">
                  <div className="product__item__pic set-bg" data-setbg="/assets/img/product/product-1.jpg">
                    <span className="label">New</span>
                    <ul className="product__hover">
                      <li><a href="#"><img src="/assets/img/icon/heart.png" alt="" /></a></li>
                      <li><a href="#"><img src="/assets/img/icon/compare.png" alt="" /> <span>Compare</span></a></li>
                      <li><a href="#"><img src="/assets/img/icon/search.png" alt="" /></a></li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6>Piqué Biker Jacket</h6>
                    <a href="#" className="add-cart">+ Add To Cart</a>
                    <div className="rating">
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                    </div>
                    <h5>$67.24</h5>
                    <div className="product__color__select">
                      <label htmlFor="pc-1">
                        <input type="radio" id="pc-1" />
                      </label>
                      <label className="active black" htmlFor="pc-2">
                        <input type="radio" id="pc-2" />
                      </label>
                      <label className="grey" htmlFor="pc-3">
                        <input type="radio" id="pc-3" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
                <div className="product__item">
                  <div className="product__item__pic set-bg" data-setbg="/assets/img/product/product-2.jpg">
                    <ul className="product__hover">
                      <li><a href="#"><img src="/assets/img/icon/heart.png" alt="" /></a></li>
                      <li><a href="#"><img src="/assets/img/icon/compare.png" alt="" /> <span>Compare</span></a></li>
                      <li><a href="#"><img src="/assets/img/icon/search.png" alt="" /></a></li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6>Piqué Biker Jacket</h6>
                    <a href="#" className="add-cart">+ Add To Cart</a>
                    <div className="rating">
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                    </div>
                    <h5>$67.24</h5>
                    <div className="product__color__select">
                      <label htmlFor="pc-4">
                        <input type="radio" id="pc-4" />
                      </label>
                      <label className="active black" htmlFor="pc-5">
                        <input type="radio" id="pc-5" />
                      </label>
                      <label className="grey" htmlFor="pc-6">
                        <input type="radio" id="pc-6" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                <div className="product__item sale">
                  <div className="product__item__pic set-bg" data-setbg="img/product/product-3.jpg">
                    <span className="label">Sale</span>
                    <ul className="product__hover">
                      <li><a href="#"><img src="/assets/img/icon/heart.png" alt="" /></a></li>
                      <li><a href="#"><img src="/assets/img/icon/compare.png" alt="" /> <span>Compare</span></a></li>
                      <li><a href="#"><img src="/assets/img/icon/search.png" alt="" /></a></li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6>Multi-pocket Chest Bag</h6>
                    <a href="#" className="add-cart">+ Add To Cart</a>
                    <div className="rating">
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star-o" />
                    </div>
                    <h5>$43.48</h5>
                    <div className="product__color__select">
                      <label htmlFor="pc-7">
                        <input type="radio" id="pc-7" />
                      </label>
                      <label className="active black" htmlFor="pc-8">
                        <input type="radio" id="pc-8" />
                      </label>
                      <label className="grey" htmlFor="pc-9">
                        <input type="radio" id="pc-9" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
                <div className="product__item">
                  <div className="product__item__pic set-bg" data-setbg="img/product/product-4.jpg">
                    <ul className="product__hover">
                      <li><a href="#"><img src="/assets/img/icon/heart.png" alt="" /></a></li>
                      <li><a href="#"><img src="/assets/img/icon/compare.png" alt="" /> <span>Compare</span></a></li>
                      <li><a href="#"><img src="/assets/img/icon/search.png" alt="" /></a></li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6>Diagonal Textured Cap</h6>
                    <a href="#" className="add-cart">+ Add To Cart</a>
                    <div className="rating">
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                    </div>
                    <h5>$60.9</h5>
                    <div className="product__color__select">
                      <label htmlFor="pc-10">
                        <input type="radio" id="pc-10" />
                      </label>
                      <label className="active black" htmlFor="pc-11">
                        <input type="radio" id="pc-11" />
                      </label>
                      <label className="grey" htmlFor="pc-12">
                        <input type="radio" id="pc-12" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                <div className="product__item">
                  <div className="product__item__pic set-bg" data-setbg="/assets/img/product/product-5.jpg">
                    <ul className="product__hover">
                      <li><a href="#"><img src="/assets/img/icon/heart.png" alt="" /></a></li>
                      <li><a href="#"><img src="/assets/img/icon/compare.png" alt="" /> <span>Compare</span></a></li>
                      <li><a href="#"><img src="/assets/img/icon/search.png" alt="" /></a></li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6>Lether Backpack</h6>
                    <a href="#" className="add-cart">+ Add To Cart</a>
                    <div className="rating">
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                    </div>
                    <h5>$31.37</h5>
                    <div className="product__color__select">
                      <label htmlFor="pc-13">
                        <input type="radio" id="pc-13" />
                      </label>
                      <label className="active black" htmlFor="pc-14">
                        <input type="radio" id="pc-14" />
                      </label>
                      <label className="grey" htmlFor="pc-15">
                        <input type="radio" id="pc-15" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
                <div className="product__item sale">
                  <div className="product__item__pic set-bg" data-setbg="/assets/img/product/product-6.jpg">
                    <span className="label">Sale</span>
                    <ul className="product__hover">
                      <li><a href="#"><img src="/assets/img/icon/heart.png" alt="" /></a></li>
                      <li><a href="#"><img src="/assets/img/icon/compare.png" alt="" /> <span>Compare</span></a></li>
                      <li><a href="#"><img src="/assets/img/icon/search.png" alt="" /></a></li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6>Ankle Boots</h6>
                    <a href="#" className="add-cart">+ Add To Cart</a>
                    <div className="rating">
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star-o" />
                    </div>
                    <h5>$98.49</h5>
                    <div className="product__color__select">
                      <label htmlFor="pc-16">
                        <input type="radio" id="pc-16" />
                      </label>
                      <label className="active black" htmlFor="pc-17">
                        <input type="radio" id="pc-17" />
                      </label>
                      <label className="grey" htmlFor="pc-18">
                        <input type="radio" id="pc-18" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                <div className="product__item">
                  <div className="product__item__pic set-bg" data-setbg="/assets/img/product/product-7.jpg">
                    <ul className="product__hover">
                      <li><a href="#"><img src="/assets/img/icon/heart.png" alt="" /></a></li>
                      <li><a href="#"><img src="/assets/img/icon/compare.png" alt="" /> <span>Compare</span></a></li>
                      <li><a href="#"><img src="/assets/img/icon/search.png" alt="" /></a></li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6>T-shirt Contrast Pocket</h6>
                    <a href="#" className="add-cart">+ Add To Cart</a>
                    <div className="rating">
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                    </div>
                    <h5>$49.66</h5>
                    <div className="product__color__select">
                      <label htmlFor="pc-19">
                        <input type="radio" id="pc-19" />
                      </label>
                      <label className="active black" htmlFor="pc-20">
                        <input type="radio" id="pc-20" />
                      </label>
                      <label className="grey" htmlFor="pc-21">
                        <input type="radio" id="pc-21" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
                <div className="product__item">
                  <div className="product__item__pic set-bg" data-setbg="/assets/img/product/product-8.jpg">
                    <ul className="product__hover">
                      <li><a href="#"><img src="/assets/img/icon/heart.png" alt="" /></a></li>
                      <li><a href="#"><img src="/assets/img/icon/compare.png" alt="" /> <span>Compare</span></a></li>
                      <li><a href="#"><img src="/assets/img/icon/search.png" alt="" /></a></li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6>Basic Flowing Scarf</h6>
                    <a href="#" className="add-cart">+ Add To Cart</a>
                    <div className="rating">
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                      <i className="fa fa-star-o" />
                    </div>
                    <h5>$26.28</h5>
                    <div className="product__color__select">
                      <label htmlFor="pc-22">
                        <input type="radio" id="pc-22" />
                      </label>
                      <label className="active black" htmlFor="pc-23">
                        <input type="radio" id="pc-23" />
                      </label>
                      <label className="grey" htmlFor="pc-24">
                        <input type="radio" id="pc-24" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* Product Section End */}
        {/* Categories Section Begin */}
        <section className="categories spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="categories__text">
                  <h2>Clothings Hot <br /> <span>Shoe Collection</span> <br /> Accessories</h2>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="categories__hot__deal">
                  <img src="/assets/img/product-sale.png" alt="" />
                  <div className="hot__deal__sticker">
                    <span>Sale Of</span>
                    <h5>$29.99</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 offset-lg-1">
                <div className="categories__deal__countdown">
                  <span>Deal Of The Week</span>
                  <h2>Multi-pocket Chest Bag Black</h2>
                  <div className="categories__deal__countdown__timer" id="countdown">
                    <div className="cd-item">
                      <span>3</span>
                      <p>Days</p>
                    </div>
                    <div className="cd-item">
                      <span>1</span>
                      <p>Hours</p>
                    </div>
                    <div className="cd-item">
                      <span>50</span>
                      <p>Minutes</p>
                    </div>
                    <div className="cd-item">
                      <span>18</span>
                      <p>Seconds</p>
                    </div>
                  </div>
                  <Link to="/backpacks" className="primary-btn">Shop now</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Categories Section End */}
        {/* Instagram Section Begin */}
        {/* <section className="instagram spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="instagram__pic">
                  <div className="instagram__pic__item set-bg" data-setbg="/assets/img/instagram/instagram-1.jpg" />
                  <div className="instagram__pic__item set-bg" data-setbg="/assets/img/instagram/instagram-2.jpg" />
                  <div className="instagram__pic__item set-bg" data-setbg="/assets/img/instagram/instagram-3.jpg" />
                  <div className="instagram__pic__item set-bg" data-setbg="/assets/img/instagram/instagram-4.jpg" />
                  <div className="instagram__pic__item set-bg" data-setbg="/assets/img/instagram/instagram-5.jpg" />
                  <div className="instagram__pic__item set-bg" data-setbg="/assets/img/instagram/instagram-6.jpg" />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="instagram__text">
                  <h2>Instagram</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</p>
                  <h3>#Male_Fashion</h3>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* Instagram Section End */}
        {/* Latest Blog Section Begin */}
        {/* <section className="latest spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title">
                  <span>Latest News</span>
                  <h2>Fashion New Trends</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="blog__item">
                  <div className="blog__item__pic set-bg" data-setbg="/assets/img/blog/blog-1.jpg" />
                  <div className="blog__item__text">
                    <span><img src="/assets/img/icon/calendar.png" alt="" /> 16 February 2020</span>
                    <h5>What Curling Irons Are The Best Ones</h5>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="blog__item">
                  <div className="blog__item__pic set-bg" data-setbg="/assets/img/blog/blog-2.jpg" />
                  <div className="blog__item__text">
                    <span><img src="/assets/img/icon/calendar.png" alt="" /> 21 February 2020</span>
                    <h5>Eternity Bands Do Last Forever</h5>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="blog__item">
                  <div className="blog__item__pic set-bg" data-setbg="/assets/img/blog/blog-3.jpg" />
                  <div className="blog__item__text">
                    <span><img src="/assets/img/icon/calendar.png" alt="" /> 28 February 2020</span>
                    <h5>The Health Benefits Of Sunglasses</h5>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* Latest Blog Section End */}
      </div>
    </>
  );
};

export default HomePage;
