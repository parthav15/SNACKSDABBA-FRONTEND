import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlineLiveHelp } from "react-icons/md";

const getUserDetails = () => {
  const user = JSON.parse(localStorage.getItem("userDetails"));
  return user;
};

const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = getUserDetails();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    setIsDropdownOpen(false);
    window.location.reload(); // Refresh to reflect logged-out state
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Icon */}
      <button
        onClick={toggleDropdown}
        className="text-primary text-xl hover:text-secondary transition duration-300 ease-in-out"
      >
        <FaUserCircle className="size-10" />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 w-64 text-wrap bg-white shadow-lg rounded-lg border border-gray-200 z-20">
          {user ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src="./favicon.png"
                  alt="User Avatar"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800 cursor-pointer">
                    {user.first_name} {user.last_name}
                  </p>
                </div>
              </div>

              {/* Dropdown Options */}
              <div>
                <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-300 ease-in-out">
                  <FaUserCircle className="text-xl text-gray-500" />
                  <span>Edit Profile</span>
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-300 ease-in-out">
                  <AiOutlineSetting className="text-xl text-gray-500" />
                  <span>Settings & Privacy</span>
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-300 ease-in-out">
                  <MdOutlineLiveHelp className="text-xl text-gray-500" />
                  <span>Help & Support</span>
                </button>
              </div>

              {/* Logout Button */}
              <div className=" border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2  hover:border-red-500 border-2 text-red-500 font-semibold rounded-md hover:bg-red-600 hover:text-white transition-colors duration-300 ease-in-out"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <p className="p-4 text-gray-500 text-center">No user details available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
