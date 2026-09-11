'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { academyConfig } from '@/data/academyConfig';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function Footer() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Anchor links only exist on the homepage — when on another page,
  // prefix with "/" so the link returns to the homepage's section.
  const resolveHref = (href: string) => {
    if (href.startsWith('/') || href === '#') return href;
    return isHome ? href : `/${href}`;
  };

  return (
    <footer className="border-t border-border pt-16 pb-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main footer row */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="md:max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <AppLogo size={36} />
              <span className="font-extrabold text-lg text-foreground">Insight Academy</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t?.config?.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{t?.footer?.navigation}</p>
              <ul className="space-y-2">
                {t?.config?.navLinks?.map((l) => (
                  <li key={l?.href}>
                    <Link href={resolveHref(l?.href)} className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                      {l?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{t?.footer?.foreignLanguage}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 ml-[-190px] mt-[31px]">{t?.footer?.it}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 ml-[-238px] mt-[62px]">{t?.footer?.diversTraining}</p>
              <ul className="space-y-2 ml-[-238px]">
                <li className="text-muted-foreground text-base mt-4">{t?.footer?.artsPlastiques}</li>
                <li className="text-muted-foreground text-base mt-[11px]">{t?.footer?.artTextiles}</li>
                <li className="text-muted-foreground text-base mt-[9px]">{t?.footer?.cuisine}</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{t?.footer?.contact}</p>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">{academyConfig?.address}</li>
                {academyConfig?.phones?.map((p) => (
                  <li key={p}>
                    <a href={`tel:${p?.replace(/\s/g, '')}`} className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                      {p}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${academyConfig?.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                    {academyConfig?.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">{t?.footer?.rights}</p>
          <div className="flex items-center gap-3">
            <a
              href={academyConfig?.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
            >
              <Icon name="PhotoIcon" size={16} />
            </a>
            <a
              href={academyConfig?.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
            >
              <Icon name="GlobeAltIcon" size={16} />
            </a>
            <a
              href={`mailto:${academyConfig?.email}`}
              aria-label="Email"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
            >
              <Icon name="EnvelopeIcon" size={16} />
            </a>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">{t?.footer?.privacy}</Link>
            <Link href="#" className="hover:text-foreground transition-colors">{t?.footer?.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}