import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function SettingsSidebar({ activeTab, TapHandler }) {
  return (
    <>
      <div className="max-w-1/4 pr-6 border-r border-gray-100 text-sm space-y-3">
        <Link
          to="/profile/changeImage"
          onClick={(e) => {
            e.preventDefault();
            TapHandler("changeImage");
          }}
          className={`block ${
            activeTab === "changeImage" ? "text-[#111827] font-semibold" : "text-gray-400"
          } cursor-pointer hover:text-[#111827] transition`}
        >
          Change Image
        </Link>

        <Link
          to="/profile/changePassword"
          onClick={(e) => {
            e.preventDefault();
            TapHandler("changePassword");
          }}
          className={`block ${
            activeTab === "changePassword" ? "text-[#111827] font-semibold" : "text-gray-400"
          } cursor-pointer hover:text-[#111827] transition`}
        >
          Change Password
        </Link>

        <div
          onClick={(e) => {
            e.preventDefault();
            TapHandler("logout");
          }}
          className={`block ${
            activeTab === "logout" ? "text-[#111827] font-semibold" : "text-gray-400"
          } cursor-pointer hover:text-[#111827] transition`}
        >
          Logout
        </div>
      </div>
    </>
  );
}
