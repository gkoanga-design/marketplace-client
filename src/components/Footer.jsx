/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <span className={styles.logo}>Servi<span>Link</span></span>
          <p>La marketplace internationale de mise en relation entre clients et prestataires de services.</p>
        </div>
        <div className={styles.links}>
          <div>
            <h4>Clients</h4>
            <a href="/services">Trouver un service</a>
            <a href="/#comment">Comment ça marche</a>
            <a href="/services">Avis & notes</a>
          </div>
          <div>
            <h4>Prestataires</h4>
            <a href="/services">Proposer un service</a>
            <a href="/services">Tableau de bord</a>
            <a href="/services">Devenir partenaire</a>
          </div>
          <div>
            <h4>Légal</h4>
            <a href="/">Conditions d'utilisation</a>
            <a href="/">Confidentialité</a>
            <a href="/">Contact</a>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2025 ServiLink — Projet de fin de cycle DITI 5</span>
        <span>ISI — Institut Supérieur d'Informatique</span>
      </div>
    </footer>
  );
}
