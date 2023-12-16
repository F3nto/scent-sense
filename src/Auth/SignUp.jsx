  import React, { useState } from "react";
  import {
    Person,
    Email,
    Visibility,
    VisibilityOff,
    Google,
  } from "@mui/icons-material";

  const SignUp = () => {
    const [formData, setFormData] = useState({
      name: "",
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
        <div className="flex">
          <div className="space-y-6 w-80 ml-10">
            <div className="flex items-center relative">
              <Person
                className="absolute left-3"
              />
              <input
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="py-2 pl-12 bg-slate-100 focus:bg-slate-200 rounded-md w-full focus:outline-none"
              />
            </div>
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
              Sign Up
            </button>
            <div>
              <p className="font-fontbody text-sm">
                By clicking sign up, I agree to{" "}
                <span className="text-comTxt">SCENT-SENSE's</span> <br />
                Terms of use and Privacy Policy
              </p>
            </div>
            <button className="px-4 py-2.5 text-white bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-md hover:from-green-600 hover:via-yellow-600 hover:to-red-600 w-full flex items-center justify-center">
              <Google className="mr-2" />
              Google
            </button>
          </div>

          <div className="flex-1">
            <img
              src={require("../Assets/images/signup.jpg")}
              className="object-cover rounded-tr-3xl shadow-slate-500 shadow-md rounded-br-3xl h-full"
              style={{ marginLeft: "73px" }}
              alt="Perfume Bottles"
            />
          </div>
        </div>
      </div>
    );
  };

  export default SignUp;
