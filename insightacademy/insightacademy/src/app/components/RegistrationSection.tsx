'use client';
import React, { useState, useEffect, useRef } from 'react';



type FormData = {
  nom: string;
  telephone: string;
  email: string;
  age: string;
  niveau: string;
  formation: string;
  message: string;
};

const initialForm: FormData = {
  nom: '',
  telephone: '',
  email: '',
  age: '',
  niveau: '',
  formation: '',
  message: ''
};

const niveaux = ['Débutant complet (A1)', 'Élémentaire (A2)', 'Intermédiaire (B1)', 'Supérieur (B2)', 'Avancé (C1/C2)', 'Je ne sais pas'];
const ageCategories = ['Enfant (6-12 ans)', 'Adolescent (13-17 ans)', 'Étudiant (18-25 ans)', 'Adulte (26-40 ans)', 'Adulte (40+)'];

export default function RegistrationSection() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.nom.trim()) newErrors.nom = 'Champ requis';
    if (!form.telephone.trim()) newErrors.telephone = 'Champ requis';else
    if (!/^\+?[0-9\s]{9,15}$/.test(form.telephone.trim())) newErrors.telephone = 'Numéro invalide';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email invalide';
    if (!form.age) newErrors.age = 'Champ requis';
    if (!form.niveau) newErrors.niveau = 'Champ requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Form submission handler — connect to backend/email service here
      setSubmitted(true);
      setForm(initialForm);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    null
  );

}