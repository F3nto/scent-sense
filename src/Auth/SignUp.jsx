import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Person,
  Email,
  Visibility,
  VisibilityOff,
  Google,
} from "@mui/icons-material";
import OtpVerification from "./OtpVerification";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showotpModal, setShowOtpModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let error = {};
    if (name === "name" && value.trim() === "") {
      error = { ...error, name: "Name is required" };
    }

    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = { ...error, email: "Invalid email address" };
    }

    if (name === "password" && value.length < 6) {
      error = { ...error, password: "Password must be at least 6 characters" };
    }

    let newError = { ...error };
    if (value.trim() === "") {
      newError[name] = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } is required`;
    } else {
      delete newError[name];
    }

    setError(newError);
  };

  const mutation = useMutation({
    mutationFn: (formData) => {
      return axios.post(`http://localhost:4000/api/v1/sign-up`, formData);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const newError = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") {
        newError[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
        isValid = false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email) && formData.email !== "") {
        newError.email = "Invalid email address";
        isValid = false;
      }

      if (formData.password.length < 6 && formData.password !== "") {
        newError.password = "Password must be at least 6 characters";
        isValid = false;
      }
    });

    setError(newError);

    if (isValid) {
      mutation.mutate(formData);
      setShowOtpModal(true);
    } else {
      console.log("Form has errors. Please complete all fields.");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="flex justify-between items-center mr-10 h-96 mt-14 mb-10">
        <div className="flex">
          <div className="space-y-6 w-80 ml-10">
            <div>
              <div className="flex items-center relative">
                <Person className="absolute left-3" />
                <input
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="py-2 pl-12 bg-slate-100 focus:bg-slate-200 rounded-md w-full focus:outline-none"
                />
              </div>
              {error.name && (
                <p className="text-red-500 text-sm mt-2 -mb-3 font-fontbody">
                  {error.name}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center relative">
                <Email className="absolute left-3" />
                <input
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="py-2 pl-12 bg-slate-100 focus:bg-slate-200 rounded-md w-full focus:outline-none"
                />
              </div>
              {error.email && (
                <p className="text-red-500 text-sm font-fontbody mt-2 -mb-3">
                  {error.email}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center rounded-md relative">
                <button
                  className="absolute left-3"
                  onClick={handleTogglePasswordVisibility}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
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
              {error.password && (
                <p className="text-red-500 text-sm font-fontbody mt-2 -mb-3">
                  {error.password}
                </p>
              )}
            </div>
            <button
              onClick={(e) => handleSubmit(e)}
              className="px-4 py-2.5 bg-gradient-to-r from-hovcolor to-header rounded-md hover:from-header hover:to-hovcolor text-comTxt hover:text-white w-full"
            >
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
      {showotpModal && (
        <OtpVerification onClose={() => setShowOtpModal(false)} />
      )}
    </>
  );
};

export default SignUp;
