import {FaBuilding,FaSignOutAlt,FaQuestionCircle,FaFileInvoiceDollar ,FaMoneyCheckAlt, FaCalendarCheck, FaMoneyBillWave, FaBook, FaUser, FaChartBar, FaCogs, FaThLarge, FaChair } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function SSidebar() {


  const navigate= useNavigate();
  function handleLogout(){
    localStorage.clear("token");
    navigate("/signin");
  }
  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-md fixed top-0 left-0">
      <div className="p-6 flex items-center gap-3">

  <h1 className="text-xl font-bold text-indigo-600 dark:text-white tracking-wide">
    Student Panel
  </h1>
</div>

      <nav className="flex flex-col p-4 gap-3">
        <Link to="/student/studentdashboard" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaThLarge />
          Dashboard
        </Link>

        <Link to="/student/bookaseat" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaBook />
         Book A Seat
        </Link>

        <Link to="/student/bookings" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
           <FaCalendarCheck />
          My bookings
        </Link>

        <Link to="/student/plan" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaMoneyCheckAlt />
          Plans And Subscription
        </Link>

        <Link to="/student/payment" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaFileInvoiceDollar />
          Payment & Invoices
        </Link>

        <Link to="/student/help" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
          <FaQuestionCircle />
          Help And Support
        </Link>

        

      </nav>
      

       <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Link to="/student/setting" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700">
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
