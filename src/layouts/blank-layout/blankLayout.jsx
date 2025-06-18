import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "../../pages/userProfile/Sidebar.jsx"
import { env } from "../../environment/environment";

const BlankLayout = () => {
  const isAuth = !!localStorage.getItem("userToken") || null;
  const profileData = env.loggedUserData;

  return !isAuth ? (
    <Navigate to="/signin" />
  ) : (
    <div className="bg-gray-50">
      <Navbar />
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-12 overflow-hidden">
          <aside className="hidden md:block lg:col-span-3   ">
            <Sidebar profile={profileData} />
          </aside>

          {/* Main content area */}
          <main className="lg:col-span-9 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlankLayout;
