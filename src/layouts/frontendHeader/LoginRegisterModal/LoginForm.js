import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BASE_URL } from "config";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../redux/slices/userSlice.js";
import { MobileRegisterForm } from "./RegisterForm.js";

const LoginForm = ({ onClose, isRightPanelActive }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}api/user_login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login Failed");
      }

      localStorage.setItem("userToken", data.token);

      dispatch(fetchUser());
      onClose?.();
    } catch (err) {
    } finally {
    }
  };

  const handleGoogleLogin = () => {
    console.log("Clicked Google Login");
  };

  return (
    <div
      className={`absolute top-0 h-full transition-transform duration-700 ease-in-out left-0 w-1/2 z-20 ${
        isRightPanelActive ? "translate-x-full" : "translate-x-0"
      }`}
    >
      <form
        onSubmit={handleLogin}
        className="bg-white flex flex-col items-center justify-center px-12 h-full text-center"
      >
        <h1 className="text-2xl font-bold mb-4">Sign In To Your Account</h1>
        <div className="flex justify-center space-x-4 my-5">
          <button
            onClick={handleGoogleLogin}
            className="flex align-middle gap-1 text-cyan-500 border border-cyan-500 rounded-full -mt-4 px-4 py-2 text-l font-bold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 hover:bg-black hover:bg-opacity-5"
          >
            Login With <FcGoogle className="size-8" />
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
          className="bg-gray-100 border-none px-4 py-3 mb-4 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
        />
        <a
          href="#"
          className="text-sm text-gray-600 mb-4 hover:text-gray-800 transition-colors duration-300"
        >
          Forgot your password?
        </a>
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-cyan-500 text-white rounded-full px-12 py-3 uppercase text-sm font-bold tracking-wider transition-all duration-300 ease-in-out ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-95 hover:bg-cyan-600"
          }`}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  isRightPanelActive: PropTypes.bool.isRequired,
};

const MobileLoginForm = ({ onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Simulate login logic
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}api/user_login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login Failed");
      }

      localStorage.setItem("userToken", data.token);

      dispatch(fetchUser());
      console.log("Login succesfull");
      onClose?.();
    } catch (err) {
      console.log("Login Failed: ", err);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-container") {
      onClose?.();
    }
  };

  return (
    <div
      id="modal-container"
      onClick={handleOutsideClick}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="flex justify-center space-x-4 my-5">
          <button
            onClick={handleGoogleLogin}
            className="flex gap-1 text-cyan-500 border border-cyan-500 rounded-full px-4 py-2 text-l font-bold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 hover:bg-black hover:bg-opacity-5"
          >
            Login With <FcGoogle className="size-8" />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-100 px-4 py-3 rounded border focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-gray-100 px-4 py-3 rounded border focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
      {showRegisterForm && (
        <MobileRegisterForm
          onClose={() => setShowRegisterForm(false)}
          onLoginSuccess={(user) => console.log("User logged in : ", user)}
        />
      )}
    </div>
  );
};

MobileLoginForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

export { MobileLoginForm };
export default LoginForm;
