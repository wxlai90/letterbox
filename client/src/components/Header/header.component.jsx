import React, { useState } from 'react'
import './header.styles.css'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Header = () => {

    const [showNav, setShowNav] = useState(true)

    const styles = {
        backgroundColor: 'rgb(252, 64, 95)',
        marginBottom: '10px'
    }

    const toggleNav = () => {
        setShowNav(s => !s)
    }


    return (
        <nav>
            <div>
                <Link to="/" className="navbar-brand">Letterbox</Link>
            </div>

            <ul className={showNav ? "nav-toggle" : null}>
                <li>
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li>
                    <Link to="/box/new" className="nav-link">Get a box</Link>
                </li>
            </ul>

            <div className="hamburger" onClick={toggleNav}>
                <span className={showNav ? "hamburger-icon" : "hamburger-icon hamburger-cross"}></span>
            </div>
        </nav>
    )
}

// <nav className="navbar navbar-expand-lg navbar-dark" style={styles}>
// <Link to="/" className="navbar-brand">Letterbox</Link>
// <ul className="navbar-nav ml-auto">
//     <li className="nav-item active">
//         <Link to="/" className="nav-link">Home</Link>
//     </li>
//     <li className="nav-item active">
//         <Link to="/box/new" className="nav-link">Get a box</Link>
//     </li>
// </ul>
// </nav>

export default Header