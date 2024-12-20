import "./navbar.css";

import { useState } from "react";
import { createPortal } from "react-dom";
import "../../tailwind-css/input.css";
import LoginModalContent from "./modals/LoginModalContent.js";
import RegisterModalContent from "./modals/RegisterModal";

const LoginModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="show-modal">
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Login
        </button>
        {showModal &&
          createPortal(<LoginModalContent onClose={() => setShowModal(false)} />, document.body)}
      </div>
    </>
  );
};
const RegisterModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="show-modal">
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Register
        </button>
        {showModal &&
          createPortal(<RegisterModalContent onClose={() => setShowModal(false)} />, document.body)}
      </div>
    </>
  );
};

export { LoginModal, RegisterModal };
