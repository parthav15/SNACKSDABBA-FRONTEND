import React, { useState } from "react";
import { FaStore, FaFilter, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { MobileLoginForm } from "layouts/frontendHeader/LoginRegisterModal/LoginForm.js";
import { MobileRegisterForm } from "layouts/frontendHeader/LoginRegisterModal/RegisterForm";

const MobileFooter = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-cyan-600 to-teal-500 shadow-lg z-50">
      <div className="flex justify-around items-center text-white py-3 relative">
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
        <div className="relative">
          <button
            onClick={togglePopup}
            className="flex flex-col items-center focus:outline-none"
            aria-label="Account"
          >
            <FaUser className="text-xl" />
            <span className="text-xs mt-1">Account</span>
          </button>

          {/* Popup Card */}
          {showPopup && (
            <div className="absolute bottom-16  transform -translate-x-3/4 bg-white rounded-lg shadow-lg p-4 w-48 animate-fade-in">
              <h3 className="text-teal-600 font-semibold text-sm text-center mb-2">Welcome!</h3>
              <button
                onClick={() => setShowLoginForm(true)}
                className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition"
                aria-label="Login"
              >
                Login
              </button>
              <button
                onClick={() => setShowRegisterForm(true)}
                className="w-full bg-gray-200 text-teal-600 py-2 mt-2 rounded-md hover:bg-gray-300 transition"
                aria-label="Register"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
      {/* LoginForm Modal */}
      {showLoginForm && (
        <MobileLoginForm
          onClose={() => setShowLoginForm(false)}
          onLoginSuccess={(user) => console.log("User logged in : ", user)}
        />
      )}
      {showRegisterForm && (
        <MobileRegisterForm
          onClose={() => setShowRegisterForm(false)}
          onLoginSuccess={(user) => console.log("User logged in : ", user)}
        />
      )}
    </div>
  );
};

export default MobileFooter;
