import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {

    const styles = {
        backgroundColor: 'rgb(252, 64, 95)',
        marginBottom: '10px'
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={styles}>
            <Link to="/" className="navbar-brand">Letterbox</Link>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/box/new" className="nav-link">Get a box</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header