// ProfileHeader.jsx
import React, { useContext } from "react";
import { PostsContext } from "../../contexts/postsContext";
import { env } from "../../environment/environment";

export default function ProfileHeader(props) {
  const { email, name } = props.profile || {};
  const { posts, userPhoto } = useContext(PostsContext);
  return (
    <div className="flex items-center space-x-4 mb-6">
      <img
        className="w-16 h-16 rounded-full object-cover"
        src={userPhoto || env.loggedUserData.photo}
        alt="Avatar"
      />
      <div>
        <h1 className="text-lg font-semibold text-[#111827]">{name}</h1>
        <p className="text-sm text-gray-400">{email}</p>
      </div>
      <div className="ml-auto flex space-x-6 text-sm text-gray-500">
        <div>
          <span className="font-medium text-[#111827]">{posts.length}</span>{" "}
          Posts
        </div>
      </div>
    </div>
  );
}
