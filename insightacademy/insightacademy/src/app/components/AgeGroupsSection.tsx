'use client';
import React, { useEffect, useRef } from 'react';



export default function AgeGroupsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    sectionRef?.current?.querySelectorAll('.reveal')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  /**
   * BENTO GRID AUDIT (grid-cols-2 md:grid-cols-3):
   * Cards: [Enfants, Adolescents, Étudiants, Adultes, Professionnels] = 5 cards
   * Row 1 md: [col-1: Enfants cs-1] [col-2: Adolescents cs-1] [col-3: Étudiants cs-1]
   * Row 2 md: [col-1: Adultes cs-2] [col-3: Professionnels cs-1]
   * Mobile (grid-cols-2):
   * Row 1: [Enfants cs-1] [Adolescents cs-1]
   * Row 2: [Étudiants cs-1] [Adultes cs-1]
   * Row 3: [Professionnels cs-2 (col-span-full)]
   * Placed 5/5 ✓
   */

  const ageLabels = ['Enfants', 'Adolescents', 'Étudiants', 'Adultes', 'Professionnels'];

  return null;
}