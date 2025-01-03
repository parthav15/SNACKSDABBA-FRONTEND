import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlineLiveHelp } from "react-icons/md";
import { logout } from "../../../redux/slices/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "config.js";

const UserDropdown = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownStyles, setDropdownStyles] = useState({
        transform: "scaleY(0)",
        opacity: 0,
        transformOrigin: "top",
    });
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isDropdownOpen) {
            setDropdownStyles({
                transform: "scaleY(1.1) translateX(-1px)",
                opacity: 1,
                transformOrigin: "top",
                transition: "transform 0.3s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.3s ease",
            });

            // Slight delay to settle back to normal size
            setTimeout(() => {
                setDropdownStyles((prev) => ({
                    ...prev,
                    transform: "scaleY(1) translateX(0)",
                }));
            }, 300);
        } else {
            setDropdownStyles({
                transform: "scaleY(0) translateX(-1px)",
                opacity: 0,
                transformOrigin: "top",
                transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
            });
        }
    }, [isDropdownOpen]);

    const handleLogout = () => {
        dispatch(logout());
        setIsDropdownOpen(false);
        window.location.reload();
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* User Icon */}
            <button
                onClick={toggleDropdown}
                className="text-primary text-xl hover:text-secondary transition duration-300 ease-in-out"
            >
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={
                        user?.profile_picture
                            ? `${BASE_URL}${user.profile_picture}`
                            : "./favicon.png"
                    }
                    onError={(e) => (e.target.src = "./favicon.png")}
                    alt="User Avatar"
                />
            </button>

            {/* Dropdown Menu */}
            {user && (
                <div
                    style={{
                        ...dropdownStyles,
                        position: "absolute",
                        right: 0,
                        width: "16rem",
                        backgroundColor: "white",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        borderRadius: "0.5rem",
                        border: "1px solid #e2e2e2",
                        zIndex: 20,
                    }}
                >
                    {/* User Info */}
                    <div
                        className="flex items-center gap-4 p-4 border-b border-gray-200"
                        style={{ transition: "all 0.3s ease" }}
                    >
                        <img
                            className="w-12 h-12 rounded-full object-cover"
                            src={
                                user?.profile_picture
                                    ? `${BASE_URL}${user.profile_picture}`
                                    : "./favicon.png"
                            }
                            onError={(e) => (e.target.src = "./favicon.png")}
                            alt="User Avatar"
                        />
                        <div>
                            <p
                                className="text-lg font-semibold text-gray-800 cursor-pointer"
                                style={{ margin: 0 }}
                            >
                                {user.first_name} {user.last_name}
                            </p>
                        </div>
                    </div>

                    {/* Dropdown Options */}
                    <div>
                        <button
                            className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-100"
                            style={{ transition: "background-color 0.3s ease" }}
                        >
                            <FaUserCircle className="text-xl text-gray-500" />
                            <span>Edit Profile</span>
                        </button>
                        <button
                            className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-100"
                            style={{ transition: "background-color 0.3s ease" }}
                        >
                            <AiOutlineSetting className="text-xl text-gray-500" />
                            <span>Settings & Privacy</span>
                        </button>
                        <button
                            className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-100"
                            style={{ transition: "background-color 0.3s ease" }}
                        >
                            <MdOutlineLiveHelp className="text-xl text-gray-500" />
                            <span>Help & Support</span>
                        </button>
                    </div>

                    {/* Logout Button */}
                    <div className="border-t border-gray-200">
                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 font-semibold rounded-md"
                            style={{
                                color: "red",
                                border: "2px solid transparent",
                                backgroundColor: "transparent",
                                transition: "background-color 0.3s ease, color 0.3s ease",
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "red") &
                                (e.target.style.color = "white")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "transparent") &
                                (e.target.style.color = "red")
                            }
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
