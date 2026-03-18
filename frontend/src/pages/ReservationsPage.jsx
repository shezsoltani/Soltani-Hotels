import React, { useEffect, useState } from 'react';
import api from '../api.js';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({
    check_in_date: '',
    check_out_date: '',
    room_id: 1,
    breakfast: false,
    parking: false,
    pets: false
  });
  const [message, setMessage] = useState('');

  const load = async () => {
    try {
      const res = await api.get('/reservations/index.php');
      setReservations(res.data);
    } catch (e) {
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await api.post('/reservations/index.php', form);
      setMessage('Reservierung angelegt');
      load();
    } catch (err) {
      setMessage('Fehler beim Anlegen der Reservierung');
    }
  };

  return (
    <section>
      <h2>Meine Reservierungen</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Check-In</label>
          <input type="date" name="check_in_date" value={form.check_in_date} onChange={handleChange} />
        </div>
        <div>
          <label>Check-Out</label>
          <input type="date" name="check_out_date" value={form.check_out_date} onChange={handleChange} />
        </div>
        <div>
          <label>Zimmer-ID</label>
          <input type="number" name="room_id" value={form.room_id} onChange={handleChange} />
        </div>
        <div>
          <label>
            <input type="checkbox" name="breakfast" checked={form.breakfast} onChange={handleChange} />
            Frühstück
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="parking" checked={form.parking} onChange={handleChange} />
            Parkplatz
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="pets" checked={form.pets} onChange={handleChange} />
            Haustiere
          </label>
        </div>
        <button type="submit">Reservieren</button>
      </form>
      {message && <p>{message}</p>}

      <ul>
        {reservations.map((r) => (
          <li key={r.id}>
            #{r.id} – {r.check_in_date} bis {r.check_out_date} – Status: {r.status}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ReservationsPage;

