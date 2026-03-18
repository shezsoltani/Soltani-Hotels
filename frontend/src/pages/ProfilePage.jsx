import React, { useEffect, useState } from 'react';
import api from '../api.js';

const ProfilePage = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [reservations, setReservations] = useState([]);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/reservations/index.php');
        setReservations(res.data);
      } catch {
      }
    };
    load();
  }, []);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const currentErrors = [];
    setErrors([]);
    setSuccess('');

    if (!oldPassword || !newPassword || !newPasswordConfirm) {
      currentErrors.push('Bitte alle Passwort-Felder ausfüllen.');
    }
    if (newPassword !== newPasswordConfirm) {
      currentErrors.push('Neue Passwörter stimmen nicht überein.');
    }

    if (currentErrors.length) {
      setErrors(currentErrors);
      return;
    }

    try {
      await api.post('/profile/password.php', {
        old_password: oldPassword,
        new_password: newPassword
      });
      setSuccess('Passwort erfolgreich aktualisiert!');
      setOldPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    } catch (err) {
      setErrors([err.response?.data?.error || 'Fehler beim Aktualisieren des Passworts.']);
    }
  };

  return (
    <div className="container mt-4">
      <div className="profile-section">
        <h2>Profilverwaltung</h2>

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Benutzerdaten</h5>
            <p className="card-text">
              <strong>Benutzername:</strong> {user?.username}
            </p>
          </div>
        </div>

        {success && <div className="alert alert-success">{success}</div>}

        {errors.length > 0 && (
          <div className="alert alert-danger">
            <ul className="mb-0">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handlePasswordUpdate}>
          <h3>Passwort ändern</h3>
          <div className="form-group">
            <label htmlFor="old_password">Altes Passwort:</label>
            <input
              type="password"
              id="old_password"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new_password">Neues Passwort:</label>
            <input
              type="password"
              id="new_password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new_password_confirm">Neues Passwort bestätigen:</label>
            <input
              type="password"
              id="new_password_confirm"
              className="form-control"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Passwort aktualisieren
          </button>
        </form>
      </div>

      <div className="reservations-section mt-5">
        <h2>Meine Reservierungen</h2>
        {reservations.length === 0 ? (
          <div className="alert alert-info">Sie haben noch keine Reservierungen vorgenommen.</div>
        ) : (
          reservations.map((r) => (
            <div key={r.id} className="card reservation-card">
              <div className="card-header reservation-header">
                <h5 className="mb-0">{r.room_type || 'Zimmer'}</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Check-in:</strong> {r.check_in_date}
                    </p>
                    <p>
                      <strong>Check-out:</strong> {r.check_out_date}
                    </p>
                    {r.price && (
                      <p>
                        <strong>Grundpreis pro Nacht:</strong> {Number(r.price).toFixed(2)}€
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <p className="extra-services">
                      <strong>Zusatzleistungen:</strong>
                      <br />
                      {r.breakfast ? '✓ Frühstück (15€ pro Person/Tag)' : null}
                      {r.breakfast && <br />}
                      {r.parking ? '✓ Parkplatz (10€ pro Tag)' : null}
                      {r.parking && <br />}
                      {r.pets ? '✓ Haustiere (20€ pro Tag)' : null}
                      {!r.breakfast && !r.parking && !r.pets && 'Keine Zusatzleistungen gebucht'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

