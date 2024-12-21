import LoginRegisterModal from "./LoginRegisterModalContent";
import { useState } from "react";
import { createPortal } from "react-dom";

const LoginModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="show-modal">
        <button onClick={() => setShowModal(true)}>Login</button>
        {showModal &&
          createPortal(
            <LoginRegisterModal onClose={() => setShowModal(false)} initialPannel="signIn" />,
            document.body
          )}
      </div>
    </>
  );
};

const RegisterModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="show-modal">
        <button onClick={() => setShowModal(true)}>Register</button>
        {showModal &&
          createPortal(
            <LoginRegisterModal onClose={() => setShowModal(false)} initialPannel="signUp" />,
            document.body
          )}
      </div>
    </>
  );
};

export { LoginModal, RegisterModal };
