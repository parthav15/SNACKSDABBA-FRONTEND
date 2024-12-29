import React from "react";
import Navbar from "layouts/frontendHeader/Navbar/navbar.js";
import Header from "layouts/frontendHeader/index.js";
import Footer from "layouts/frontendFooter";
import FeaturesCard from "layouts/frontendFeaturesCard";
import "../../tailwind-css/input.css";
import ProductCard from "layouts/frontendProductCard";

const FrontendHome = () => {
  return (
    <div className="font-poppins">
      <Navbar />
      {/* <Carousel /> */}
      <Header
        autoSlide={true} // Set to true to enable auto-sliding
        slideInterval={5000} // Set the slide interval (in milliseconds)
      />
      <FeaturesCard />
      <ProductCard />
      <Footer />
    </div>
  );
};

export default FrontendHome;
