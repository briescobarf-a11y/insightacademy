'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const badgeIcons = ['AcademicCapIcon', 'UsersIcon', 'StarIcon', 'ChatBubbleLeftRightIcon'];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background image with parallax */}
      <div className="absolute inset-0 w-full h-full">
        <div ref={parallaxRef} className="absolute inset-0 w-full h-[130%] -top-[15%]">
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_152762b40-1764758458611.png"
            alt="Classroom with students engaged in English learning, bright academic environment, warm lighting"
            fill
            priority
            className="object-cover"
            sizes="100vw" />
          
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/75 via-foreground/55 to-foreground/80" />
        <div className="noise-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-sm text-white/90 reveal active -mt-1 mb-[45px]">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
          <span className="text-lg text-white/95">
            {t.hero.badge}
          </span>
        </div>

        {/* Main headline */}
        <h1 className="sm:text-6xl md:text-7xl tracking-tight mb-6 reveal active no-underline not-italic font-bold text-[71px] text-white">
          {t.hero.headline}
        </h1>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 reveal active">
          <Link href="/inscription" className="btn-accent text-base px-8 py-4 w-full sm:w-auto justify-center">
            {t.hero.cta}
            <Icon name="ArrowRightIcon" size={18} />
          </Link>
          <Link
            href="#courses"
            className="btn-secondary text-base px-8 py-4 w-full sm:w-auto justify-center border-white/30 text-white hover:bg-white hover:text-foreground">
            
            {t.hero.discover}
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 reveal active">
          {t.hero.badges.map((badge, i) =>
          <div
            key={badge}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-black/45 backdrop-blur-md border border-white/15">
            
              <Icon name={badgeIcons[i] as Parameters<typeof Icon>[0]['name']} size={16} className="text-accent" />
              {badge}
            </div>
          )}
        </div>
      </div>

      {/* Floating session card */}
      <div className="absolute bottom-10 right-6 md:right-16 glass-card rounded-2xl p-5 max-w-xs hidden md:block shadow-glass reveal active">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Icon name="AcademicCapIcon" size={20} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">{t.hero.sessionCard.label}</p>
            <p className="text-sm font-bold text-foreground">Intermediate B1</p>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{t.hero.sessionCard.spots}</span>
            <span className="font-semibold text-foreground">8 / 15</span>
          </div>
          <div className="h-2 w-full bg-border rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: '53%' }} />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 text-xs hidden md:flex">
        <span>{t.hero.scrollCue}</span>
        <Icon name="ChevronDownIcon" size={18} className="animate-bounce" />
      </div>
    </section>);

}