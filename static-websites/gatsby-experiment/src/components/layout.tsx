import * as React from "react"
import { Link } from 'gatsby';
import "./styles.scss"

const Layout = ({ children }) => {
    return (
        <div className="container">
            <nav className="navbar">
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item">Home</Link>
                        <Link to="/about" className="navbar-item">About</Link>
                        <Link to="/this-page-definitely-does-not-exist" className="navbar-item">404</Link>
                    </div>
                </div>
            </nav>
            <div className="content">
                {children}
            </div>
            <div>&copy; 2021</div>
        </div>
    )
}

export default Layout
