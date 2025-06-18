"use client";

import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Home, User } from "lucide-react";
import { env } from "../../environment/environment";
import { useContext } from "react";
import { PostsContext } from "../../contexts/postsContext";

export default function Sidebar(props) {
  const { userPhoto } = useContext(PostsContext);
  const { name } = props.profile || {};
  const location = useLocation();
  const navItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Profile", icon: User, href: "/profile" },
  ];

  return (
    <aside className="w-full h-fit sm:w-11/12 mt-10 bg-white border rounded-lg border-gray-200 p-6">
      {/* Profile section */}
      <div className="relative flex flex-col items-center space-y-2 mb-6">
        <div
          className="w-full h-20 rounded-lg bg-cover bg-center mb-6"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=400&q=80')",
          }}
        ></div>

        <img
          src={userPhoto || env.loggedUserData.photo}
          alt="Profile"
          className="w-16 object-cover h-16 rounded-full border-4 border-white -mt-12 shadow-md"
        />
        <div className="text-center">
          <h2 className="text-sm font-medium text-[#111827]">
            {name || "Unnamed"}
          </h2>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="text-sm text-gray-600 flex flex-col gap-3 sm:flex-row sm:justify-center sm:items-center sm:gap-10 md:flex-col md:items-start md:gap-2">
        {/* eslint-disable-next-line no-unused-vars */}
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = location.pathname === href;
          return (
            <Link
              key={label}
              to={href}
              className={clsx("flex items-center space-x-2 transition", {
                "text-[#111827] font-semibold": isActive,
                "hover:text-[#111827]": !isActive,
              })}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
