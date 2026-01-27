import './App.css';

import { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiGithub, SiHtml5, SiCss3, SiJavascript, SiJquery, SiBootstrap, SiPhp, SiLaravel, SiExpress, SiMysql, SiMongodb } from 'react-icons/si';

import { MdOutlineEmail, MdOutlineLocalPhone } from 'react-icons/md';
import { BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { CgFacebook } from 'react-icons/cg';
import { FaGithub } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

import Ballpit from './components/ReactBits/Ballpit';
import MagicBento from './components/ReactBits/MagicBento';
import RotatingText from './components/ReactBits/RotatingText';
import GradientText from './components/ReactBits/GradientText';
import TargetCursor from './components/ReactBits/TargetCursor';
import TextType from './components/ReactBits/TextType';
import CircularText from './components/ReactBits/CircularText';
import StarBorder from './components/ReactBits/StarBorder';
import AnimatedContent from './components/ReactBits/AnimatedContent';
import CardNav from './components/ReactBits/CardNav';
import logo from './components/ReactBits/logo.png';
import LogoLoop from './components/ReactBits/LogoLoop';
import CountUp from './components/ReactBits/CountUp';
import ElectricBorder from './components/ReactBits/ElectricBorder';
import MetaBalls from './components/ReactBits/MetaBalls';
import EmblaCarousel from './components/Embla/EmblaCarousel';
import Beams from './components/ReactBits/Beams';
import GlobeComponent from './components/ReactBits/GlobeComponent';
import GlassContactForm from './components/ReactBits/GlassContactForm';
import ScrollVelocity from './components/ReactBits/ScrollVelocity';
import Masonry from './components/ReactBits/Masonry';
import ChatScreenWithReaction from './components/ReactBits/ChatScreenWithReaction';
import Timeline from './components/Tracker/Timeline';

import item from './utils/Items.js';
import items from './utils/NavItems.js';
import certificates from './utils/Certificates.js';

const OPTIONS = { loop: true };
const SLIDE_COUNT = 3;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

function App() {
  const [isMobile, setIsMobile] = useState(false);

  const techLogos = [
    { node: <SiHtml5 />, title: 'HTML5', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { node: <SiCss3 />, title: 'CSS3', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { node: <SiJavascript />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { node: <SiReact />, title: 'React', href: 'https://react.dev' },
    { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
    { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
    { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
    { node: <SiJquery />, title: 'jQuery', href: 'https://jquery.com' },
    { node: <SiBootstrap />, title: 'Bootstrap', href: 'https://getbootstrap.com' },
    { node: <SiPhp />, title: 'PHP', href: 'https://www.php.net' },
    { node: <SiLaravel />, title: 'Laravel', href: 'https://laravel.com' },
    { node: <SiExpress />, title: 'Express.js', href: 'https://expressjs.com' },
    { node: <SiMysql />, title: 'MySQL', href: 'https://www.mysql.com' },
    { node: <SiMongodb />, title: 'MongoDB', href: 'https://www.mongodb.com' },
    { node: <SiGithub />, title: 'GitHub', href: 'https://github.com' },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth >= 992);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showBg = () => {
    const bg = document.querySelector('.ballpit');
    if (bg) {
      bg.classList.remove('opacity-0');
      bg.classList.add('opacity-100');
    }
  };

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  useEffect(() => {
    const homeEl = document.getElementById('home');
    const navBar = document.querySelector('.card-nav');
    if (!homeEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          navBar.classList.add('glass');
        } else {
          navBar.classList.remove('glass');
        }
      },
      {
        threshold: 0.6,
      }
    );

    observer.observe(homeEl);

    return () => observer.disconnect();
  }, []);

  const openResume = () => {
    const pdfUrl = '/pdf/Resume.pdf';
    window.open(pdfUrl, '_blank');
  };

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    window.lenis?.scrollTo(target, {
      offset: 0,
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  };

  return (
    <>
      <div className="fixed z-50 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center gap-2 w-full">
        <AnimatedContent className="w-full" distance={60} direction="vertical" reverse={false} duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} scale={1} threshold={0.1} delay={1}>
          <div className="w-full" style={{ width: '1000px' }}>
            <CardNav onNavigate={scrollToSection} logo={logo} logoAlt="Company Logo" items={items} baseColor="#800080" menuColor="#ffffffff" buttonBgColor="#ffffffff" buttonTextColor="#000000ff" ease="power3.out" />
          </div>
        </AnimatedContent>
      </div>
      <section className="relative overflow-hidden h-screen w-full" aria-label="Home" id="home">
        <div className="overflow-hidden h-screen">
          <TargetCursor spinDuration={2} hideDefaultCursor={true} parallaxOn={true} />

          {isMobile ? (
            <div className={`ballpit absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out inset-0 z-1 pointer-events-none opacity-0`}>
              <Ballpit count={100} gravity={0.01} friction={0.9975} wallBounce={0.95} followCursor={false} colors={['#808080', '#800080', '#FFFFFF']} ambientColor={0xffffff} ambientIntensity={1} lightIntensity={200} minSize={0.5} maxSize={1} size0={1} maxVelocity={0.15} maxX={5} maxY={5} maxZ={5} />
            </div>
          ) : (
            <div className={`ballpit absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out inset-0 z-0 pointer-events-none opacity-0`}>
              <Beams beamWidth={1.3} beamHeight={25} beamNumber={10} lightColor="#fb00ff" speed={4} noiseIntensity={1.2} scale={0.2} rotation={45} />
            </div>
          )}

          <div className={`hero-banner absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center items-center justify-center flex w-full max-w-[320px] md:max-w-full`} style={{ color: 'white', transition: '0.5s ease', alignItems: 'center' }}>
            <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={false}
              duration={2}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity={true}
              scale={10}
              threshold={0.1}
              delay={0}
              className="w-full"
              onComplete={() => {
                showBg();
              }}
            >
              <div className="flex flex-col text-4xl lg:text-6xl text-center items-center justify-center gap-3 md:flex-row" style={{ fontWeight: 900, lineHeight: '1em' }}>
                <RotatingText style={{ transition: '0.5s ease', color: 'white' }} texts={['FRONT-END', 'BACK-END', 'FULL-STACK']} loop={false} mainClassName="px-2 sm:px-2 md:px-3 bg-[#800080] text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg hero-banner" splitBy={'characters'} staggerFrom={'first'} animatePresenceMode={'wait'} animatePresenceInitial={true} initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-120%' }} staggerDuration={0} splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1" transition={{ type: 'spring', damping: 30, stiffness: 400 }} rotationInterval={5000} />
                <div className="flex items-center shadowText bg-gradient-to-b from-white from-0% to-white to-90% via-[#808080] via-100% bg-clip-text text-transparent hero-banner">DEVELOPER</div>
              </div>
              <div className="py-5 text-1xl lg:text-3xl shadowText opacity-90">
                <TextType text={['From concept to code — websites that users love.']} initialDelay={2000} typingSpeed={75} pauseDuration={2000} deletingSpeed={30} cursorCharacter={'█'} cursorBlinkDuration={0.5} loop={false} />
              </div>

              <div className="flex flex-row justify-center items-center gap-3 shadowText md:flex-row">
                <StarBorder as="button" className="w-full max-w-[160px] lg:max-w-[230px]" color="magenta" speed="5s" thickness={4}>
                  <button className="cursor-target bg-white text-black text-sm rounded-[50px] lg:text-xl w-full max-w-[160px] lg:max-w-[230px]">View Dashboards</button>
                </StarBorder>
                <StarBorder onClick={openResume} as="button" className="w-full max-w-[160px] lg:max-w-[230px]" color="magenta" speed="4s" thickness={4}>
                  <button className="cursor-target bg-white text-white text-sm rounded-[50px] lg:text-xl hover:bg-black transition-all duration-300 ease-in-out inset-0 w-full max-w-[160px] lg:max-w-[230px]" style={{ background: '#800080' }}>
                    Download Resume
                  </button>
                </StarBorder>
              </div>
            </AnimatedContent>
          </div>
          <div className="absolute top-[20px] right-[20px] hidden lg:block">
            <AnimatedContent distance={60} direction="horizontal" duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} scale={1} threshold={0.1} delay={1}>
              <CircularText text="I*AM*JULIUS*" onHover="goBonkers" spinDuration={50} className="custom-class" />
            </AnimatedContent>
          </div>

          <AnimatedContent className="absolute bottom-[50px] left-1/2 -translate-x-1/2 bounce-slow z-2" distance={60} direction="vertical" duration={0.8} ease="power3.out" initialOpacity={0} animateOpacity={true} scale={1} threshold={0.1} delay={1}>
            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-white to-gray-200  shadow-lg shadow-black/30 flex items-center justify-center animate-bounce-slow ">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="relative overflow-hidden pb-20 w-full" aria-label="About" id="about">
        <div className={`flex p-8 bg-white items-center justify-center flex-col md:flex-row md:h-screen `}>
          <div className="w-full max-w-[1000px] md:w-1/2 text-start items-center justify-center px-0 text-black md:px-10">
            <div className="relative">
              <AnimatedContent className="relative" distance={100} direction="horizontal" reverse duration={1.3} ease="power3.out" initialOpacity={0} animateOpacity={true}>
                <img className="w-[75px] ml-[-10px] z-0 md:ml-[-20px] md:w-[100px]" src="./images/quotation.png" alt="" />
                <h2 className="text-4xl font-bold pb-5">About Me</h2>
                <p className="text-xl">I’m Julius—a web explorer who turns code into experiences. From pixels to interactions, I craft websites that don’t just work, they tell a story. React, Node.js, and a dash of curiosity are my tools of choice. When I’m not coding, I’m discovering ways to make the web a little more delightful.</p>

                <div className="w-full h-[150px] relative overflow-hidden pt-10">
                  <LogoLoop logos={techLogos} speed={20} direction="left" logoHeight={48} gap={40} hoverSpeed={0} scaleOnHover fadeOut fadeOutColor="#ffffff" ariaLabel="Technology partners" />
                </div>
              </AnimatedContent>
            </div>
          </div>
          <div>
            <AnimatedContent className="relative" distance={100} direction="vertical" duration={1.3} delay={0.3} ease="power3.out" initialOpacity={0} animateOpacity={true}>
              <div className="absolute top-[-60px] right-[-100px] z-0 md:top-[-80px]">
                <MetaBalls color="#000000" cursorBallColor="#000000" cursorBallSize={2} ballCount={15} animationSize={25} enableMouseInteraction={true} enableTransparency={true} hoverSmoothness={0.05} clumpFactor={1} speed={0.3} />
              </div>
              <MagicBento textAutoHide={true} enableStars={true} enableSpotlight={true} enableBorderGlow={true} enableTilt={true} enableMagnetism={true} clickEffect={true} spotlightRadius={740} particleCount={200} glowColor="132, 0, 255" />
            </AnimatedContent>
          </div>
        </div>

        <div className="bg-image">
          <div className="grid grid-cols-1 gap-5 py-[100px] text-4xl font-bold w-full place-items-center md:grid-cols-2 lg:grid-cols-4">
            <AnimatedContent distance={100} direction="vertical" reverse duration={1.3} delay={0} ease="power3.out" initialOpacity={0} animateOpacity={true}>
              <div className="h-[200px] w-[350px]  flex flex-row gap-2 items-center justify-center">
                <GradientText colors={['#5227FF', '#FF9FFC', '#B19EEF']} animationSpeed={3} showBorder={false} className="custom-class text-6xl">
                  <CountUp from={0} to={8} duration={2} startWhen={true} className="count-up-text" />+
                </GradientText>
                <div className="w-[200px] shadowText bg-gradient-to-b from-white from-0% to-white to-90% via-[#808080] via-100% bg-clip-text text-transparent">Completed Projects</div>
              </div>
            </AnimatedContent>
            <AnimatedContent distance={100} direction="vertical" reverse duration={1.3} delay={0.2} ease="power3.out" initialOpacity={0} animateOpacity={true}>
              <div className="h-[200px] w-[350px]  flex flex-row gap-2 items-center justify-center">
                <GradientText colors={['#5227FF', '#FF9FFC', '#B19EEF']} animationSpeed={3} showBorder={false} className="custom-class text-6xl">
                  <CountUp from={0} to={60} duration={3} startWhen={true} className="count-up-text" />+
                </GradientText>
                <div className="w-[200px] shadowText bg-gradient-to-b from-white from-0% to-white to-90% via-[#808080] via-100% bg-clip-text text-transparent">Happy Clients</div>
              </div>
            </AnimatedContent>
            <AnimatedContent distance={100} direction="vertical" reverse duration={1.3} delay={0.4} ease="power3.out" initialOpacity={0} animateOpacity={true}>
              <div className="h-[200px] w-[350px]  flex flex-row gap-2 items-center justify-center">
                <GradientText colors={['#5227FF', '#FF9FFC', '#B19EEF']} animationSpeed={3} showBorder={false} className="custom-class text-6xl">
                  <CountUp from={0} to={1} duration={3} startWhen={true} className="count-up-text" />+
                </GradientText>
                <div className="w-[200px] shadowText bg-gradient-to-b from-white from-0% to-white to-90% via-[#808080] via-100% bg-clip-text text-transparent">Year Experiences</div>
              </div>
            </AnimatedContent>
            <AnimatedContent distance={100} direction="vertical" reverse duration={1.3} delay={0.5} ease="power3.out" initialOpacity={0} animateOpacity={true}>
              <div className="h-[200px] w-[350px]  flex flex-row gap-2 items-center justify-center">
                <GradientText colors={['#5227FF', '#FF9FFC', '#B19EEF']} animationSpeed={3} showBorder={false} className="custom-class text-6xl">
                  <CountUp from={0} to={24} duration={1} startWhen={true} className="count-up-text" />+
                </GradientText>
                <div className="w-[200px] shadowText bg-gradient-to-b from-white from-0% to-white to-90% via-[#808080] via-100% bg-clip-text text-transparent">Client Reviews</div>
              </div>
            </AnimatedContent>
          </div>

          <AnimatedContent distance={100} direction="horizontal" reverse duration={1.3} ease="power3.out" initialOpacity={0} animateOpacity={true}>
            <h2 className="text-6xl font-bold pb-40" id="certificates">
              Professional Certificates
            </h2>
          </AnimatedContent>
          <AnimatedContent distance={100} direction="vertical" duration={1.3} ease="power3.out" initialOpacity={0} animateOpacity={true} className="pb-40">
            <div className="items-center justify-center flex flex-col gap-20 md:flex-row">
              {certificates.map((certificate) => {
                return (
                  <ElectricBorder color={certificate.color} speed={1} chaos={0.06} thickness={2} style={{ borderRadius: 16 }}>
                    <div className="eb-demo-card h-[360px] w-[300px] items-start">
                      <div className="eb-demo-badge items-start">Featured</div>
                      <h3 className="eb-demo-title">{certificate.title}</h3>
                      <p className="eb-demo-desc">{certificate.description}</p>

                      <div className="eb-demo-row">
                        {certificate.skills.map((skill) => {
                          return <span className="eb-demo-chip">{skill}</span>;
                        })}
                      </div>
                      <button className="eb-demo-cta cursor-target">View Certificate</button>
                    </div>
                  </ElectricBorder>
                );
              })}
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="relative overflow-hidden w-full items-center justify-center flex flex-col  mt-[80px] pb-[50px] projects" aria-label="Projects" id="projects">
        <AnimatedContent distance={100} direction="horizontal" reverse duration={1.3} ease="power3.out" initialOpacity={0} animateOpacity={true}>
          <h2 className="text-6xl font-bold pb-20">Projects</h2>
        </AnimatedContent>
        <div className="flex flex-col w-full justify-center items-center lg:flex-row gap-10 max-w-[1600px]">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
        <div className="pb-20"></div>
      </section>

      <section className="relative bg-white items-center justify-center flex flex-col" id="experience">
        <AnimatedContent distance={100} direction="vertical" reverse duration={1.3} ease="power3.out" initialOpacity={0} animateOpacity={true}>
          <h2 className="text-6xl font-bold py-20 text-black ">Experiences</h2>
        </AnimatedContent>
        <div className="flex flex-col md:flex-row max-w-[1800px] w-full">
          <div className="w-full px-6 lg:px-20 lg:w-2/3">
            <AnimatedContent distance={100} direction="horizontal" duration={1.3} ease="power3.out" initialOpacity={0} animateOpacity={true}>
              <p className="text-black text-xl  mb-10 text-justify">I have 1+ year of experience in front-end and web development, building responsive and user-friendly web interfaces. I’ve worked on projects ranging from image labeling for machine learning to custom boat seat configurators, and most recently, online cybersecurity training platforms. I focus on creating interactive, accessible, and visually engaging web applications.</p>
              <Masonry items={item} ease="power3.out" duration={0.6} stagger={0.1} animateFrom="bottom" scaleOnHover={true} hoverScale={0.9} blurToFocus={true} />
            </AnimatedContent>
          </div>
          <div className="w-full px-6 lg:w-1/3">
            <AnimatedContent distance={100} direction="horizontal" reverse duration={1.3} ease="power3.out" initialOpacity={0} animateOpacity={true}>
              <Timeline></Timeline>
            </AnimatedContent>
          </div>
        </div>

        <div className="pb-10 md:pb-20"></div>
      </section>

      <div className="pt-20 md:pt-40 bg-black velocity"></div>
      <ScrollVelocity className="bg-black" texts={['React Portfolio', 'Full Stack Developer']} velocity={50} />
      <div className="pb-20 md:pb-40 bg-black velocity"></div>

      <section className="relative w-full bg-black h-full" id="contact">
        <div className="absolute inset-0">
          <AnimatedContent distance={100} direction="vertical" duration={1.3} ease="power3.out" initialOpacity={0} animateOpacity={true}>
            <GlobeComponent />
          </AnimatedContent>
        </div>

        <div className="relative z-10 flex flex-col w-full max-w-[1800px] mx-auto  p-5 md:p-10 gap-10 h-full">
          <AnimatedContent distance={100} direction="vertical" reverse duration={1.3} ease="power3.out" initialOpacity={0} animateOpacity={true}>
            <h2 className="text-4xl font-bold text-white text-center pb-5 pt-20">Get In Touch</h2>
            <h2 className="text-6xl font-bold text-[#ff9cff] text-center pb-10">Let's Work Together</h2>
          </AnimatedContent>

          <AnimatedContent className="h-full" distance={100} direction="vertical" duration={1.3} ease="power3.out" initialOpacity={0} animateOpacity={true}>
            <div className="flex flex-col-reverse md:flex-row flex-1 gap-10 h-full md:h-[650px]">
              <div className="w-full md:w-2/3 h-full overflow-hidden flex flex-col gap-5 ">
                <div className="flex flex-1/3 flex-col md:flex-row gap-5">
                  <div className="w-full md:w-1/2 p-6 flex flex-col justify-start border border-white/30 rounded-xl shadow bg-gray-800 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(128,0,128,0.3)] border border-white/20 text-white">
                    <div className="text-start pb-6">
                      <div className="flex flex-col gap-[20px] text-[#3B9DF8]">
                        <span>
                          <p className="text-[0.9rem] flex items-center gap-[8px] hover:text-blue-400 cursor-pointer text-white transition-all duration-300">
                            <IoLocationOutline className="text-[1.2rem]" />
                            Barangay Gulang-Gulang, Lucena City, Philippines
                          </p>
                        </span>
                        <span>
                          <p className="text-[0.9rem] flex items-center gap-[8px] hover:text-blue-400 cursor-pointer text-white transition-all duration-300">
                            <MdOutlineEmail className="text-[1.1rem]" />
                            princeyayain123@gmail.com
                          </p>
                        </span>
                        <span>
                          <p className="text-[0.9rem] flex items-center gap-[8px] hover:text-blue-400 cursor-pointer text-white transition-all duration-300">
                            <MdOutlineLocalPhone className="text-[1.1rem]" />
                            +639070135836
                          </p>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-[10px] text-[#424242]">
                      <a className="icon text-[1.3rem] p-1.5 cursor-pointer rounded-full hover:text-white transition-all duration-300" href="https://www.facebook.com/julius.yayain/" target="_blank" rel="noopener noreferrer">
                        <CgFacebook />
                      </a>
                      <a className="icon text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white transition-all duration-300" href="https://www.twine.net/juliusyayain" target="_blank" rel="noopener noreferrer">
                        <BsTwitter />
                      </a>
                      <a className="icon text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white transition-all duration-300" href="https://www.instagram.com/juliusyayain/" target="_blank" rel="noopener noreferrer">
                        <BsInstagram />
                      </a>
                      <a className="icon text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white transition-all duration-300" href="https://www.linkedin.com/in/julius-anthony-yayain-13606b2a3/" target="_blank" rel="noopener noreferrer">
                        <BsLinkedin />
                      </a>
                      <a className="icon text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white transition-all duration-300" href="https://github.com/princeyayain123" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                      </a>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 border border-white/30 rounded-xl shadow">
                    <iframe className="w-full h-full rounded-xl" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d73671.05206690024!2d121.55166866530044!3d13.967073040029291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd4b578caf4ccd%3A0x2be1e905c862fe1!2sLucena%20City%2C%20Quezon!5e0!3m2!1sen!2sph!4v1768105374959!5m2!1sen!2sph" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  </div>
                </div>

                <div className="flex flex-2/3">
                  <div className="w-full h-full">
                    <ChatScreenWithReaction></ChatScreenWithReaction>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/3 h-full flex flex-col">
                <GlassContactForm />
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>
      <footer className="py-5 text-center text-gray-400">© {new Date().getFullYear()} Julius Yayain. All Rights Reserved.</footer>
    </>
  );
}

export default App;
