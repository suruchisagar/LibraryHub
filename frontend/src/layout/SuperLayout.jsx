import Navbar from "../components/superAdmin/Navbar";
import DSidebarSuperAdmin from "../components/superAdmin/DSidebarSuperAdmin";
import { Outlet } from "react-router-dom";

function SuperLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar/>
      <DSidebarSuperAdmin/>
      
      <main className="ml-64 pt-20 px-6 text-gray-900 dark:text-white">
        <Outlet />
      </main>
    </div>
  );
}

export default SuperLayout;
