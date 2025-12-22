import {FaBuilding,FaSignOutAlt , FaMoneyBillWave, FaBook, FaUser, FaChartBar, FaCogs, FaThLarge, FaChair } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function DSidebar() {


  const navigate= useNavigate();
  function handleLogout(){
    localStorage.clear();
    // localStorage.removeItem("token");
    navigate("/signin");
  }
  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-md fixed top-0 left-0">
      <div className="p-6 flex items-center gap-3">

  <h1 className="text-xl font-bold text-indigo-600 dark:text-white tracking-wide">
    Admin Panel
  </h1>
</div>

      <nav className="flex flex-col p-4 gap-3">
        <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaThLarge />
          Dashboard
        </Link>

        <Link to="/admin/booking" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaBook />
         Booking
        </Link>

        <Link to="/admin/branches" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
           <FaBuilding />
          Branches
        </Link>

        <Link to="/admin/users" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaUser />
          Users
        </Link>

        <Link to="/admin/seats" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaChair />
          Seat Management
        </Link>

        <Link to="/admin/report" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaChartBar />
          Reports
        </Link>

        <Link to="/admin/payments" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaMoneyBillWave />
          Payments
        </Link>

        
      </nav>
      

       <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Link to="/admin/setting" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaCogs />
          Setting
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
