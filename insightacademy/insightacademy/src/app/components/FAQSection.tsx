'use client';
import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  return (
    <section id="faq" ref={sectionRef} className="py-24 md:py-32 px-4 sm:px-6 bg-secondary">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="section-label mb-3">{t?.faq?.sectionLabel}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">{t?.faq?.headline}</h2>
          <p className="text-lg text-muted-foreground">{t?.faq?.description}</p>
        </div>

        <div className="space-y-0 reveal">
          {t?.config?.faq?.map((item, i) => (
            <div key={i} className="faq-item">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left gap-4 group"
              >
                <span className="font-semibold text-foreground text-base group-hover:text-primary transition-colors">
                  {item?.q}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openIndex === i ? 'bg-primary text-white rotate-45' : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  <Icon name="PlusIcon" size={16} />
                </div>
              </button>
              <div className={`faq-answer ${openIndex === i ? 'open' : ''}`}>
                <p className="text-muted-foreground text-sm leading-relaxed pb-5">{item?.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}