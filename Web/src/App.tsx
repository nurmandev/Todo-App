import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";
import Todos from "./components/Todos";
import Create from "./components/Create";
import { UserProvider } from "./context/User";
import { useTheme } from "./context/Theme";

function App() {
  const { isDarkMode } = useTheme();
  return (
    <div className={`${isDarkMode ? "bg-black text-white dark" : ""}`}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/create" element={<Create />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
