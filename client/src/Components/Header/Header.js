import { Link } from "react-router-dom"
// import './Header.css'
const Header = () => {
    return <>
        <nav className="navbar navbar-expand-lg bg-dark m-2">
            <div className="container-fluid">
                <Link to='/' className="nav-link">AWS S3 SDK</Link>
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item" style={{ marginRight: '1rem', textDecoration: 'none' }}>
                        <Link to='/list' className="nav-link">S3 Buckets</Link>
                    </li>
                   

                </ul>

            </div>
        </nav>
    </>
}
export default Header;

