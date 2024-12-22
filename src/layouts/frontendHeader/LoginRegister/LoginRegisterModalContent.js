import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const LoginRegisterModalContent = ({ onClose, initialPannel }) => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(initialPannel === "signUp");

  useEffect(() => {
    setIsRightPanelActive(initialPannel === "signUp");
  }, [initialPannel]);

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-40"
    >
      <div
        onClick={handleModalClick}
        className={`bg-white rounded-lg shadow-2xl relative overflow-hidden w-full max-w-4xl min-h-[480px] ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
      >
        {" "}
        {/* Sign Up Container */}
        <div
          className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 ${
            isRightPanelActive
              ? "translate-x-full opacity-100 z-50"
              : "opacity-0 z-10 translate-x-0"
          }`}
        >
          <form className="bg-white flex flex-col items-center justify-center px-12 h-full text-center">
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <div className="flex justify-center space-x-4 my-5">
              <a
                href="#"
                className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors duration-300"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors duration-300"
              >
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors duration-300"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span className="text-sm mb-4">or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-100 border-none px-4 py-3 mb-4 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
            <button className="bg-cyan-500 text-white rounded-full px-12 py-3 uppercase text-sm font-bold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 hover:bg-cyan-600">
              Sign Up
            </button>
          </form>
        </div>
        {/* Sign In Container */}
        <div
          className={`absolute top-0 h-full transition-transform duration-700 ease-in-out left-0 w-1/2 z-20 ${
            isRightPanelActive ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <form className="bg-white flex flex-col items-center justify-center px-12 h-full text-center">
            <h1 className="text-2xl font-bold mb-4">Sign in</h1>
            <div className="flex justify-center space-x-4 my-5">
              <a
                href="#"
                className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors duration-300"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors duration-300"
              >
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors duration-300"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span className="text-sm mb-4">or use your account</span>
            <input
              type="email"
              placeholder="Email"
              className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-100 border-none px-4 py-3 mb-4 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
            <a
              href="#"
              className="text-sm text-gray-600 mb-4 hover:text-gray-800 transition-colors duration-300"
            >
              Forgot your password?
            </a>
            <button className="bg-cyan-500 text-white rounded-full px-12 py-3 uppercase text-sm font-bold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 hover:bg-cyan-600">
              Sign In
            </button>
          </form>
        </div>
        {/* Overlay Container */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-100 ${
            isRightPanelActive ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          {" "}
          <div
            className={`bg-gradient-to-r from-cyan-500 to-teal-500 relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out ${
              isRightPanelActive ? "translate-x-1/2" : "translate-x-0"
            }`}
          >
            {/* Overlay Left Panel */}
            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transform transition-transform duration-700 ease-in-out ${
                isRightPanelActive ? "translate-x-0" : "-translate-x-[20%]"
              }`}
            >
              <h1 className="text-white text-2xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-white text-sm mb-8">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="border border-white bg-transparent text-white rounded-full px-12 py-3 uppercase text-sm font-bold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 hover:bg-white/10"
                onClick={() => setIsRightPanelActive(false)}
              >
                Sign In
              </button>
            </div>

            {/* Overlay Right Panel */}
            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 right-0 h-full w-1/2 transform transition-transform duration-700 ease-in-out ${
                isRightPanelActive ? "translate-x-[20%]" : "translate-x-0"
              }`}
            >
              <h1 className="text-white text-2xl font-bold mb-4">Hello, Friend!</h1>
              <p className="text-white text-sm mb-8">
                Enter your personal details and start journey with us
              </p>
              <button
                className="border border-white bg-transparent text-white rounded-full px-12 py-3 uppercase text-sm font-bold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 hover:bg-white/10"
                onClick={() => setIsRightPanelActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginRegisterModalContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  initialPannel: PropTypes.string.isRequired,
};

export default LoginRegisterModalContent;
