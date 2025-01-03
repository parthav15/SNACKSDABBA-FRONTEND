import React from "react";
import { FaStore, FaFilter, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

const MobileFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-cyan-600 to-teal-500 shadow-lg z-50">
      <div className="flex justify-around items-center text-white py-3">
        {/* Shop Icon */}
        <button className="flex flex-col items-center focus:outline-none" aria-label="Shop">
          <FaStore className="text-xl" />
          <span className="text-xs mt-1">Shop</span>
        </button>

        {/* Filter Icon */}
        <button className="flex flex-col items-center focus:outline-none" aria-label="Filter">
          <FaFilter className="text-xl" />
          <span className="text-xs mt-1">Filter</span>
        </button>

        {/* Wishlist Icon */}
        <button className="flex flex-col items-center focus:outline-none" aria-label="Wishlist">
          <FaHeart className="text-xl" />
          <span className="text-xs mt-1">Wishlist</span>
        </button>

        {/* Cart Icon */}
        <button className="flex flex-col items-center focus:outline-none" aria-label="Cart">
          <FaShoppingCart className="text-xl" />
          <span className="text-xs mt-1">Cart</span>
        </button>

        {/* Account Icon */}
        <button className="flex flex-col items-center focus:outline-none" aria-label="Account">
          <FaUser className="text-xl" />
          <span className="text-xs mt-1">Account</span>
        </button>
      </div>
    </div>
  );
};

export default MobileFooter;
