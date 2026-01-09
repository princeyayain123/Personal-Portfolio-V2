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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track scroll progress for the line
  const handleScroll = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Offset to start the progress a bit later
    const offset = 200;

    // How much of the container is visible in the viewport
    const scrolled = Math.min(Math.max(windowHeight - rect.top - offset, 0), rect.height);

    const progress = rect.height > 0 ? scrolled / rect.height : 0;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0rem 1rem',
      }}
    >
      {/* Vertical line background */}
      <div
        style={{
          position: 'absolute',
          left: isMobile ? '20px' : '50%',
          transform: isMobile ? 'none' : 'translateX(-50%)',
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
          left: isMobile ? '20px' : '50%',
          transform: isMobile ? 'none' : 'translateX(-50%)',
          top: 0,
          width: '4px',
          backgroundColor: '#007bff',
          originY: 0,
          height: `${scrollProgress * 100}%`,
        }}
      />

      {experiences.map((exp, index) => (
        <ExperienceCard key={index} experience={exp} position={index % 2 === 0 ? 'left' : 'right'} isMobile={isMobile} />
      ))}
    </div>
  );
};

const ExperienceCard = ({ experience, position, isMobile }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
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
      initial={{ opacity: 0, x: isMobile ? 0 : position === 'left' ? -100 : 100 }}
      animate={controls}
      style={{
        position: 'relative',
        width: isMobile ? '100%' : '50%',
        padding: '1rem',
        textAlign: isMobile ? 'left' : position === 'left' ? 'right' : 'left',
        marginBottom: '3rem',
        left: isMobile ? '0' : position === 'left' ? 0 : '50%',
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
            left: isMobile ? '-16px' : position === 'left' ? 'calc(100% + 10px)' : '-22px',
            width: '12px',
            height: '12px',
            backgroundColor: '#007bff',
            borderRadius: '50%',
            border: '2px solid #fff',
          }}
        />
        <h3 style={{ fontWeight: '700', marginBottom: '0.5rem', color: 'black' }}>{experience.title}</h3>
        <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '0.5rem' }}>{experience.company}</p>
        <p style={{ color: '#333' }}>{experience.description}</p>
        <span
          style={{
            display: 'block',
            marginTop: '0.5rem',
            fontWeight: '600',
            color: '#007bff',
          }}
        >
          {experience.year}
        </span>
      </div>
    </motion.div>
  );
};

export default ExperienceTimeline;
