import React, { useEffect, useState } from 'react';
import api from '../api.js';

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [resRes, resUsers] = await Promise.all([
          api.get('/admin/reservations.php'),
          api.get('/admin/users.php')
        ]);
        setReservations(resRes.data);
        setUsers(resUsers.data);
      } catch {
      }
    };
    load();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <h3 className="mt-4">Benutzerverwaltung</h3>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Rolle</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>{u.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mt-5">Reservierungen</h3>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Benutzer-ID</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id}>
                <td>{r.user_id}</td>
                <td>{r.check_in_date}</td>
                <td>{r.check_out_date}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

