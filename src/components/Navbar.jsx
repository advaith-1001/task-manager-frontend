import { useState, useEffect , useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import '../styles/navbar.css'
import { Link } from "react-router-dom";

function Navbar() {

    const [userDetails, setUserDetails] = useState(null);
    const { logout, token } = useContext(AuthContext);  // Get token from AuthContext

    useEffect(() => {
        if (!token) return;  // Ensure token exists before making the request

        axios.get("http://localhost:8080/api/users/me", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setUserDetails(response.data);
            })
            .catch(error => {
                console.error("Error fetching user details", error);
            });
    }, [token]); 

    return(
        <nav className="navbar">
            <Link className="prodo-link" to="/dashboard"><h1 className="inter-brand-name">Prodo</h1></Link>
            <div className="name-logout-ctr">
            {userDetails ? (
                <div>
                    <p className="inter-generic">Welcome, {userDetails.username}</p>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
            <button className="inter-btn" onClick={logout}>Logout</button>
            </div>
        </nav>
    );

}

export default Navbar