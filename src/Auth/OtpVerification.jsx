import React, { useState, useEffect, useRef } from "react";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";

const OtpVerification = ({ onClose }) => {
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
  const [otpCorrect, setOtpCorrect] = useState(false);

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

  let enteredCode = verificationCode.join("")
  const mutation = useMutation({
    mutationFn : (enteredCode) => {
      return axios.post(`http://localhost:4000/api/v1/sign-up`, {otp : enteredCode});
    }
  })

  const handleVerify = async () => {
    mutation.mutate(enteredCode)


    console.log("verify successful")
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
    console.log("Requesting another verification code...");
    setDisabled(true);
    setTimer(60);
  };

  return (
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
        <p className="mb-4">Verification code sent to pya*******@gmail.com</p>
        <div className="flex justify-center mb-4">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="border border-gray-300 rounded-md p-2 mr-2 w-12 text-center"
              value={digit}
              onChange={(e) =>
                handleVerificationCodeChange(index, e.target.value)
              }
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(inputRef) => (inputRefs.current[index] = inputRef)}
            />
          ))}
        </div>
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
  );
};

export default OtpVerification;
