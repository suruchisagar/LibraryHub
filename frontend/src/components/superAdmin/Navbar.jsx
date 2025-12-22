import { useEffect, useState } from "react";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Get current date
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="ml-64 w-[calc(100%-16rem)] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between shadow-sm">

      {/* Left Section: Search + Date */}
      <div className="flex-1 max-w-2xl flex items-center gap-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-5 py-2 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {/* Date */}
        <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
          {currentDate}
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 ml-6">
        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? (
            <FaSun className="text-yellow-500 text-sm" />
          ) : (
            <FaMoon className="text-gray-600 text-sm" />
          )}
        </button>

        {/* Notification Icon */}
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
          <FaBell className="text-gray-600 dark:text-gray-300 text-sm" />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-800 dark:text-white">
            {username || "User"}
          </span>
        </div>
      </div>
    </div>
  );
}

