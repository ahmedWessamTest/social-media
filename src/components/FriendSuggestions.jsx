import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function FriendSuggestions({
  postsList = [
    {
      user: {
        _id: "1",
        name: "John Doe",
        photo: "https://linked-posts.routemisr.com/uploads/default-profile.png",
      },
    },
    {
      user: {
        _id: "2",
        name: "Jane ",
        photo: "https://linked-posts.routemisr.com/uploads/undefined",
      },
    },
    {
      user: {
        _id: "3",
        name: "Alice Johnson",
        photo: "https://linked-posts.routemisr.com/uploads/undefined",
      },
    },
    {
      user: {
        _id: "4",
        name: "Bob Smith",
        photo: "https://linked-posts.routemisr.com/uploads/default-profile.png",
      },
    },
    {
      user: {
        _id: "5",
        name: "Charlie Brown",
        photo: "https://linked-posts.routemisr.com/uploads/undefined",
      },
    },
    {
      user: {
        _id: "6",
        name: "Diana Prince",
        photo: "https://linked-posts.routemisr.com/uploads/default-profile.png",
      },
    },
  ],
}) {
  const usersList = postsList.map((post) => ({
    id: post.user._id,
    name: post.user.name,
    profilePicture:
      post.user.photo === "https://linked-posts.routemisr.com/uploads/undefined"
        ? `https://avatar.iran.liara.run/username?username=${post.user.name.split(" ")[0]}+${post.user.name.split(" ")[1] ?? ""}`
        : post.user.photo,
  }));

  // get 4 users randomly from usersList
  const randomUsers = usersList.sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <div
      className="flex flex-col justify-center items-center gap-8"
      // style={{ fontFamily: " sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji" }}
      // style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}
      style={{ fontFamily: " Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif" }}
    >
      <div className="m-2 border-1 border-[#ECF0F5] rounded-lg bg-white w-80 divide-y divide-[#ECF0F5] ">
        <h2 className="text-base font-semibold p-6 ps-10 text-[#0C1024]">Suggested Friends</h2>

        <div className="p-8 flex flex-col gap-6">
          {randomUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={user.profilePicture} alt={user.name} className="w-14 h-14 rounded-full mr-3 bg-gray-200" />

        <div className="flex flex-col gap-1.5">
          <h3 className="text-sm font-semibold text-[#0C1024]">{user.name}</h3>
          <p className="text-xs text-[#27364B]">ITI Student</p>
        </div>
      </div>

      <div
        className="w-8 h-8 rounded-md bg-[#F1F4F9] flex justify-center items-center hover:cursor-pointer hover:bg-[#E2E8F0] transition-colors duration-200 active:bg-[#D1D5DB]"
        onClick={() => console.log(`Followed ${user.name} - ${user.id}`)}
      >
        <Plus size={20} />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="flex flex-col justify-center items-center text-xs text-[#838B98]">
      <p>© 2023 DevCut. All rights reserved.</p>

      <ul className="flex gap-4  ">
        <Link to="/about">About</Link>
        <Link to="/help">Help</Link>
        <Link to="/privacy&terms">Privacy & Terms</Link>
      </ul>
    </div>
  );
}
