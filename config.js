// Clinic data. One clinic = one copy of this file; index.html, styles.css and app.js stay the same.
// All Dent, Astana. Source: 2GIS card 70000001089480089 (Nov 2026). Demo template: config.demo.js.
window.CLINIC = {
  name: 'All Dent',
  tagline: 'Стоматологическая клиника',
  city: 'Астана',
  title: ['Ваша улыбка —', 'наша забота'], // second line is highlighted
  lead: 'Лечение, имплантация, ортодонтия и лечение детей во сне. Бесплатная консультация и 3D-снимок прямо в клинике.',
  theme: 'blue', // 'blue' | 'dark' | 'warm'; ?theme=dark in the URL overrides it for demos
  whatsapp: '77472519595', // digits only, booking requests go here
  instagram: 'https://instagram.com/alldent.kz',
  heroImage: 'assets/tooth-ring.webp',
  heroRing: true, // the render already has its own ring: hide the CSS ring and pin labels to the drawn one
  bandImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1800&q=80',
  chips: ['Имплантация', 'Терапия', 'Лечение во сне'], // keep short (1–2 words) so labels stay in the white space // labels on the hero orbit: top-right, left, bottom-right
  stats: [
    ['4.9', 'рейтинг в 2ГИС'],
    ['890+', 'отзывов пациентов'],
    ['7/7', 'без выходных, 09:00–21:00'],
  ],
  advantages: [
    ['Бесплатная консультация', 'Осмотр, план лечения и стоимость — до начала работ.'],
    ['Лечение во сне', 'Детей лечим под Севораном с анестезиологом — спокойно и без страха.'],
    ['3D-снимок в клинике', 'Рентген челюстей и пазух на месте — точная диагностика без поездок.'],
    ['Рассрочка 0-0-24', 'Лечение и имплантация без переплаты, оплата частями.'],
    ['Гарантия', 'Гарантия на выполненные работы.'],
  ],
  services: [
    // image (3D render) wins over icon; services with images go first
    { image: 'assets/cracked.webp', icon: 'tooth', name: 'Терапия', text: 'Лечение кариеса, пульпита и периодонтита.', from: 25000 },
    { image: 'assets/implant.webp', icon: 'screwdriver', name: 'Имплантация', text: 'Южнокорейские, швейцарские и немецкие импланты.', from: 79999 },
    { image: 'assets/braces.webp', icon: 'smiley', name: 'Ортодонтия', text: 'Брекеты и коррекция прикуса.', from: 80000 },
    { image: 'assets/extraction.webp', icon: 'first-aid-kit', name: 'Хирургия', text: 'Удаление зубов любой сложности, зубы мудрости.', from: 20000 },
    { image: 'assets/crown.webp', icon: 'crown-simple', name: 'Ортопедия', text: 'Циркониевые коронки и виниры.', from: 85000 },
    { image: 'assets/sparkle.webp', icon: 'sparkle', name: 'Профчистка', text: '3 этапа: щётка, Air-Flow, ультразвук.', from: 35000 },
  ],
  about: {
    // Facts from the 2GIS card only. Founder quote is optional: { text, name, role }; ask the clinic before adding one.
    text: [
      'All Dent — стоматологическая клиника в Астане для взрослых и детей. Лечение, удаление, имплантация, брекеты, коронки и виниры — всё в одной клинике.',
      'Пациенты ставят нам 4.9 в 2ГИС: больше 890 отзывов. В 2026 году клиника — номинант 2GIS Awards.',
    ],
    points: [
      'Бесплатная консультация и план лечения до начала работ',
      '3D-рентген в клинике — точная диагностика без поездок',
      'Лечение детей во сне под Севораном с анестезиологом',
      'Импланты из Южной Кореи, Швейцарии и Германии',
      'Оплата картой, по QR, переводом и рассрочка 0-0-24',
      'Пандус для маломобильных пациентов, парковка рядом',
    ],
    quote: null,
  },
  doctors: [
    // Names from patient reviews on 2GIS: check full names, roles and get photos from the clinic before showing.
    // photo: path like 'assets/doctor1.webp' (portrait 3:4); empty = initials placeholder
    { name: 'Зарина Николаевна', role: 'Детский стоматолог, лечение во сне', exp: '', photo: '' },
    { name: 'Сураж Хамидович', role: 'Стоматолог', exp: '', photo: '' },
    { name: 'Садулла Нусратович', role: 'Стоматолог', exp: '', photo: '' },
    { name: 'Мухтар Курманияз', role: 'Стоматолог-терапевт', exp: '', photo: '' },
  ],
  prices: {
    'Консультация и снимки': [['Консультация', 0], ['3D-снимок (2 челюсти, пазухи)', 12000]],
    'Терапия': [['Лечение кариеса', 25000], ['Лечение пульпита', 55000], ['Лечение периодонтита', 60000]],
    'Гигиена': [['Профчистка в 3 этапа', 35000]],
    'Хирургия': [['Удаление зуба простое', 20000], ['Удаление зуба мудрости', 35000], ['Имплантация', 79999]],
    'Ортопедия': [['Циркониевая коронка', 85000], ['Винир', 100000]],
    'Ортодонтия': [['Американские брекеты', 80000]],
  },
  reviews: [
    // Shortened from verified 2GIS reviews, first names only.
    ['Малика', 'Деликатное и бережное лечение, быстрая связь с колл-центром. Удобно, что в клинике есть рентген для точной диагностики.'],
    ['Жанек', 'Прошла бесплатную консультацию, мне всё досконально объяснили. Дальнейшее лечение буду проходить здесь.'],
    ['Самира', 'Дочке под Севораном пролечили 10 зубов — чётко и качественно. После лечения подарили подарок и угостили мороженым.'],
  ],
  branches: [
    { address: 'ул. Кайым Мухамедханов, 6а', phone: '+7 747 251 95 95', hours: 'Ежедневно 09:00–21:00', map: 'https://2gis.kz/astana/firm/70000001089480089' },
  ],
};
