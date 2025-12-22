import { Outlet } from "react-router-dom";
import SNavbar from "../components/student/SNavbar";
import SSidebar from "../components/student/SSidebar";

function SuperLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SNavbar/>
      <SSidebar/>
      
      <main className="ml-64 pt-20 px-6 text-gray-900 dark:text-white">
        <Outlet />
      </main>
    </div>
  );
}

export default SuperLayout;
