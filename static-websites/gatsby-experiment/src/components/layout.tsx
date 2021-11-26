import * as React from "react"
import { Link } from 'gatsby';

const Layout = ({ children }) => {
    return (
        <>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </div>
            {children}
            <div>&copy; 2021</div>
        </>
    )
}

export default Layout
