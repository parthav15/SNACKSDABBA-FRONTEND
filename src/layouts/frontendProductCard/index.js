import React, { useState, useEffect } from "react";
import "./product_card.css";
import PropTypes from "prop-types";
import { BASE_URL } from "config";

const ProductCard = ({ fetchProducts, title, description }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [loading, setLoading] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const fetchMoreProducts = async () => {
    setIsFetching(true);
    try {
      const fetchedProducts = await fetchProducts();
      if (fetchedProducts.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      alert("Failed to load more products. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleBuyClick = async (productId) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("You need to be logged in to add items to cart.");
      return;
    }

    setLoading((prevLoading) => ({ ...prevLoading, [productId]: true }));
    const formData = new FormData();
    formData.append("product_id", productId);

    try {
      const response = await fetch(`${BASE_URL}api/add_item_to_cart/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setCart((prevCart) => ({ ...prevCart, [productId]: true }));
        alert(data.message);
      } else {
        alert("Failed to add item to cart.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, [productId]: false }));
    }
  };

  const handleWishlistClick = (productId) => {
    setWishlist((prevWishlist) => ({
      ...prevWishlist,
      [productId]: !prevWishlist[productId],
    }));
  };

  useEffect(() => {
    fetchMoreProducts();
  }, []);

  return (
    <>
      <div className="text-center mb-6 mt-6">
        <h1 className="text-4xl font-bold text-gray-900 inline-block relative">
          <span className="text-rose-500">{title.split(" ")[0]}</span>{" "}
          {title.split(" ").slice(1).join(" ")}
          <span className="absolute left-0 bottom-0 w-full border-b-2 border-rose-500"></span>
        </h1>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
      <div className="wrapper">
        {products.map((product) => (
          <div className="container" key={product.id}>
            <div className="top">
              <img
                src={`${BASE_URL}media/${product.image[0]}`}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                className={`wishlist ${wishlist[product.id] ? "added" : ""}`}
                onClick={() => handleWishlistClick(product.id)}
              >
                <i className="material-icons">favorite_border</i>
              </div>
            </div>
            <div className={`bottom ${cart[product.id] ? "clicked" : ""}`}>
              <div className="left">
                <div className="details">
                  <h1 className="whitespace-nowrap">{product.name}</h1>
                  <p style={{ color: "black" }}>Rs. {product.price}</p>
                </div>
                <div
                  className="buy"
                  onClick={() => handleBuyClick(product.id)}
                  disabled={loading[product.id]}
                >
                  <i className="material-icons">
                    {loading[product.id] ? "hourglass_empty" : "add_shopping_cart"}
                  </i>
                </div>
              </div>
              <div className="right">
                <div className="done">
                  <i className="material-icons">done</i>
                </div>
                <div className="details">
                  <h1>Added to Cart</h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
      <div className="text-center mt-6">
        <button
          onClick={fetchMoreProducts}
          disabled={isFetching}
          className={`bg-gradient-to-r from-cyan-600 to-teal-500 text-white px-8 py-4 rounded ${isFetching ? 'loading' : ''}`}
        >
          {isFetching ? (
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          ) : (
            'Load More'
          )}
        </button>
      </div>
    )}
    </>
  );
};

ProductCard.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProductCard;