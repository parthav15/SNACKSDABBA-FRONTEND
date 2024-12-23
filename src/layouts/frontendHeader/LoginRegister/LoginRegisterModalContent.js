import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FcGoogle } from "react-icons/fc";
import { BASE_URL } from "config";

const LoginRegisterModalContent = ({ onClose, initialPannel }) => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(initialPannel === "signUp");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [registerFormData, setRegisterFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const debounceTimeout = useRef(null);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    // Clear previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Update value immediately for typing feedback

    setRegisterFormData((registerPrevData) => ({
      ...registerPrevData,
      [name]: value,
    }));

    // Set debounced update for final formData
    debounceTimeout.current = setTimeout(() => {
      setRegisterFormData((registerPrevData) => ({
        ...registerPrevData,
        [name]: value,
      }));
      console.log("Updated Form Data:", {
        ...registerFormData,
        [name]: value,
      });
    }, 3000);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    // Clear previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Update value immediately for typing feedback

    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Set debounced update for final formData
    debounceTimeout.current = setTimeout(() => {
      setLoginFormData((loginPrevData) => ({
        ...loginPrevData,
        [name]: value,
      }));
      console.log("Updated Form Data:", {
        ...loginFormData,
        [name]: value,
      });
    }, 3000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/user_register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: registerFormData.first_name,
          last_name: registerFormData.last_name,
          email: registerFormData.email,
          phone_number: registerFormData.phone_number,
          password: registerFormData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration Failed");
      }

      //Handle successfull Registration
      localStorage.setItem("userToken", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstName: data.first_name,
          email: data.email,
        })
      );
      console.log("Stored user:", localStorage.getItem("userToken"));
      onClose?.();
    } catch (error) {
      console.log(error.message, "Something went wrong");
    } finally {
      setIsLoading(false);
    }
    console.log("Register Successfull");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Fixed logical operator - was checking !password instead of password
    if (!loginFormData.email || !loginFormData.password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/user_login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Added Accept header
          Accept: "application/json",
        },
        // Added credentials for cookie handling
        credentials: "include",
        body: JSON.stringify({
          email: loginFormData.email,
          password: loginFormData.password,
        }),
      });

      const data = await response.json();

      // Check for errors before proceeding
      if (!response.ok) {
        throw new Error(data.error || data.message || "Login failed. Please try again.");
      }

      // Store user data
      const userData = {
        firstName: data.first_name,
        email: data.email,
        // Add any other relevant user data
      };

      localStorage.setItem("userToken", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      // Added redirect or success callback
      // onLoginSuccess?.(userData);
      console.log("Login successfully");
      onClose?.();
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
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
        className={`bg-white rounded-lg shadow-2xl relative overflow-hidden w-full max-w-4xl min-h-[550px] ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
      >
        {" "}
        {/* Register Container */}
        <div
          className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 ${
            isRightPanelActive
              ? "translate-x-full opacity-100 z-50"
              : "opacity-0 z-10 translate-x-0"
          }`}
        >
          <form
            onSubmit={handleRegister}
            className="bg-white flex flex-col items-center justify-center py-10  px-12 h-full text-center"
          >
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <div className="flex justify-center space-x-4 my-5 -mt-1">
              <button className="flex  gap-1 text-cyan-500 border border-cyan-500 rounded-full px-3 py-1.5  text-l font-bold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 hover:bg-black hover:bg-opacity-5">
                Login With
                <span>
                  <FcGoogle className="size-8" />
                </span>
              </button>
            </div>
            <span className="text-sm mb-2 -mt-2">or use your email for registration</span>
            <div className="">
              <div className="flex gap-1">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={registerFormData.first_name}
                  onChange={handleRegisterChange}
                  className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
                />
                <input
                  type="text"
                  name="last_name"
                  value={registerFormData.last_name}
                  placeholder="Last Name"
                  onChange={handleRegisterChange}
                  className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>
              <input
                type="text"
                name="phone_number"
                value={registerFormData.phone_number}
                placeholder="Phone Number"
                onChange={handleRegisterChange}
                className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
              />

              <input
                type="email"
                name="email"
                value={registerFormData.email}
                placeholder="Email"
                onChange={handleRegisterChange}
                className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerFormData.password}
                onChange={handleRegisterChange}
                className="bg-gray-100 border-none px-4 py-3 mb-4 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-cyan-500 text-white rounded-full px-12 py-3 uppercase text-sm font-bold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 hover:bg-cyan-600"
            >
              Register
            </button>
          </form>
        </div>
        {/* Sign In Container */}
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
              <button className="flex  gap-1 text-cyan-500 border border-cyan-500 rounded-full -mt-4 px-4 py-2  text-l font-bold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 hover:bg-black hover:bg-opacity-5">
                Login With{" "}
                <span>
                  <FcGoogle className="size-8" />
                </span>
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <input
              type="email"
              name="email"
              value={loginFormData.email}
              placeholder="Email"
              onChange={handleLoginChange}
              className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
            <input
              type="password"
              name="password"
              value={loginFormData.password}
              placeholder="Password"
              onChange={handleLoginChange}
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
                className="border border-white bg-transparent text-white rounded-full px-12 py-3  uppercase text-sm font-bold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 hover:bg-white/10"
                onClick={() => setIsRightPanelActive(false)}
              >
                Login
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
                Register
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
