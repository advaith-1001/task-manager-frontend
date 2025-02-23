import { Link } from "react-router-dom";
import '../styles/home.css'

const Home = () => {
    return (
        <div className="home-ctr">
            <div className="hero">
<div className="branding">
<p className="brand-name">Prodo</p>
<p className="tagline">Streamline Tasks, Boost Productivity, Stay Organized.</p>
</div>
<div className="login-ctr">
<button className="login-btn"><a href="/login">Login</a></button>
</div>
            </div>
        </div>
    );
}

export default Home