import { useEffect } from "react";
import DNavbar from "../components/admin/DNavbar";
import DSidebar from "../components/admin/DSidebar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Layout() {
  const navigate= useNavigate();
  useEffect( ()=>{
    const token = localStorage.getItem('token');
    if(!token){
     navigate('/signin');
    }
  }, [])
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DNavbar />
      <DSidebar />
      
      <main className="ml-64 pt-20 px-6 text-gray-900 dark:text-white">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
