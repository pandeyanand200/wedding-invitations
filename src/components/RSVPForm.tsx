'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitRSVP, type RSVPData } from '@/lib/rsvp';
import { CheckCircle, AlertCircle, Loader2, Heart } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const } }),
};

const defaultForm: RSVPData = {
  name: '',
  email: '',
  phone: '',
  guests: 1,
  attending: 'yes',
  dietary: '',
  message: '',
};

export default function RSVPForm() {
  const [form, setForm] = useState<RSVPData>(defaultForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'guests' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await submitRSVP(form);
      if (res.success) {
        setStatus('success');
        setForm(defaultForm);
      } else {
        setStatus('error');
        setErrorMsg(res.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setStatus('error');
      setErrorMsg('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <section
      id="rsvp"
      style={{
        background: 'linear-gradient(135deg, var(--ivory-dark) 0%, var(--ivory) 100%)',
        padding: '6rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `radial-gradient(circle, var(--gold) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative' }}>
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="font-lato"
          style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}
        >
          Join the Celebration
        </motion.p>
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
          className="font-cormorant"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, color: 'var(--forest)', lineHeight: 1.2 }}
        >
          RSVP
        </motion.h2>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
          className="gold-divider"
        >
          <Heart size={16} fill="var(--gold)" color="var(--gold)" />
        </motion.div>
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp}
          className="font-lato"
          style={{ maxWidth: '500px', margin: '0 auto', color: 'var(--charcoal-light)', lineHeight: 1.8 }}
        >
          Kindly confirm your attendance by <strong style={{ color: 'var(--gold-dark)' }}>November 30, 2026</strong>
        </motion.p>
      </div>

      {/* Form */}
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          background: 'var(--ivory)',
          border: '1px solid rgba(201,169,110,0.25)',
          borderRadius: '4px',
          padding: '2.5rem',
          boxShadow: '0 20px 60px rgba(28,43,30,0.1)',
          position: 'relative',
        }}
      >
        {/* Top gold bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(to right, var(--gold-dark), var(--gold), var(--blush), var(--gold))' }} />

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <CheckCircle size={60} color="var(--forest)" style={{ margin: '0 auto 1rem' }} />
            <h3 className="font-cormorant" style={{ fontSize: '2rem', color: 'var(--forest)', marginBottom: '0.75rem' }}>
              Thank you!
            </h3>
            <p className="font-lato" style={{ color: 'var(--charcoal-light)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Your RSVP has been received. We can&apos;t wait to celebrate with you!
            </p>
            <button className="btn-outline-gold" onClick={() => setStatus('idle')}>Submit Another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '1.2rem' }}>
              <div>
                <label className="font-lato" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '0.4rem' }}>
                  Full Name *
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="font-lato" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '0.4rem' }}>
                  Email Address *
                </label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="font-lato" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '0.4rem' }}>
                  Phone Number
                </label>
                <input
                  className="form-input"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="font-lato" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '0.4rem' }}>
                  Number of Guests
                </label>
                <input
                  className="form-input"
                  type="number"
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  min={1}
                  max={10}
                />
              </div>
            </div>

            {/* Attending */}
            <div style={{ marginBottom: '1.2rem' }}>
              <label className="font-lato" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '0.75rem' }}>
                Will You Be Attending? *
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {(['yes', 'no', 'maybe'] as const).map(option => (
                  <label
                    key={option}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.6rem 1.2rem',
                      border: `1px solid ${form.attending === option ? 'var(--gold)' : 'var(--gold-light)'}`,
                      borderRadius: '2px',
                      cursor: 'pointer',
                      background: form.attending === option ? 'rgba(201,169,110,0.12)' : 'transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value={option}
                      checked={form.attending === option}
                      onChange={handleChange}
                      style={{ display: 'none' }}
                    />
                    <span className="font-lato" style={{ fontSize: '0.85rem', color: form.attending === option ? 'var(--gold-dark)' : 'var(--charcoal-light)', textTransform: 'capitalize' }}>
                      {option === 'yes' ? '✓ Joyfully Accept' : option === 'no' ? '✗ Regretfully Decline' : '? Tentatively'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dietary */}
            <div style={{ marginBottom: '1.2rem' }}>
              <label className="font-lato" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '0.4rem' }}>
                Dietary Requirements
              </label>
              <select className="form-input" name="dietary" value={form.dietary} onChange={handleChange}>
                <option value="">No special requirements</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="jain">Jain</option>
                <option value="gluten-free">Gluten Free</option>
                <option value="halal">Halal</option>
                <option value="other">Other (mention in message)</option>
              </select>
            </div>

            {/* Message */}
            <div style={{ marginBottom: '1.8rem' }}>
              <label className="font-lato" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '0.4rem' }}>
                A Note for the Couple
              </label>
              <textarea
                className="form-input"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Share your wishes for the happy couple..."
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Error */}
            {status === 'error' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '4px', marginBottom: '1rem' }}>
                <AlertCircle size={18} color="#dc2626" />
                <span className="font-lato" style={{ fontSize: '0.85rem', color: '#dc2626' }}>{errorMsg}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn-gold"
              disabled={status === 'loading'}
              style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
            >
              {status === 'loading' ? (
                <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Submitting...</>
              ) : (
                <><Heart size={16} /> Confirm RSVP</>
              )}
            </button>

            <style>{`
              @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
          </form>
        )}
      </motion.div>
    </section>
  );
}
