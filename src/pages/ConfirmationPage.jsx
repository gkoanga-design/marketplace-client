import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ConfirmationPage.module.css';

export default function ConfirmationPage() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  if (!state) {
    return (
      <div className={styles.notFound}>
        <p>Aucune réservation trouvée.</p>
        <button onClick={() => navigate('/')}>Retour à l'accueil</button>
      </div>
    );
  }

  const { service, form } = state;
  const ref = `SL-${Date.now().toString().slice(-8).toUpperCase()}`;

  return (
    <div className={styles.page}>
      <div className={`${styles.card} ${visible ? styles.visible : ''}`}>

        {/* ICÔNE SUCCÈS */}
        <div className={styles.iconWrap}>
          <div className={styles.icon}>✓</div>
          <div className={styles.ring} />
        </div>

        <h1 className={styles.title}>Réservation confirmée !</h1>
        <p className={styles.sub}>
          Votre demande a bien été envoyée au prestataire.<br />
          Vous recevrez une confirmation par email sous 24h.
        </p>

        <div className={styles.refBox}>
          <span>Référence de commande</span>
          <strong>{ref}</strong>
        </div>

        {/* DÉTAILS */}
        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span>Service</span>
            <strong>{service.title}</strong>
          </div>
          <div className={styles.detailRow}>
            <span>Prestataire</span>
            <strong>{service.provider}</strong>
          </div>
          <div className={styles.detailRow}>
            <span>Client</span>
            <strong>{form.prenom} {form.nom}</strong>
          </div>
          <div className={styles.detailRow}>
            <span>Email</span>
            <strong>{form.email}</strong>
          </div>
          <div className={styles.detailRow}>
            <span>Date souhaitée</span>
            <strong>{form.date}</strong>
          </div>
          <div className={styles.detailRow}>
            <span>Montant total</span>
            <strong className={styles.price}>{service.price} XOF</strong>
          </div>
        </div>

        {/* TIMELINE STATUT */}
        <div className={styles.timeline}>
          <h3>Suivi de votre commande</h3>
          <div className={styles.timelineItem}>
            <div className={`${styles.dot} ${styles.dotDone}`} />
            <div>
              <p>Demande envoyée</p>
              <span>Maintenant</span>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.dot} />
            <div>
              <p>Confirmation du prestataire</p>
              <span>Sous 24h</span>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.dot} />
            <div>
              <p>Exécution du service</p>
              <span>Délai : {service.deliveryDays} jours</span>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.dot} />
            <div>
              <p>Validation & paiement libéré</p>
              <span>Après votre confirmation</span>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className={styles.actions}>
          <button className={styles.btnHome} onClick={() => navigate('/')}>
            Retour à l'accueil
          </button>
          <button className={styles.btnServices} onClick={() => navigate('/services')}>
            Explorer d'autres services →
          </button>
        </div>
      </div>
    </div>
  );
}
