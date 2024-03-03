import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import { Close } from "@mui/icons-material";

const SignUpAndLogin = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Login");

  const handleClickTab = (tab) => {
    setActiveTab(tab);
  };

  const handleSignUpClick = () => {
    setActiveTab("SignUp");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Login":
        return <Login onCloseAllModal = {onClose} onSignUpClick={handleSignUpClick} />;

      case "SignUp":
        return <SignUp onCloseAllModal={onClose} />;

      default:
        return null;
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-20"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white p-8 rounded-tr-3xl rounded-br-3xl z-30 mx-36 mt-10 relative"
        >
          <div className="flex items-center space-x-10 mb-4">
            <button
              onClick={() => handleClickTab("Login")}
              className={`relative group ${
                activeTab === "Login" ? "text-comTxt" : "text-gray-500"
              }`}
            >
              <text className="font-fontbody group-hover:text-comTxt">
                Login
              </text>
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 bg-comTxt transition-all duration-300 ease-in-out group-hover:w-full
            ${activeTab === "Login" && "w-full bg-comTxt"}`}
              ></span>
            </button>
            <button
              onClick={() => handleClickTab("SignUp")}
              className={`relative group ${
                activeTab === "SignUp" ? "text-comTxt" : "text-gray-500"
              }`}
            >
              <text className="font-fontbody group-hover:text-comTxt">
                Sign Up
              </text>
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 bg-comTxt transition-all duration-300 ease-in-out group-hover:w-full
            ${activeTab === "SignUp" && "w-full bg-comTxt"}`}
              ></span>
            </button>
          </div>
          <div className="absolute right-5 top-2">
            <div className="w-10 h-10 rounded-full hover:text-white hover:bg-hovcolor shadow-slate-600 shadow-sm bg-header  relative flex justify-center items-center">
              <button onClick={onClose} className="absolute">
                <Close style={{ width: "28px", height: "28px" }} />
              </button>
            </div>
          </div>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default SignUpAndLogin;
