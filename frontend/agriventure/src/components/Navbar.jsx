import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Refs for navigation elements
  const navbarRef = useRef(null);
  const horiSelectorRef = useRef(null);

  useEffect(() => {
    // Check if user is logged in (JWT exists in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // You could decode the JWT to get user details
      setUser({ name: 'User' });
    }

    // Initial setup for horizontal selector
    setTimeout(() => {
      handleSelectorPosition();
    }, 100);

    // Add resize event listener
    window.addEventListener('resize', () => {
      setTimeout(() => {
        handleSelectorPosition();
      }, 500);
    });

    // Cleanup resize event listener
    return () => {
      window.removeEventListener('resize', handleSelectorPosition);
    };
  }, []);

  // Watch for location changes to update active state
  useEffect(() => {
    setTimeout(() => {
      handleSelectorPosition();
    }, 100);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setTimeout(() => {
      handleSelectorPosition();
    }, 300);
  };

  // Function to handle positioning of the selector
  const handleSelectorPosition = () => {
    if (!navbarRef.current || !horiSelectorRef.current) return;
    
    const activeItem = navbarRef.current.querySelector('.active');
    if (!activeItem) return;
    
    const activeHeight = activeItem.clientHeight;
    const activeWidth = activeItem.clientWidth;
    const itemPos = activeItem.getBoundingClientRect();
    const navPos = navbarRef.current.getBoundingClientRect();
    
    const top = itemPos.top - navPos.top;
    const left = itemPos.left - navPos.left;
    
    horiSelectorRef.current.style.top = `${top}px`;
    horiSelectorRef.current.style.left = `${left}px`;
    horiSelectorRef.current.style.height = `${activeHeight}px`;
    horiSelectorRef.current.style.width = `${activeWidth}px`;
  };

  // Handle navigation item click
  const handleNavItemClick = (e, path) => {
    const navItems = navbarRef.current.querySelectorAll('li');
    navItems.forEach(item => item.classList.remove('active'));
    e.currentTarget.classList.add('active');
    handleSelectorPosition();
    
    // Close mobile menu after click
    if (window.innerWidth < 992) {
      setIsMenuOpen(false);
    }
    
    navigate(path);
  };

  // Get current path and set active class
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-custom navbar-mainbg">
      <Link to="/" className="navbar-brand navbar-logo">
        AgriVenture
      </Link>
      <button 
        className="navbar-toggler" 
        type="button" 
        aria-controls="navbarSupportedContent" 
        aria-expanded={isMenuOpen ? "true" : "false"} 
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <i className="fas fa-bars text-white"></i>
      </button>
      
      <div 
        className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} 
        id="navbarSupportedContent"
        ref={navbarRef}
      >
        <ul className="navbar-nav ml-auto">
          <div className="hori-selector" ref={horiSelectorRef}>
            <div className="left"></div>
            <div className="right"></div>
          </div>
          
          <li className={`nav-item ${isActive('/')}`} onClick={(e) => handleNavItemClick(e, '/')}>
            <Link className="nav-link" to="/">
              <i className="fas fa-tachometer-alt"></i>Home
            </Link>
          </li>
          <li className={`nav-item ${isActive('/addListing')}`} onClick={(e) => handleNavItemClick(e, '/addListing')}>
                <Link className="nav-link" to="/addListing">
                  <i className="fas fa-user"></i>AddListing
                </Link>
            </li>

          
          {!isAuthenticated ? (
            <>
              <li className={`nav-item ${isActive('/login')}`} onClick={(e) => handleNavItemClick(e, '/login')}>
                <Link className="nav-link" to="/login">
                  <i className="fas fa-sign-in-alt"></i>Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={`nav-item ${isActive('/profile')}`} onClick={(e) => handleNavItemClick(e, '/profile')}>
                <Link className="nav-link" to="/profile">
                  <i className="fas fa-user"></i>Profile
                </Link>
              </li>
              
              <li className="nav-item" onClick={(e) => {
                handleNavItemClick(e, '/login');
                handleLogout();
              }}>
                <a className="nav-link" href="#!">
                  <i className="fas fa-sign-out-alt"></i>Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;