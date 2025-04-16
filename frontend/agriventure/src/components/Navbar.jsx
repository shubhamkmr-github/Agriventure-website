import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import {jwtDecode} from "jwt-decode";


const Navbar = ({isAuthenticated, setIsAuthenticated,role}) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (JWT exists in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      try {
        // Decode the JWT to get user details including role
        const decodedToken = jwtDecode(token);
        setUser({ name: decodedToken.sub || 'User' });
        console.log(userRole)
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser({ name: 'User' });
        setUserRole(null);
      }
    }
  }, [setIsAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    setUserRole(null);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Get current path and set active class
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          AgriVenture
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <span className={`menu-icon-bar ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`menu-icon-bar ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`menu-icon-bar ${isMenuOpen ? 'open' : ''}`}></span>
        </div>
        
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          
          {/* Show AddListing only for HOST or ADMIN */}
          {isAuthenticated && (role=="HOST" || role=="ADMIN") && (
            <li className="nav-item">
              <Link 
                to="/addListing" 
                className={`nav-link ${isActive('/addListing')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Add Listing
              </Link>
            </li>
          )}

          {!isAuthenticated ? (
            <li className="nav-item">
              <Link 
                to="/login" 
                className={`nav-link ${isActive('/login')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link 
                  to="/profile" 
                  className={`nav-link ${isActive('/profile')}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
              </li>
              
              <li className="nav-item">
                <button 
                  className="nav-link logout-btn"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;