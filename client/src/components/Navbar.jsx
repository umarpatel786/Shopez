import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useCart from '../hooks/useCart';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useContext(AuthContext);
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/login');
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-surface sticky-top shadow-sm py-3" style={{ zIndex: 1030 }}>
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-4 text-primary-custom d-flex align-items-center" to="/">
          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '40px', height: '40px' }}>
            <i className="bi bi-bag-fill fs-5"></i>
          </div>
          <span style={{ letterSpacing: '-0.5px' }}>SHOPEZ</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Search Bar - Center */}
          <div className="mx-auto my-3 my-lg-0 w-100" style={{ maxWidth: '450px' }}>
            <SearchBar />
          </div>

          {/* Right Links */}
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link fw-medium" style={{ color: 'var(--color-text-secondary)' }} to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link position-relative text-dark d-flex align-items-center" to="/cart">
                <div className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                  <i className="bi bi-cart3 fs-5"></i>
                </div>
                {itemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow-sm border border-white" style={{ fontSize: '0.7rem' }}>
                    {itemCount}
                  </span>
                )}
              </Link>
            </li>

            {isAuthenticated ? (
              <li className="nav-item dropdown" ref={dropdownRef}>
                <button
                  className="nav-link btn btn-link d-flex align-items-center border-0 shadow-none py-1"
                  onClick={toggleDropdown}
                  style={{ background: 'none', textDecoration: 'none' }}
                >
                  <img 
                    src={user?.avatar || 'https://ui-avatars.com/api/?name=' + (user?.name || 'U') + '&background=E2E8F0&color=0F172A'} 
                    alt="avatar" 
                    className="rounded-circle me-2 object-fit-cover shadow-sm border" 
                    width="40" 
                    height="40" 
                  />
                  <div className="d-none d-lg-block text-start me-2">
                    <div className="fw-semibold text-dark" style={{ fontSize: '0.85rem', lineHeight: '1' }}>{user?.name?.split(' ')[0] || 'User'}</div>
                    <div className="text-muted-custom" style={{ fontSize: '0.75rem' }}>{isAdmin ? 'Admin' : 'Customer'}</div>
                  </div>
                  <i className={`bi bi-chevron-${dropdownOpen ? 'up' : 'down'} small text-muted`}></i>
                </button>
                {dropdownOpen && (
                  <ul
                    className="dropdown-menu dropdown-menu-end shadow-soft border-0 show radius-12 mt-2 p-2"
                    style={{ position: 'absolute', right: 0, top: '100%', minWidth: '220px' }}
                  >
                    <li>
                      <Link className="dropdown-item py-2 radius-md d-flex align-items-center" to="/account/dashboard" onClick={() => setDropdownOpen(false)}>
                        <i className="bi bi-person me-3 text-muted"></i>My Account
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item py-2 radius-md d-flex align-items-center" to="/account/orders" onClick={() => setDropdownOpen(false)}>
                        <i className="bi bi-box-seam me-3 text-muted"></i>My Orders
                      </Link>
                    </li>
                    
                    {isAdmin && (
                      <>
                        <li><hr className="dropdown-divider opacity-25 my-2" /></li>
                        <li><h6 className="dropdown-header text-uppercase text-xs fw-bold">Admin Portal</h6></li>
                        <li>
                          <Link className="dropdown-item py-2 radius-md d-flex align-items-center" to="/admin/dashboard" onClick={() => setDropdownOpen(false)}>
                            <i className="bi bi-speedometer2 me-3 text-primary-custom"></i>Dashboard
                          </Link>
                        </li>
                      </>
                    )}
                    
                    <li><hr className="dropdown-divider opacity-25 my-2" /></li>
                    <li>
                      <button className="dropdown-item text-danger py-2 radius-md d-flex align-items-center" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-3"></i>Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-primary radius-lg shadow-sm" to="/login">
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
