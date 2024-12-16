import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-wrap justify-between items-center m-4 sm:m-8">
      <div className="text-2xl sm:text-4xl font-extrabold text-red-500">
        Todo App
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
