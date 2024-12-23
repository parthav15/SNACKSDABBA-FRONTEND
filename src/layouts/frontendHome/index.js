import React from "react";
import Navbar from "layouts/frontendHeader/Navbar/navbar.js";
import Header from "layouts/frontendHeader/index.js";

const FrontendHome = () => {
  return (
    <div>
      <Navbar />
      {/* <Carousel /> */}
      <Header
        autoSlide={true} // Set to true to enable auto-sliding
        slideInterval={5000} // Set the slide interval (in milliseconds)
      />
    </div>
  );
};

export default FrontendHome;
