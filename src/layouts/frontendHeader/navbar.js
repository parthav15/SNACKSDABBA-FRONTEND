import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "../../tailwind-css/input.css";

const Navbar = () => {
  // State for the category selector
  const [category, setCategory] = useState("all");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="bg-white shadow-md  p-4  mx-auto px-40" style={{ border: "3px solid #aeaeae" }}>
      <div className="flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src="./favicon.png" alt="Logo" className="w-28" />
        </div>

        {/* Search Box */}
        <div className="flex items-center  w-full max-w-2xl">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border border-gray-600  py-2 px-3 text-sm focus:ring-teal-600 focus:outline-none"
          >
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
          </select>
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-grow border border-gray-600 py-2 px-3 text-sm focus:ring-teal-600 focus:outline-none"
          />
          <button className="bg-teal-700 text-white py-1 px-4  hover:shadow-lg hover:bg-teal-600 focus:ring-2 focus:ring-teal-600 focus:outline-none ">
            Search
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-10">
          <button className="text-teal-700 text-xl hover:text-teal-600 ">
            <FaHeart className="size-10" />
          </button>
          <button className="relative text-teal-700 text-xl hover:text-teal-600">
            <FaShoppingCart className="size-10" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              4
            </span>
          </button>
          <button className="text-teal-700 text-xl hover:text-teal-600">
            <FaUserCircle className="size-10" />
          </button>
          <div className="text-base font-semibold -mx-5">
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
