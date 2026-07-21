import { motion as Motion } from 'framer-motion';
import { ArrowUpRight, Award, BriefcaseBusiness, Check, Code2, Layers3, Sparkles } from 'lucide-react';
import './portfolio-story.css';

const certificates = [
  {
    year: '2024',
    issuer: 'IBM',
    title: 'Full Stack Software Developer',
    description: 'Professional training across cloud-native development, React, Node.js, containers, databases, and application delivery.',
    skills: ['Full stack', 'Cloud', 'DevOps'],
  },
  {
    year: '2022',
    issuer: 'Huawei',
    title: 'HCIA — Cloud Computing',
    description: 'Foundational certification covering cloud architecture, virtualization, core services, and cloud operations.',
    skills: ['Cloud', 'Virtualization', 'Infrastructure'],
  },
  {
    year: '2021',
    issuer: 'TESDA',
    title: 'Computer Systems Servicing NC II',
    description: 'Technical certification in installing, configuring, maintaining, and troubleshooting computer systems and networks.',
    skills: ['Hardware', 'Networking', 'Support'],
  },
];

const projects = [
  {
    number: '01',
    title: 'Custom Boat Seat Configurator',
    type: '3D product experience',
    description: 'A responsive product builder that lets customers explore seat styles, materials, colors, and layouts through a real-time 3D interface.',
    result: 'Turned a complex custom-order flow into a visual, guided buying experience.',
    stack: ['JavaScript', 'Three.js', 'Node.js', 'Express'],
    image: '/videos/1.png',
    link: 'https://design.pompanette.com/products/8400/',
  },
  {
    number: '02',
    title: 'Cybersecurity Training Game',
    type: 'Interactive learning',
    description: 'A scenario-based game that asks employees to identify unsafe workplace practices with hints, animated feedback, and progress tracking.',
    result: 'Made compliance content easier to understand through active participation.',
    stack: ['JavaScript', 'jQuery', 'Bootstrap', 'Game logic'],
    image: '/videos/2.png',
    link: 'https://search-practice.netlify.app/',
  },
  {
    number: '03',
    title: 'Employee Attendance Platform',
    type: 'Full-stack application',
    description: 'An attendance system with real-time clock-in and clock-out, role-based access, reporting, and management dashboards.',
    result: 'Centralized daily workforce tracking in one secure, responsive workspace.',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    image: '/videos/3.png',
    link: 'https://attendance-tracking-employee-app.vercel.app/',
  },
  {
    number: '04',
    title: 'New Project Coming Soon',
    type: 'In development',
    description: 'A new product case study is currently being prepared. Project details, visuals, and outcomes will be added here soon.',
    stack: ['Case study', 'In progress', 'Coming soon'],
    placeholder: true,
  },
  {
    number: '05',
    title: 'Next Case Study',
    type: 'Reserved project',
    description: 'This space is reserved for another upcoming project, including the challenge, solution, technology, and final results.',
    stack: ['New work', 'Details soon', 'Stay tuned'],
    placeholder: true,
  },
];

const services = [
  ['01', 'Interface development', 'Responsive React interfaces with thoughtful states, accessible patterns, and clean component architecture.'],
  ['02', 'Product dashboards', 'Information-dense screens shaped for scanning, filtering, tracking, and confident daily use.'],
  ['03', 'Interactive web', '3D configurators, learning experiences, and purposeful motion that support the product story.'],
];

const workflow = [
  ['Discover', 'Align on the audience, business goal, content, and expected user behavior.'],
  ['Design', 'Create a clear hierarchy, responsive layout, and interaction system.'],
  ['Build', 'Turn the direction into maintainable components and production-ready code.'],
  ['Refine', 'Test responsiveness, accessibility, performance, and the details users feel.'],
];

const toolkit = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'Laravel', 'Three.js', 'GSAP', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'Docker'];

const experiences = [
  {
    date: '2024 — Present',
    role: 'Web Developer',
    company: 'Your Asian Team',
    description: 'Build responsive web experiences for online cybersecurity training, translating learning requirements into interactive course interfaces and quality-assured releases.',
    highlights: ['Interactive course development', 'Responsive UI implementation', 'Quality assurance'],
    logo: '/images/YAT.png',
  },
  {
    date: '2024 — 2025',
    role: 'Freelance Front-End Developer',
    company: 'Pompanette',
    description: 'Designed and developed a customer-facing 3D boat seat configurator with real-time material, color, and layout customization.',
    highlights: ['3D product configuration', 'Front-end architecture', 'Responsive interactions'],
    logo: '/images/Pompanette.png',
  },
  {
    date: '2022 — 2023',
    role: 'Virtual Map Labeller',
    company: 'Xfinite',
    description: 'Produced accurate image annotations for machine-learning and computer-vision datasets while following strict quality guidelines.',
    highlights: ['Image annotation', 'Dataset consistency', 'Detail-focused QA'],
    logo: '/images/Xfinite.png',
  },
];

const reveal = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.16 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <Motion.header className="story-heading" {...reveal}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </Motion.header>
  );
}

