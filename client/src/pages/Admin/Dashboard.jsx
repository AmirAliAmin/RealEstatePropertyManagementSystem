import React, { useState } from "react";
import ManageUsers from "./ManageUsers";
import ManageProperties from "./ManageProperties";
import ViewInquiries from "./ViewInquiries";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="w-screen h-screen flex font-sans">
      {/* Sidebar */}
      <div className="w-[20%] bg-gray-900 text-white flex flex-col p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          {["dashboard", "properties", "users", "inquiries"].map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer p-2 rounded ${
                activeTab === tab ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
          <li className="cursor-pointer p-2 rounded hover:bg-red-600">
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-[80%] bg-gray-100 p-6 overflow-auto">
        {activeTab === "dashboard" && (
          <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
        )}
        {activeTab === "properties" && <ManageProperties />}
        {activeTab === "users" && <ManageUsers />}
        {activeTab === "inquiries" && <ViewInquiries/>}
      </div>
    </div>
  );
}
