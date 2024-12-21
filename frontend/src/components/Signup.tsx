import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import s from "../assets/1.jpg";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [postInputs, setPostInputs] = useState({
    name: "John Doe",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function signupReq() {
    try {
      const response = await axios.post(
        "https://test-todo-wdtk.onrender.com/api/v1/auth/register",
        postInputs
      );

      const jwtToken = response.data.token;
      localStorage.setItem("token", jwtToken);

      // Show success toast notification
      toast.success("Signup successful! Redirecting...", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => navigate("/signin"), 3000); // Redirect after 3 seconds
    } catch (e: unknown) {
      console.error(e);

      // Type assertion to AxiosError to access the response
      if (axios.isAxiosError(e)) {
        const errorMsg =
          e.response?.data?.message || "Signup failed. Please try again.";
        toast.error(errorMsg, {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.error("An unknown error occurred. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-8 ">
      {/* Toast Container */}
      <ToastContainer />

      <div className="flex flex-col sm:flex-row w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex flex-col items-center w-full sm:w-1/2 p-6 sm:p-8">
          <div className="text-3xl sm:text-5xl font-extrabold text-gray-800 mb-6">
            Sign Up
          </div>
          <div className="w-full max-w-sm">
            {/* Username Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                placeholder="Enter Username"
                className="w-full h-12 p-4 border rounded-lg focus:ring-2 focus:ring-red-500"
                onChange={(e) =>
                  setPostInputs({
                    ...postInputs,
                    email: e.target.value,
                  })
                }
              />
            </div>
            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  className="w-full h-12 p-4 pr-10 border rounded-lg focus:ring-2 focus:ring-red-500"
                  onChange={(e) =>
                    setPostInputs({
                      ...postInputs,
                      password: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {/* Submit Button */}
            <button
              className="w-full py-3 px-4 bg-red-500 text-white text-lg font-semibold rounded-full hover:bg-red-600 focus:ring-4 focus:ring-red-400 transition duration-300"
              onClick={signupReq}
            >
              Sign Up
            </button>

            <div className="mt-4 text-center">
              Already have an account?{" "}
              <Link
                to={"/signin"}
                className="underline text-red-500 hover:text-red-600"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full sm:w-1/2 flex items-center justify-center p-4 bg-gray-50">
          <img
            src={s}
            alt="Signup illustration"
            className="w-full h-auto max-h-96 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
