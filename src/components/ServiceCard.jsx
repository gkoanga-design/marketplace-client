import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ service, delay = 0 }) {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.card} fade-up`}
      style={{ animationDelay: `${delay}s` }}
      onClick={() => navigate(`/services/${service.id}`)}
    >
      <div className={styles.imgWrap}>
        <div className={styles.img} style={{ background: service.color }}>
          <span className={styles.emoji}>{service.emoji}</span>
        </div>
        <span className={styles.badge}>{service.category}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.location}>📍 {service.location}</span>
          <div className={styles.rating}>
            ⭐ <strong>{service.rating}</strong>
            <span className={styles.reviews}>({service.reviews})</span>
          </div>
        </div>

        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.provider}>par {service.provider}</p>

        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.from}>À partir de</span>
            <strong className={styles.amount}>{service.price} XOF</strong>
          </div>
          <button className={styles.btn}>Voir →</button>
        </div>
      </div>
    </div>
  );
}
