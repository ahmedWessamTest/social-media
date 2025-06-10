import React from "react";
import PostLayout from "../../components/postLayout/postLayout";

const UserProfile = () => {
  return (
    <div className="grid py-7 md:grid-cols-3 gap-x-10">
      <div></div>
      <div className="feed">
        <PostLayout />
      </div>
      <div></div>
    </div>
  );
};

export default UserProfile;
