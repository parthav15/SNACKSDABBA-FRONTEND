import React from "react";
import Navbar from "layouts/frontendHeader/Navbar/navbar.js";
import Header from "layouts/frontendHeader/index.js";

const FrontendHome = () => {
  return (
    <div>
      <Navbar />
      {/* <Carousel /> */}
      <Header
        autoSlide={false} // Set to true to enable auto-sliding
        slideInterval={7000} // Set the slide interval (in milliseconds)
      />
    </div>
  );
};

export default FrontendHome;
