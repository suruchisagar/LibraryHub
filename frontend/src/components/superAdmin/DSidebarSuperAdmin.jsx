import {
  FaThLarge,
  FaUserShield,
  FaBuilding,
  FaUsers,
  FaChair,
  FaBook,
  FaMoneyBillWave,
  FaChartBar,
  FaCogs,
  FaSignOutAlt,
  FaListAlt,
  FaTools,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function DSidebarSuperAdmin() {

  const navigate= useNavigate();
  function handleLogout(){
    localStorage.clear("token");
    navigate("/signin");
  }

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-md fixed top-0 left-0">
      {/* Header */}
      <div className="p-6 flex items-center gap-3">
        <h1 className="text-xl font-bold text-indigo-600 dark:text-white tracking-wide">
          SuperAdmin Panel
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-4 gap-3">
        <Link to="/superadmin/dashboard" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaThLarge />
          Dashboard
        </Link>

        <Link to="/superadmin/user" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaUsers />
          Users
        </Link>

        <Link to="/superadmin/booking" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaBook />
          Bookings
        </Link>

        <Link to="/superadmin/payment" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaMoneyBillWave />
          Payments
        </Link>

        <Link to="/superadmin/plan" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaListAlt />
          Plans
        </Link>

        <Link to="/superadmin/report" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaChartBar />
          Reports
        </Link>


      </nav>

      {/* Bottom Settings & Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <Link to="/superadmin/setting" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaCogs />
          Settings
        </Link>

         <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded w-full text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-gray-700">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}
