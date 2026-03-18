import React from 'react';

const ImpressumPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Impressum</h1>

      <div className="section">
        <h3>Unternehmensinfo</h3>
        <p>
          <strong>Firma:</strong> Soltani Hotels
        </p>
        <p>
          <strong>Gegenstand:</strong> Hotelbetrieb
        </p>
        <p>
          <strong>UID:</strong> ATU12345678
        </p>
        <p>
          <strong>Firmenbuchnummer:</strong> FN123456a
        </p>
        <p>
          <strong>Gericht:</strong> Handelsgericht Wien
        </p>
        <p>
          <strong>Sitz:</strong> Hoechstaedtplatz 6, 1200 Wien
        </p>
      </div>

      <div className="section">
        <h3>Kontakt</h3>
        <div className="contact-icons">
          <p>
            <i className="bi bi-telephone"></i> Tel: +43 680 800 6868
          </p>
          <p>
            <i className="bi bi-envelope"></i>{' '}
            E-Mail: <a href="mailto:info@soltanihotels.com">info@soltanihotels.com</a>
          </p>
        </div>
      </div>

      <div className="section">
        <h3>Haftungsausschluss</h3>
        <p>
          Die Inhalte wurden sorgfältig erstellt, jedoch können wir keine Gewähr für deren Richtigkeit
          übernehmen.
        </p>
        <p>Wir haften nicht für Inhalte externer Websites, auf die wir verlinken.</p>
      </div>

      <div className="section">
        <h3>Urheberrecht</h3>
        <p>Alle Inhalte dieser Seiten unterliegen dem österreichischen Urheberrecht.</p>
      </div>

      <div className="mt-3">
        <h2>Ansprechpersonen</h2>

        <div className="d-flex justify-content-start flex-wrap">
          <div className="card person-card">
            <img src="/images/Shez.png" className="card-img-top" alt="Shez Abbas Soltani" />
            <div className="card-body">
              <h4 className="card-title">Shez Abbas Soltani</h4>
              <p className="card-text">Hotel Gründer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressumPage;

