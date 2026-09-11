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
};

const initialForm: FormData = {
  nom: '',
  prenom: '',
  wilaya: '',
  niveau: '',
  email: '',
  telephone: '',
};

const niveaux = [
  'مبتدئ',
  'A1',
  'A2',
  'B1',
  'B2',
  'C1',
  'C2',
  'لا أعرف مستواي',
];

const wilayas = [
  'أدرار', 'الشلف', 'الأغواط', 'أم البواقي', 'باتنة', 'بجاية', 'بسكرة',
  'بشار', 'البليدة', 'البويرة', 'تمنراست', 'تبسة', 'تلمسان', 'تيارت',
  'تيزي وزو', 'الجزائر', 'الجلفة', 'جيجل', 'سطيف', 'سعيدة', 'سكيكدة',
  'سيدي بلعباس', 'عنابة', 'قالمة', 'قسنطينة', 'المدية', 'مستغانم',
  'المسيلة', 'معسكر', 'ورقلة', 'وهران', 'البيض', 'إليزي', 'برج بوعريريج',
  'بومرداس', 'الطارف', 'تندوف', 'تيسمسيلت', 'الوادي', 'خنشلة',
  'سوق أهراس', 'تيبازة', 'ميلة', 'عين الدفلى', 'النعامة', 'عين تموشنت',
  'غرداية', 'غليزان', 'تيميمون', 'برج باجي مختار', 'أولاد جلال',
  'بني عباس', 'إن صالح', 'إن قزام', 'تقرت', 'جانت', 'المغير', 'المنيعة',
];

