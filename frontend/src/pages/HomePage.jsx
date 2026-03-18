import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="content">
      <div className="page-header">
        <div className="container">
          <h1 className="display-4">Willkommen zu Soltani Hotels</h1>
          <p className="lead">Entdecke unsere exklusiven Zimmerkategorien</p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="room-category">
              <h3>Hotelzimmer</h3>
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304"
                alt="Hotelzimmer"
              />
              <p className="description">
                Unsere komfortablen Standardzimmer bieten alles, was du für einen angenehmen Aufenthalt
                brauchst – modernes Design und alle wichtigen Annehmlichkeiten.
              </p>
              <ul className="features-list">
                <li>25m² Wohnfläche</li>
                <li>Kingsize-Bett</li>
                <li>Kostenfreies WLAN</li>
                <li>Klimaanlage</li>
              </ul>
              <p className="price">ab 60€ pro Nacht</p>
              <Link to="/rooms" className="btn btn-primary btn-lg btn-block book-btn">
                Jetzt buchen
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <div className="room-category">
              <h3>VIP-Zimmer</h3>
              <img
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39"
                alt="VIP-Zimmer"
              />
              <p className="description">
                Genieße zusätzlichen Luxus in unseren VIP-Zimmern mit exklusiver Ausstattung und
                besonderem Service.
              </p>
              <ul className="features-list">
                <li>40m² Wohnfläche</li>
                <li>Premium Kingsize-Bett</li>
                <li>Eigener Balkon</li>
                <li>Minibar inklusive</li>
              </ul>
              <p className="price">ab 150€ pro Nacht</p>
              <Link to="/rooms" className="btn btn-primary btn-lg btn-block book-btn">
                Jetzt buchen
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <div className="room-category">
              <h3>Penthouse</h3>
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427"
                alt="Penthouse"
              />
              <p className="description">
                Erlebe ultimativen Luxus in unserem Penthouse mit beeindruckendem Ausblick und
                erstklassiger Ausstattung.
              </p>
              <ul className="features-list">
                <li>80m² Wohnfläche</li>
                <li>Separate Schlafzimmer</li>
                <li>Private Terrasse</li>
                <li>24/7 Butler-Service</li>
              </ul>
              <p className="price">ab 250€ pro Nacht</p>
              <Link to="/rooms" className="btn btn-primary btn-lg btn-block book-btn">
                Jetzt buchen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

