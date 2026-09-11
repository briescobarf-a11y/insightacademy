'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const benefitIcons = [
    'UserGroupIcon',
    'AdjustmentsHorizontalIcon',
    'ChatBubbleLeftRightIcon',
    'BookOpenIcon',
    'ChartBarIcon',
    'MapPinIcon',
  ];

  return (
    <section id="why-us" ref={sectionRef} className="py-24 md:py-32 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Left sticky header */}
          <div className="lg:col-span-2 lg:sticky lg:top-28 reveal-left">
            <p className="section-label mb-4">{t.whyUs.sectionLabel}</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-[1.1] mb-6">
              {t.whyUs.headline}{' '}
              <span className="text-gradient">Insight Academy ?</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.whyUs.description}
            </p>
            <div className="flex items-center gap-3 p-4 bg-secondary rounded-2xl border border-primary/10">
              <Icon name="MapPinIcon" size={20} className="text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-foreground">{t.whyUs.location}</p>
                <p className="text-xs text-muted-foreground">{t.whyUs.locationSub}</p>
              </div>
            </div>
          </div>

          {/* Right: benefits list */}
          <div className="lg:col-span-3 space-y-0 reveal-right">
            {t.config.benefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className="group flex items-start gap-5 py-6 border-b border-border last:border-0 cursor-default"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <Icon
                    name={benefitIcons[i] as Parameters<typeof Icon>[0]['name']}
                    size={22}
                    className="text-primary group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <h3 className="text-lg font-bold text-foreground">{benefit.title}</h3>
                    <Icon
                      name="ArrowUpRightIcon"
                      size={16}
                      className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                    />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}