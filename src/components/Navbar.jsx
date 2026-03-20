import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo}>
        Servi<span>Link</span>
      </Link>

      <div className={styles.links}>
        <Link to="/services" className={location.pathname === '/services' ? styles.active : ''}>
          Services
        </Link>
        <a href="#categories">Catégories</a>
        <a href="#comment">Comment ça marche</a>
      </div>

      <div className={styles.actions}>
        <button className={styles.btnLogin}>Connexion</button>
        <button className={styles.btnRegister}>S'inscrire</button>
      </div>
    </nav>
  );
}
