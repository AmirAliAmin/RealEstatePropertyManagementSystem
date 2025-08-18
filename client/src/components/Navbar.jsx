import React from "react";
import { MdOutlineLegendToggle } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const dropdownRef = useRef(null);
  const loginRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setOpenLogin(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div className="hidden lg:flex w-full h-18 fixed border gap-5 bg-black text-white">
        <div className="flex p-5 w-[15%]">
          <h1 className="font-extrabold text-[20px]">Amir Ali</h1>
        </div>
        <div className="p-5 w-[50%]">
          <ul className="flex gap-20 font-extrabold">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) => (isActive ? "text-blue-500" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "text-blue-500" : "")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/propertyList"
                className={({ isActive }) => (isActive ? "text-blue-500" : "")}
              >
                Property
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex gap-15 w-[30%] pl-35">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
          <button>
            <CiLight />
          </button>
        </div>
      </div>
      <div className="lg:hidden w-full h-18 flex gap-25">
        <div className="w-[25%] py-5 pl-2">
          <h1 className="font-extrabold text-[15px]">Amir Ali</h1>
        </div>
        <div className="p-5 flex gap-10">
          <div ref={dropdownRef}>
            <div
              className="relative cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <MdOutlineLegendToggle />
            </div>
            {open && (
              <ul className="border absolute bg-white shadow-md p-2 left-45 mt-5 w-25 z-50">
                <li className="hover:bg-gray-100 px-2 py-1 cursor-pointer">
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      isActive ? "text-blue-500" : ""
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="hover:bg-gray-100 px-2 py-1 cursor-pointer">
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive ? "text-blue-500" : ""
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li className="hover:bg-gray-100 px-2 py-1 cursor-pointer">
                  <NavLink
                    to="/propertyList"
                    className={({ isActive }) =>
                      isActive ? "text-blue-500" : ""
                    }
                  >
                    Property
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
          <div ref={loginRef}>
            <div
              className="relative cursor-pointer"
              onClick={() => setOpenLogin(!openLogin)}
            >
              <IoPersonCircleOutline />
            </div>
            {openLogin && (
              <ul className="border absolute bg-white shadow-md p-2 left-60 mt-5 w-25 z-50">
                <li
                  className="hover:bg-gray-100 px-2 py-1 cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </li>
                <li
                  className="hover:bg-gray-100 px-2 py-1 cursor-pointer"
                  onClick={() => setOpenLogin(false)}
                >
                  <NavLink
                    to="/propertyList"
                    className={({ isActive }) =>
                      isActive ? "text-blue-500" : ""
                    }
                  >
                    Property
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          <div>
            <CiLight />
          </div>
        </div>
      </div>
    </div>
  );
}
