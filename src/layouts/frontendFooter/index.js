import React, { useEffect, useState } from "react";
import './footer.css';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { BASE_URL } from "config";

const Footer = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${BASE_URL}api/list_categories/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.success){
                setCategories(data.categories);
            }
        };
        
        fetchCategories();
    }, []);
  return (
    <footer className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white">
      <div className="relative">
        <div className="container mx-auto py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="text-lg font-semibold">Subscribe to Our Newsletter</h3>
              <p className="mt-4">
                Don’t miss any updates of our new templates and extensions!
              </p>
              <form className="mt-4 flex flex-col space-y-3">
                <input
                  type="email"
                  name="EMAIL"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md bg-orange-500 hover:bg-orange-600"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Column 2 */}
            <div>
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
            <div>
              <h3 className="text-lg font-semibold">Useful Links</h3>
              <ul className="mt-4 space-y-1">
                <li><a href="#" className="text-white text-sm hover:text-blue-500">FAQ</a></li>
                <li><a href="#" className="text-white text-sm hover:text-blue-500">Terms & Conditions</a></li>
                <li><a href="#" className="text-white text-sm hover:text-blue-500">Reporting</a></li>
                <li><a href="#" className="text-white text-sm hover:text-blue-500">Documentation</a></li>
                <li><a href="#" className="text-white text-sm hover:text-blue-500">Support Policy</a></li>
                <li><a href="#" className="text-white text-sm hover:text-blue-500">Privacy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Top Brands</h3>
              <ul className="mt-4 space-y-1">
                <li><a href="#" className="text-white text-sm hover:text-blue-500">Haldiram</a></li>
                <li><a href="#" className="text-white text-sm hover:text-blue-500">Bikanervala</a></li>
                <li><a href="#" className="text-white text-sm hover:text-blue-500">Parle</a></li>
                <li><a href="#" className="text-white text-sm hover:text-blue-500">Britannia</a></li>
                <li><a href="#" className="text-white text-sm hover:text-blue-500">MTR</a></li>
                <li><a href="#" className="text-white text-sm hover:text-blue-500">Cadbury</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <img src="./favicon.png" alt="Snacks Dabba Logo" className="w-34 mb-4" />
              <p className="text-sm mb-4">
                Welcome to Snacks Dabba, where every moment is a chance to savor the flavor. Explore our wide range of Indian snacks and make every second count.
              </p>
              <div className="flex items-center space-x-2 mb-4">
                <FaEnvelope className="text-xl" />
                <span className="text-sm">snacksdabba.in@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-xl" />
                <span className="text-sm">+918360103913</span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Background */}
        <div className="footer_bg"></div>
        <div className="footer_bg_one"></div>
        <div className="footer_bg_two"></div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gradient-to-r from-cyan-600 to-teal-500">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <p className="text-white">© Snacks Dabba Inc. 2025 All rights reserved.</p>
          <p className="text-white">
            Made with <span className="text-red-500">❤</span> By{" "}
            <a href="http://cakecounter.com" target="_blank" rel="noopener noreferrer" className="text-white-500">
              Snacks Dabba Team
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
