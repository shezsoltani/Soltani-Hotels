import React from 'react';

const HelpPage = () => {
  return (
    <div className="content">
      <div className="help-header">
        <div className="container">
          <h1 className="text-center display-4">Willkommen auf der Hilfeseite</h1>
          <p className="text-center lead">
            Hier finden Sie die wichtigsten Informationen zu unserem Service
          </p>
          <p className="text-center">
            Schauen Sie in unsere FAQ oder kontaktieren Sie unseren 24/7 Kundenservice
          </p>
        </div>
      </div>

      <div className="container">
        <div className="customer-service text-center">
          <h4>Kundenservice</h4>
          <p className="lead mb-0">
            <i className="fas fa-phone mr-2"></i>
            +43 888 234 8899 (24/7 erreichbar)
          </p>
        </div>

        <div className="help-section">
          <h4 className="section-title">Häufig gestellte Fragen</h4>

          <div className="faq-item">
            <strong>Bezahlung</strong>
            <p className="qa">
              Zahlungen erfolgen ausschließlich online. Wir akzeptieren alle gängigen Zahlungsmethoden
              wie Mastercard, Debitcard, PayPal und weitere.
            </p>
          </div>

          <div className="faq-item">
            <strong>Stornierung</strong>
            <p className="qa">
              Sie können Ihre Buchung jederzeit kostenlos stornieren. Wir kümmern uns um die komplette
              Abwicklung.
            </p>
          </div>

          <div className="faq-item">
            <strong>Buchung</strong>
            <p className="qa">
              Mit einer Buchung reservieren Sie ein Zimmer für Ihren gewünschten Zeitraum. Hierfür
              benötigen Sie ein Kundenkonto bei uns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;

