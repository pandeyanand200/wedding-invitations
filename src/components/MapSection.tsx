'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

const MAPS_URL = process.env.NEXT_PUBLIC_MAPS_URL || 'https://maps.google.com/?q=The+Taj+Palace+New+Delhi';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' as const } }),
};

export default function MapSection() {
  return (
    <section id="location" style={{ background: 'var(--ivory)', padding: '6rem 1.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="font-lato"
          style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}
        >
          Find Us
        </motion.p>
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
          className="font-cormorant"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, color: 'var(--forest)', lineHeight: 1.2 }}
        >
          Venue & Location
        </motion.h2>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
          className="gold-divider"
        >
          <span style={{ fontSize: '1.2rem', color: 'var(--gold)' }}>📍</span>
        </motion.div>
      </div>

      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}
      >
        {/* Venue Info */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div style={{
              width: '50px', height: '50px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <MapPin size={22} color="white" />
            </div>
            <div>
              <h3 className="font-cormorant" style={{ fontSize: '1.8rem', color: 'var(--forest)', marginBottom: '0.3rem' }}>
                Taj City Centre, Patna
              </h3>
              <p className="font-lato" style={{ color: 'var(--charcoal-light)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                Taj City Centre mall, Opposite Lodipur Fire Station<br />
                 Buddh Marg<br />
                patna, 800001<br />
                India
              </p>
            </div>
          </div>

          {/* Details cards */}
          {[
            { label: 'Wedding Date', value: 'Friday, December 12, 2026' },
            { label: 'Ceremony Time', value: '5:30 PM onwards' },
            { label: 'Dress Code', value: 'Traditional / Formal Attire' },
            { label: 'Parking', value: 'Complimentary valet parking' },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.9rem 0',
                borderBottom: '1px solid rgba(201,169,110,0.2)',
              }}
            >
              <span className="font-lato" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-dark)' }}>
                {label}
              </span>
              <span className="font-lato" style={{ fontSize: '0.9rem', color: 'var(--charcoal)', fontWeight: 400 }}>
                {value}
              </span>
            </div>
          ))}

          <div style={{ marginTop: '2rem' }}>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <Navigation size={16} />
              Get Directions
            </a>
          </div>
        </motion.div>

        {/* Map Embed */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
          style={{
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 12px 50px rgba(28,43,30,0.15)',
            border: '3px solid rgba(201,169,110,0.3)',
            position: 'relative',
          }}
        >
          <iframe
            src="https://maps.google.com/maps?q=Taj%20City%20Centre%20Patna&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="350"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding venue location"
          />
        </motion.div>
      </div>
    </section>
  );
}
