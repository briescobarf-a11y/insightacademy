'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const statIcons = ['AcademicCapIcon', 'UsersIcon', 'MapPinIcon', 'MapPinIcon'];

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 px-4 sm:px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image collage */}
          <div className="reveal-left relative">
            <div className="relative rounded-4xl overflow-hidden aspect-[4/5] max-w-lg mx-auto lg:mx-0 shadow-hero">
              <AppImage
                src="/assets/images/IMG_5187-1788886887284.jpeg"
                alt="Engaged students in a bright, modern classroom setting in Algiers"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw" />

            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 md:right-8 glass-card rounded-2xl p-5 shadow-glass border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Icon name="UsersIcon" size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-foreground">150000</p>
                  <p className="text-xs text-muted-foreground font-medium">{t.about.studentsBadge}</p>
                </div>
              </div>
            </div>
            {/* Second floating badge */}
            <div className="absolute -top-4 -left-4 md:left-0 glass-card rounded-2xl p-4 shadow-glass border border-border">
              <div className="flex items-center gap-2">
                <span className="text-accent text-xl">🇩🇿</span>
                <p className="text-sm font-bold text-foreground">{t.about.algerianBadge}</p>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="reveal-right flex flex-col justify-between h-full gap-8">
            <div>
              <p className="section-label mb-4">{t.about.sectionLabel}</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-[1.1] mb-6">
                {t.about.headline}{' '}
                <span className="text-gradient">Insight Academy</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t.about.description}
              </p>

              {/* Tagline block */}
              <div className="relative pl-6 border-l-4 border-accent mb-8">
                <p className="text-lg font-semibold text-foreground italic leading-relaxed">
                  {t.about.quote}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {t.about.stats.map((item, i) =>
                <div key={item.label} className="flex items-start gap-3 p-4 bg-secondary rounded-xl">
                    <Icon
                    name={statIcons[i] as Parameters<typeof Icon>[0]['name']}
                    size={20}
                    className="text-primary mt-0.5 flex-shrink-0" />

                    <div>
                      <p className="text-sm font-bold text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}