export type Language = 'fr' | 'en' | 'ar';

export const SUPPORTED_LANGUAGES: { code: Language; label: string; flag: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'en', label: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ar', label: 'العربية', flag: '🇩🇿', dir: 'rtl' },
];

const translations = {
  fr: {
    // Header
    nav: {
      home: 'Accueil',
      about: 'À propos',
      courses: 'Nos formations',
      whyUs: 'Pourquoi nous',
      faq: 'FAQ',
      contact: 'Contact',
    },
    header: {
      register: "S\'inscrire",
      teacherSpace: 'Espace de formateurs',
    },
    // Hero
    hero: {
      badge: 'Insight Academy centre de formation professionnelle',
      headline: 'Apprenez les langues avec des pros',
      cta: "S\'inscrire maintenant",
      discover: 'Découvrir nos formations',
      badges: ['Tous les niveaux', 'À partir de 3 ans', 'Enseignants qualifiés', 'Formation pratique'],
      sessionCard: {
        label: 'Prochaine session',
        spots: 'Places disponibles',
      },
      scrollCue: 'Défiler',
    },
    // About
    about: {
      sectionLabel: 'À propos',
      headline: 'Bienvenue à',
      description:
        "Insight Academy est une académie algérienne dédiée à l'apprentissage des langues, avec une spécialisation dans l'enseignement de l'anglais. Notre objectif est d'aider chaque apprenant à développer ses compétences linguistiques, sa confiance et sa capacité à communiquer dans des situations réelles.",
      quote:
        '« Si tu veux aller vite, marche seul. Mais si tu veux aller loin, choisis Insight Academy. »',
      stats: [
        { label: 'Tous les niveaux', sub: 'A1 → C2' },
        { label: 'Tous les âges', sub: 'Dès 3 ans' },
        { label: 'Ben Aknoun, Alger', sub: 'City 360' },
        { label: 'Siège principal Hydra', sub: '44 rue Doudou Mokhtar Hydra Alger' },
      ],
      studentsBadge: 'Étudiants formés',
      algerianBadge: 'Académie algérienne',
    },
    // Courses
    courses: {
      sectionLabel: 'Nos programmes',
      headline: 'Nos formations de langue',
      description:
        'Du niveau débutant au niveau expert — choisissez la formation qui correspond à votre niveau et vos objectifs.',
      recommended: 'Niveau recommandé pour les professionnels',
    },
    // WhyUs
    whyUs: {
      sectionLabel: 'Nos atouts',
      headline: 'Pourquoi choisir',
      description:
        "Nous ne nous contentons pas d'enseigner l'anglais — nous vous préparons à l'utiliser dans la vraie vie, avec confiance.",
      location: 'Ben Aknoun, Alger',
      locationSub: 'City 360 logement les frères aissu BT C10 ben aknoun Alger ',
    },
    // HowItWorks
    howItWorks: {
      sectionLabel: 'Processus',
      headline: 'Comment commencer ?',
      description:
        "Quatre étapes simples pour démarrer votre parcours vers la maîtrise de l\'anglais.",
    },
    // FAQ
    faq: {
      sectionLabel: 'Questions fréquentes',
      headline: 'FAQ',
      description: 'Tout ce que vous devez savoir avant de commencer.',
    },
    // Contact
    contact: {
      sectionLabel: 'Contact',
      headline: 'Nous contacter',
      description: 'Notre équipe est disponible pour répondre à toutes vos questions.',
      benAknoun: 'Ben Aknoun',
      hydra: 'Siège principal Hydra',
      phone: 'Téléphone / WhatsApp',
      email: 'Email',
      social: 'Réseaux sociaux',
      viewMap: 'Voir sur Google Maps →',
      hydraMap: 'Hydra — Google Maps',
      benAknounMap: 'Ben Aknoun — Google Maps',
    },
    // Footer
    footer: {
      navigation: 'Navigation',
      foreignLanguage: 'Langue étrangère',
      it: 'Informatiques',
      diversTraining: 'Formation Divers',
      artsPlastiques: 'Arts Plastiques',
      artTextiles: 'Art Textiles',
      cuisine: 'Cuisine',
      contact: 'Contact',
      rights: '© 2026 Insight Academy — Tous droits réservés.',
      privacy: 'Confidentialité',
      terms: 'Conditions',
    },
    // Config translations
    config: {
      tagline: "Apprendre aujourd'hui, communiquer demain.",
      stats: [
        { label: 'Étudiants' },
        { label: 'Enseignants' },
        { label: 'Programmes' },
        { label: 'Satisfaction' },
      ],
      benefits: [
        { title: 'Enseignants Qualifiés', desc: "Des professeurs expérimentés et passionnés par l\'enseignement." },
        { title: 'Apprentissage Personnalisé', desc: 'Un parcours adapté à votre niveau, vos objectifs et votre rythme.' },
        { title: "L\'Oral en Priorité", desc: 'Méthode axée sur la communication réelle dès le premier cours.' },
        { title: 'Méthodes Modernes', desc: 'Ressources numériques, activités interactives et supports actuels.' },
        { title: 'Suivi des Progrès', desc: 'Évaluations régulières et retours personnalisés pour progresser vite.' },
        { title: 'Fait pour les Algériens', desc: 'Pédagogie adaptée au contexte et aux besoins des apprenants algériens.' },
      ],
      steps: [
        { title: 'Contactez-nous', desc: 'Appelez-nous ou remplissez le formulaire en ligne pour prendre contact.' },
        { title: 'Choisissez votre formation', desc: 'On vous recommande la formation la plus adaptée à vos objectifs.' },
        { title: 'Test de niveau', desc: "Passez un test gratuit pour identifier votre niveau actuel en anglais." },
        { title: 'Commencez à apprendre', desc: 'Rejoignez votre classe et démarrez votre parcours vers la fluidité.' },
      ],
      faq: [
        { q: "À quel âge peut-on commencer l\'anglais ?", a: "Nous accueillons les apprenants dès 3 ans. Nos cours sont adaptés à chaque tranche d'âge, des enfants aux adultes." },
        { q: 'Quels niveaux proposez-vous ?', a: "Nous couvrons tous les niveaux du CECRL : A1 (débutant complet) jusqu'au C1/C2 (niveau avancé/expert)." },
        { q: 'Comment connaître mon niveau ?', a: "Nous proposons un test de niveau gratuit à l\'inscription. Il dure environ 20 minutes et nous permet de vous orienter vers la formation idéale." },
        { q: 'Les cours sont-ils adaptés aux débutants ?', a: "Absolument. Notre programme A1 est conçu pour les personnes n\'ayant aucune connaissance préalable de l\'anglais." },
        { q: 'Proposez-vous des cours pour adultes ?', a: "Oui, nous avons des formations spécifiques pour adultes, incluant l'anglais pratique et l'anglais professionnel." },
        { q: 'Proposez-vous des cours pour enfants ?', a: "Oui, nos cours pour enfants utilisent des méthodes ludiques et interactives pour rendre l'apprentissage agréable et efficace." },
        { q: "Comment s\'inscrire ?", a: "Contactez-nous par téléphone, email ou remplissez le formulaire d'inscription sur notre site. Notre équipe vous répondra dans les 24 heures." },
        { q: 'Où se trouve Insight Academy ?', a: "Nous avons deux sièges : City 360, Les Frères Aïssou, Ben Aknoun (siège 1) et 44 rue Doudou Mokhtar, Hydra 12ème (siège 2)." },
        { q: "En tant que particulier, puis-je m'inscrire au siège principal de Hydra ?", a: "Non, le siège de Hydra est exclusivement dédié aux entreprises. Nous vous invitons à vous orienter vers le centre de Ben Aknoun, qui accueille les démarches des particuliers." },
      ],
      navLinks: [
        { label: 'Accueil', href: '#hero' },
        { label: 'À propos', href: '#about' },
        { label: 'Nos formations', href: '#courses' },
        { label: 'Pourquoi nous', href: '#why-us' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  },

  en: {
    nav: {
      home: 'Home',
      about: 'About',
      courses: 'Our Courses',
      whyUs: 'Why Us',
      faq: 'FAQ',
      contact: 'Contact',
    },
    header: {
      register: 'Register',
      teacherSpace: 'Trainer Space',
    },
    hero: {
      badge: 'Insight Academy — Professional Training Center',
      headline: 'Learn Languages with the Pros',
      cta: 'Register Now',
      discover: 'Discover Our Courses',
      badges: ['All Levels', 'From 3 years old', 'Qualified Teachers', 'Practical Training'],
      sessionCard: {
        label: 'Next Session',
        spots: 'Available Spots',
      },
      scrollCue: 'Scroll',
    },
    about: {
      sectionLabel: 'About',
      headline: 'Welcome to',
      description:
        'Insight Academy is an Algerian academy dedicated to language learning, specializing in English teaching. Our goal is to help every learner develop their language skills, confidence, and ability to communicate in real-life situations.',
      quote:
        '"If you want to go fast, go alone. But if you want to go far, choose Insight Academy."',
      stats: [
        { label: 'All Levels', sub: 'A1 → C2' },
        { label: 'All Ages', sub: 'From age 3' },
        { label: 'Ben Aknoun, Algiers', sub: 'City 360' },
        { label: 'Main Office Hydra', sub: '44 Doudou Mokhtar St, Hydra, Algiers' },
      ],
      studentsBadge: 'Students Trained',
      algerianBadge: 'Algerian Academy',
    },
    courses: {
      sectionLabel: 'Our Programs',
      headline: 'Our English Courses',
      description:
        'From beginner to expert level — choose the course that matches your level and goals.',
      recommended: 'Recommended level for professionals',
    },
    whyUs: {
      sectionLabel: 'Our Strengths',
      headline: 'Why Choose',
      description:
        "We don't just teach English — we prepare you to use it in real life, with confidence.",
      location: 'Ben Aknoun, Algiers',
      locationSub: 'City 360 logement les frères aissu BT C10 ben aknoun Alger ',
    },
    howItWorks: {
      sectionLabel: 'Process',
      headline: 'How to Get Started?',
      description: 'Four simple steps to begin your journey toward English mastery.',
    },
    faq: {
      sectionLabel: 'Frequently Asked Questions',
      headline: 'FAQ',
      description: 'Everything you need to know before getting started.',
    },
    contact: {
      sectionLabel: 'Contact',
      headline: 'Contact Us',
      description: 'Our team is available to answer all your questions.',
      benAknoun: 'Ben Aknoun',
      hydra: 'Main Office Hydra',
      phone: 'Phone / WhatsApp',
      email: 'Email',
      social: 'Social Media',
      viewMap: 'View on Google Maps →',
      hydraMap: 'Hydra — Google Maps',
      benAknounMap: 'Ben Aknoun — Google Maps',
    },
    footer: {
      navigation: 'Navigation',
      foreignLanguage: 'Foreign Language',
      it: 'IT',
      diversTraining: 'Diverse Training',
      artsPlastiques: 'Arts Plastiques',
      artTextiles: 'Art Textiles',
      cuisine: 'Cuisine',
      contact: 'Contact',
      rights: '© 2026 Insight Academy — All rights reserved.',
      privacy: 'Privacy',
      terms: 'Terms',
    },
    config: {
      tagline: 'Learn today, communicate tomorrow.',
      stats: [
        { label: 'Students' },
        { label: 'Teachers' },
        { label: 'Programs' },
        { label: 'Satisfaction' },
      ],
      benefits: [
        { title: 'Qualified Teachers', desc: 'Experienced and passionate teachers dedicated to your progress.' },
        { title: 'Personalized Learning', desc: 'A path tailored to your level, goals, and pace.' },
        { title: 'Speaking First', desc: 'Method focused on real communication from the very first class.' },
        { title: 'Modern Methods', desc: 'Digital resources, interactive activities, and up-to-date materials.' },
        { title: 'Progress Tracking', desc: 'Regular assessments and personalized feedback to help you improve fast.' },
        { title: 'Made for Algerians', desc: 'Teaching adapted to the context and needs of Algerian learners.' },
      ],
      steps: [
        { title: 'Contact Us', desc: 'Call us or fill out the online form to get in touch.' },
        { title: 'Choose Your Course', desc: 'We recommend the most suitable course for your goals.' },
        { title: 'Level Test', desc: 'Take a free test to identify your current English level.' },
        { title: 'Start Learning', desc: 'Join your class and begin your journey toward fluency.' },
      ],
      faq: [
        { q: 'At what age can you start learning English?', a: 'We welcome learners from age 3. Our courses are adapted to every age group, from children to adults.' },
        { q: 'What levels do you offer?', a: 'We cover all CEFR levels: A1 (complete beginner) through C1/C2 (advanced/expert level).' },
        { q: 'How do I know my level?', a: 'We offer a free level test at registration. It takes about 20 minutes and helps us guide you to the ideal course.' },
        { q: 'Are the courses suitable for beginners?', a: 'Absolutely. Our A1 program is designed for people with no prior knowledge of English.' },
        { q: 'Do you offer courses for adults?', a: 'Yes, we have specific training for adults, including practical and professional English.' },
        { q: 'Do you offer courses for children?', a: 'Yes, our children\'s courses use fun and interactive methods to make learning enjoyable and effective.' },
        { q: 'How do I register?', a: 'Contact us by phone, email, or fill out the registration form on our website. Our team will respond within 24 hours.' },
        { q: 'Where is Insight Academy located?', a: 'We have two locations: City 360, Les Frères Aïssou, Ben Aknoun (location 1) and 44 Doudou Mokhtar St, Hydra 12th (location 2).' },
        { q: 'As an individual, can I register at the Hydra main office?', a: 'No, the Hydra office is exclusively dedicated to companies. We invite you to visit the Ben Aknoun center, which handles individual registrations.' },
      ],
      navLinks: [
        { label: 'Home', href: '#hero' },
        { label: 'About', href: '#about' },
        { label: 'Our Courses', href: '#courses' },
        { label: 'Why Us', href: '#why-us' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  },

  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      courses: 'دوراتنا',
      whyUs: 'لماذا نحن',
      faq: 'الأسئلة الشائعة',
      contact: 'اتصل بنا',
    },
    header: {
      register: 'التسجيل',
      teacherSpace: 'فضاء المدربين',
    },
    hero: {
      badge: 'أكاديمية إنسايت — مركز التكوين المهني',
      headline: 'تعلّم اللغات مع المحترفين',
      cta: 'سجّل الآن',
      discover: 'اكتشف دوراتنا',
      badges: ['جميع المستويات', 'من 3 سنوات', 'مدرّبون مؤهّلون', 'تدريب عملي'],
      sessionCard: {
        label: 'الدورة القادمة',
        spots: 'الأماكن المتاحة',
      },
      scrollCue: 'تمرير',
    },
    about: {
      sectionLabel: 'من نحن',
      headline: 'مرحباً بكم في',
      description:
        'أكاديمية إنسايت هي أكاديمية جزائرية متخصصة في تعليم اللغات، مع تركيز خاص على تدريس اللغة الإنجليزية. هدفنا مساعدة كل متعلم على تطوير مهاراته اللغوية وثقته بنفسه وقدرته على التواصل في المواقف الحقيقية.',
      quote: '«إذا أردت أن تسير بسرعة، سر وحدك. لكن إذا أردت أن تذهب بعيداً، اختر أكاديمية إنسايت.»',
      stats: [
        { label: 'جميع المستويات', sub: 'A1 → C2' },
        { label: 'جميع الأعمار', sub: 'من عمر 3 سنوات' },
        { label: 'بن عكنون، الجزائر', sub: 'City 360' },
        { label: 'المقر الرئيسي حيدرة', sub: '44 شارع دودو مختار حيدرة الجزائر' },
      ],
      studentsBadge: 'طالب مُدرَّب',
      algerianBadge: 'أكاديمية جزائرية',
    },
    courses: {
      sectionLabel: 'برامجنا',
      headline: 'دورات اللغة الإنجليزية',
      description: 'من المستوى المبتدئ إلى الخبير — اختر الدورة التي تناسب مستواك وأهدافك.',
      recommended: 'المستوى الموصى به للمحترفين',
    },
    whyUs: {
      sectionLabel: 'مميزاتنا',
      headline: 'لماذا تختار',
      description: 'نحن لا نكتفي بتعليم الإنجليزية — بل نُعدّك لاستخدامها في الحياة الواقعية بثقة.',
      location: 'بن عكنون، الجزائر',
      locationSub: 'City 360، الإخوة عيسو',
    },
    howItWorks: {
      sectionLabel: 'الخطوات',
      headline: 'كيف تبدأ؟',
      description: 'أربع خطوات بسيطة لبدء رحلتك نحو إتقان اللغة الإنجليزية.',
    },
    faq: {
      sectionLabel: 'الأسئلة الشائعة',
      headline: 'الأسئلة الشائعة',
      description: 'كل ما تحتاج معرفته قبل البدء.',
    },
    contact: {
      sectionLabel: 'اتصل بنا',
      headline: 'تواصل معنا',
      description: 'فريقنا متاح للإجابة على جميع أسئلتك.',
      benAknoun: 'بن عكنون',
      hydra: 'المقر الرئيسي حيدرة',
      phone: 'هاتف / واتساب',
      email: 'البريد الإلكتروني',
      social: 'وسائل التواصل الاجتماعي',
      viewMap: 'عرض على خرائط جوجل ←',
      hydraMap: 'حيدرة — خرائط جوجل',
      benAknounMap: 'بن عكنون — خرائط جوجل',
    },
    footer: {
      navigation: 'التنقل',
      foreignLanguage: 'اللغات الأجنبية',
      it: 'الإعلام الآلي',
      diversTraining: 'تكوينات متنوعة',
      artsPlastiques: 'الفنون التشكيلية',
      artTextiles: 'فن النسيج',
      cuisine: 'الطبخ',
      contact: 'اتصل بنا',
      rights: '© 2026 أكاديمية إنسايت — جميع الحقوق محفوظة.',
      privacy: 'الخصوصية',
      terms: 'الشروط',
    },
    config: {
      tagline: 'تعلّم اليوم، تواصل غداً.',
      stats: [
        { label: 'طالب' },
        { label: 'مدرّب' },
        { label: 'برنامج' },
        { label: 'رضا' },
      ],
      benefits: [
        { title: 'مدرّبون مؤهّلون', desc: 'أساتذة ذوو خبرة وشغف بالتعليم.' },
        { title: 'تعلّم مخصّص', desc: 'مسار مُكيَّف مع مستواك وأهدافك وإيقاعك.' },
        { title: 'الكلام أولاً', desc: 'منهجية تركّز على التواصل الحقيقي منذ الدرس الأول.' },
        { title: 'أساليب حديثة', desc: 'موارد رقمية وأنشطة تفاعلية ومواد محدّثة.' },
        { title: 'متابعة التقدم', desc: 'تقييمات منتظمة وتغذية راجعة شخصية للتقدم السريع.' },
        { title: 'مصمَّم للجزائريين', desc: 'بيداغوجيا مُكيَّفة مع السياق واحتياجات المتعلمين الجزائريين.' },
      ],
      steps: [
        { title: 'تواصل معنا', desc: 'اتصل بنا أو املأ النموذج الإلكتروني للتواصل.' },
        { title: 'اختر دورتك', desc: 'نوصيك بالدورة الأنسب لأهدافك.' },
        { title: 'اختبار المستوى', desc: 'أجرِ اختباراً مجانياً لتحديد مستواك الحالي في الإنجليزية.' },
        { title: 'ابدأ التعلّم', desc: 'انضم إلى فصلك وابدأ رحلتك نحو الطلاقة.' },
      ],
      faq: [
        { q: 'في أي سن يمكن البدء بتعلم الإنجليزية؟', a: 'نستقبل المتعلمين من سن 3 سنوات. دوراتنا مُكيَّفة مع كل فئة عمرية، من الأطفال إلى البالغين.' },
        { q: 'ما المستويات التي تقدمونها؟', a: 'نغطي جميع مستويات CECRL: من A1 (مبتدئ تماماً) إلى C1/C2 (متقدم/خبير).' },
        { q: 'كيف أعرف مستواي؟', a: 'نقدم اختبار مستوى مجاني عند التسجيل. يستغرق حوالي 20 دقيقة ويساعدنا في توجيهك نحو الدورة المثالية.' },
        { q: 'هل الدورات مناسبة للمبتدئين؟', a: 'بالتأكيد. برنامج A1 مصمم للأشخاص الذين ليس لديهم أي معرفة مسبقة بالإنجليزية.' },
        { q: 'هل تقدمون دورات للبالغين؟', a: 'نعم، لدينا تكوينات خاصة للبالغين، تشمل الإنجليزية العملية والمهنية.' },
        { q: 'هل تقدمون دورات للأطفال؟', a: 'نعم، تستخدم دوراتنا للأطفال أساليب ممتعة وتفاعلية لجعل التعلم ممتعاً وفعالاً.' },
        { q: 'كيف أسجّل؟', a: 'تواصل معنا عبر الهاتف أو البريد الإلكتروني أو املأ نموذج التسجيل على موقعنا. سيرد فريقنا خلال 24 ساعة.' },
        { q: 'أين تقع أكاديمية إنسايت؟', a: 'لدينا مقران: City 360، الإخوة عيسو، بن عكنون (المقر 1) و44 شارع دودو مختار، حيدرة (المقر 2).' },
        { q: 'هل يمكنني كفرد التسجيل في المقر الرئيسي بحيدرة؟', a: 'لا، مقر حيدرة مخصص حصراً للشركات. ندعوك للتوجه إلى مركز بن عكنون الذي يستقبل الأفراد.' },
      ],
      navLinks: [
        { label: 'الرئيسية', href: '#hero' },
        { label: 'من نحن', href: '#about' },
        { label: 'دوراتنا', href: '#courses' },
        { label: 'لماذا نحن', href: '#why-us' },
        { label: 'الأسئلة الشائعة', href: '#faq' },
        { label: 'اتصل بنا', href: '#contact' },
      ],
    },
  },
};

export type Translations = typeof translations.fr;

export function getTranslations(language: Language): Translations {
  return translations[language] ?? translations.fr;
}
