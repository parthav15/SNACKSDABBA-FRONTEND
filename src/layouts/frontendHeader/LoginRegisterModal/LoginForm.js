import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useFormHandling } from "./hooks/useFormHandling";
import { BASE_URL } from "config";
import PropTypes from "prop-types";

const GetUserDetails = async (setUserDetails) => {
  try {
    const token = localStorage.getItem("userToken");
    if (!token) {
      console.log("No token found");
      return;
    }

    const response = await fetch(`${BASE_URL}api/user_get_details/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || data.error || "Can't get user details");
    }
    localStorage.setItem("userDetails", JSON.stringify(data.user_details));
    setUserDetails(data.user_details);
  } catch (err) {
    console.log(err);
  }
};

const LoginForm = ({ onClose, isRightPanelActive }) => {
  const [userDetails, setUserDetails] = useState(null);
  const {
    formData: loginFormData,
    isLoading,
    error,
    setError,
    setIsLoading,
    handleChange,
  } = useFormHandling({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!loginFormData.email || !loginFormData.password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}api/user_login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginFormData),
      });

      const data = await response.json();
      console.log("Complete Api Response", data);
      if (!response.ok) {
        throw new Error(data.error || data.message || "Login failed");
      }

      localStorage.setItem("userToken", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstName: data.first_name,
          email: data.email,
        })
      );

      GetUserDetails(setUserDetails);

      onClose?.();
    } catch (error) {
      setError(error.message || "An unexpected error occured");
      console.log("Login error: ", error);
    } finally {
      setIsLoading(false);
    }
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
          <button className="flex align-middle gap-1 text-cyan-500 border border-cyan-500 rounded-full -mt-4 px-4 py-2 text-l font-bold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 hover:bg-black hover:bg-opacity-5">
            Login With <FcGoogle className="size-8" />
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email"
          name="email"
          value={loginFormData.email}
          placeholder="Email"
          onChange={handleChange}
          className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
        />
        <input
          type="password"
          name="password"
          value={loginFormData.password}
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

export default LoginForm;
