'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { academyConfig } from '@/data/academyConfig';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    );
    sectionRef?.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 px-4 sm:px-6 bg-section-gradient">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="section-label mb-3">{t?.contact?.sectionLabel}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            {t?.contact?.headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            {t?.contact?.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact cards */}
          <div className="reveal-left space-y-4">
            {/* Address */}
            <div className="bg-white rounded-3xl p-7 border border-border shadow-card flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0">
                <Icon name="MapPinIcon" size={22} className="text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground mb-1">{t?.contact?.benAknoun}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{academyConfig?.address}</p>
                {academyConfig?.addressMapUrl && (
                  <a
                    href={academyConfig?.addressMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:underline mt-1"
                  >
                    {t?.contact?.viewMap}
                  </a>
                )}
              </div>
            </div>

            {/* Address 2 */}
            <div className="bg-white rounded-3xl p-7 border border-border shadow-card flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0">
                <Icon name="MapPinIcon" size={22} className="text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground mb-1">{t?.contact?.hydra}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{academyConfig?.address2}</p>
                {academyConfig?.address2MapUrl && (
                  <a
                    href={academyConfig?.address2MapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:underline mt-1"
                  >
                    {t?.contact?.viewMap}
                  </a>
                )}
              </div>
            </div>

            {/* Phones */}
            <div className="bg-white rounded-3xl p-7 border border-border shadow-card flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0">
                <Icon name="PhoneIcon" size={22} className="text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground mb-1">{t?.contact?.phone}</p>
                {academyConfig?.phones?.map((p) => (
                  <a key={p} href={`tel:${p?.replace(/\s/g, '')}`} className="block text-sm text-primary font-semibold hover:underline">
                    {p}
                  </a>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-3xl p-7 border border-border shadow-card flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0">
                <Icon name="EnvelopeIcon" size={22} className="text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground mb-1">{t?.contact?.email}</p>
                <a href={`mailto:${academyConfig?.email}`} className="text-sm text-primary font-semibold hover:underline">
                  {academyConfig?.email}
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="bg-white rounded-3xl p-7 border border-border shadow-card flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0">
                <Icon name="GlobeAltIcon" size={22} className="text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground mb-2">{t?.contact?.social}</p>
                <div className="flex flex-col gap-1">
                  <a href={academyConfig?.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1.5">
                    <Icon name="PhotoIcon" size={14} />
                    Instagram : @{academyConfig?.instagram}
                  </a>
                  <a href={academyConfig?.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1.5">
                    <Icon name="GlobeAltIcon" size={14} />
                    {academyConfig?.facebookName}
                  </a>
                  <a href={academyConfig?.snapchatUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1.5">
                    <Icon name="CameraIcon" size={14} />
                    Snapchat : @insightacademy
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="reveal-right">
            <div className="relative w-full h-full min-h-[400px] rounded-4xl overflow-hidden bg-secondary border border-border shadow-card">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Icon name="MapPinIcon" size={32} className="text-primary" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-foreground mb-2">Insight Academy</p>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                    City 360, Les Frères Aïssou<br />
                    Ben Aknoun, Alger, Algérie
                  </p>
                </div>
                <a
                  href="https://maps.app.goo.gl/k8jW7s4DYKkKGQKt8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm px-6 py-3 mt-2"
                >
                  <Icon name="MapPinIcon" size={16} />
                  {t?.contact?.hydraMap}
                </a>
                <a
                  href="https://maps.app.goo.gl/rQw6LYwhpNsJFazTA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm px-6 py-3 mt-2"
                >
                  <Icon name="MapPinIcon" size={16} />
                  {t?.contact?.benAknounMap}
                </a>
              </div>

              {/* Decorative grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 400 400">
                {Array.from({ length: 10 })?.map((_, i) => (
                  <React.Fragment key={i}>
                    <line x1={i * 40} y1="0" x2={i * 40} y2="400" stroke="currentColor" strokeWidth="1" />
                    <line x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="currentColor" strokeWidth="1" />
                  </React.Fragment>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );



}