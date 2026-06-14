'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const photos = [
  { src: '/gallery_1.png', alt: 'Couple at sunset' },
  { src: '/gallery_2.png', alt: 'Hands with henna and rings' },
  { src: '/gallery_3.png', alt: 'Wedding mandap ceremony' },
  { src: '/gallery_4.png', alt: 'Haldi ceremony' },
  { src: '/gallery_5.png', alt: 'Wedding reception' },
  { src: '/gallery_6.png', alt: 'Mehendi ceremony' },
];

const slides = photos.map(p => ({ src: p.src }));

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' as const } }),
};

export default function PhotoGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  return (
    <section id="gallery" style={{ background: 'var(--forest)', padding: '6rem 1.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="font-lato"
          style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}
        >
          Memories
        </motion.p>
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
          className="font-cormorant"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, color: 'var(--ivory)', lineHeight: 1.2 }}
        >
          Photo Gallery
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
          style={{ maxWidth: '500px', margin: '0 auto', color: 'rgba(232,213,176,0.65)', lineHeight: 1.8 }}
        >
          A collection of cherished moments from our journey together.
        </motion.p>
      </div>

      {/* Masonry Grid */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          columns: '3',
          columnGap: '1rem',
        }}
      >
        {photos.map((photo, i) => (
          <motion.div
            key={photo.src}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            variants={fadeUp}
            onClick={() => openLightbox(i)}
            style={{
              position: 'relative',
              breakInside: 'avoid',
              marginBottom: '1rem',
              cursor: 'pointer',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '2px solid rgba(201,169,110,0.15)',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingBottom: i % 3 === 1 ? '130%' : '80%',
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                className="gallery-img"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div
                className="gallery-overlay"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(28,43,30,0)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.3s ease',
                }}
              >
                <span style={{ fontSize: '2rem', opacity: 0, transition: 'opacity 0.3s ease' }} className="gallery-icon">🔍</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={currentIndex}
          styles={{ container: { backgroundColor: 'rgba(10,10,10,0.95)' } }}
        />
      )}

      <style jsx global>{`
        .gallery-img:hover { transform: scale(1.08); }
        .gallery-img:hover + .gallery-overlay,
        .gallery-img:hover ~ .gallery-overlay { background: rgba(28,43,30,0.5) !important; }
        div:hover > div > .gallery-overlay { background: rgba(28,43,30,0.5) !important; }
        div:hover > div > .gallery-overlay .gallery-icon { opacity: 1 !important; }
        @media (max-width: 640px) {
          #gallery [style*="columns: 3"] { columns: 2 !important; }
        }
      `}</style>
    </section>
  );
}
