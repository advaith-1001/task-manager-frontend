import '../styles/sidebar.css'

function Sidebar() {
    return(
        <div className="sidebar">
            <ul className='sidebar-links'>
                <li><a href="/tasks" className='inter-sidebar-link'>Tasks</a></li>
                {/* <li><a href="/categories" className='inter-sidebar-link'>Categories</a></li>
                <li><a href="" className='inter-sidebar-link'>Projects</a></li> */}
                <li><a href="/analytics" className='inter-sidebar-link'>Analytics</a></li>
            </ul>
            {/* <a href="" className='inter-sidebar-link'>Settings</a> */}
        </div>
    );
}

export default Sidebar