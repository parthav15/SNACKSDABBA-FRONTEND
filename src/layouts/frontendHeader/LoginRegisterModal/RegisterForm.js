import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BASE_URL } from "config";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../redux/slices/userSlice.js";

const RegisterForm = ({ onClose, isRightPanelActive }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(fetchUser());

    try {
      const response = await fetch(`${BASE_URL}api/user_register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration Failed");
      }

      // console.log("Complete Api response for registration", data);
      localStorage.setItem("userToken", data.token);

      dispatch(fetchUser());

      onClose?.();
    } catch (error) {
      console.log("Register error", error);
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
              value={formData.first_name}
              onChange={handleChange}
              className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              placeholder="Last Name"
              onChange={handleChange}
              className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            placeholder="Phone Number"
            onChange={handleChange}
            className="bg-gray-100 border-none px-4 py-3 mb-2 w-full rounded transition-all duration-300 focus:ring-2 focus:ring-cyan-500 outline-none"
          />
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
            placeholder="Password"
            value={formData.password}
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

const MobileRegisterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(fetchUser());

    try {
      const response = await fetch(`${BASE_URL}api/user_register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration Failed");
      }

      // console.log("Complete Api response for registration", data);
      localStorage.setItem("userToken", data.token);

      dispatch(fetchUser());

      onClose?.();
    } catch (error) {
      console.log("Register error", error);
    }
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="flex justify-center space-x-4 my-5 -mt-1">
          <button className="flex gap-1 text-cyan-500 border border-cyan-500 rounded-full  px-2 py-2 text-base font-bold tracking-wider transition-all duration-300 ease-in-out hover:scale-95 hover:bg-black hover:bg-opacity-5">
            Login with <FcGoogle className="size-5" />
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-1/2 bg-gray-100 px-4 py-3 rounded border focus:ring-2 focus:ring-cyan-500 outline-none"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-1/2 bg-gray-100 px-4 py-3 rounded border focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full bg-gray-100 px-4 py-3 rounded border focus:ring-2 focus:ring-cyan-500 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-100 px-4 py-3 rounded border focus:ring-2 focus:ring-cyan-500 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-gray-100 px-4 py-3 rounded border focus:ring-2 focus:ring-cyan-500 outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-cyan-500 text-white py-3 rounded hover:bg-cyan-600 transition-all duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

MobileRegisterForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export { MobileRegisterForm };

export default RegisterForm;
