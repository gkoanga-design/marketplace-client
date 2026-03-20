import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from './App';
import ServiceCard from './components/ServiceCard';
import { SERVICES } from './assets/mockData';

// Test 1 — L'app se monte sans crash
test('App se monte correctement', () => {
  render(<App />);
  expect(screen.getByText(/ServiLink/i)).toBeInTheDocument();
});

// Test 2 — ServiceCard affiche le titre
test('ServiceCard affiche le titre du service', () => {
  render(
    <MemoryRouter>
      <ServiceCard service={SERVICES[0]} />
    </MemoryRouter>
  );
  expect(screen.getByText(SERVICES[0].title)).toBeInTheDocument();
});

// Test 3 — ServiceCard affiche le prix
test('ServiceCard affiche le prix', () => {
  render(
    <MemoryRouter>
      <ServiceCard service={SERVICES[0]} />
    </MemoryRouter>
  );
  expect(screen.getByText(/XOF/i)).toBeInTheDocument();
});

// Test 4 — Les données mock sont bien chargées
test('Les données mock contiennent des services', () => {
  expect(SERVICES.length).toBeGreaterThan(0);
  expect(SERVICES[0]).toHaveProperty('title');
  expect(SERVICES[0]).toHaveProperty('price');
});
