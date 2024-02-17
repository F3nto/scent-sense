import React from "react";

const LogoutModal = ({ onClose }) => {
  return (
    <div className="fixed z-10 top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.6)] bg-opacity-50">
      <div className="bg-white p-5 rounded-md">
        <h2 className="text-lg mb-3 font-fontbody">Confirm Logout</h2>
        <p className="mb-3 font-fontbody text-comTxt">Are you sure you want to logout?</p>
        <div className="flex justify-around items-center mt-5">
          <button className="bg-comTxt text-white px-4 py-2 rounded-md mr-2">Logout</button>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;