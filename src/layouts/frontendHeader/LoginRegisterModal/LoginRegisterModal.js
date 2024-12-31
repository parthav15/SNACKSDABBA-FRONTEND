import LoginRegisterModalContent from "./index.js";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const getUserName = () => {
  const user = JSON.parse(localStorage.getItem("userDetails"));
  return user?.first_name || null;
};

const ModalTrigger = ({ type }) => {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState(getUserName());

  //Update userName state whenver the localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUserName(getUserName());
    };

    window.addEventListener("storage", handleStorageChange);
    setUserName(getUserName());

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const buttonText =
    type === "login" ? (userName ? "Hi" : "Login") : userName ? userName : "Register";
  const initialPannel = type === "login" ? "signIn" : "signUp";

  const handleClick = () => {
    if (!userName) {
      setShowModal(true);
    }
  };

  return (
    <div className="show-modal">
      <button onClick={handleClick} disabled={!!userName}>
        {buttonText}
      </button>

      {showModal &&
        createPortal(
          <LoginRegisterModalContent
            onClose={() => setShowModal(false)}
            initialPannel={initialPannel}
            onLoginSuccess={(user) => {
              console.log("User loggined Succesfull");
              localStorage.setItem("userDetails", JSON.stringify(user));
              setUserName(user.first_name);
            }}
          />,
          document.body
        )}
    </div>
  );
};

ModalTrigger.propTypes = {
  type: PropTypes.oneOf(["login", "register"]).isRequired, // Validates allowed string values for initialPannel
};

const LoginModal = () => <ModalTrigger type={"login"} />;
const RegisterModal = () => <ModalTrigger type={"register"} />;

export { LoginModal, RegisterModal };
