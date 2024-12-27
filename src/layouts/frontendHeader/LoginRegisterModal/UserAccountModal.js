import React, { useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { FaUserCircle } from "react-icons/fa";

const getUserDetails = () => {
  const user = JSON.parse(localStorage.getItem("userDetails"));
  return user;
};

const UserModal = ({ onClose, onLogout }) => {
  const user = getUserDetails();

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div onClick={(e) => e.stopPropagation()}>
        {user ? (
          <>
            <div className="bg-white rounded-md flex flex-col items-center w-[400px] h-full text-center p-14">
              <h2 className="text-2xl border-b-2 w-full font-bold mb-4 ">User Details</h2>
              <div className="">
                <p className="flex gap-1 p-4 m-2 text-base">
                  <strong>Name:</strong>
                  <span>{user.first_name}</span>
                  <span>{user.last_name}</span>
                </p>
                <p className=" flex gap-1 p-4 m-2 text-base">
                  <strong>Email:</strong>
                  <span>{user.email}</span>
                </p>
                <p className=" flex gap-1 p-4 m-2 text-base">
                  <strong>Phone:</strong>
                  <span>{user.phone_number}</span>
                </p>
                <button
                  onClick={onLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>No user details available.</p>
        )}
      </div>
    </div>,
    document.body
  );
};

UserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

const UserAccountModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    setShowModal(false); // Close the modal
    window.location.reload(); // Refresh the page to reflect logged-out state
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-primary text-xl hover:text-secondary transition duration-300 ease-in-out"
      >
        <FaUserCircle className="size-10" />
      </button>
      {showModal && <UserModal onClose={() => setShowModal(false)} onLogout={handleLogout} />}
    </>
  );
};

export default UserAccountModal;
