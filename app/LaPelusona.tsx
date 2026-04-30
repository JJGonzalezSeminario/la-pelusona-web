'use client'

import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// ============================================================================
// DICCIONARIOS DE IDIOMAS
// ============================================================================
const translations = {
  es: {
    nav: {
      about: 'Quiénes Somos',
      gallery: 'Galería',
      events: 'Eventos',
      join: 'Postulaciones',
      contact: 'Contacto'
    },
    hero: {
      claim: 'La Fonda Pa\' Todos',
      subtitle: 'Cultura, Gastronomía y Comunidad desde 2022',
      cta: 'Descubre Nuestra Historia'
    },
    about: {
      title: 'Quiénes Somos',
      text: 'La Pelusona nace en 2022 como un espacio de encuentro cultural en el corazón de Berlín. Somos una fonda que celebra la diversidad gastronómica, el arte emergente y la artesanía local. Creemos en el poder de la comida y la cultura para unir comunidades, creando experiencias memorables que trascienden fronteras.'
    },
    gallery: {
      title: 'Nuestra Historia en Imágenes',
      subtitle: 'Un viaje visual por nuestras ediciones'
    },
    events: {
      title: 'Próximos Eventos',
      subtitle: 'Únete a nuestras celebraciones culturales',
      viewCalendar: 'Ver Calendario Completo'
    },
    join: {
      title: 'Únete a Nuestra Comunidad',
      subtitle: 'Buscamos artistas, gastrónomos y artesanos',
      form: {
        name: 'Nombre Completo',
        email: 'Correo Electrónico',
        category: 'Categoría',
        categories: {
          placeholder: 'Selecciona una categoría',
          artist: 'Artista',
          chef: 'Gastrónomo',
          artisan: 'Artesano'
        },
        portfolio: 'Enlace a Portfolio/Web',
        instagram: 'Instagram (opcional)',
        message: 'Cuéntanos sobre ti',
        submit: 'Enviar Postulación'
      }
    },
    footer: {
      rights: 'Todos los derechos reservados',
      impressum: 'Impressum',
      datenschutz: 'Protección de Datos'
    }
  },
  de: {
    nav: {
      about: 'Über Uns',
      gallery: 'Galerie',
      events: 'Veranstaltungen',
      join: 'Bewerbungen',
      contact: 'Kontakt'
    },
    hero: {
      claim: 'Die Fonda Für Alle',
      subtitle: 'Kultur, Gastronomie und Gemeinschaft seit 2022',
      cta: 'Entdecke Unsere Geschichte'
    },
    about: {
      title: 'Über Uns',
      text: 'La Pelusona wurde 2022 als kultureller Treffpunkt im Herzen Berlins gegründet. Wir sind eine Fonda, die gastronomische Vielfalt, aufstrebende Kunst und lokales Handwerk feiert. Wir glauben an die Kraft von Essen und Kultur, Gemeinschaften zu vereinen und unvergessliche Erlebnisse zu schaffen, die Grenzen überschreiten.'
    },
    gallery: {
      title: 'Unsere Geschichte in Bildern',
      subtitle: 'Eine visuelle Reise durch unsere Editionen'
    },
    events: {
      title: 'Kommende Veranstaltungen',
      subtitle: 'Sei Teil unserer kulturellen Feiern',
      viewCalendar: 'Vollständigen Kalender ansehen'
    },
    join: {
      title: 'Werde Teil Unserer Gemeinschaft',
      subtitle: 'Wir suchen Künstler, Gastronomen und Handwerker',
      form: {
        name: 'Vollständiger Name',
        email: 'E-Mail-Adresse',
        category: 'Kategorie',
        categories: {
          placeholder: 'Wähle eine Kategorie',
          artist: 'Künstler',
          chef: 'Gastronom',
          artisan: 'Handwerker'
        },
        portfolio: 'Link zu Portfolio/Website',
        instagram: 'Instagram (optional)',
        message: 'Erzähl uns von dir',
        submit: 'Bewerbung senden'
      }
    },
    footer: {
      rights: 'Alle Rechte vorbehalten',
      impressum: 'Impressum',
      datenschutz: 'Datenschutz'
    }
  },
  en: {
    nav: {
      about: 'About Us',
      gallery: 'Gallery',
      events: 'Events',
      join: 'Applications',
      contact: 'Contact'
    },
    hero: {
      claim: 'The Fonda For Everyone',
      subtitle: 'Culture, Gastronomy and Community since 2022',
      cta: 'Discover Our Story'
    },
    about: {
      title: 'About Us',
      text: 'La Pelusona was born in 2022 as a cultural meeting point in the heart of Berlin. We are a fonda celebrating gastronomic diversity, emerging art, and local craftsmanship. We believe in the power of food and culture to unite communities, creating memorable experiences that transcend borders.'
    },
    gallery: {
      title: 'Our Story in Images',
      subtitle: 'A visual journey through our editions'
    },
    events: {
      title: 'Upcoming Events',
      subtitle: 'Join our cultural celebrations',
      viewCalendar: 'View Full Calendar'
    },
    join: {
      title: 'Join Our Community',
      subtitle: 'We're looking for artists, chefs, and artisans',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        category: 'Category',
        categories: {
          placeholder: 'Select a category',
          artist: 'Artist',
          chef: 'Chef',
          artisan: 'Artisan'
        },
        portfolio: 'Portfolio/Website Link',
        instagram: 'Instagram (optional)',
        message: 'Tell us about yourself',
        submit: 'Submit Application'
      }
    },
    footer: {
      rights: 'All rights reserved',
      impressum: 'Impressum',
      datenschutz: 'Privacy Policy'
    }
  }
};

