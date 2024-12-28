import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useFormHandling } from "./hooks/useFormHandling";
import { BASE_URL } from "config";
import PropTypes from "prop-types";
import { setUser, setLoading, setError } from "../../../redux/slices/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

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
    dispatch(setLoading(true));
    dispatch(setError(null));

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
      console.log("Complete Api response for registration", data);
      dispatch(
        setUser({
          user: {
            first_name: data.first_name,
            email: data.email,
          },
          token: data.token,
        })
      );
      onClose?.();
    } catch (error) {
      dispatch(setError(error.message || "Registration failed"));
      console.log("Register error", error);
    } finally {
      dispatch(setLoading(false));
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

export default RegisterForm;
