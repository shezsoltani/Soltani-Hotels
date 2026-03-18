import React, { useEffect, useState } from 'react';
import api from '../api.js';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [error, setError] = useState('');

  const loadRooms = async () => {
    setError('');
    try {
      const params = {};
      if (from && to) {
        params.from = from;
        params.to = to;
      }
      const res = await api.get('/rooms/index.php', { params });
      setRooms(res.data);
    } catch (err) {
      setError('Zimmer konnten nicht geladen werden');
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <section>
      <h2>Verfügbare Zimmer</h2>
      <div>
        <label>Von</label>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        <label>Bis</label>
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        <button onClick={loadRooms}>Suchen</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {rooms.map((r) => (
          <li key={r.id}>
            Zimmer {r.room_number || r.id} – {r.room_type} – {r.price}€
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RoomsPage;

