import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { SERVICES, CATEGORIES } from '../assets/mockData';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/services?q=${search}`);
  };

  return (
    <div className={styles.page}>

      {/* ── HERO ─────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroNoise} />
        <div className={styles.heroContent}>
          <span className={styles.badge} >🌍 Marketplace internationale de services</span>
          <h1 className={`${styles.heroTitle} fade-up fade-up-d1`}>
            Trouvez le prestataire<br />
            <span className={styles.accent}>idéal pour votre projet</span>
          </h1>
          <p className={`${styles.heroSub} fade-up fade-up-d2`}>
            Des milliers de prestataires vérifiés en Afrique et dans le monde.<br />
            Réservez, payez et suivez vos services en toute sécurité.
          </p>

          <form className={`${styles.searchBar} fade-up fade-up-d3`} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Ex: développement web, logo, traduction..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            <select className={styles.searchSelect}>
              <option>Toutes les catégories</option>
              {CATEGORIES.map(c => <option key={c.name}>{c.name}</option>)}
            </select>
            <button type="submit" className={styles.searchBtn}>Rechercher</button>
          </form>

          <div className={`${styles.heroStats} fade-up fade-up-d4`}>
            <div><strong>12 000+</strong><span>Prestataires</span></div>
            <div className={styles.divider} />
            <div><strong>48 pays</strong><span>Couverts</span></div>
            <div className={styles.divider} />
            <div><strong>98%</strong><span>Satisfaction</span></div>
          </div>
        </div>
      </section>

      {/* ── CATÉGORIES ───────────────────────────── */}
      <section className={styles.section} id="categories">
        <div className={styles.sectionHead}>
          <h2>Explorer par catégorie</h2>
          <a href="/services" className={styles.seeAll}>Voir tout →</a>
        </div>
        <div className={styles.categoriesGrid}>
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.name}
              className={`${styles.catCard} fade-up`}
              style={{ animationDelay: `${i * 0.07}s` }}
              onClick={() => navigate(`/services?cat=${cat.name}`)}
            >
              <span className={styles.catEmoji}>{cat.emoji}</span>
              <span className={styles.catName}>{cat.name}</span>
              <span className={styles.catCount}>{cat.count} services</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES POPULAIRES ──────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Services populaires</h2>
          <a href="/services" className={styles.seeAll}>Voir tout →</a>
        </div>
        <div className={styles.servicesGrid}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} delay={i * 0.08} />
          ))}
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ────────────────────── */}
      <section className={styles.howSection} id="comment">
        <h2 className="fade-up">Comment ça marche ?</h2>
        <p className={`${styles.howSub} fade-up fade-up-d1`}>Réservez un service en 3 étapes simples</p>
        <div className={styles.steps}>
          {[
            { n: '01', icon: '🔍', title: 'Recherchez', desc: 'Trouvez le service et le prestataire qui correspond à votre besoin parmi des milliers d\'offres vérifiées.' },
            { n: '02', icon: '📅', title: 'Réservez', desc: 'Choisissez une date, remplissez vos informations et effectuez le paiement sécurisé via notre plateforme.' },
            { n: '03', icon: '✅', title: 'Validez', desc: 'Suivez l\'exécution en temps réel, validez la prestation et laissez votre avis.' },
          ].map((step, i) => (
            <div key={step.n} className={`${styles.step} fade-up`} style={{ animationDelay: `${i * 0.15}s` }}>
              <span className={styles.stepNum}>{step.n}</span>
              <span className={styles.stepIcon}>{step.icon}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className={styles.cta}>
        <h2>Prêt à trouver votre prestataire ?</h2>
        <p>Rejoignez des milliers de clients satisfaits sur ServiLink</p>
        <button className={styles.ctaBtn} onClick={() => navigate('/services')}>
          Explorer les services →
        </button>
      </section>

    </div>
  );
}
