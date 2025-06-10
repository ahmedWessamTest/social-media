import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "../../pages/userProfile/SideBar";
import { env } from "../../environment/environment";

const BlankLayout = () => {
  const isAuth = !!localStorage.getItem("userToken") || null;
  const profileData = env.loggedUserData;

  return !isAuth ? (
    <Navigate to="/signin" />
  ) : (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block md:w-64 lg:w-72 h-fit  ">
          <Sidebar profile={profileData} />
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BlankLayout;
