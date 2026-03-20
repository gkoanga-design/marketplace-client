import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import { SERVICES, CATEGORIES } from '../assets/mockData';
import styles from './ServicesPage.module.css';

export default function ServicesPage() {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('Toutes');
  const [sort, setSort]         = useState('rating');

  const filtered = SERVICES
    .filter(s => category === 'Toutes' || s.category === category)
    .filter(s => s.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === 'rating' ? b.rating - a.rating : a.price.localeCompare(b.price));

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Explorer les services</h1>
        <p>{filtered.length} service{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}</p>
      </div>

      <div className={styles.layout}>
        {/* SIDEBAR FILTRES */}
        <aside className={styles.sidebar}>
          <h3>Filtres</h3>

          <div className={styles.filterGroup}>
            <label>Recherche</label>
            <input
              type="text"
              placeholder="Mot-clé..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>Catégorie</label>
            <div className={styles.catList}>
              <button
                className={category === 'Toutes' ? styles.catActive : styles.catBtn}
                onClick={() => setCategory('Toutes')}
              >
                Toutes
              </button>
              {CATEGORIES.map(c => (
                <button
                  key={c.name}
                  className={category === c.name ? styles.catActive : styles.catBtn}
                  onClick={() => setCategory(c.name)}
                >
                  {c.emoji} {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>Trier par</label>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="rating">Meilleures notes</option>
              <option value="price">Prix croissant</option>
            </select>
          </div>
        </aside>

        {/* GRILLE */}
        <div className={styles.grid}>
          {filtered.length > 0
            ? filtered.map((s, i) => <ServiceCard key={s.id} service={s} delay={i * 0.07} />)
            : (
              <div className={styles.empty}>
                <span>🔍</span>
                <p>Aucun service trouvé pour ces filtres</p>
                <button onClick={() => { setSearch(''); setCategory('Toutes'); }}>
                  Réinitialiser
                </button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
