import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function SettingsSidebar({ activeTab, TapHandler }) {
  return (
    <>
      <div className=" pr-10 border-r border-gray-100 text-sm space-y-5">
        <Link
          to="/profile/changeImage"
          onClick={(e) => {
            e.preventDefault();
            TapHandler("changeImage");
          }}
          className={`block text-nowrap ${
            activeTab === "changeImage"
              ? "text-[#111827] font-semibold"
              : "text-gray-400"
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
          className={`block text-nowrap ${
            activeTab === "changePassword"
              ? "text-[#111827] font-semibold"
              : "text-gray-400"
          } cursor-pointer hover:text-[#111827] transition`}
        >
          Change Password
        </Link>

        <div
          onClick={(e) => {
            e.preventDefault();
            TapHandler("logout");
          }}
          className={`block text-nowrap ${
            activeTab === "logout"
              ? "text-[#111827] font-semibold"
              : "text-gray-400"
          } cursor-pointer hover:text-[#111827] transition`}
        >
          Logout
        </div>
      </div>
    </>
  );
}
