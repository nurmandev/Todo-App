import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/User";
import Switch from "./Switch";
import { useTheme } from "../context/Theme";

function Navbar() {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { logout: handleLogout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div className="flex flex-wrap justify-between items-center p-4 sm:p-8">
      <div className="flex items-center gap-4">
        <Switch
          isChecked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
        />
        <div className="text-2xl sm:text-4xl font-extrabold text-red-500">
          Todo App
        </div>
      </div>

      {location.pathname === "/" ? (
        <div className="flex flex-wrap gap-4 items-center mt-4 sm:mt-0">
          <Link to="/signin">
            <span className="text-lg sm:text-xl font-bold">Login</span>
          </Link>
          <Link to="/signup">
            <button className="p-2 px-4 bg-red-500 text-white rounded text-base sm:text-lg font-bold">
              Start for Free
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 items-center mt-4 sm:mt-0">
          <Link to="/create">
            <button className="p-2 px-4 bg-red-500 text-white rounded text-base sm:text-lg font-bold">
              Create new Todo
            </button>
          </Link>
          <Link to="/">
            <button
              className="p-2 px-4 bg-red-500 text-white rounded text-base sm:text-lg font-bold"
              onClick={logout}
            >
              Logout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
