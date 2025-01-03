import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaUserCircle, FaInstagram, FaFacebook } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaXTwitter } from "react-icons/fa6";
import "../../../tailwind-css/input.css";
import "./navbar.css";
import { LoginModal, RegisterModal } from "../LoginRegisterModal/LoginRegisterModal.js";
import UserDropdown from "../LoginRegisterModal/UserDropdown.js";
import { useSelector } from "react-redux";

const Navbar = () => {
  const AnimatedText = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const texts = ["WELCOME TO SNACKS DABBA", " Cash On Delivery on orders above Rs.499"];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, 5000);
      return () => clearInterval(interval);
    }, [texts.length]);

    return (
      <div className="text-wrapper">
        <h3 key={currentTextIndex} className="text">
          {texts[currentTextIndex]}
        </h3>
      </div>
    );
  };

  const [category, setCategory] = useState("all");
  const user = useSelector((state) => state.user.user);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const openMouseHover = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.opacity = "1";
      element.style.visibility = "visible";
      element.classList.add("show");
    }
  };
  const closeMouseHover = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      setTimeout(() => {
        if (!element.matches(":hover")) {
          element.style.opacity = "0";
          element.style.visibility = "hidden";
          element.style.remove = "show";
        }
      }, 100);
    }
  };

  useEffect(() => {
    const wishlistButton = document.getElementById("wishlist");
    const wishlistCard = document.getElementById("wishlist-card");
    const shoppingButton = document.getElementById("shoppingcart");
    const shoppingCard = document.getElementById("shoppingcart-card");

    if ((wishlistButton && wishlistCard) || (shoppingButton && shoppingCard)) {
      wishlistButton.addEventListener("mouseover", () => openMouseHover("wishlist-card"));
      wishlistButton.addEventListener("mouseleave", () => closeMouseHover("wishlist-card"));
      wishlistCard.addEventListener("mouseover", () => openMouseHover("wishlist-card"));
      wishlistCard.addEventListener("mouseleave", () => closeMouseHover("wishlist-card"));
      shoppingButton.addEventListener("mouseover", () => openMouseHover("shoppingcart-card"));
      shoppingButton.addEventListener("mouseleave", () => closeMouseHover("shoppingcart-card"));
      shoppingCard.addEventListener("mouseover", () => openMouseHover("shoppingcart-card"));
      shoppingCard.addEventListener("mouseleave", () => closeMouseHover("shoppingcart-card"));
    }

    return () => {
      if ((wishlistButton && wishlistCard) || (shoppingButton && shoppingCard)) {
        wishlistButton.addEventListener("mouseover", () => openMouseHover("wishlist-card"));
        wishlistButton.addEventListener("mouseleave", () => closeMouseHover("wishlist-card"));
        wishlistCard.addEventListener("mouseover", () => openMouseHover("wishlist-card"));
        wishlistCard.addEventListener("mouseleave", () => closeMouseHover("wishlist-card"));
        shoppingButton.addEventListener("mouseover", () => openMouseHover("shoppingcart-card"));
        shoppingButton.addEventListener("mouseleave", () => closeMouseHover("shoppingcart-card"));
        shoppingCard.addEventListener("mouseover", () => openMouseHover("shoppingcart-card"));
        shoppingCard.addEventListener("mouseleave", () => closeMouseHover("shoppingcart-card"));
      }
    };
  }, []);

  const searchBgEffect = () => {
    const searchBox = document.getElementById("search-box");
    if (searchBox) {
      searchBox.classList.add("focused");
    }
  };
  const removeSearchBgEffect = () => {
    const searchBox = document.getElementById("search-box");
    if (searchBox) {
      searchBox.classList.remove("focused");
    }
  };

  return (
    <>
      <div className="flex bg-gradient-to-r from-cyan-600 to-teal-500 px-2 py-2 text-white">
        <div className="xl:flex gap-3 ml-4 mt-1 hidden">
          <FaFacebook />
          <FaInstagram />
          <FaXTwitter />
        </div>
        <div className="m-auto">
          <AnimatedText />
        </div>
      </div>
      <div className="bg-white shadow-md  p-4  mx-auto  border border-gray-300  xl:h-24 h-20 mt-0">
        <div className="xl:flex xl:-mt-[.8rem] xl:items-center xl:justify-between xl:gap-8 xl:focus-ring-2 xl:focus-bg-secondary flex justify-between">
          {/* Logo */}
          <span className="xl:hidden">
            <button
              id="wishlist"
              className="text-primary text-xl hover:text-secondary transition-colors duration-300 ease-in-out"
            >
              <RxHamburgerMenu className="size-8" />
            </button>
          </span>
          <div className="flex-shrink-0">
            <img
              src="./favicon.png"
              alt="Logo"
              className="xl:w-28 transition-transform duration-300 ease-in-out hover:scale-110 w-16 ml-6"
              style={{ marginTop: "-0.8rem" }}
            />
          </div>

          {/* Search Box */}
          <div
            id="search-box"
            className="xl:flex items-center  xl:w-full xl:max-w-2xl hidden"
            style={{ marginTop: "-0.8rem" }}
          >
            <select
              value={category}
              onChange={handleCategoryChange}
              className="border  border-gray-600  py-2 px-3 text-sm h-[38px] focus:ring-teal-600 focus:outline-none border-r-0  "
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
              onFocus={searchBgEffect}
              onBlur={removeSearchBgEffect}
            />
            <button className="bg-primary text-white py-2 px-3 h-[38px] hover:shadow-lg hover:bg-secondary focus:bg-primary  focus:outline-none transition duration-300 ease-in-out leading-3">
              Search
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-7" style={{ marginTop: "-0.8rem" }}>
            <span className="xl:hidden">
              <button
                id="wishlist"
                className="text-primary text-xl hover:text-secondary transition-colors duration-300 ease-in-out"
              >
                <IoMdSearch className="size-8" />
              </button>
            </span>
            <div className="xl:wishlist-container mt-2 hidden">
              <button
                id="wishlist"
                className="text-primary text-xl hover:text-secondary transition-colors duration-300 ease-in-out "
              >
                <FaHeart className="size-8" />
              </button>
              <div id="wishlist-card" className="wishlist-card">
                Favourite items
              </div>
            </div>
            <div className="wishlist-container mt-2">
              <button
                id="shoppingcart"
                className="relative text-primary text-xl hover:text-secondary transition-colors duration-300 ease-in-out"
              >
                <FaShoppingCart className="size-8" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  4
                </span>
              </button>
              <div id="shoppingcart-card" className="wishlist-card">
                Shopping Items
              </div>
            </div>
            <div className="hidden xl:flex items-center gap-2 mr-4">
              <div className="mt-2 mr-4">
                <UserDropdown />
              </div>
              <div className="text-sm font-semibold -mx-5">
                <div>
                  {user ? (
                    <LoginModal />
                  ) : (
                    <>
                      <LoginModal />
                      <RegisterModal />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
