import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== passwordConfirm) {
      setError('Passwörter stimmen nicht überein.');
      return;
    }

    try {
      await api.post('/auth/register.php', { username, password });
      setSuccess('Registrierung erfolgreich! Willkommen ' + username);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Registrierung fehlgeschlagen');
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5 register">Registrierung</h1>
      <p className="text-center">Bitte registriere dich.</p>

      {success && <div className="alert alert-success">{success}</div>}
      {error && (
        <div className="alert alert-danger">
          <ul className="mb-0">
            <li>{error}</li>
          </ul>
        </div>
      )}

      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Passwort:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password_confirm">Passwort bestätigen:</label>
          <input
            type="password"
            id="password_confirm"
            className="form-control"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mr-2">
          Registrieren
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setUsername('');
            setPassword('')
            setPasswordConfirm('');
            setError('');
            setSuccess('');
          }}
        >
          Zurücksetzen
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;

