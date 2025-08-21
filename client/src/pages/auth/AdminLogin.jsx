import React, { useContext, useState, useEffect } from "react";
import loginbg from "../../assets/signup-bg.png";
import logo from "../../assets/Logo.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const { handleAdminLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto logout when landing on admin login
    localStorage.removeItem("token");
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
     const { user } = await handleAdminLogin({ email, password });

      // ✅ Check if user is admin
      if (data?.user?.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        alert("You are not authorized as admin!");
      }
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      className="w-full bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${loginbg})` }}
    >
      <div className="w-full h-screen bg-black opacity-90 text-white">
        <div className="w-full h-[83px] flex justify-between items-center px-4">
          <img
            src={logo}
            alt="Logo"
            className="sm:h-[300px] sm:w-[10%] w-[30%] object-contain"
          />
          <h1 className="w-[50%] sm:w-[30%] text-[10px] sm:text-[15px] flex items-center justify-center sm:font-semibold">
            Welcome Admin
          </h1>
        </div>

        <div className="sm:w-[50%] mx-auto sm:px-20 px-10">
          <form onSubmit={onSubmit}>
            <h1 className="mb-5 sm:mx-40 mx-20 font-extrabold text-[35px]">
              Admin Login
            </h1>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-15 mb-5 border px-5 bg-black bg-opacity-50 outline-none focus:outline-none"
            />

            <div className="relative mb-5">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-15 border px-5 bg-black bg-opacity-50 outline-none focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>

            <p className="mb-5 cursor-pointer hover:underline">
              Forget Password?
            </p>

            <button
              type="submit"
              className="w-full h-12 mb-3 rounded-md text-white font-semibold bg-[linear-gradient(to_right,#482B5C,#812244,#D30C1C)]"
            >
              Login as Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
