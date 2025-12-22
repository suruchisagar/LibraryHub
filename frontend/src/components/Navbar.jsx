import { Link } from "react-router-dom";

function Navbar(){

    return(
        <div className="flex justify-between px-8 py-4 border-b border-gray-200 " >
            <div>
                logo
            </div>
            <div>
                <ul className="flex gap-8">
                    <li>Home</li>
                    <li>Pricing</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>
                        <Link to='/signin'>Login</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;