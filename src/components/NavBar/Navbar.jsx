import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Header = () => {
    return (
        <nav className="Nav">
            <a className="Logo" href="/">
                <img src="/images/logo.svg" alt="Disney+" />
            </a>
            <div className="NavMenu">
                <NavLink to="/">
                    <img src="/images/home-icon.svg" alt="Home" />
                    <span>Home</span>
                </NavLink>
                <NavLink to="/tvseries">
                    <img src="images/series-icon.svg" alt="Series" />
                    <span>Series</span>
                </NavLink>
                <NavLink to="/movies">
                    <img src="/images/movie-icon.svg" alt="Movies" />
                    <span>Movies</span>
                </NavLink>
                {/* ... other NavLinks */}
            </div>
        </nav>
    );
};

export default Header;
