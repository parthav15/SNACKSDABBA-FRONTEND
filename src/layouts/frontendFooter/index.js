import React, { useEffect, useState } from "react";
import "./footer.css";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { BASE_URL } from "config";
import MobileFooter from "./MobileFooter";

const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${BASE_URL}api/list_categories/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      }
    };

    fetchCategories();
  }, []);
  return (
    <footer className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white">
      <div className="relative">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="text-lg font-semibold text-center sm:text-left">
                Subscribe to Our Newsletter
              </h3>
              <p className="mt-4 text-center sm:text-left">
                Don’t miss any updates of our new products and exclusive offers!
              </p>
              <form className="mt-4 flex flex-col items-center sm:items-start space-y-3">
                <input
                  type="email"
                  name="EMAIL"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Column 2 */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold">Categories</h3>
              <ul className="mt-4 space-y-1">
                {categories.slice(0, 15).map((category) => (
                  <li key={category.id}>
                    <a href="#" className="text-white text-sm hover:text-blue-500">
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold">Useful Links</h3>
              <ul className="mt-4 space-y-1">
                <li>
                  <a href="#" className="text-white text-sm hover:text-blue-500">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-sm hover:text-blue-500">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-sm hover:text-blue-500">
                    Reporting
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-sm hover:text-blue-500">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-sm hover:text-blue-500">
                    Support Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-sm hover:text-blue-500">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold">Top Brands</h3>
              <ul className="mt-4 space-y-1">
                <li>
                  <a href="#" className="text-white text-sm hover:text-blue-500">
                    Haldiram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-sm hover:text-blue-500">
                    Bikanervala
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-sm hover:text-blue-500">
                    Parle
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-sm hover:text-blue-500">
                    Britannia
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-sm hover:text-blue-500">
                    MTR
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-sm hover:text-blue-500">
                    Cadbury
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5 */}
            <div className="text-center sm:text-left">
              <img
                src="./favicon.png"
                alt="Snacks Dabba Logo"
                className="w-20 mx-auto sm:mx-0 mb-4"
              />
              <p className="text-sm mb-4">
                Welcome to Snacks Dabba, where every moment is a chance to savor the flavor. Explore
                our wide range of Indian snacks and make every second count.
              </p>
              <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
                <span className="text-sm">snacksdabba.in@gmail.com</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <FaPhone className="text-xl" />
                <span className="text-sm">+918360103913</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="bg-gradient-to-r from-cyan-600 to-teal-500">
          <div className="container mx-auto py-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-white text-center text-sm">
              © Snacks Dabba Inc. 2025 All rights reserved.
            </p>
            <p className="text-white text-center text-sm">
              Made with <span className="text-red-500">❤</span> By{" "}
              <a
                href="http://cakecounter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-500"
              >
                Snacks Dabba Team
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* Mobile Footer  */}
      <div className="block md:hidden">
        <MobileFooter />
      </div>
    </footer>
  );
};

export default Footer;
