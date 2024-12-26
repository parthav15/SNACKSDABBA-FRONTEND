import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useFormHandling } from "./hooks/useFormHandling";
import { BASE_URL } from "config";
import { NewReleases } from "@mui/icons-material";
import PropTypes from "prop-types";

const RegisterForm = ({ onClose, isRightPanelActive }) => {
  const {
    formData: registerFormData,
    isLoading,
    setIsLoading,
    error,
    setError,
    handleChange,
  } = useFormHandling({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}api/user_register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerFormData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration Failed");
      }
      console.log("Complete Api response for registration", data);
      localStorage.setItem("userToken", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          first_name: data.first_name,
          email: data.email,
        })
      );
      onClose?.();
    } catch (error) {
      setError(error.message || "Registration failed");
      console.log("Register error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 ${
        isRightPanelActive ? "translate-x-full opacity-100 z-50" : "opacity-0 z-10 translate-x-0"
      }`}
    >
      <form
        onSubmit={handleRegister}
        className="bg-white flex flex-col items-center justify-center py-10 px-12 h-full text-center"
      >
        <h1 className="text-2xl font-bold mb-4">Create Account</h1>
        <div className="flex justify-center space-x-4 my-5 -mt-1">
          <button className="flex gap-1 text-cyan-500 border border-cyan-500 rounded-full px-3 py-1.5 text-l font-bold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 hover:bg-black hover:bg-opacity-5">
            Login With <FcGoogle className="size-8" />
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <span className="text-sm mb-2 -mt-2">or use your email for registration</span>
        <div className="">
          <div className="flex gap-1">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={registerFormData.first_name}
              onChange={handleChange}
              className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
            <input
              type="text"
              name="last_name"
              value={registerFormData.last_name}
              placeholder="Last Name"
              onChange={handleChange}
              className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>
          <input
            type="text"
            name="phone_number"
            value={registerFormData.phone_number}
            placeholder="Phone Number"
            onChange={handleChange}
            className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
          />
          <input
            type="email"
            name="email"
            value={registerFormData.email}
            placeholder="Email"
            onChange={handleChange}
            className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerFormData.password}
            onChange={handleChange}
            className="bg-gray-100 border-none px-4 py-3 mb-4 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-cyan-500 text-white rounded-full px-12 py-3 uppercase text-sm font-bold tracking-wider transition-all duration-300 ease-in-out ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-95 hover:bg-cyan-600"
          }`}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

RegisterForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  isRightPanelActive: PropTypes.bool.isRequired,
};

export default RegisterForm;
