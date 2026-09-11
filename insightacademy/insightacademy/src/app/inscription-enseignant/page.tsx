'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';
import { academyConfig } from '@/data/academyConfig';

type TeacherFormData = {
  prenom: string;
  nom: string;
  dateNaissance: string;
  lieuNaissance: string;
  lieuResidence: string;
  anneesExperience: string;
  email: string;
  cv?: File | null;
};

const initialForm: TeacherFormData = {
  prenom: '',
  nom: '',
  dateNaissance: '',
  lieuNaissance: '',
  lieuResidence: '',
  anneesExperience: '',
  email: '',
  cv: null,
};

const experienceOptions = [
  { value: '0-1', label: 'Moins d\'1 an' },
  { value: '1-3', label: '1 – 3 ans' },
  { value: '3-5', label: '3 – 5 ans' },
  { value: '5-10', label: '5 – 10 ans' },
  { value: '10-15', label: '10 – 15 ans' },
  { value: '15+', label: 'Plus de 15 ans' },
];

interface SuccessModalProps {
  data: TeacherFormData;
  onClose: () => void;
}

function SuccessModal({ data, onClose }: SuccessModalProps) {
  const experienceLabel = experienceOptions.find((o) => o.value === data.anneesExperience)?.label ?? data.anneesExperience;

  const nextSteps = [
    { icon: 'EnvelopeIcon', title: 'Examen de votre candidature', desc: 'Notre équipe pédagogique examinera votre profil dans les 48 heures.' },
    { icon: 'PhoneIcon', title: 'Entretien téléphonique', desc: 'Vous serez contacté pour un entretien de présentation et de discussion des opportunités.' },
    { icon: 'AcademicCapIcon', title: 'Intégration à l\'équipe', desc: 'Si votre profil correspond, vous recevrez une proposition et les détails d\'intégration.' },
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
            <h2 className="text-2xl font-extrabold text-white mb-1">Candidature reçue !</h2>
            <p className="text-white/80 text-sm">Merci de votre intérêt pour Insight Academy 🎓</p>
          </div>
        </div>

        <div className="px-8 py-6 space-y-6">
          {/* Confirmation details */}
          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Récapitulatif de votre candidature</h3>
            <div className="bg-secondary rounded-2xl p-4 space-y-3">
              {[
                { label: 'Nom complet', value: `${data.prenom} ${data.nom}` },
                { label: 'Date de naissance', value: data.dateNaissance },
                { label: 'Lieu de naissance', value: data.lieuNaissance },
                { label: 'Lieu de résidence', value: data.lieuResidence },
                { label: 'Expérience', value: experienceLabel },
                { label: 'Email', value: data.email },
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
              Nouvelle candidature
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

export default function InscriptionEnseignantPage() {
  const [form, setForm] = useState<TeacherFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof TeacherFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<TeacherFormData | null>(null);
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
    const newErrors: Partial<Record<keyof TeacherFormData, string>> = {};
    if (!form.prenom.trim()) newErrors.prenom = 'Ce champ est requis';
    if (!form.nom.trim()) newErrors.nom = 'Ce champ est requis';
    if (!form.dateNaissance) newErrors.dateNaissance = 'Ce champ est requis';
    if (!form.lieuNaissance.trim()) newErrors.lieuNaissance = 'Ce champ est requis';
    if (!form.lieuResidence.trim()) newErrors.lieuResidence = 'Ce champ est requis';
    if (!form.anneesExperience) newErrors.anneesExperience = 'Ce champ est requis';
    if (!form.email.trim()) {
      newErrors.email = 'Ce champ est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Adresse email invalide';
    }
    if (form.cv && form.cv.type !== 'application/pdf') {
      newErrors.cv = 'Veuillez télécharger un fichier PDF uniquement';
    }
    if (form.cv && form.cv.size > 5 * 1024 * 1024) {
      newErrors.cv = 'Le fichier ne doit pas dépasser 5 Mo';
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
      const formData = new FormData();
      formData.append('type', 'teacher');
      formData.append('prenom', form.prenom);
      formData.append('nom', form.nom);
      formData.append('dateNaissance', form.dateNaissance);
      formData.append('lieuNaissance', form.lieuNaissance);
      formData.append('lieuResidence', form.lieuResidence);
      formData.append('anneesExperience', form.anneesExperience);
      formData.append('email', form.email);
      if (form.cv) {
        formData.append('cv', form.cv);
      }

      const response = await fetch('/api/send-registration', {
        method: 'POST',
        body: formData,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      const file = e.target.files?.[0] ?? null;
      setForm((prev) => ({ ...prev, [name]: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name as keyof TeacherFormData]) {
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
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
            style={{ background: 'var(--accent)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-10 blur-3xl"
            style={{ background: '#3B6EF0' }}
          />
          <div className="noise-overlay" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-sm text-white/90 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Recrutement enseignants</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5">
              Rejoignez notre{' '}
              <span className="italic" style={{ color: 'var(--accent)' }}>
                équipe pédagogique
              </span>
            </h1>
            <p className="text-lg text-white/75 max-w-xl mx-auto">
              Vous êtes enseignant passionné ? Remplissez ce formulaire et notre équipe vous contactera pour discuter des opportunités disponibles.
            </p>
          </div>
        </div>

        {/* Form section */}
        <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-20 bg-background">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Info panel */}
            <div className="lg:col-span-2 reveal-left flex flex-col gap-8">
              <div>
                <p className="section-label mb-3">Formulaire enseignant</p>
                <h2 className="text-3xl font-extrabold text-foreground mb-4">
                  Partagez votre profil
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Remplissez ce formulaire et notre équipe vous contactera dans les 48 heures pour discuter des opportunités d&apos;enseignement disponibles chez Insight Academy.
                </p>
              </div>

              {/* Contact info */}
              <div className="space-y-4">
                {[
                  { icon: 'PhoneIcon', label: academyConfig.phones[0] },
                  { icon: 'PhoneIcon', label: academyConfig.phones[1] },
                  { icon: 'EnvelopeIcon', label: academyConfig.email },
                  { icon: 'MapPinIcon', label: academyConfig.address },
                  { icon: 'MapPinIcon', label: academyConfig.address2 },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon
                        name={item.icon as Parameters<typeof Icon>[0]['name']}
                        size={16}
                        className="text-primary"
                      />
                    </div>
                    <p className="text-sm text-foreground font-medium leading-relaxed">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Teacher badge */}
              <div className="p-5 bg-secondary rounded-2xl border border-primary/10">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="AcademicCapIcon" size={18} className="text-primary" />
                  <p className="text-sm font-bold text-foreground">Pourquoi nous rejoindre ?</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Environnement de travail stimulant, équipe dynamique et opportunités de développement professionnel continu.
                </p>
              </div>

              {/* Back link */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                <Icon name="ArrowLeftIcon" size={16} />
                Retour à l&apos;accueil
              </Link>
            </div>

            {/* Form card */}
            <div className="lg:col-span-3 reveal-right">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white border border-border rounded-3xl p-8 md:p-10 shadow-card space-y-6"
              >
                <div className="mb-2">
                  <h3 className="text-xl font-extrabold text-foreground">Vos informations personnelles</h3>
                  <p className="text-sm text-muted-foreground mt-1">Tous les champs sont obligatoires.</p>
                </div>

                {/* Prénom + Nom */}
                <div className="grid sm:grid-cols-2 gap-5">
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
                        errors.prenom ? 'border-red-400' : 'border-border'
                      }`}
                    />
                    {errors.prenom && (
                      <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>
                    )}
                  </div>
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
                        errors.nom ? 'border-red-400' : 'border-border'
                      }`}
                    />
                    {errors.nom && (
                      <p className="text-red-500 text-xs mt-1">{errors.nom}</p>
                    )}
                  </div>
                </div>

                {/* Date de naissance */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Date de naissance <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateNaissance"
                    value={form.dateNaissance}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                      errors.dateNaissance ? 'border-red-400' : 'border-border'
                    }`}
                  />
                  {errors.dateNaissance && (
                    <p className="text-red-500 text-xs mt-1">{errors.dateNaissance}</p>
                  )}
                </div>

                {/* Lieu de naissance + Lieu de résidence */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Lieu de naissance <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lieuNaissance"
                      value={form.lieuNaissance}
                      onChange={handleChange}
                      placeholder="Ex : Alger, Oran…"
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.lieuNaissance ? 'border-red-400' : 'border-border'
                      }`}
                    />
                    {errors.lieuNaissance && (
                      <p className="text-red-500 text-xs mt-1">{errors.lieuNaissance}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      Lieu de résidence <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lieuResidence"
                      value={form.lieuResidence}
                      onChange={handleChange}
                      placeholder="Ex : Ben Aknoun, Hydra…"
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.lieuResidence ? 'border-red-400' : 'border-border'
                      }`}
                    />
                    {errors.lieuResidence && (
                      <p className="text-red-500 text-xs mt-1">{errors.lieuResidence}</p>
                    )}
                  </div>
                </div>

                {/* Durée d'expérience */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Durée d&apos;expérience professionnelle <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="anneesExperience"
                    value={form.anneesExperience}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                      errors.anneesExperience ? 'border-red-400' : 'border-border'
                    }`}
                  >
                    <option value="">Sélectionnez votre expérience</option>
                    {experienceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.anneesExperience && (
                    <p className="text-red-500 text-xs mt-1">{errors.anneesExperience}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Adresse email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                      errors.email ? 'border-red-400' : 'border-border'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">Un récapitulatif de votre candidature vous sera envoyé à cette adresse.</p>
                </div>

                {/* CV PDF Upload */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    CV (PDF) <span className="text-muted-foreground font-normal text-xs">— optionnel</span>
                  </label>
                  <label
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-sm bg-input cursor-pointer hover:bg-secondary/60 transition-all ${
                      errors.cv ? 'border-red-400' : 'border-border'
                    }`}
                  >
                    <Icon name="DocumentArrowUpIcon" size={18} className="text-primary flex-shrink-0" />
                    <span className="flex-1 truncate text-muted-foreground">
                      {form.cv ? form.cv.name : 'Choisir un fichier PDF…'}
                    </span>
                    {form.cv && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setForm((prev) => ({ ...prev, cv: null }));
                          setErrors((prev) => ({ ...prev, cv: undefined }));
                        }}
                        className="text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Icon name="XMarkIcon" size={16} />
                      </button>
                    )}
                    <input
                      type="file"
                      name="cv"
                      accept="application/pdf"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                  {errors.cv && (
                    <p className="text-red-500 text-xs mt-1">{errors.cv}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">Format PDF uniquement, taille maximale 5 Mo.</p>
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
                  className="w-full btn-accent text-base py-4 justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
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
                      Soumettre ma candidature
                      <Icon name="ArrowRightIcon" size={18} />
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  En soumettant ce formulaire, vous acceptez d&apos;être contacté par notre équipe pédagogique.
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
