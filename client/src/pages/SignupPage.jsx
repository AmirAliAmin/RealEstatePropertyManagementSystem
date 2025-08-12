import React from "react";
import logo from "../assets/Logo.png";
import signupbg from "../assets/login-bg.png";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  return (
    <>
      <div
        className="w-[100%] border bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${signupbg})` }}
      >
        <div className="mx-8 text-white">
          <div className="w-25  mb-2">
            <img src={logo} alt="" className="rounded-[50px] w-100" />
          </div>
          <div className="sm:w-[42%] w-[100%]">
            <h1 className="font-extrabold sm:text-[35px] text-[20px] sm:mb-2 mb-5">
             Your dream home is one click away.
            </h1>

            <form action="" method="">
              <div className="flex flex-wrap">
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Enter Name "
                  className="w-100 h-15 sm:mb-3 mb-5 border px-5 bg-black opacity-50 outline-none focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                   className="w-100 h-15 sm:mb-3 mb-5 border px-5 bg-black opacity-50 outline-none focus:outline-none"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                   className="w-100 h-15 sm:mb-3 mb-5 border px-5 bg-black opacity-50 outline-none focus:outline-none"
                />
                <button type="button" onClick={()=> setShowPassword(!showPassword)} className="absolute top-245 left-100 -translate-y-1/2 text-gray-500 hover:text-gray-700">{showPassword? <FaRegEye /> : <FaRegEyeSlash /> }</button>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                className="w-100 h-15 sm:mb-3 mb-5 border px-5 bg-black opacity-50 outline-none focus:outline-none"
                />
                <button type="button" onClick={()=> setShowConfirmPassword(!showConfirmPassword)} className="absolute top-263 left-100 -translate-y-1/2 text-gray-500 hover:text-gray-700">{showConfirmPassword? <FaRegEye /> : <FaRegEyeSlash /> }</button>
              </div>
              <div className="flex">
              <button type="submit" className="w-50 h-15 bg-[linear-gradient(to_right,#482B5C,#812244,#D30C1C)]">Get Started</button>
              <h1 className="mx-5 w-50">Already have an account? <span className="mb-5 cursor-pointer hover:underline font-bold">Login</span></h1>
              </div>
              <div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* */}
      {/* */}
    </>
  );
}
