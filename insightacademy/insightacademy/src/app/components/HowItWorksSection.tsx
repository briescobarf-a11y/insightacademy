'use client';
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    sectionRef?.current?.querySelectorAll('.reveal')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  const stepNums = ['01', '02', '03', '04'];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-4 sm:px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="section-label mb-3">{t?.howItWorks?.sectionLabel}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            {t?.howItWorks?.headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            {t?.howItWorks?.description}
          </p>
        </div>

        {/* Horizontal step flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t?.config?.steps?.map((step, i) => (
            <div
              key={stepNums?.[i]}
              className="reveal relative"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Connector line */}
              {i < t?.config?.steps?.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(100%-12px)] w-6 h-0.5 bg-border z-10" />
              )}

              <div className="bg-white rounded-3xl p-7 border border-border shadow-card h-full flex flex-col card-hover relative overflow-hidden">
                {/* Step number large bg */}
                <div className="absolute -top-3 -right-3 text-8xl font-extrabold text-secondary/80 select-none leading-none pointer-events-none">
                  {stepNums?.[i]}
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-5">
                    <span className="text-white font-extrabold text-lg">{stepNums?.[i]}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground mb-3">{step?.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step?.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}