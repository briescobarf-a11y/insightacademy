'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { academyConfig } from '@/data/academyConfig';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';

const levelColors: Record<string, { bg: string; badge: string; text: string }> = {
  A1: { bg: 'bg-blue-50', badge: 'bg-primary text-white', text: 'text-primary' },
  A2: { bg: 'bg-amber-50', badge: 'bg-accent text-white', text: 'text-accent' },
  B1: { bg: 'bg-blue-100', badge: 'bg-primary/80 text-white', text: 'text-primary' },
  B2: { bg: 'bg-amber-100', badge: 'bg-accent/90 text-white', text: 'text-accent' },
  'C1/C2': { bg: 'bg-foreground', badge: 'bg-accent text-foreground', text: 'text-white' },
};

export default function CoursesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="courses" ref={sectionRef} className="py-24 md:py-32 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="section-label mb-3">{t.courses.sectionLabel}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            {t.courses.headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t.courses.description}
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Cards 0-2: Row 1 */}
          {academyConfig.courses.slice(0, 3).map((course, i) => {
            const colors = levelColors[course.level] || levelColors['A1'];
            const isDark = course.level === 'C1/C2';
            return (
              <div
                key={course.level}
                className={`course-card reveal ${colors.bg} ${isDark ? 'border-foreground/20' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${colors.badge}`}>
                    {course.level}
                  </span>
                  <Icon name="AcademicCapIcon" size={20} className={isDark ? 'text-white/40' : 'text-muted-foreground'} />
                </div>
                <h3 className={`text-xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-foreground'}`}>
                  {course.title}
                </h3>
              </div>
            );
          })}

          {/* Card 3: B2 — col-span-2 */}
          {(() => {
            const course = academyConfig.courses[3];
            const colors = levelColors[course.level];
            return (
              <div
                className={`course-card reveal md:col-span-2 ${colors.bg}`}
                style={{ transitionDelay: '240ms' }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${colors.badge}`}>
                    {course.level}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                    <Icon name="StarIcon" size={14} className="text-accent" />
                    {t.courses.recommended}
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-foreground mb-4">{course.title}</h3>
              </div>
            );
          })()}

          {/* Card 4: C1/C2 */}
          {(() => {
            const course = academyConfig.courses[4];
            const colors = levelColors[course.level];
            return (
              <div
                className={`course-card reveal ${colors.bg}`}
                style={{ transitionDelay: '320ms' }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${colors.badge}`}>
                    {course.level}
                  </span>
                  <Icon name="TrophyIcon" size={20} className="text-accent" />
                </div>
                <h3 className="text-xl font-extrabold mb-4 text-white">{course.title}</h3>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}