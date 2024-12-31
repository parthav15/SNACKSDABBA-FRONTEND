import React, { useState, useEffect } from "react";
import "./product_card.css";
import { BASE_URL } from "config";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState({});

  const handleBuyClick = (productId) => {
    setCart((prevCart) => ({ ...prevCart, [productId]: true }));
  };

  const handleRemoveClick = (productId) => {
    setCart((prevCart) => ({ ...prevCart, [productId]: false }));
  };

  const handleWishlistClick = (productId) => {
    setWishlist((prevWishlist) => ({
      ...prevWishlist,
      [productId]: !prevWishlist[productId],
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/get_products_by_featured/`, {
          method: "POST",
        });
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 inline-block relative">
          <span className="text-rose-500">Featured</span> Products
          <span className="absolute left-0 bottom-0 w-full border-b-2 border-rose-500"></span>
        </h1>
        <p className="text-sm text-gray-600">
          Our most popular products, handpicked by our team.
        </p>
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
                  <p>Rs. {product.price}</p>
                </div>
                <div className="buy" onClick={() => handleBuyClick(product.id)}>
                  <i className="material-icons">add_shopping_cart</i>
                </div>
              </div>
              <div className="right">
                <div className="done">
                  <i className="material-icons">done</i>
                </div>
                <div className="details">
                  <h1>Added to Cart</h1>
                </div>
                <div className="remove" onClick={() => handleRemoveClick(product.id)}>
                  <i className="material-icons">clear</i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCard;
