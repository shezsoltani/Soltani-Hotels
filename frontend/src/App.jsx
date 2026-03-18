import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import RoomsPage from './pages/RoomsPage.jsx';
import ReservationsPage from './pages/ReservationsPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import HomePage from './pages/HomePage.jsx';
import HelpPage from './pages/HelpPage.jsx';
import ImpressumPage from './pages/ImpressumPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

function getUser() {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}

const App = () => {
  const user = getUser();

  return (
    <>
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route
            path="/reservations"
            element={user ? <ReservationsPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/profil"
            element={user ? <ProfilePage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/admin"
            element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;

