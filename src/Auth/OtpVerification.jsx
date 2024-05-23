import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToUser } from "../Redux/features/UserSlice";
import { toast, Toaster } from "react-hot-toast";

const OtpVerification = ({ onCloseAllModal, onClose, formData }) => {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(60);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [retryAnimation, setRetryAnimation] = useState(false);
  const dispatch = useDispatch();

  const handleVerificationCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !verificationCode[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  let enteredCode = verificationCode.join("");

  const sendOTPMutation = useMutation({
    mutationFn: (formData) => {
      return axios.post(`http://localhost:4000/api/v1/send-otp`, {
        email: formData.email,
      });
    },
  });

  const verifyOTPMutation = useMutation({
    mutationFn: ({ enteredCode, formData }) => {
      return axios.post(`http://localhost:4000/api/v1/verify-otp`, {
        otp: enteredCode,
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    },
    onSuccess: (data) => {
      if (data && data.data && data.data.success) {
        const userData = data.data.user;
        dispatch(addToUser(userData));
        localStorage.setItem("token", data.data.token);
        setSuccess(true);
        setError("");
        toast.success("SignUp Successful");
        setTimeout(() => {
          onCloseAllModal();
        }, 1500);
      }
    },
    onError: (error) => {
      setError("Verification failed. Please enter a valid OTP", error);
      setRetryAnimation(true);
    },
  });
  useEffect(() => {
    if (retryAnimation) {
      const timeout = setTimeout(() => {
        setRetryAnimation(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [retryAnimation]);

  const handleVerify = () => {
    if (!enteredCode) {
      setRetryAnimation(true);
      setError("Please enter OTP.");
      return;
    }
    verifyOTPMutation.mutate({ enteredCode, formData });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      } else {
        setDisabled(false);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    sendOTPMutation.mutate(formData);
    setDisabled(true);
    setTimer(60);
  };

  const userEmail = formData.email;
  const hiddenEmail =
    userEmail.substring(0, 3) +
    "*".repeat(userEmail.indexOf("@") - 3) +
    userEmail.substring(userEmail.indexOf("@"));

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Email Verification
          </h1>
          <p className="mb-4">Verification code sent to {hiddenEmail}</p>
          <div className="flex justify-center mb-4">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className={`${retryAnimation && "shake-load"} ${
                  error && "border-red-300 shadow-red-500 shadow-sm"
                } ${
                  success && "border-green-300 shadow-green-500 shadow-sm"
                } border border-gray-300 rounded-md p-2 mr-2 w-12 text-center`}
                value={digit}
                onChange={(e) =>
                  handleVerificationCodeChange(index, e.target.value)
                }
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(inputRef) => (inputRefs.current[index] = inputRef)}
              />
            ))}
          </div>

          {(error || success) && (
            <p
              className={`text-${error ? "red" : "green"}-500 text-center mb-4`}
            >
              {error ? error : "OTP verification successful!"}
            </p>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleVerify}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Verify
            </button>
            <button
              onClick={handleResend}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-4"
            >
              Resend
            </button>
          </div>
          <p className="mt-4 w-96 text-center mx-2 text-sm">
            Wait <span className="text-indigo-700">{timer} s</span> before
            requesting another verification code
          </p>
          <button className="absolute top-2 right-2" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
};

export default OtpVerification;
