import LoginRegisterModal from "./index.js";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const LoginModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    console.log("User from localStorage: ", user);
    if (user && user.firstName) {
      setUserName(user.firstName);
    }
  }, []);
  return (
    <>
      <div className="show-modal">
        <button onClick={() => setShowModal(true)}>{userName ? `Hi` : "Login"}</button>
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
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (user && user.firstName) {
      setUserName(user.firstName);
    }
  }, []);

  return (
    <>
      <div className="show-modal">
        <button onClick={() => setShowModal(true)}>{userName ? `${userName}` : "Register"}</button>
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