export default function PortfolioStory() {
  return (
    <main className="portfolio-story">
      <section className="story-section credentials" id="certificates" aria-labelledby="credentials-title">
        <div className="story-shell">
          <SectionHeading
            eyebrow="Credentials / 03"
            title={
              <>
                <span id="credentials-title">Proof of practice,</span>
                <br />
                built on fundamentals.
              </>
            }
            copy="Focused training that supports the way I design, build, troubleshoot, and ship digital products."
          />

          <div className="credential-list">
            {certificates.map((certificate, index) => (
              <Motion.article className="credential-card" key={certificate.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, delay: index * 0.08 }}>
                <div className="credential-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="credential-copy">
                  <div className="credential-meta">
                    <Award size={17} /> {certificate.issuer} · {certificate.year}
                  </div>
                  <h3>{certificate.title}</h3>
                  <p>{certificate.description}</p>
                  <div className="story-tags">
                    {certificate.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              </Motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section selected-work" id="projects" aria-labelledby="projects-title">
        <div className="story-shell">
          <Motion.header className="gallery-heading" {...reveal}>
            <div>
              <span>Selected work / 05</span>
              <h2 id="projects-title">
                Work with
                <br />
                <em>real purpose.</em>
              </h2>
            </div>
            <div className="gallery-heading__aside">
              <p>A small collection of interactive products designed around real customer, learning, and operational needs.</p>
              <div className="gallery-stats" aria-label="Project summary">
                <span>
                  <strong>05</strong> project spaces
                </span>
                <span>
                  <strong>01—05</strong> project index
                </span>
              </div>
            </div>
          </Motion.header>

          <div className="project-gallery">
            {projects.map((project, index) => {
              const Card = project.link ? Motion.a : Motion.article;
              const linkProps = project.link ? { href: project.link, target: '_blank', rel: 'noreferrer', 'aria-label': `View ${project.title}` } : { 'aria-label': `${project.title} placeholder` };

              return (
                <Card className={`gallery-card gallery-card--${index + 1}${project.placeholder ? ' gallery-card--placeholder' : ' cursor-target'}`} {...linkProps} key={project.title} initial={{ opacity: 0, y: 44, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                  {project.image ? <img src={project.image} alt={`${project.title} interface preview`} loading="lazy" /> : <span className="gallery-card__placeholder-art" aria-hidden="true" />}
                  <span className="gallery-card__number">{project.number}</span>
                  <span className="gallery-card__category">{project.type}</span>
                  <span className="gallery-card__arrow">{project.placeholder ? <span className="gallery-card__soon">Soon</span> : <ArrowUpRight size={22} />}</span>
                  <div className="gallery-card__content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="gallery-card__tags">
                      {project.stack.slice(0, 3).map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Motion.div className="gallery-footnote" {...reveal}>
            <Sparkles size={17} />
            <p>Each project started with a different problem. The shared goal was making the experience simpler, clearer, and more useful.</p>
          </Motion.div>
        </div>
      </section>

      <section className="story-section practice" aria-labelledby="practice-title">
        <div className="story-shell">
          <SectionHeading eyebrow="Practice" title={<span id="practice-title">Structure first. Motion with a reason.</span>} copy="I work across the interface and the system behind it, keeping the experience clear from the first sketch to release." />

          <div className="service-list">
            {services.map(([number, title, copy], index) => (
              <Motion.article className="service-row" key={title} {...reveal} transition={{ ...reveal.transition, delay: index * 0.05 }}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <Code2 aria-hidden="true" />
              </Motion.article>
            ))}
          </div>

          <div className="process-toolkit">
            <Motion.div className="process-panel" {...reveal}>
              <div className="panel-label">
                <Layers3 size={18} /> How I work
              </div>
              <ol>
                {workflow.map(([title, copy], index) => (
                  <li key={title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Motion.div>
            <Motion.aside className="toolkit-panel-new" {...reveal}>
              <div className="panel-label">
                <Code2 size={18} /> Core toolkit
              </div>
              <h3>
                Modern tools.
                <br />
                Practical choices.
              </h3>
              <div className="toolkit-cloud">
                {toolkit.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </Motion.aside>
          </div>
        </div>
      </section>

      <section className="story-section experience" id="experience" aria-labelledby="experience-title">
        <div className="story-shell experience-shell">
          <div className="experience-intro-new">
            <SectionHeading eyebrow="Experience / 03 roles" title={<span id="experience-title">Learning by shipping real work.</span>} copy="My path moves from detail-heavy data work into interactive front-end and full web development." />
            <Motion.div className="experience-note" {...reveal}>
              <BriefcaseBusiness size={20} />
              <p>Available for product-focused web development opportunities and thoughtful freelance collaborations.</p>
            </Motion.div>
          </div>

          <div className="experience-list-new">
            {experiences.map((experience, index) => (
              <Motion.article className="experience-card-new" key={experience.role} {...reveal}>
                <div className="experience-card__visual" aria-hidden="true">
                  <img src={experience.logo} alt="" loading="lazy" />
                </div>
                <div className="experience-card-top">
                  <span className="experience-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="experience-date">{experience.date}</span>
                </div>
                <h3>{experience.role}</h3>
                <h4>{experience.company}</h4>
                <p>{experience.description}</p>
                <ul>
                  {experience.highlights.map((item) => (
                    <li key={item}>
                      <Check size={15} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
