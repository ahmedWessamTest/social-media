import React, { useState } from "react";
import Sidebar from "./SideBar";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import { env } from "../../environment/environment";
import Settings from "./settings/Settings";
import SavedPosts from "./savedPosts";
import MyPosts from "./myPosts";

export default function UserProfile() {
  // const [profileData, setProfileData] = React.useState(null);
  const [activeTab, setActiveTab] = useState("settings");

  // async function ProfileDataGetter() {
  //   const token = localStorage.getItem("userToken");
  //   try {
  //     const response = await axios.get("https://linked-posts.routemisr.com/users/profile-data", {
  //       headers: {
  //         token,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     setProfileData(response.data.user);
  //   } catch (error) {
  //     console.error("Failed to fetch profile data:", error);
  //     throw error;
  //   }
  // }

  // useEffect(() => {
  //   ProfileDataGetter();
  //   console.log(Tap);
  // }, [Tap]);

  const profileData = env.loggedUserData;

  return (
    <>
      <div className="flex  sm:flex-col sm:items-center  md:flex-row md:items-start min-h-screen bg-[#F9FAFB] text-[#111827] font-sans">
        {/* <Sidebar profile={profileData} /> */}

        <main className="p-10 w-3/4 sm:w-full md:w-2/3 lg:w-3/4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200  p-6">
            <ProfileHeader profile={profileData} />

            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === "settings" ? <Settings /> : activeTab === "savedPosts" ? <SavedPosts /> : <MyPosts />}
          </div>
        </main>
      </div>
    </>
  );
}
