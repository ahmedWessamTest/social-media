import logo from "../../../src/assets/Logomark.png"
import { User, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-4 w-full h-16 text-gray-400 shadow-sm bg-white">
      <img src={logo} alt="logo" className="h-8" />

      {/* Search Bar */}
      <div className="flex items-center relative w-1/2 max-w-md">
        <input
          className="outline-none w-full px-5 py-1 pl-10 border border-gray-300 rounded-md text-black"
          type="text"
          placeholder="Search"
        />
        <Search className="absolute left-3 text-gray-400" />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-3 text-black md:hidden">
          <Link to="/home" className="hover:underline">Home</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
        </div>

        <button className="text-black">Logout</button>
        <User className="text-black" />
      </div>
    </div>
  );
};

export default Navbar;
