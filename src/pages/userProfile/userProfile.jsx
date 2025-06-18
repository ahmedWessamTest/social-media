import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import { env } from "../../environment/environment";
import Settings from "./settings/Settings";
import SavedPosts from "./savedPosts";
import MyPosts from "./myPosts";
import FriendSuggestions from "../../components/FriendSuggestions";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("myPosts");

  const profileData = env.loggedUserData;

  return (
    <>
      <div className=" sm:items-center  md:flex-row md:items-start bg-[#F9FAFB] text-[#111827] font-sans">
        {/* <Sidebar profile={profileData} /> */}
        <main className="py-10 grid lg:grid-cols-12 gap-3">
          <div className="space-y-6 col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pb-0">
              <ProfileHeader profile={profileData} />
              <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {activeTab === "settings" ? (
                <Settings />
              ) : activeTab === "savedPosts" ? (
                <SavedPosts />
              ) : (
                <MyPosts />
              )}
            </div>
          </div>
          <div className="col-span-4 hidden lg:block">
            <FriendSuggestions />
          </div>
        </main>
      </div>
    </>
  );
}
