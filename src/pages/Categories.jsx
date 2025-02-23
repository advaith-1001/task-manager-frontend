import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import '../styles/categories.css'

function Categories() {

    return(
        <div className="categories">
            <Navbar />
            <div className="categories-sidebar-ctr">
                <Sidebar />
                <div className="categories-ctr">
                    <p>This is categories page</p>
                </div>
            </div>
        </div>
    );


}

export default Categories