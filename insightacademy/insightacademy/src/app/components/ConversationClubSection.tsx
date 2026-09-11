'use client';
import React, { useEffect, useRef } from 'react';



const clubFeatures = [
  { icon: 'MicrophoneIcon', label: 'Pratique orale', desc: 'Parlez dès le premier jour' },
  { icon: 'ChatBubbleLeftRightIcon', label: 'Vraies conversations', desc: 'Sujets du quotidien' },
  { icon: 'BookOpenIcon', label: 'Vocabulaire', desc: 'Enrichissement actif' },
  { icon: 'SpeakerWaveIcon', label: 'Prononciation', desc: 'Accent et intonation' },
  { icon: 'BoltIcon', label: 'Confiance', desc: 'Surmontez la timidité' },
  { icon: 'PuzzlePieceIcon', label: 'Activités interactives', desc: 'Jeux et débats' },
];

export default function ConversationClubSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    );
    sectionRef?.current?.querySelectorAll('.reveal')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return null;
}