import logo from './logo.svg';
import './App.css';
import HomePage from './Components/HomePage';
import React, { useEffect } from "react";
// Import jQuery if using it (since React doesn't include it by default)
// import $ from "jquery";

const App = () => {
  useEffect(() => {
    // Dynamically load JS scripts after the component mounts
    const loadScripts = () => {
      const scriptSources = [
        "./assets/js/jquery-3.3.1.min.js",
        "./assets/js/bootstrap.min.js",
        "./assets/js/jquery.nice-select.min.js",
        "./assets/js/jquery.nicescroll.min.js",
        "./assets/js/jquery.magnific-popup.min.js",
        "./assets/js/jquery.countdown.min.js",
        "./assets/js/jquery.slicknav.js",
        "./assets/js/mixitup.min.js",
        "./assets/js/owl.carousel.min.js",
        "./assets/js/main.js"
      ];

      scriptSources.forEach((src) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => {
          console.log(`${src} loaded successfully.`);
        };
        script.onerror = () => {
          console.error(`Error loading ${src}`);
        };
        document.body.appendChild(script);
      });
    };

    // Call the function to load scripts after component mounts
    loadScripts();

    // Clean up by removing the scripts when the component unmounts
    return () => {
      const scripts = document.querySelectorAll("script");
      scripts.forEach((script) => script.remove());
    };
  }, []); // Empty dependency array ensures this only runs once after initial render
  return (
    <HomePage />
  );
}

export default App;
