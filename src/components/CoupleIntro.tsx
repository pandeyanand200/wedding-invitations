'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' as const } }),
};

export default function CoupleIntro() {
  return (
    <section id="couple" style={{ background: 'var(--ivory-dark)', padding: '6rem 1.5rem' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="font-lato"
          style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}
        >
          Our Story
        </motion.p>
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
          className="font-cormorant"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, color: 'var(--forest)', lineHeight: 1.2 }}
        >
          The Happy Couple
        </motion.h2>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
          className="gold-divider"
        >
          <span style={{ fontSize: '1.2rem', color: 'var(--gold)' }}>♡</span>
        </motion.div>
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp}
          className="font-lato"
          style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--charcoal-light)', lineHeight: 1.8, fontSize: '1rem' }}
        >
          Two hearts, one love story — a journey that began with laughter and blossomed into a lifetime of togetherness.
        </motion.p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {/* Groom */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
          style={{
            background: 'var(--ivory)',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(28,43,30,0.1)',
            border: '1px solid rgba(201,169,110,0.2)',
          }}
        >
          <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
            <Image
              src="/groom.png"
              alt="Anand — the groom"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top', transition: 'transform 0.5s ease' }}
              className="couple-img"
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(28,43,30,0.7) 0%, transparent 50%)',
            }} />
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
              <span className="font-cormorant" style={{ fontSize: '2rem', color: 'var(--ivory)', fontWeight: 400 }}>The Groom</span>
            </div>
          </div>
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h3 className="font-cormorant" style={{ fontSize: '2.2rem', color: 'var(--forest)', marginBottom: '0.5rem' }}>Ritik</h3>
            <p className="font-lato" style={{ fontSize: '0.8rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Son of Mr. &amp; Mrs. Singh
            </p>
            <p className="font-lato" style={{ color: 'var(--charcoal-light)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              A warm-hearted soul with an infectious smile, Ritik brings joy and laughter wherever he goes. A passionate engineer by day and a devoted partner at heart, he has found his forever in Archi.
            </p>
          </div>
        </motion.div>

        {/* Bride */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
          style={{
            background: 'var(--ivory)',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(28,43,30,0.1)',
            border: '1px solid rgba(201,169,110,0.2)',
          }}
        >
          <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
            <Image
              src="/bride.png"
              alt="Archi — the bride"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top', transition: 'transform 0.5s ease' }}
              className="couple-img"
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(28,43,30,0.7) 0%, transparent 50%)',
            }} />
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
              <span className="font-cormorant" style={{ fontSize: '2rem', color: 'var(--ivory)', fontWeight: 400 }}>The Bride</span>
            </div>
          </div>
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h3 className="font-cormorant" style={{ fontSize: '2.2rem', color: 'var(--forest)', marginBottom: '0.5rem' }}>Archi</h3>
            <p className="font-lato" style={{ fontSize: '0.8rem', letterSpacing: '0.15em', color: 'var(--blush-dark)', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Daughter of Mr. &amp; Mrs. Gupta
            </p>
            <p className="font-lato" style={{ color: 'var(--charcoal-light)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              Graceful, kind, and endlessly creative, Archi lights up every room she enters. A talented teacher with a heart full of dreams, she has found her soulmate in Ritik.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Love quote */}
      <motion.blockquote
        initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4} variants={fadeUp}
        style={{ textAlign: 'center', maxWidth: '500px', margin: '4rem auto 0', padding: '2rem' }}
      >
        <span className="font-cormorant" style={{ fontSize: '1.6rem', fontStyle: 'italic', color: 'var(--gold-dark)', lineHeight: 1.6 }}>
          &ldquo;You are my today and all of my tomorrows.&rdquo;
        </span>
      </motion.blockquote>

      <style jsx global>{`
        .couple-img:hover { transform: scale(1.05); }
      `}</style>
    </section>
  );
}
