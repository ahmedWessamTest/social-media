// ProfileHeader.jsx
import React from "react";

export default function ProfileHeader(props) {
  const { createdAt, dateOfBirth, email, gender, name, photo } = props.profile || {};

  return (
    <div className="flex items-center space-x-4 mb-6">
      <img className="w-16 h-16 rounded-full" src={photo || "https://via.placeholder.com/150"} alt="Avatar" />
      <div>
        <h1 className="text-lg font-semibold text-[#111827]">{name}</h1>
        <p className="text-sm text-gray-400">{email}</p>
      </div>
      <div className="ml-auto flex space-x-6 text-sm text-gray-500">
        <div>
          <span className="font-medium text-[#111827]">12</span> Posts
        </div>
        <div>
          <span className="font-medium text-[#111827]">0</span> Followers
        </div>
        <div>
          <span className="font-medium text-[#111827]">0</span> Following
        </div>
      </div>
    </div>
  );
}
