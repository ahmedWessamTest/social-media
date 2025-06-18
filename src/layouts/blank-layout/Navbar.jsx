import logo from "../../../src/assets/Logomark.png";
import { User, Search } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostsContext } from "../../contexts/postsContext";
import {motion} from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const { setUserPhoto } = useContext(PostsContext);

  function handleLogout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user_data");
    localStorage.removeItem("userData");
    setUserPhoto(null);
    navigate("/signin");
  }

  return (
    <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-between items-center px-4 w-full h-16 text-gray-400 shadow-sm bg-white">
      <motion.img
      
 whileHover={{
    rotateY: 180,
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "loop"
    }
  }}   
      src={logo} alt="logo" className="h-8" />

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
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
        </div>

        <button className="text-black cursor-pointer" onClick={handleLogout}>
          Logout
        </button>
        <User className="text-black" />
      </div>
    </motion.div>
  );
};

export default Navbar;
