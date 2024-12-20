import Navbar from "./Navbar";
import home from "../assets/home.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faApple, faAndroid } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left column */}
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:ml-24 mt-12 sm:mt-8 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
                Organize your
                <br />
                work and
                <br />
                life, finally.
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6">
                Simplify life for both you and your team with the
                <br />
                world's #1 to-do list app.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-500 mb-8">
                374K+
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400 mx-1"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400 mx-1"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400 mx-1"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400 mx-1"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400 mx-1"
                />
                reviews from
                <FontAwesomeIcon icon={faApple} className="mx-2" />
                <FontAwesomeIcon icon={faAndroid} className="mx-2" />
              </p>
              <Link to={"/signup"}>
                <button className="bg-red-500 text-white font-semibold py-3 px-8 rounded-full text-base sm:text-lg hover:bg-red-600 transition duration-300">
                  Start for free
                </button>
              </Link>
            </div>

            {/* Right column */}
            <div className="lg:w-1/2 relative lg:mr-24">
              <div className="bg-pink-100 rounded-lg p-4">
                <img
                  src={home}
                  alt="Todoist app interface"
                  className="rounded-lg shadow-lg w-full max-w-sm lg:max-w-full mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
