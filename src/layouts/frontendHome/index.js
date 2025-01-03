import React from "react";
import Navbar from "layouts/frontendHeader/Navbar/navbar.js";
import Header from "layouts/frontendHeader/index.js";
import Footer from "layouts/frontendFooter";
import FeaturesCard from "layouts/frontendFeaturesCard";
import "../../tailwind-css/input.css";
import ProductCard from "layouts/frontendProductCard";
import { BASE_URL } from "config";
import TopCategories from "layouts/frontendTopCategories";

const fetchFeaturedProducts = async () => {
  const response = await fetch(`${BASE_URL}api/get_products_by_featured/`, {
    method: "POST"
  });
  const data = await response.json();
  return data.success ? data.products : [];
};

const fetchLatestProducts = async () => {
  const response = await fetch(`${BASE_URL}api/get_products_by_latest/`, {
    method: "POST"
  });
  const data = await response.json();
  return data.success ? data.products: [];
}

const FrontendHome = () => {
  return (
    <div className="font-poppins">
      <Navbar />
      <Header
        autoSlide={true}
        slideInterval={5000}
      />
      <FeaturesCard />
      <ProductCard
        fetchProducts={fetchLatestProducts}
        title="Latest Products"
        description="Discover the newest additions to our collection."
      />
      <ProductCard
        fetchProducts={fetchFeaturedProducts}
        title="Featured Products"
        description="Our most popular products, handpicked by our team."
      />
      <TopCategories />
      <Footer />
    </div>
  );
};

export default FrontendHome;
