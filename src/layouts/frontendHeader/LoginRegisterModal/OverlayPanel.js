import PropTypes from "prop-types";
import React from "react";

const OverlayPanel = ({ isRightPanelActive, setIsRightPanelActive }) => {
  return (
    <div
      className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-100 ${
        isRightPanelActive ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      <div
        className={`bg-gradient-to-r from-cyan-500 to-teal-500 relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out ${
          isRightPanelActive ? "translate-x-1/2" : "translate-x-0"
        }`}
      >
        {/* Left Panel */}
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
            Login
          </button>
        </div>

        {/* Right Panel */}
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
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

OverlayPanel.propTypes = {
  isRightPanelActive: PropTypes.bool.isRequired,
  setIsRightPanelActive: PropTypes.bool.isRequired,
};

export default OverlayPanel;
