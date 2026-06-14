'use client';

import { motion } from 'framer-motion';

const events = [
  {
    time: '10:00 AM',
    name: 'Mehendi Ceremony',
    venue: 'Garden Pavilion',
    description: 'A beautiful celebration of intricate henna artistry and joyful singing with family and friends.',
    icon: '🌿',
    color: 'var(--forest-light)',
  },
  {
    time: '12:00 PM',
    name: 'Haldi Ceremony',
    venue: 'Outdoor Lawn',
    description: 'Turmeric blessings and vibrant colors — a cherished ritual marking the beginning of the sacred union.',
    icon: '✨',
    color: '#e8a020',
  },
  {
    time: '05:30 PM',
    name: 'Wedding Ceremony',
    venue: 'Grand Mandap Hall',
    description: 'Sacred vows exchanged by the sacred fire as the couple begins their journey as one.',
    icon: '🔥',
    color: 'var(--blush-dark)',
  },
  {
    time: '08:00 PM',
    name: 'Wedding Reception',
    venue: 'Grand Ballroom',
    description: 'An elegant reception with dinner, music, and dancing to celebrate the newlyweds with family and friends.',
    icon: '🥂',
    color: 'var(--gold-dark)',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' as const } }),
};

export default function EventSchedule() {
  return (
    <section id="schedule" style={{ background: 'var(--forest)', padding: '6rem 1.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="font-lato"
          style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}
        >
          December 12, 2025
        </motion.p>
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
          className="font-cormorant"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, color: 'var(--ivory)', lineHeight: 1.2 }}
        >
          Wedding Day Schedule
        </motion.h2>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
          className="gold-divider"
        >
          <span style={{ fontSize: '1.2rem', color: 'var(--gold)' }}>✦</span>
        </motion.div>
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp}
          className="font-lato"
          style={{ maxWidth: '500px', margin: '0 auto', color: 'rgba(232,213,176,0.7)', lineHeight: 1.8, fontSize: '0.95rem' }}
        >
          A day filled with love, rituals, and celebration. We look forward to sharing every moment with you.
        </motion.p>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: '750px', margin: '0 auto', position: 'relative' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '0',
          bottom: '0',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.5) 10%, rgba(201,169,110,0.5) 90%, transparent)',
          transform: 'translateX(-50%)',
        }} />

        {events.map((event, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={event.name}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              style={{
                display: 'flex',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                alignItems: 'center',
                marginBottom: '2.5rem',
                position: 'relative',
              }}
            >
              {/* Card */}
              <div
                style={{
                  width: 'calc(50% - 2.5rem)',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(201,169,110,0.2)',
                  borderRadius: '4px',
                  padding: '1.5rem',
                  textAlign: isLeft ? 'right' : 'left',
                  position: 'relative',
                }}
              >
                {/* Arrow pointing to center */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  [isLeft ? 'right' : 'left']: '-8px',
                  transform: 'translateY(-50%)',
                  width: 0,
                  height: 0,
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  [isLeft ? 'borderLeft' : 'borderRight']: '8px solid rgba(201,169,110,0.2)',
                }} />

                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{event.icon}</div>
                <p className="font-lato" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  {event.time}
                </p>
                <h3 className="font-cormorant" style={{ fontSize: '1.6rem', color: 'var(--ivory)', fontWeight: 500, marginBottom: '0.3rem' }}>
                  {event.name}
                </h3>
                <p className="font-lato" style={{ fontSize: '0.75rem', color: 'rgba(201,169,110,0.8)', marginBottom: '0.6rem' }}>
                  📍 {event.venue}
                </p>
                <p className="font-lato" style={{ fontSize: '0.85rem', color: 'rgba(232,213,176,0.65)', lineHeight: 1.7 }}>
                  {event.description}
                </p>
              </div>

              {/* Center dot */}
              <div
                className="pulse-ring"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '14px',
                  height: '14px',
                  background: event.color,
                  borderRadius: '50%',
                  border: '2px solid var(--gold)',
                  zIndex: 2,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Mobile-friendly stacked layout override */}
      <style jsx global>{`
        @media (max-width: 640px) {
          #schedule [style*="calc(50%"] {
            width: calc(100% - 3rem) !important;
            text-align: left !important;
            margin-left: 3rem !important;
          }
          #schedule [style*="translateX(-50%)"] {
            left: 1.2rem !important;
            transform: none !important;
          }
          #schedule [style*="borderLeft: 8px"] {
            display: none !important;
          }
          #schedule [style*="borderRight: 8px"] {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
