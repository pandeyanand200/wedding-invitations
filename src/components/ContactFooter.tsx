'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, Heart, Share2 } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const } }),
};

const contacts = [
  {
    icon: <Phone size={20} />,
    label: 'Ritik',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: <Phone size={20} />,
    label: 'Archi',
    value: '+91 87654 32109',
    href: 'tel:+918765432109',
  },
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'ritik.archi2026@gmail.com',
    href: 'mailto:ritik.archi2026@gmail.com',
  },
  {
    icon: <MessageCircle size={20} />,
    label: 'WhatsApp',
    value: 'Chat with us',
    href: 'https://wa.me/919876543210',
  },
];

export default function ContactFooter() {
  return (
    <footer id="contact" style={{ background: 'var(--forest)', borderTop: '1px solid rgba(201,169,110,0.15)' }}>
      {/* Contact section */}
      <div style={{ padding: '5rem 1.5rem', borderBottom: '1px solid rgba(201,169,110,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="font-lato"
            style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}
          >
            Get in Touch
          </motion.p>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="font-cormorant"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, color: 'var(--ivory)', lineHeight: 1.2 }}
          >
            Contact Us
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
            className="gold-divider"
          >
            <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>✦</span>
          </motion.div>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp}
            className="font-lato"
            style={{ maxWidth: '480px', margin: '0 auto', color: 'rgba(232,213,176,0.65)', lineHeight: 1.8 }}
          >
            Have questions or need assistance? Reach out and we&apos;ll be happy to help.
          </motion.p>
        </div>

        {/* Contact Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          maxWidth: '850px',
          margin: '0 auto',
        }}>
          {contacts.map(({ icon, label, value, href }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.5rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(201,169,110,0.2)',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              whileHover={{ background: 'rgba(201,169,110,0.1)', borderColor: 'rgba(201,169,110,0.5)', y: -4 }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
              }}>
                {icon}
              </div>
              <div style={{ textAlign: 'center' }}>
                <p className="font-lato" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.2rem' }}>
                  {label}
                </p>
                <p className="font-lato" style={{ fontSize: '0.9rem', color: 'var(--ivory)', wordBreak: 'break-all' }}>
                  {value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Social */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4} variants={fadeUp}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <p className="font-lato" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.7)', marginBottom: '1rem' }}>
            Follow Our Journey
          </p>
          <a
            href="https://www.instagram.com/kumarhritiksingh"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.6rem 1.5rem',
              border: '1px solid rgba(201,169,110,0.4)',
              borderRadius: '100px',
              color: 'var(--gold)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <Share2 size={18} />
            <span className="font-lato" style={{ fontSize: '0.85rem' }}>#RitikArchi2026</span>
          </a>
        </motion.div>
      </div>

      {/* Footer bottom */}
      <div style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="font-cormorant" style={{ fontSize: '1.3rem', color: 'rgba(232,213,176,0.6)' }}>Anand</span>
          <Heart size={14} fill="var(--blush)" color="var(--blush)" />
          <span className="font-cormorant" style={{ fontSize: '1.3rem', color: 'rgba(232,213,176,0.6)' }}>Priya</span>
        </div>
        <p className="font-lato" style={{ fontSize: '0.75rem', color: 'rgba(232,213,176,0.35)', letterSpacing: '0.05em' }}>
          December 12, 2026 · Patna , Bihar , India
        </p>
        <p className="font-lato" style={{ fontSize: '0.7rem', color: 'rgba(201,169,110,0.3)', marginTop: '0.5rem' }}>
          Made with ♡ for the most special day of our lives
        </p>
      </div>
    </footer>
  );
}
