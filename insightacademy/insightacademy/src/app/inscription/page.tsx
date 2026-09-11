'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import Icon from '@/components/ui/AppIcon';
import { academyConfig } from '@/data/academyConfig';

type FormData = {
  nom: string;
  prenom: string;
  wilaya: string;
  niveau: string;
  email: string;
  telephone: string;
  formation: string;
  age: string;
};

const initialForm: FormData = {
  nom: '',
  prenom: '',
  wilaya: '',
  niveau: '',
  email: '',
  telephone: '',
  formation: '',
  age: ''
};

const niveaux = [
'Débutant',
'A1',
'A2',
'B1',
'B2',
'C1',
'C2',
'Je ne connais pas mon niveau'];


const wilayas: string[] = [];


const formations = [
'Anglais',
'Français',
'Arabe',
'Danse',
'Autre'];

interface SuccessModalProps {
  data: FormData;
  onClose: () => void;
}

function SuccessModal({ data, onClose }: SuccessModalProps) {
  const nextSteps = [
    { icon: 'PhoneIcon', title: 'Confirmation téléphonique', desc: 'Notre équipe vous appellera dans les 24h pour confirmer votre inscription.' },
    { icon: 'AcademicCapIcon', title: 'Test de niveau gratuit', desc: 'Vous passerez un test de niveau de 20 minutes pour déterminer votre groupe.' },
    { icon: 'CalendarIcon', title: 'Démarrage des cours', desc: 'Vous recevrez votre planning de cours et les informations pratiques.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-hero-gradient rounded-t-3xl px-8 pt-10 pb-8 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 blur-2xl" style={{ background: 'var(--accent)' }} />
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircleIcon" size={44} className="text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-1">Inscription confirmée !</h2>
            <p className="text-white/80 text-sm">Bienvenue chez Insight Academy 🎉</p>
          </div>
        </div>

        <div className="px-8 py-6 space-y-6">
          {/* Confirmation details */}
          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Récapitulatif de votre inscription</h3>
            <div className="bg-secondary rounded-2xl p-4 space-y-3">
              {[
                { label: 'Nom complet', value: `${data.prenom} ${data.nom}` },
                { label: 'Formation', value: data.formation },
                { label: 'Niveau', value: data.niveau },
                { label: 'Wilaya', value: data.wilaya },
                {
                  label: 'Date de naissance',
                  value: (() => {
                    const birthDate = new Date(data.age);
                    const today = new Date();
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const monthDiff = today.getMonth() - birthDate.getMonth();
                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                      age--;
                    }
                    return `${data.age} (${age} ans)`;
                  })()
                },
                { label: 'Email', value: data.email },
                { label: 'Téléphone', value: data.telephone },
              ].map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-4">
                  <span className="text-xs text-muted-foreground font-medium flex-shrink-0">{item.label}</span>
                  <span className="text-xs font-semibold text-foreground text-right">{item.value}</span>
                </div>
              ))}
            </div>
            {data.email && (
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <Icon name="EnvelopeIcon" size={12} className="text-primary flex-shrink-0" />
                Un récapitulatif a été envoyé à <strong className="text-foreground">{data.email}</strong>
              </p>
            )}
          </div>

          {/* Next steps */}
          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Prochaines étapes</h3>
            <div className="space-y-3">
              {nextSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={step.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{step.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact reminder */}
          <div className="p-4 bg-accent/10 border border-accent/20 rounded-2xl text-center">
            <p className="text-xs text-foreground font-medium">
              Des questions ? Contactez-nous au{' '}
              <span className="font-bold text-primary">{academyConfig.phones[0]}</span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
            >
              Nouvelle inscription
            </button>
            <Link
              href="/"
              className="flex-1 btn-primary text-sm py-3 justify-center text-center"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InscriptionPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) =>
    observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.nom.trim()) newErrors.nom = 'Ce champ est requis';
    if (!form.prenom.trim()) newErrors.prenom = 'Ce champ est requis';
    if (!form.wilaya) newErrors.wilaya = 'Ce champ est requis';
    if (!form.age.trim()) {
      newErrors.age = 'Ce champ est requis';
    } else {
      const birthDate = new Date(form.age);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (isNaN(age) || age < 3 || age > 100) {
        newErrors.age = 'Âge invalide';
      }
    }
    if (!form.niveau) newErrors.niveau = 'Ce champ est requis';
    if (!form.email.trim()) {
      newErrors.email = 'Ce champ est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Adresse e-mail invalide';
    }
    if (!form.telephone.trim()) {
      newErrors.telephone = 'Ce champ est requis';
    } else if (!/^\+?[0-9\s\-]{9,15}$/.test(form.telephone.trim())) {
      newErrors.telephone = 'Numéro de téléphone invalide';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/send-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'student', data: form }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de l\'envoi');
      }

      setSubmittedData({ ...form });
      setSubmitted(true);
      setForm(initialForm);
    } catch (error) {
      setSubmitError('Une erreur est survenue. Veuillez réessayer ou nous contacter directement.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
  {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCloseModal = () => {
    setSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <>
      <Header />
      {submitted && submittedData && (
        <SuccessModal data={submittedData} onClose={handleCloseModal} />
      )}
      <main className="min-h-screen bg-background">
        {/* Hero banner */}
        <div className="relative bg-hero-gradient pt-28 pb-20 px-4 sm:px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl" style={{ background: 'var(--accent)' }} />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-10 blur-3xl" style={{ background: '#3B6EF0' }} />
          <div className="noise-overlay" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-sm text-white/90 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Inscription ouverte</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5">
              Rejoignez{' '}
              <span className="italic" style={{ color: 'var(--accent)' }}>
                Insight Academy
              </span>
            </h1>
            <p className="text-lg text-white/75 max-w-xl mx-auto">
              Remplissez le formulaire ci-dessous et notre équipe vous contactera prochainement pour finaliser votre inscription.
            </p>
          </div>
        </div>

        {/* Form section */}
        <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-20 bg-background">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Info panel */}
            <div className="lg:col-span-2 reveal-left flex flex-col gap-8">
              <div>
                <p className="section-label mb-3">Formulaire d&apos;inscription</p>
                <h2 className="text-3xl font-extrabold text-foreground mb-4">
                  Commencez votre parcours
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Remplissez ce formulaire et notre équipe vous contactera dans les 24 heures pour finaliser votre inscription et vous orienter vers la formation idéale.
                </p>
              </div>

              {/* Contact info */}
              <div className="space-y-4">
                {[
                { icon: 'PhoneIcon', label: academyConfig.phones[0] },
                { icon: 'PhoneIcon', label: academyConfig.phones[1] },
                { icon: 'EnvelopeIcon', label: academyConfig.email },
                { icon: 'MapPinIcon', label: academyConfig.address },
                { icon: 'MapPinIcon', label: academyConfig.address2 }].
                map((item) =>
                <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon
                      name={item.icon as Parameters<typeof Icon>[0]['name']}
                      size={16}
                      className="text-primary" />

                    </div>
                    <p className="text-sm text-foreground font-medium leading-relaxed">{item.label}</p>
                  </div>
                )}
              </div>

              {/* Free test badge */}
              <div className="p-5 bg-secondary rounded-2xl border border-primary/10">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="AcademicCapIcon" size={18} className="text-primary" />
                  <p className="text-sm font-bold text-foreground">Test de niveau gratuit</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Inclus avec toute inscription. Durée : 20 minutes. Résultat immédiat.
                </p>
              </div>

              {/* Back link */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">

                <Icon name="ArrowLeftIcon" size={16} />
                Retour à l&apos;accueil
              </Link>
            </div>

            {/* Form card */}
            <div className="lg:col-span-3 reveal-right">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white border border-border rounded-3xl p-8 md:p-10 shadow-card space-y-6">

                  <div className="mb-2">
                    <h3 className="text-xl font-extrabold text-foreground">Vos informations</h3>
                    <p className="text-sm text-muted-foreground mt-1">Tous les champs sont obligatoires.</p>
                  </div>

                  {/* Nom + Prénom */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Nom <span className="text-red-500">*</span>
                      </label>
                      <input
                      type="text"
                      name="nom"
                      value={form.nom}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                      errors.nom ? 'border-red-400' : 'border-border'}`
                      } />

                      {errors.nom &&
                    <p className="text-red-500 text-xs mt-1">{errors.nom}</p>
                    }
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Prénom <span className="text-red-500">*</span>
                      </label>
                      <input
                      type="text"
                      name="prenom"
                      value={form.prenom}
                      onChange={handleChange}
                      placeholder="Votre prénom"
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                      errors.prenom ? 'border-red-400' : 'border-border'}`
                      } />

                      {errors.prenom &&
                    <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>
                    }
                    </div>
                  </div>

                  {/* Date de naissance */}
                  <div className="grid gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Date de naissance <span className="text-red-500">*</span>
                      </label>
                      <input
                      type="date"
                      name="age"
                      value={form.age}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                      errors.age ? 'border-red-400' : 'border-border'}`
                      } />
                      {errors.age &&
                    <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                    }
                    </div>
                  </div>

                  {/* Lieu */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Lieu <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="text"
                    name="wilaya"
                    value={form.wilaya}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                    errors.wilaya ? 'border-red-400' : 'border-border'}`
                    } />
                    {errors.wilaya &&
                  <p className="text-red-500 text-xs mt-1">{errors.wilaya}</p>
                  }
                  </div>

                  {/* Niveau d'anglais */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Niveau  <span className="text-red-500">*</span>
                    </label>
                    <select
                    name="niveau"
                    value={form.niveau}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                    errors.niveau ? 'border-red-400' : 'border-border'}`
                    }>

                      <option value="">Sélectionnez votre niveau</option>
                      {niveaux.map((n) =>
                    <option key={n} value={n}>{n}</option>
                    )}
                    </select>
                    {errors.niveau &&
                  <p className="text-red-500 text-xs mt-1">{errors.niveau}</p>
                  }
                  </div>

                  {/* Email + Téléphone */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Adresse e-mail <span className="text-red-500">*</span>
                      </label>
                      <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                      errors.email ? 'border-red-400' : 'border-border'}`
                      } />

                      {errors.email &&
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    }
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        Numéro de téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                      type="tel"
                      name="telephone"
                      value={form.telephone}
                      onChange={handleChange}
                      placeholder="+213 5XX XXX XXX"
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                      errors.telephone ? 'border-red-400' : 'border-border'}`
                      } />

                      {errors.telephone &&
                    <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>
                    }
                    </div>
                  </div>

                  {/* Submit error */}
                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-600 text-sm">{submitError}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-accent text-base py-4 justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {isLoading ? (
                      <span className="flex items-center gap-2 justify-center">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Envoi en cours…
                      </span>
                    ) : (
                      <>
                        Envoyer mon inscription
                        <Icon name="ArrowRightIcon" size={18} />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    En soumettant ce formulaire, vous acceptez d&apos;être contacté par notre équipe.
                  </p>
                </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}