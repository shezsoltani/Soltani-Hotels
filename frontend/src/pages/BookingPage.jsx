import React, { useState } from 'react';
import api from '../api.js';

const BookingPage = () => {
  const [form, setForm] = useState({
    room_type: '',
    check_in_date: '',
    check_out_date: '',
    breakfast: false,
    parking: false,
    pets: false
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const currentErrors = [];

    if (!form.room_type) currentErrors.push('Zimmer-Typ ist erforderlich.');
    if (!form.check_in_date) currentErrors.push('Anreisedatum ist erforderlich.');
    if (!form.check_out_date) currentErrors.push('Abreisedatum ist erforderlich.');

    if (currentErrors.length) {
      setErrors(currentErrors);
      return;
    }

    setErrors([]);
    try {
      await api.post('/reservations/index.php', {
        room_id: 1,
        check_in_date: form.check_in_date,
        check_out_date: form.check_out_date,
        breakfast: form.breakfast,
        parking: form.parking,
        pets: form.pets
      });
      setMessage('Zimmerreservierung erfolgreich!');
    } catch {
      setErrors(['Fehler bei der Speicherung der Reservierung.']);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Zimmerreservierung</h1>

      {message && <div className="alert alert-success mt-3">{message}</div>}

      {errors.length > 0 && (
        <div className="alert alert-danger mt-3">
          <ul className="mb-0">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="zimmer_typ">Zimmer-Typ:</label>
          <select
            id="zimmer_typ"
            name="room_type"
            className="form-control"
            value={form.room_type}
            onChange={handleChange}
            required
          >
            <option value="">Bitte wählen...</option>
            <option value="Hotelzimmer">Hotelzimmer - 60€ pro Nacht</option>
            <option value="VIP-Zimmer">VIP-Zimmer - 150€ pro Nacht</option>
            <option value="Penthouse">Penthouse - 250€ pro Nacht</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="anreise_datum">Anreisedatum:</label>
          <input
            type="date"
            id="anreise_datum"
            name="check_in_date"
            className="form-control"
            value={form.check_in_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="abreise_datum">Abreisedatum:</label>
          <input
            type="date"
            id="abreise_datum"
            name="check_out_date"
            className="form-control"
            value={form.check_out_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="breakfast"
              name="breakfast"
              checked={form.breakfast}
              onChange={handleChange}
            />
            <label className="custom-control-label" htmlFor="breakfast">
              Frühstück (15€ pro Person/Tag)
            </label>
          </div>
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="parking"
              name="parking"
              checked={form.parking}
              onChange={handleChange}
            />
            <label className="custom-control-label" htmlFor="parking">
              Parkplatz (10€ pro Tag)
            </label>
          </div>
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="pets"
              name="pets"
              checked={form.pets}
              onChange={handleChange}
            />
            <label className="custom-control-label" htmlFor="pets">
              Haustiere erlaubt (20€ pro Tag)
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Reservieren
        </button>
      </form>
    </div>
  );
};

export default BookingPage;

