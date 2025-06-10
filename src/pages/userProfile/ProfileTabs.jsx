import React, { useState } from "react";

export default function ProfileTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex border-b border-gray-200 text-sm font-medium mb-6">
      <button
        onClick={() => setActiveTab("myPosts")}
        className={`px-4 py-2 ${
          activeTab === "myPosts" ? "border-b-2 border-[#111827] text-[#111827]" : "text-gray-500 hover:text-[#111827] hover:cursor-pointer"
        } transition-all`}
      >
        My Posts
      </button>

      <button
        onClick={() => setActiveTab("savedPosts")}
        className={`px-4 py-2 ${
          activeTab === "savedPosts" ? "border-b-2 border-[#111827] text-[#111827]" : "text-gray-500 hover:text-[#111827] hover:cursor-pointer"
        } transition-all`}
      >
        Saved Posts
      </button>

      <button
        onClick={() => setActiveTab("settings")}
        className={`px-4 py-2 ${
          activeTab === "settings" ? "border-b-2 border-[#111827] text-[#111827]" : " text-gray-500 hover:text-[#111827] hover:cursor-pointer"
        } transition-all`}
      >
        Settings
      </button>
    </div>
  );
}
