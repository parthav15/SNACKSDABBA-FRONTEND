import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";

const MobileNavbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("menu");

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (cartSidebarOpen) setCartSidebarOpen(false);
  };

  const toggleCartbar = () => {
    setCartSidebarOpen(!cartSidebarOpen);
    if (sidebarOpen) setSidebarOpen(false);
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center relative">
          {/* Hamburger Icon */}
          <button
            onClick={toggleSidebar}
            className="text-white text-2xl md:hidden"
            aria-label="Toggle Menu"
          >
            <FaBars />
          </button>

          {/* Logo */}
          {!searchOpen && (
            <div className="text-center flex-grow md:flex-grow-0">
              <img
                src="./favicon.png"
                alt="Logo"
                className="xl:w-28 transition-transform duration-300 ease-in-out hover:scale-110 w-12 mx-auto"
              />
            </div>
          )}

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            {!searchOpen && (
              <button
                onClick={toggleSearch}
                className="text-xl focus:outline-none"
                aria-label="Search"
              >
                <FaSearch />
              </button>
            )}

            {/* Cart Icon */}
            {!searchOpen && (
              <button
                onClick={toggleCartbar}
                className="text-xl focus:outline-none"
                aria-label="Cart"
              >
                <FaShoppingCart />
              </button>
            )}
          </div>

          {/* Full-Width Search Box */}
          {searchOpen && (
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-500 p-6 flex items-center z-10 h-16">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent text-white px-4 py-2 outline-none placeholder-gray-300"
                autoFocus
              />
              <button
                onClick={toggleSearch}
                className="text-white text-3xl ml-4 focus:outline-none"
                aria-label="Close Search"
              >
                &times;
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar for Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-teal-600 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 shadow-lg z-50`}
      >
        {sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="text-3xl text-white absolute top-3 -right-10 focus:outline-none"
            aria-label="Close Sidebar"
          >
            &times;
          </button>
        )}
        {/* Tabs */}
        <div className="flex justify-around border-b border-gray-500">
          <button
            onClick={() => setActiveTab("menu")}
            className={`flex-1 text-center py-2 ${
              activeTab === "menu" ? "bg-teal-600 text-white" : "hover:bg-gray-200"
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`flex-1 text-center py-2 ${
              activeTab === "categories" ? "bg-teal-600 text-white" : "hover:bg-gray-200"
            }`}
          >
            Categories
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === "menu" ? (
            <ul className="space-y-2">
              <li>
                <a href="#" className="block hover:bg-gray-200 p-2 rounded border-b-2">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="block hover:bg-gray-200 p-2 rounded border-b-2">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="block hover:bg-gray-200 p-2 rounded border-b-2">
                  Contact
                </a>
              </li>
            </ul>
          ) : (
            <ul className="space-y-2">
              <li>
                <a href="#" className="block hover:bg-gray-200 p-2 rounded border-b-2">
                  Salted
                </a>
              </li>
              <li>
                <a href="#" className="block hover:bg-gray-200 p-2 rounded border-b-2">
                  Spicy
                </a>
              </li>
              <li>
                <a href="#" className="block hover:bg-gray-200 p-2 rounded border-b-2">
                  Masala
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Sidebar for Cart */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg text-teal-600 transform ${
          cartSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        {cartSidebarOpen && (
          <button
            onClick={toggleCartbar}
            className="text-3xl text-gray-400 absolute top-3 right-6 focus:outline-none hover:text-gray-600 mt-2"
            aria-label="Close Cart Sidebar"
          >
            &times;
          </button>
        )}
        <div className="p-6 h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Your Cart</h2>
          <div className="flex-grow overflow-y-auto space-y-4">
            {/* Example items */}
            <div className="flex items-center space-x-4 p-2 border-b">
              <img src="https://via.placeholder.com/50" alt="Item" className="w-12 h-12 rounded" />
              <div>
                <h3 className="text-lg font-semibold">Item 1</h3>
                <p className="text-sm text-gray-500">$10.00</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-2 border-b">
              <img src="https://via.placeholder.com/50" alt="Item" className="w-12 h-12 rounded" />
              <div>
                <h3 className="text-lg font-semibold">Item 2</h3>
                <p className="text-sm text-gray-500">$15.00</p>
              </div>
            </div>
          </div>
          <div className="border-t pt-4 mb-14">
            <button className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 ">
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {(sidebarOpen || cartSidebarOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setSidebarOpen(false);
            setCartSidebarOpen(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default MobileNavbar;
