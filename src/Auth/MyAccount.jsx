import React from "react";
import { useSelector } from "react-redux";

const MyAccount = () => {
  const user = useSelector((state) => state.user?.userArr);

  return (
    <div className="flex flex-col justify-center items-center mt-10 mx-60">
      <h1 className="text-center font-fontbody text-2xl">My Account</h1>
      <div className="w-full h-0.5 bg-slate-500 mt-4"></div>

      <div className="mt-14 w-full relative rounded bg-slate-200 p-3">
        <div className="absolute inset-0 -top-8">
          <text className="font-fontbody text-lg">Profile</text>
        </div>
        <div className="flex items-center">
          <div>
            <button className="bg-hovcolor w-10 h-10 rounded-full flex justify-center items-center">
              <text className="text-white text-xl font-fontbody">
                {user[0]?.name.charAt(0).toUpperCase()}
              </text>
            </button>
          </div>

          <div className="pl-4">
            <div className="flex flex-col">
              <text className="text-md font-fontbody">
                {user[0]?.email.split("@")[0]}
              </text>
              <text className="mt-1">
                <span className="text-gray-500">Name : </span>
                {user[0]?.name}
              </text>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 w-full relative rounded bg-slate-200 p-3">
        <div className="absolute inset-0 -top-8">
          <text className="font-fontbody text-lg">Account and Security</text>
        </div>
        <div className="flex flex-col">
          <text className="text-sm font-fontbody mt-3">
            <span className="text-gray-500">Email</span>
            <span className="ml-3">{user[0]?.email}</span>
          </text>
          <div className="w-full h-0.5 bg-slate-400 mt-4"></div>
          <text className="font-fontbody text-sm mt-4">
            <span className="text-gray-500">Password</span>
            <span className="ml-3">{user[0]?.password}</span>
          </text>
          <div className="w-full h-0.5 bg-slate-400 mt-4"></div>
          <text className="font-fontbody text-sm mt-4">
            <div className="flex justify-between items-center">
            <div>
            <span className="text-gray-500">Delete account</span>
            <span className="ml-3">Delete current account</span>
            </div>
            <div className="mb-4">
                <text className="">Delete</text>
            </div>
            </div>
          </text>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default MyAccount;
