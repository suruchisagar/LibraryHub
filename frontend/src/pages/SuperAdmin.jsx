import DNavbar from "../components/admin/DNavbar"
import DSidebar from "../components/admin/DSidebar"
import DSidebarSuperAdmin from "../components/superAdmin/DSidebarSuperAdmin";
import Navbar from "../components/superAdmin/Navbar";
function SuperAdmin(){

    return(
    <div>
        <Navbar/>
        <DSidebarSuperAdmin/>
            
        </div>

    )
}
export default SuperAdmin;
