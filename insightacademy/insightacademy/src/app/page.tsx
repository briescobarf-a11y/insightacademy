import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CoursesSection from './components/CoursesSection';
import AgeGroupsSection from './components/AgeGroupsSection';
import ConversationClubSection from './components/ConversationClubSection';
import WhyUsSection from './components/WhyUsSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import StatsSection from './components/StatsSection';
import FAQSection from './components/FAQSection';
import RegistrationSection from './components/RegistrationSection';
import ContactSection from './components/ContactSection';

export const metadata: Metadata = {
  title: 'Insight Academy — Cours d\'anglais à Ben Aknoun, Alger',
  description: 'Académie d\'anglais à Ben Aknoun, Alger. Formations pour tous les niveaux A1–C2, tous les âges, avec des enseignants qualifiés. Inscrivez-vous dès aujourd\'hui.',
  openGraph: {
    title: 'Insight Academy — Cours d\'anglais à Alger',
    description: 'Formations d\'anglais pour tous les niveaux et tous les âges à Ben Aknoun, Alger.',
    images: [{ url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRIL0jk_tHS1m_zxXz5ZQSK_6Ng_ekMvpYzCLmpyY2jPE7R08E8hlcq7s&s=10', width: 1200, height: 630 }],
  },
};

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <CoursesSection />
        <AgeGroupsSection />
        <ConversationClubSection />
        <WhyUsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <StatsSection />
        <FAQSection />
        <RegistrationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}