'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';
import { SUPPORTED_LANGUAGES, getTranslations } from '@/lib/i18n';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = getTranslations(language);
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Anchor links only exist on the homepage — when on another page,
  // prefix with "/" so the link returns to the homepage's section.
  const resolveHref = (href: string) => {
    if (href.startsWith('/') || href === '#') return href;
    return isHome ? href : `/${href}`;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const onScroll = () => setMenuOpen(false);
      window.addEventListener('scroll', onScroll, { passive: true, once: true });
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = () => setLangOpen(false);
    if (langOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [langOpen]);

  const currentLang = SUPPORTED_LANGUAGES?.find((l) => l?.code === language) || SUPPORTED_LANGUAGES?.[0];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-18 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href={resolveHref('#hero')} className="flex items-center gap-2.5 flex-shrink-0">
            <AppLogo size={36} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {t?.config?.navLinks?.map((link) => (
              <Link
                key={link?.href}
                href={resolveHref(link?.href)}
                className={`nav-link text-sm transition-colors ${
                  scrolled ? 'text-foreground hover:text-primary' : 'text-white/85 hover:text-white'
                }`}
              >
                {link?.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher Desktop */}
            <div className="relative hidden sm:block" onClick={(e) => e?.stopPropagation()}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium border transition-all ${
                  scrolled
                    ? 'border-border text-foreground hover:border-primary'
                    : 'border-white/30 text-white hover:border-white'
                }`}
              >
                <span>{currentLang?.flag}</span>
                <span className={`text-sm no-underline ${scrolled ? 'text-foreground' : 'text-white'}`}>{currentLang?.code?.toUpperCase()}</span>
                <Icon name="ChevronDownIcon" size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-lg border border-border overflow-hidden z-50 min-w-[140px]">
                  {SUPPORTED_LANGUAGES?.map((lang) => (
                    <button
                      key={lang?.code}
                      onClick={() => { setLanguage(lang?.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary ${
                        language === lang?.code ? 'text-primary bg-secondary' : 'text-foreground'
                      }`}
                    >
                      <span>{lang?.flag}</span>
                      <span>{lang?.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <Link
              href="/inscription"
              className="text-sm px-5 py-2.5 hidden sm:inline-flex rounded-full font-semibold border-2 border-primary bg-white transition-all duration-300 hover:bg-primary hover:text-white text-primary"
            >
              {t?.header?.register}
            </Link>
            <Link
              href="/inscription-enseignant"
              className="text-sm px-5 py-2.5 hidden sm:inline-flex rounded-full font-semibold border-2 border-primary bg-white transition-all duration-300 hover:bg-primary hover:text-white text-primary"
            >
              {t?.header?.teacherSpace}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-primary' : 'text-white'
              }`}
              aria-label="Menu"
            >
              <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/95 backdrop-blur-md flex flex-col pt-20 px-6 pb-8 lg:hidden">
          <nav className="flex flex-col gap-2 flex-1">
            {t?.config?.navLinks?.map((link) => (
              <Link
                key={link?.href}
                href={resolveHref(link?.href)}
                onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-white text-xl font-semibold py-3 border-b border-white/10 transition-colors"
              >
                {link?.label}
              </Link>
            ))}
          </nav>
          {/* Lang switcher mobile */}
          <div className="flex gap-3 mt-6 mb-4">
            {SUPPORTED_LANGUAGES?.map((lang) => (
              <button
                key={lang?.code}
                onClick={() => setLanguage(lang?.code)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium border transition-all ${
                  language === lang?.code
                    ? 'bg-primary text-white border-primary' :'border-white/20 text-white/60 hover:text-white'
                }`}
              >
                {lang?.flag} {lang?.label}
              </button>
            ))}
          </div>
          <Link
            href="/inscription"
            onClick={() => setMenuOpen(false)}
            className="btn-accent justify-center text-base"
          >
            {t?.header?.register}
          </Link>
        </div>
      )}
    </>
  );
}