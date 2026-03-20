import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVICES } from '../assets/mockData';
import styles from './ServiceDetailPage.module.css';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === parseInt(id));

  if (!service) return (
    <div className={styles.notFound}>
      <h2>Service introuvable</h2>
      <button onClick={() => navigate('/services')}>← Retour</button>
    </div>
  );

  return (
    <div className={styles.page}>
      {/* BREADCRUMB */}
      <div className={styles.breadcrumb}>
        <span onClick={() => navigate('/')}>Accueil</span>
        <span>›</span>
        <span onClick={() => navigate('/services')}>Services</span>
        <span>›</span>
        <span>{service.category}</span>
      </div>

      <div className={styles.layout}>
        {/* CONTENU PRINCIPAL */}
        <div className={styles.main}>
          <div className={styles.hero} style={{ background: service.color }}>
            <span>{service.emoji}</span>
          </div>

          <div className={styles.tags}>
            {service.tags.map(t => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>

          <h1 className={styles.title}>{service.title}</h1>

          <div className={styles.providerRow}>
            <div className={styles.avatar}>{service.provider[0]}</div>
            <div>
              <p className={styles.providerName}>{service.provider}</p>
              <p className={styles.providerLoc}>📍 {service.location}</p>
            </div>
            <div className={styles.rating}>
              ⭐ <strong>{service.rating}</strong>
              <span>({service.reviews} avis)</span>
            </div>
          </div>

          <div className={styles.section}>
            <h2>Description du service</h2>
            <p>{service.description}</p>
          </div>

          <div className={styles.section}>
            <h2>Ce que vous recevrez</h2>
            <ul className={styles.deliverables}>
              <li>✅ Livraison en {service.deliveryDays} jour(s) ouvrés</li>
              <li>✅ Révisions incluses</li>
              <li>✅ Support post-livraison (7 jours)</li>
              <li>✅ Paiement sécurisé par ServiLink</li>
            </ul>
          </div>
        </div>

        {/* SIDEBAR RÉSERVATION */}
        <aside className={styles.sidebar}>
          <div className={styles.priceCard}>
            <p className={styles.priceLabel}>À partir de</p>
            <p className={styles.price}>{service.price} <span>XOF</span></p>

            <div className={styles.meta}>
              <div><span>⏱</span> Délai</div>
              <strong>{service.deliveryDays} jours</strong>
            </div>
            <div className={styles.meta}>
              <div><span>🔄</span> Révisions</div>
              <strong>Incluses</strong>
            </div>
            <div className={styles.meta}>
              <div><span>🛡</span> Paiement</div>
              <strong>Sécurisé</strong>
            </div>

            <button
              className={styles.bookBtn}
              onClick={() => navigate(`/reserver/${service.id}`)}
            >
              Réserver maintenant
            </button>
            <button className={styles.contactBtn}>
              Contacter le prestataire
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
