import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ReservationPage from './pages/ReservationPage';
import ConfirmationPage from './pages/ConfirmationPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/"                   element={<HomePage />} />
          <Route path="/services"           element={<ServicesPage />} />
          <Route path="/services/:id"       element={<ServiceDetailPage />} />
          <Route path="/reserver/:id"       element={<ReservationPage />} />
          <Route path="/confirmation"       element={<ConfirmationPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
