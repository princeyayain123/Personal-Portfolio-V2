import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const experiences = [
  {
    year: '2022-2023',
    title: 'Virtual Map Labeller',
    company: 'Xfnite',
    description: 'Performed image labeling and annotation tasks.',
  },
  {
    year: '2024-2025',
    title: 'Freelance Front End Developer',
    company: 'Pompanette Company',
    description: 'Designed and built a user-friendly boat seat configurator for Pompanette, letting customers customize their seats with different materials, colors, and layouts.',
  },
  {
    year: '2024-Current',
    title: 'Web Developer',
    company: 'Your Asian Team Company',
    description: 'Designed and implemented responsive and user-friendly web interfaces to develop an online cybersecurity training course and conducted quality assurance testing to ensure the course.',
  },
];

const ExperienceTimeline = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress for the line
  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalHeight = rect.height - windowHeight;
    const scrolled = Math.min(Math.max(-rect.top, 0), totalHeight);
    const progress = totalHeight > 0 ? scrolled / totalHeight : 0;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Vertical line background */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 0,
          bottom: 0,
          width: '4px',
          backgroundColor: '#eee',
        }}
      />
      {/* Vertical line progress */}
      <motion.div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 0,
          width: '4px',
          backgroundColor: '#007bff',
          originY: 0,
          height: `${scrollProgress * 100}%`,
        }}
      />

      {experiences.map((exp, index) => (
        <ExperienceCard key={index} experience={exp} position={index % 2 === 0 ? 'left' : 'right'} />
      ))}
    </div>
  );
};

const ExperienceCard = ({ experience, position }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-100px', once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: 'easeOut' },
      });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: position === 'left' ? -100 : 100 }}
      animate={controls}
      style={{
        position: 'relative',
        width: '50%',
        padding: '1rem',
        textAlign: position === 'left' ? 'right' : 'left',
        marginBottom: '3rem',
        left: position === 'left' ? 0 : '50%',
      }}
    >
      <div
        style={{
          position: 'relative',
          background: '#fff',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
      >
        {/* Circle on the timeline */}
        <span
          style={{
            position: 'absolute',
            top: '1rem',
            left: position === 'left' ? 'calc(100% + 8px)' : '-14px',
            width: '12px',
            height: '12px',
            backgroundColor: '#007bff',
            borderRadius: '50%',
            border: '2px solid #fff',
          }}
        />
        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'black', fontWeight: '700' }}>{experience.title}</h3>
        <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '0.5rem' }}>{experience.company}</p>
        <p style={{ color: '#333' }}>{experience.description}</p>
        <span
          style={{
            position: 'absolute',
            top: '10px',
            fontWeight: '600',
            color: '#007bff',
            [position === 'left' ? 'right' : 'left']: '-135px',
          }}
        >
          {experience.year}
        </span>
      </div>
    </motion.div>
  );
};

export default ExperienceTimeline;
