import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVICES } from '../assets/mockData';
import styles from './ReservationPage.module.css';

export default function ReservationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === parseInt(id));

  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', telephone: '',
    date: '', description: '', pays: '',
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  if (!service) return <div className={styles.notFound}><p>Service introuvable</p></div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateStep1 = () => {
    const errs = {};
    if (!form.nom.trim())       errs.nom       = 'Champ requis';
    if (!form.prenom.trim())    errs.prenom    = 'Champ requis';
    if (!form.email.includes('@')) errs.email  = 'Email invalide';
    if (!form.telephone.trim()) errs.telephone = 'Champ requis';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!form.date)             errs.date        = 'Champ requis';
    if (!form.pays.trim())      errs.pays        = 'Champ requis';
    if (!form.description.trim()) errs.description = 'Décrivez votre besoin';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  };

  const handleSubmit = () => {
    navigate('/confirmation', { state: { service, form } });
  };

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <span onClick={() => navigate(`/services/${service.id}`)}>← Retour au service</span>
      </div>

      <div className={styles.layout}>
        {/* FORMULAIRE */}
        <div className={styles.formWrap}>
          <h1 className={styles.title}>Réserver ce service</h1>

          {/* STEPPER */}
          <div className={styles.stepper}>
            {['Vos informations', 'Détails du besoin', 'Confirmation'].map((label, i) => (
              <div key={i} className={`${styles.stepItem} ${step > i ? styles.done : ''} ${step === i + 1 ? styles.current : ''}`}>
                <div className={styles.stepCircle}>{step > i + 1 ? '✓' : i + 1}</div>
                <span>{label}</span>
                {i < 2 && <div className={styles.stepLine} />}
              </div>
            ))}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className={`${styles.formSection} fade-up`}>
              <h2>Vos informations personnelles</h2>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Nom *</label>
                  <input name="nom" placeholder="KOANGA" value={form.nom} onChange={handleChange} />
                  {errors.nom && <span className={styles.err}>{errors.nom}</span>}
                </div>
                <div className={styles.field}>
                  <label>Prénom *</label>
                  <input name="prenom" placeholder="Gilles Junior" value={form.prenom} onChange={handleChange} />
                  {errors.prenom && <span className={styles.err}>{errors.prenom}</span>}
                </div>
              </div>
              <div className={styles.field}>
                <label>Email *</label>
                <input name="email" type="email" placeholder="exemple@email.com" value={form.email} onChange={handleChange} />
                {errors.email && <span className={styles.err}>{errors.email}</span>}
              </div>
              <div className={styles.field}>
                <label>Téléphone *</label>
                <input name="telephone" placeholder="+221 77 000 00 00" value={form.telephone} onChange={handleChange} />
                {errors.telephone && <span className={styles.err}>{errors.telephone}</span>}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className={`${styles.formSection} fade-up`}>
              <h2>Détails de votre besoin</h2>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Date souhaitée *</label>
                  <input name="date" type="date" value={form.date} onChange={handleChange} />
                  {errors.date && <span className={styles.err}>{errors.date}</span>}
                </div>
                <div className={styles.field}>
                  <label>Pays *</label>
                  <input name="pays" placeholder="Ex: Sénégal" value={form.pays} onChange={handleChange} />
                  {errors.pays && <span className={styles.err}>{errors.pays}</span>}
                </div>
              </div>
              <div className={styles.field}>
                <label>Description de votre besoin *</label>
                <textarea
                  name="description"
                  rows={5}
                  placeholder="Décrivez votre projet en détail : objectifs, contraintes, résultats attendus..."
                  value={form.description}
                  onChange={handleChange}
                  style={{ resize: 'vertical', background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '10px', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '14px', width: '100%', outline: 'none' }}
                />
                {errors.description && <span className={styles.err}>{errors.description}</span>}
              </div>
            </div>
          )}

          {/* STEP 3 — RÉCAP */}
          {step === 3 && (
            <div className={`${styles.formSection} fade-up`}>
              <h2>Récapitulatif de votre réservation</h2>
              <div className={styles.recap}>
                <div className={styles.recapRow}><span>Nom complet</span><strong>{form.prenom} {form.nom}</strong></div>
                <div className={styles.recapRow}><span>Email</span><strong>{form.email}</strong></div>
                <div className={styles.recapRow}><span>Téléphone</span><strong>{form.telephone}</strong></div>
                <div className={styles.recapRow}><span>Pays</span><strong>{form.pays}</strong></div>
                <div className={styles.recapRow}><span>Date souhaitée</span><strong>{form.date}</strong></div>
                <div className={styles.recapRow}><span>Service</span><strong>{service.title}</strong></div>
                <div className={styles.recapRow}><span>Prestataire</span><strong>{service.provider}</strong></div>
                <div className={styles.recapRow}><span>Montant</span><strong className={styles.priceRecap}>{service.price} XOF</strong></div>
              </div>
              <div className={styles.notice}>
                🔒 Le paiement sera sécurisé par ServiLink. Les fonds sont conservés jusqu'à la validation de la prestation.
              </div>
            </div>
          )}

          {/* BOUTONS */}
          <div className={styles.actions}>
            {step > 1 && (
              <button className={styles.btnBack} onClick={() => setStep(step - 1)}>
                ← Retour
              </button>
            )}
            {step < 3 && (
              <button className={styles.btnNext} onClick={handleNext}>
                Continuer →
              </button>
            )}
            {step === 3 && (
              <button className={styles.btnSubmit} onClick={handleSubmit}>
                ✅ Confirmer la réservation
              </button>
            )}
          </div>
        </div>

        {/* RÉSUMÉ LATÉRAL */}
        <aside className={styles.summary}>
          <h3>Votre commande</h3>
          <div className={styles.serviceSnippet}>
            <div className={styles.snippetImg} style={{ background: service.color }}>
              <span>{service.emoji}</span>
            </div>
            <div>
              <p className={styles.snippetTitle}>{service.title}</p>
              <p className={styles.snippetProvider}>{service.provider}</p>
              <p className={styles.snippetLocation}>📍 {service.location}</p>
            </div>
          </div>
          <div className={styles.summaryRow}><span>Délai de livraison</span><strong>{service.deliveryDays} jours</strong></div>
          <div className={styles.summaryRow}><span>Note prestataire</span><strong>⭐ {service.rating}</strong></div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <strong>{service.price} XOF</strong>
          </div>
          <p className={styles.summaryNote}>💡 Vous ne serez débité qu'après confirmation du prestataire.</p>
        </aside>
      </div>
    </div>
  );
}
