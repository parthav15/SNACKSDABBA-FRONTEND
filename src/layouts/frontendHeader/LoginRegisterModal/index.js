import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import OverlayPanel from "./OverlayPanel";

const LoginRegisterModalContent = ({ onClose, initialPannel, onLoginSuccess }) => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(initialPannel === "signUp");

  useEffect(() => {
    setIsRightPanelActive(initialPannel === "signUp");
  }, [initialPannel]);

  const handleModalClick = (event) => {
    event.stopPropagation();
  };
  console.log("onClose function: ", onClose);

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
        <RegisterForm onClose={onClose} isRightPanelActive={isRightPanelActive} />
        <LoginForm
          onClose={onClose}
          isRightPanelActive={isRightPanelActive}
          onLoginSuccess={onLoginSuccess}
        />
        <OverlayPanel
          isRightPanelActive={isRightPanelActive}
          setIsRightPanelActive={setIsRightPanelActive}
        />
      </div>
    </div>
  );
};

LoginRegisterModalContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  initialPannel: PropTypes.oneOf(["signIn", "signUp"]).isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginRegisterModalContent;