// ============================================================================
// DATOS DE EVENTOS (Ejemplo - reemplazar con tus eventos reales)
// ============================================================================
const upcomingEvents = [
  {
    id: 1,
    date: '2025-05-15',
    title: { es: 'Noche de Tapas & Jazz', de: 'Tapas & Jazz Nacht', en: 'Tapas & Jazz Night' },
    description: { es: 'Una velada de música en vivo y gastronomía española', de: 'Ein Abend mit Live-Musik und spanischer Gastronomie', en: 'An evening of live music and Spanish gastronomy' }
  },
  {
    id: 2,
    date: '2025-06-20',
    title: { es: 'Festival de Artesanía Local', de: 'Lokales Handwerksfestival', en: 'Local Crafts Festival' },
    description: { es: 'Exposición y venta de artesanía berlinesa', de: 'Ausstellung und Verkauf von Berliner Handwerk', en: 'Exhibition and sale of Berlin crafts' }
  },
  {
    id: 3,
    date: '2025-07-10',
    title: { es: 'Cena Colaborativa de Verano', de: 'Kollaboratives Sommerdinner', en: 'Summer Collaborative Dinner' },
    description: { es: 'Menú especial creado por chefs invitados', de: 'Spezielles Menü von Gastköchen', en: 'Special menu by guest chefs' }
  }
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export default function LaPelusona() {
  const [language, setLanguage] = useState<'es' | 'de' | 'en'>('es');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const t = translations[language];

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Language selector component
  const LanguageSelector = () => (
    <div className="flex gap-2 items-center">
      {(['es', 'de', 'en'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            language === lang
              ? 'bg-burgundy text-white'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );

  // Navigation
  const Navigation = () => (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-navy/90 backdrop-blur-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-display text-burgundy font-bold"
        >
          La Pelusona
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {Object.entries(t.nav).map(([key, value]) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-white/80 hover:text-burgundy transition-colors font-medium"
            >
              {value}
            </a>
          ))}
          <LanguageSelector />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy/95 backdrop-blur-lg border-t border-white/10"
          >
            <div className="px-6 py-4 space-y-4">
              {Object.entries(t.nav).map(([key, value]) => (
                <a
                  key={key}
                  href={`#${key}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white/80 hover:text-burgundy transition-colors"
                >
                  {value}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10">
                <LanguageSelector />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );

  // Hero Section
  const HeroSection = () => (
    <motion.section
      id="hero"
      style={{ y: heroY, opacity: heroOpacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-navy-dark to-navy"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-burgundy/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lightblue/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        {/* Logo placeholder - REEMPLAZA CON TU LOGO */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="mb-12 flex justify-center"
        >
          <div className="w-48 h-48 bg-burgundy/20 rounded-full flex items-center justify-center border-4 border-burgundy">
            <span className="text-6xl">🍽️</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-8xl font-display font-bold text-white mb-6"
          style={{ textShadow: '0 0 40px rgba(139, 0, 0, 0.5)' }}
        >
          {t.hero.claim}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-lightblue mb-12 font-light"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 bg-burgundy text-white rounded-full font-semibold text-lg hover:bg-burgundy-light transition-all shadow-lg shadow-burgundy/50"
        >
          {t.hero.cta}
        </motion.a>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </motion.section>
  );

  // About Section
  const AboutSection = () => (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-lightblue/5 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-navy mb-8">
            {t.about.title}
          </h2>
          <div className="w-24 h-1 bg-burgundy mb-8" />
          <p className="text-xl text-gray-700 leading-relaxed">
            {t.about.text}
          </p>
        </motion.div>
      </div>
    </section>
  );

  // Gallery Section
  const GallerySection = () => {
    const editions = [
      { year: '2024', photos: 12 },
      { year: '2023', photos: 15 },
      { year: '2022', photos: 10 }
    ];

    return (
      <section id="gallery" className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
              {t.gallery.title}
            </h2>
            <p className="text-xl text-lightblue">
              {t.gallery.subtitle}
            </p>
          </motion.div>

          <div className="space-y-24">
            {editions.map((edition, index) => (
              <motion.div
                key={edition.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-4xl font-display font-bold text-burgundy mb-8">
                  Edición {edition.year}
                </h3>
                
                {/* GALERÍA - REEMPLAZAR CON TUS IMÁGENES */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...Array(edition.photos)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05, zIndex: 10 }}
                      className="aspect-square bg-gradient-to-br from-burgundy/20 to-lightblue/20 rounded-lg overflow-hidden cursor-pointer"
                    >
                      {/* MARCADOR DE POSICIÓN - Reemplazar con:
                          <img 
                            src="TU_URL_AQUI" 
                            alt={`La Pelusona ${edition.year} - Foto ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                      */}
                      <div className="w-full h-full flex items-center justify-center text-white/50">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📸</div>
                          <div className="text-xs">Foto {i + 1}</div>
                          <div className="text-xs opacity-50">{edition.year}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Events Section
  const EventsSection = () => (
    <section id="events" className="py-24 bg-gradient-to-br from-white to-lightblue/10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-navy mb-4">
            {t.events.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.events.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-xl border-2 border-burgundy/20"
            >
              <div className="text-burgundy font-bold text-sm mb-2">
                {new Date(event.date).toLocaleDateString(language, { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </div>
              <h3 className="text-2xl font-display font-bold text-navy mb-4">
                {event.title[language]}
              </h3>
              <p className="text-gray-600">
                {event.description[language]}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-navy text-white rounded-full font-semibold hover:bg-navy-dark transition-all">
            {t.events.viewCalendar}
          </button>
        </motion.div>
      </div>
    </section>
  );

  // Join/Application Section
  const JoinSection = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      category: '',
      portfolio: '',
      instagram: '',
      message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      alert('¡Gracias por tu postulación! Te contactaremos pronto.');
    };

    return (
      <section id="join" className="py-24 bg-navy">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
              {t.join.title}
            </h2>
            <p className="text-xl text-lightblue">
              {t.join.subtitle}
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 space-y-6"
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder={t.join.form.name}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-burgundy"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input
                type="email"
                name="email"
                placeholder={t.join.form.email}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-burgundy"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <select
              name="category"
              required
              value={formData.category}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-burgundy"
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="" className="text-navy">{t.join.form.categories.placeholder}</option>
              <option value="artist" className="text-navy">{t.join.form.categories.artist}</option>
              <option value="chef" className="text-navy">{t.join.form.categories.chef}</option>
              <option value="artisan" className="text-navy">{t.join.form.categories.artisan}</option>
            </select>

            <input
              type="url"
              name="portfolio"
              placeholder={t.join.form.portfolio}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-burgundy"
              onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
            />

            <input
              type="text"
              name="instagram"
              placeholder={t.join.form.instagram}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-burgundy"
              onChange={(e) => setFormData({...formData, instagram: e.target.value})}
            />

            <textarea
              name="message"
              placeholder={t.join.form.message}
              required
              rows={5}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-burgundy resize-none"
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 bg-burgundy text-white rounded-full font-semibold text-lg hover:bg-burgundy-light transition-all shadow-lg shadow-burgundy/50"
            >
              {t.join.form.submit}
            </motion.button>
          </motion.form>
        </div>
      </section>
    );
  };

  // Footer
  const Footer = () => (
    <footer className="bg-navy-dark text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-display font-bold text-burgundy mb-4">La Pelusona</h3>
            <p className="text-white/70">
              {t.hero.subtitle}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Social Media</h4>
            <div className="flex gap-4">
              {/* Reemplazar con tus enlaces sociales reales */}
              <a href="#" className="text-white/70 hover:text-burgundy transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-burgundy transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#impressum" className="block text-white/70 hover:text-burgundy transition-colors">
                {t.footer.impressum}
              </a>
              <a href="#datenschutz" className="block text-white/70 hover:text-burgundy transition-colors">
                {t.footer.datenschutz}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/50">
          <p>© 2022-2025 La Pelusona. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );

  return (
    <>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <EventsSection />
      <JoinSection />
      <Footer />
    </>
  );
}
