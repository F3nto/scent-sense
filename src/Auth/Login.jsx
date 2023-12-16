import React, { useState } from "react";
import {
  Email,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center mr-10 h-96 mt-14 mb-10">
      <div className="flex justify-center items-center">
        <div className="space-y-6 w-72 ml-10">
          <div className="flex items-center relative">
            <Email
              className="absolute left-3"
            />
            <input
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="py-2 pl-12 bg-slate-100 focus:bg-slate-200 rounded-md w-full focus:outline-none"
            />
          </div>
          <div className="flex items-center rounded-md relative">
            <button
              className="absolute left-3"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? (
                <Visibility  />
              ) : (
                <VisibilityOff />
              )}
            </button>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="py-2 pl-12 bg-slate-100 focus:bg-slate-200 rounded-md w-full focus:outline-none"
            />
          </div>
          <button className="px-4 py-2.5 bg-gradient-to-r from-hovcolor to-header rounded-md hover:from-header hover:to-hovcolor text-comTxt hover:text-white w-full">
            Login
          </button>
        
        </div>

        <div className="flex-1">
          <img
            src={require("../Assets/images/login.jpg")}
            className="object-cover rounded-tr-3xl shadow-slate-500 shadow-md rounded-br-3xl h-full"
            style={{ marginLeft: "73px" }}
            alt="Perfume Bottles"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
