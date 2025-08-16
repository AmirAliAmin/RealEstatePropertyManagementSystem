import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };
  return (
    <div>
       <div className="flex flex-col items-center justify-center h-screen bg-black">
      <h1 className="text-2xl font-bold mb-4 text-white">Welcome to Home Page</h1>
      {/* <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button> */}
    </div>
    </div>
  )
}
