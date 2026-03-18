import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-dark mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-3 item">
            <h3>Services</h3>
            <ul>
              <li>
                <Link to="/">Menü</Link>
              </li>
              <li>
                <Link to="/rooms">Zimmer</Link>
              </li>
              <li>
                <Link to="/help">Hilfe</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-6 col-md-3 item">
            <h3>Über uns</h3>
            <ul>
              <li>
                <a href="#">Unternehmen</a>
              </li>
              <li>
                <a href="#">Team</a>
              </li>
              <li>
                <a href="#">Karriere</a>
              </li>
            </ul>
          </div>
          <div className="col-md-6 item text">
            <h3>Soltani Hotels</h3>
            <p>Willkommen bei Soltani Hotels - Ihrem vertrauenswürdigen Partner für atemberaubende Erlebnisse.</p>
          </div>
          <div className="col item social">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <p className="copyright">Soltani Hotels © 2024</p>
      </div>
    </footer>
  );
};

export default Footer;

