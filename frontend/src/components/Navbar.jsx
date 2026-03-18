import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function getUser() {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Soltani Hotels
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="navbar-nav-container">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink end className="nav-link" to="/">
                  Menü
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/rooms">
                  Zimmer
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/book">
                  Zimmerreservierung
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/help">
                  Hilfe
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/impressum">
                  Impressum
                </NavLink>
              </li>
              {user?.role === 'admin' && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin">
                    Benutzerverwaltung
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          <div className="d-flex ml-auto align-items-center">
            {user ? (
              <>
                <span className="navbar-text me-2">Willkommen, {user.username}</span>
                <button className="btn btn-light me-2" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light me-2" to="/register">
                  Registrierung
                </Link>
                <Link className="btn btn-light me-2" to="/login">
                  Login
                </Link>
              </>
            )}
            <Link className="btn btn-light" to="/profil">
              Profilverwaltung
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