export default function InscriptionArPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
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
    if (!form.nom.trim()) newErrors.nom = 'هذا الحقل مطلوب';
    if (!form.prenom.trim()) newErrors.prenom = 'هذا الحقل مطلوب';
    if (!form.wilaya) newErrors.wilaya = 'هذا الحقل مطلوب';
    if (!form.niveau) newErrors.niveau = 'هذا الحقل مطلوب';
    if (!form.email.trim()) {
      newErrors.email = 'هذا الحقل مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'عنوان البريد الإلكتروني غير صالح';
    }
    if (!form.telephone.trim()) {
      newErrors.telephone = 'هذا الحقل مطلوب';
    } else if (!/^\+?[0-9\s\-]{9,15}$/.test(form.telephone.trim())) {
      newErrors.telephone = 'رقم الهاتف غير صالح';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setForm(initialForm);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background" dir="rtl">
        {/* Hero banner */}
        <div className="relative bg-hero-gradient pt-28 pb-20 px-4 sm:px-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl" style={{ background: 'var(--accent)' }} />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full opacity-10 blur-3xl" style={{ background: '#3B6EF0' }} />
          <div className="noise-overlay" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-sm text-white/90 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>التسجيل مفتوح</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5">
              انضم إلى{' '}
              <span className="italic" style={{ color: 'var(--accent)' }}>
                Insight Academy
              </span>
            </h1>
            <p className="text-lg text-white/75 max-w-xl mx-auto">
              املأ النموذج أدناه وسيتواصل معك فريقنا قريبًا لإتمام تسجيلك.
            </p>
          </div>
        </div>

        {/* Form section */}
        <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-20 bg-background">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Info panel */}
            <div className="lg:col-span-2 reveal-right flex flex-col gap-8">
              <div>
                <p className="section-label mb-3">نموذج التسجيل</p>
                <h2 className="text-3xl font-extrabold text-foreground mb-4">
                  ابدأ مسيرتك التعليمية
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  املأ هذا النموذج وسيتواصل معك فريقنا خلال 24 ساعة لإتمام تسجيلك وتوجيهك نحو الدورة المناسبة لك.
                </p>
              </div>

              {/* Contact info */}
              <div className="space-y-4">
                {[
                  { icon: 'PhoneIcon', label: academyConfig.phones[0] },
                  { icon: 'PhoneIcon', label: academyConfig.phones[1] },
                  { icon: 'EnvelopeIcon', label: academyConfig.email },
                  { icon: 'MapPinIcon', label: academyConfig.address },
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

              {/* Free test badge */}
              <div className="p-5 bg-secondary rounded-2xl border border-primary/10">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="AcademicCapIcon" size={18} className="text-primary" />
                  <p className="text-sm font-bold text-foreground">اختبار المستوى مجاني</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  مشمول مع كل تسجيل. المدة: 20 دقيقة. النتيجة فورية.
                </p>
              </div>

              {/* Back link */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                <Icon name="ArrowRightIcon" size={16} />
                العودة إلى الصفحة الرئيسية
              </Link>
            </div>

            {/* Form card */}
            <div className="lg:col-span-3 reveal-left">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-20 gap-6 bg-white border border-border rounded-3xl shadow-card px-8">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <Icon name="CheckCircleIcon" size={40} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-foreground mb-3">
                      تم إرسال طلب التسجيل!
                    </h3>
                    <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      شكرًا على تسجيلك! سيتواصل معك فريقنا قريبًا.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary mt-2"
                  >
                    تسجيل جديد
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white border border-border rounded-3xl p-8 md:p-10 shadow-card space-y-6"
                >
                  <div className="mb-2">
                    <h3 className="text-xl font-extrabold text-foreground">معلوماتك الشخصية</h3>
                    <p className="text-sm text-muted-foreground mt-1">جميع الحقول إلزامية.</p>
                  </div>

                  {/* Nom + Prénom */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        اللقب <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nom"
                        value={form.nom}
                        onChange={handleChange}
                        placeholder="لقبك"
                        className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                          errors.nom ? 'border-red-400' : 'border-border'
                        }`}
                      />
                      {errors.nom && (
                        <p className="text-red-500 text-xs mt-1">{errors.nom}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        الاسم <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="prenom"
                        value={form.prenom}
                        onChange={handleChange}
                        placeholder="اسمك"
                        className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                          errors.prenom ? 'border-red-400' : 'border-border'
                        }`}
                      />
                      {errors.prenom && (
                        <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>
                      )}
                    </div>
                  </div>

                  {/* Wilaya */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      الولاية <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="wilaya"
                      value={form.wilaya}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.wilaya ? 'border-red-400' : 'border-border'
                      }`}
                    >
                      <option value="">اختر ولايتك</option>
                      {wilayas.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                    {errors.wilaya && (
                      <p className="text-red-500 text-xs mt-1">{errors.wilaya}</p>
                    )}
                  </div>

                  {/* Niveau d'anglais */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">
                      مستوى اللغة الإنجليزية <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="niveau"
                      value={form.niveau}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.niveau ? 'border-red-400' : 'border-border'
                      }`}
                    >
                      <option value="">اختر مستواك</option>
                      {niveaux.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    {errors.niveau && (
                      <p className="text-red-500 text-xs mt-1">{errors.niveau}</p>
                    )}
                  </div>

                  {/* Email + Téléphone */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        البريد الإلكتروني <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="بريدك@مثال.com"
                        dir="ltr"
                        className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                          errors.email ? 'border-red-400' : 'border-border'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        رقم الهاتف <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="telephone"
                        value={form.telephone}
                        onChange={handleChange}
                        placeholder="+213 5XX XXX XXX"
                        dir="ltr"
                        className={`w-full px-4 py-3 rounded-xl border text-sm bg-input focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                          errors.telephone ? 'border-red-400' : 'border-border'
                        }`}
                      />
                      {errors.telephone && (
                        <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full btn-accent text-base py-4 justify-center mt-2"
                  >
                    إرسال طلب التسجيل
                    <Icon name="ArrowLeftIcon" size={18} />
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    بتقديم هذا النموذج، توافق على أن يتواصل معك فريقنا.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
