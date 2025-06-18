import { Button } from "flowbite-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../../contexts/postsContext";

export default function Logout() {
  const { setUserPhoto } = useContext(PostsContext);
  const navigate = useNavigate();

  function handleLogout() {
    // Clear user data and token from local storage
    localStorage.removeItem("userToken");
    localStorage.removeItem("user_data");
    localStorage.removeItem("userData");
    setUserPhoto(null);
    // localStorage.removeItem("userData");

    navigate("/signin");

    // Optionally, you can also reload the page to ensure a fresh start
    // window.location.reload();
  }

  return (
    <div className="text-sm space-y-3">
      <p>Are you sure you want o logout?</p>

      <p className="text-red-700 mb-8">
        Any unsaved data or incomplete actions will be lost!
      </p>

      <Button
        className="hover:cursor-pointer"
        color="red"
        outline
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}
