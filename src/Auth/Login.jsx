import React, { useState } from "react";
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToUser } from "../Redux/features/UserSlice";
import axios from "axios";

const Login = ({ onCloseAllModal, onSignUpClick }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [loading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let error = {};

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

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const mutation = useMutation({
    mutationFn: (formData) => {
      return axios.post(`http://localhost:4000/api/v1/sign-in`, {
        email: formData.email,
        password: formData.password,
      });
    },
    onSuccess: (data) => {
      if (data && data.data && data.data.success) {
        const userData = data.data.user;
        console.log(userData);
        dispatch(addToUser(userData));
        setTimeout(() => {
          onCloseAllModal();
        }, 1300);
        toast.success("Login Successfully")
      }
    },

    onError: (error) => {
      if (error.response && error.response.status === 403) {
        setTimeout(() => {
          setIsLoading(false);
          toast.error("Something went wrong!!!");
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
      mutation.mutate(formData);
      setIsLoading(true);
    } else {
      console.log("Form has errors, please complete all fields.");
    }
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
        <div className="flex justify-center items-center">
          <div className="space-y-6 w-72 ml-10">
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
              className="px-4 py-2.5 bg-gradient-to-r from-hovcolor to-header rounded-md hover:from-header hover:to-hovcolor text-comTxt hover:text-white w-full"
            >
              {loading ? (
                <>
                  Loading <LoadingDots isLoading={loading} />
                </>
              ) : (
                "Login"
              )}
            </button>
            <div className="mt-4">
              <text className="font-fontbody">
                Do you have an account?
                <button
                  onClick={onSignUpClick}
                  className="text-blue-500 hover:text-blue-700 ml-3 hover:underline underline-offset-4"
                >
                  Sing up
                </button>
              </text>
            </div>
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
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
};

export default Login;
