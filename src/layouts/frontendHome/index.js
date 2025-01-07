import React, { useState } from "react";
import Navbar from "layouts/frontendHeader/Navbar/navbar.js";
import Header from "layouts/frontendHeader/index.js";
import Footer from "layouts/frontendFooter";
import FeaturesCard from "layouts/frontendFeaturesCard";
import "../../tailwind-css/input.css";
import ProductCard from "layouts/frontendProductCard";
import { BASE_URL } from "config";
import MobileNavbar from "layouts/frontendHeader/Navbar/MobileNavbar";
import TopCategories from "layouts/frontendTopCategories";

const FrontendHome = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [latestPage, setLatestPage] = useState(1);
  const [featuredPage, setFeaturedPage] = useState(1);
  const [latestHasMore, setLatestHasMore] = useState(true);
  const [featuredHasMore, setFeaturedHasMore] = useState(true);

  const fetchLatestProducts = async (page) => {
    const formData = new FormData();
    formData.append("page", page);

    const response = await fetch(`${BASE_URL}api/get_products_by_latest/`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.success ? data.products : [];
  };

  const fetchFeaturedProducts = async (page) => {
    const formData = new FormData();
    formData.append("page", page);

    const response = await fetch(`${BASE_URL}api/get_products_by_featured/`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.success ? data.products : [];
  };

  const handleLoadMoreLatest = async () => {
    const products = await fetchLatestProducts(latestPage);
    if (products.length > 0) {
      setLatestPage((prevPage) => prevPage + 1);
    } else {
      setLatestHasMore(false);
    }
    return products;
  };

  const handleLoadMoreFeatured = async () => {
    const products = await fetchFeaturedProducts(featuredPage);
    if (products.length > 0) {
      setFeaturedPage((prevPage) => prevPage + 1);
    } else {
      setFeaturedHasMore(false);
    }
    return products;
  };

  return (
    <div className="font-poppins">
      <div className="block md:hidden">
        <MobileNavbar />
      </div>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <Header autoSlide={true} slideInterval={5000} />
      <FeaturesCard />
      <ProductCard
        fetchProducts={handleLoadMoreLatest}
        title="Latest Products"
        description="Discover the newest additions to our collection."
        hasMore={latestHasMore}
      />
      <ProductCard
        fetchProducts={handleLoadMoreFeatured}
        title="Featured Products"
        description="Our most popular products, handpicked by our team."
        hasMore={featuredHasMore}
      />
      <TopCategories />
      <Footer />
    </div>
  );
};

export default FrontendHome;