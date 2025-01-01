import LoginRegisterModalContent from "./index.js";
import { useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ModalTrigger = ({ type }) => {
  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem("userToken");

  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (!token) {
      setShowModal(true);
    }
  };

  return (
    <div className="show-modal">
      {token ? (
        <button onClick={handleClick}>
          Hi {user?.first_name || "User"}
        </button>
      ) : (
        <button onClick={handleClick}>
          {type === "login" ? "Login" : "Register"}
        </button>
      )}

      {showModal &&
        createPortal(
          <LoginRegisterModalContent
            onClose={() => setShowModal(false)}
            initialPannel={type === "login" ? "signIn" : "signUp"}
            onLoginSuccess={(user) => {
              console.log("User logged in successfully");
            }}
          />,
          document.body
        )}
    </div>
  );
};

ModalTrigger.propTypes = {
  type: PropTypes.oneOf(["login", "register"]).isRequired,
};

const LoginModal = () => <ModalTrigger type={"login"} />;
const RegisterModal = () => <ModalTrigger type={"register"} />;

export { LoginModal, RegisterModal };
