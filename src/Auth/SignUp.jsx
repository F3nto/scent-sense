import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Person, Email, Visibility, VisibilityOff } from "@mui/icons-material";
import OtpVerification from "./OtpVerification";
import { toast, Toaster } from "react-hot-toast";


const SignUp = ({ onCloseAllModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showotpModal, setShowOtpModal] = useState(false);
  const [loading, setIsLoading] = useState(false);

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
    mutationFn: (email) => {
      return axios.post(`http://localhost:4000/api/v1/send-otp`, {
        email: email,
      });
    },

    onSuccess: (data) => {
      if (data.data.success) {
        setShowOtpModal(true);
      }
    },

    onError: (error) => {
      if (error.response && error.response.status === 409) {
        setTimeout(() => {
          setIsLoading(false);
          return toast.error("User already exists");
        }, 1800);
      } else {
        console.error("Error:", error);
      }
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
      mutation.mutate(formData.email);
      setIsLoading(true);
    } else {
      console.log("Form has errors. Please complete all fields.");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const LoadingDots = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
      <>
        <span className="dot-load">.</span>
        <span className="dot-load">.</span>
        <span className="dot-load">.</span>
      </>
    );
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
              disabled={loading}
              onClick={(e) => handleSubmit(e)}
              className={`px-4 py-2.5 bg-gradient-to-r from-hovcolor to-header rounded-md hover:from-header hover:to-hovcolor text-comTxt hover:text-white w-full`}
            >
              {loading ? (
                <>
                  Loading <LoadingDots isLoading={loading} />
                </>
              ) : (
                "Sign Up"
              )}
            </button>
            <div>
              <p className="font-fontbody text-sm">
                By clicking sign up, I agree to{" "}
                <span className="text-comTxt">SCENT-SENSE's</span> <br />
                Terms of use and Privacy Policy
              </p>
            </div>
            {/* <button 
            onClick={handleGoogleSignUp}
            className="px-4 py-2.5 bg-gradient-to-r from-header to-hovcolor hover:from-hovcolor hover:to-header group rounded-md w-full flex items-center justify-center">
              <img
                src={require("../Assets/icons/google.png")}
                style={{ width: "26px", height: "26px" }}
                alt=""
              />
              <text className="ml-2 text-comTxt group-hover:text-white">
                Continuous with google
              </text>
            </button> */}
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
        <OtpVerification
          formData={formData}
          onClose={() => setShowOtpModal(false)}
          onCloseAllModal={onCloseAllModal}
        />
      )}
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
};

export default SignUp;
