import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "../../tailwind-css/input.css";
import "./navbar.css";

const Navbar = () => {
  // State for the category selector
  const [category, setCategory] = useState("all");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const openMouseHover = () => {
    const wishlist_card = document.getElementById("wishlist-card");
    wishlist_card.style.opacity = "1";
    wishlist_card.style.visibility = "visible";
  };
  const closeMouseHover = () => {
    const wishlist_card = document.getElementById("wishlist-card");
    wishlist_card.style.opacity = "0";
    wishlist_card.style.visibility = "hidden";
  };
  const searchBgEffect = () => {
    const searchBox = document.getElementById("search-box");
    searchBox.style.boxShadow = "0px 4px 20px #0d9488";
    searchBox.style.transition = "box-shadow 0.3s ease-in-out, border-radius 0.3s ease-in-out";
  };
  const removeSearchBgEffect = () => {
    const searchBox = document.getElementById("search-box");
    searchBox.style.boxShadow = "none";
  };

  return (
    <div
      className="bg-white shadow-md  p-4  mx-auto px-40 "
      style={{
        border: "1px solid #aeaeae",
        boxShadow: "none",
        height: "100px",
        marginTop: "0px",
      }}
    >
      <div
        className="flex items-center justify-between gap-8 focus-ring-2 focus-bg-secondary"
        style={{ marginTop: "-0.8rem" }}
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <img 
            src="./favicon.png" 
            alt="Logo" 
            className="w-28 transition-transform duration-300 ease-in-out hover:scale-110" 
            style={{ marginTop: "-0.8rem" }} 
          />
        </div>

        {/* Search Box */}
        <div
          id="search-box"
          className="flex items-center  w-full max-w-2xl"
          style={{ marginTop: "-0.8rem" }}
        >
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border  border-gray-600  py-2 px-3 text-sm h-[38px] focus:ring-teal-600 focus:outline-none border-r-0  "
          >
            <option value="all">All</option>``
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
          </select>
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-grow border border-gray-600 py-2 px-3 text-sm focus:ring-teal-600 focus:outline-none"
            onFocus={searchBgEffect}
            onBlur={removeSearchBgEffect}
          />
          <button className="bg-primary text-white py-2 px-3 h-[38px] hover:shadow-lg hover:bg-secondary focus:bg-primary  focus:outline-none transition duration-300 ease-in-out leading-3">
            Search
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-7" style={{ marginTop: "-0.8rem" }}>
          <div className="wishlist-container">
            <button
              id="wishlist"
              className="text-primary text-xl hover:text-secondary transition duration-300 ease-in-out"
              onMouseOver={openMouseHover}
              onMouseLeave={closeMouseHover}
            >
              <FaHeart className="size-10" />
            </button>
            <div id="wishlist-card" className="wishlist-card">
              Favourite items
            </div>
          </div>
          <button className="relative text-primary text-xl hover:text-secondary transition duration-300 ease-in-out">
            <FaShoppingCart className="size-10" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              4
            </span>
          </button>
          <button className="text-primary text-xl hover:text-secondary transition duration-300 ease-in-out">
            <FaUserCircle className="size-10" />
          </button>
          <div className="text-sm font-semibold -mx-5">
            <p className="cursor-pointer" onClick={() => console.log("Login")}>
              Login
            </p>
            <p className="cursor-pointer" onClick={() => console.log("Register")}>
              Register
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
