'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Countdown from './Countdown';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Floating petals animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const petals: {
      x: number; y: number; r: number; rot: number;
      vx: number; vy: number; vr: number; alpha: number;
      color: string;
    }[] = [];

    const colors = ['#e8b4b8', '#c9a96e', '#fce4d6', '#f9c8cc'];
    for (let i = 0; i < 40; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 6 + 3,
        rot: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.5 + 0.2),
        vr: (Math.random() - 0.5) * 0.02,
        alpha: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of petals) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 1.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;

        if (p.y < -20) { p.y = canvas.height + 20; p.x = Math.random() * canvas.width; }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <Image
        src="/couple_hero.png"
        alt="Ritik and Archi — wedding couple"
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(28,43,30,0.55) 0%, rgba(10,10,10,0.65) 100%)',
        }}
      />

      {/* Petal canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '2rem 1.5rem', maxWidth: '800px' }}>
        {/* Top ornament */}
        <div style={{ marginBottom: '1.5rem' }}>
          <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 15 Q30 0 60 15 Q90 30 120 15" stroke="#c9a96e" strokeWidth="1" fill="none" opacity="0.8"/>
            <circle cx="60" cy="15" r="3" fill="#c9a96e" opacity="0.9"/>
            <circle cx="20" cy="12" r="2" fill="#c9a96e" opacity="0.6"/>
            <circle cx="100" cy="12" r="2" fill="#c9a96e" opacity="0.6"/>
          </svg>
        </div>

        <p style={{ fontFamily: 'var(--font-lato)', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(232,213,176,0.9)', marginBottom: '1rem' }}>
          Together with their families
        </p>

        <h1
          className="font-cormorant shimmer-text"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '0.5rem' }}
        >
          Ritik
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', margin: '0.5rem 0' }}>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, #c9a96e)' }} />
          <span className="font-cormorant" style={{ fontSize: '2rem', color: '#e8b4b8', fontStyle: 'italic' }}>&amp;</span>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, #c9a96e)' }} />
        </div>

        <h1
          className="font-cormorant shimmer-text"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '2rem' }}
        >
          Archi
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ height: '1px', flex: 1, maxWidth: '80px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5))' }} />
          <p className="font-lato" style={{ fontSize: '1rem', color: 'rgba(232,213,176,0.9)', letterSpacing: '0.1em' }}>
            Friday, December 12 · 2026
          </p>
          <div style={{ height: '1px', flex: 1, maxWidth: '80px', background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.5))' }} />
        </div>

        <p className="font-lato" style={{ fontSize: '0.85rem', color: 'rgba(232,213,176,0.7)', letterSpacing: '0.08em', marginBottom: '2.5rem' }}>
          Grand Ballroom, The Taj Palace · New Delhi
        </p>

        {/* Countdown */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Countdown />
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="#rsvp" className="btn-gold">
            RSVP Now
          </Link>
          <Link href="#schedule" className="btn-outline-gold" style={{ color: 'var(--gold-light)', borderColor: 'var(--gold-light)' }}>
            View Schedule
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          animation: 'bounce 2s infinite',
        }}
      >
        <span className="font-lato" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(232,213,176,0.6)', textTransform: 'uppercase' }}>Scroll</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4 L10 16 M5 11 L10 16 L15 11" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </section>
  );
}
