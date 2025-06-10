import React, { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import ChangePassword from "./ChangePassword";
import ChangeAvatar from "./ChangeAvatar";
import Logout from "./Logout";

export default function Settings() {
  const [tab, setTap] = useState("changeImage");

  return (
    <div className="flex gap-4">
      <SettingsSidebar activeTab={tab} TapHandler={setTap} />

      {tab === "changePassword" ? <ChangePassword /> : tab === "logout" ? <Logout /> : <ChangeAvatar />}
    </div>
  );
}
