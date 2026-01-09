import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import './embla.css';
import VideoJS from '../Videojs/VideoJS';
import SpotlightCard from '../ReactBits/SpotlightCard';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedContent from '../ReactBits/AnimatedContent';

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number, min, max) => Math.min(Math.max(number, min), max);

// Example slide metadata (title, description, link)
const slideData = [
  {
    title: 'Custom Boat Seat Configurator Design and Development',
    description: 'Designed and developed an interactive web-based boat seat configurator using 3D modeling and modern web technologies. Users can customize seat styles, materials, and layouts in real-time, enhancing the online purchasing experience and streamlining customer decisions. Leveraged .glb 3D models and responsive UI principles to ensure smooth performance across devices.',
    link: 'https://design.pompanette.com/products/8400/',
    techStacks: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'JQuery', 'Node.JS', 'Express.JS', 'Three.JS'],
  },
  {
    title: 'Game: Searching for Unsupervised Practices in the Office',
    description: `Created an interactive educational game designed to help employees identify unsafe practices in office environments. Implemented dynamic interactions, animated feedback, and progressive challenges to engage users and reinforce safe workplace habits. Integrated a progress bar, hints system, and scoring metrics to allow users to track improvement over time, making safety training both fun and effective.`,
    link: 'https://search-practice.netlify.app/',
    techStacks: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'JQuery'],
  },
  {
    title: 'Attendance Tracking Employee App',
    description: `Developed a comprehensive employee attendance tracking web application to streamline workforce management. The app includes real-time clock-in/out functionality, automated reporting, and visually intuitive dashboards for managers to monitor team productivity efficiently. Implemented secure user authentication, role-based access control, and data validation to ensure privacy and data integrity.`,
    link: 'https://attendance-tracking-employee-app.vercel.app/',
    techStacks: ['HTML', 'CSS', 'JavaScript', 'Tailwind', 'TypeScript', 'React', 'Node.JS', 'Express.JS', 'MongoDB'],
  },
];

const EmblaCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const [activeSlide, setActiveSlide] = useState(0);

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.embla__slide__number');
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0, 1).toString();
        const tweenNode = tweenNodes.current[slideIndex];
        tweenNode.style.transform = `scale(${scale})`;
      });
    });
  }, []);

  // Update active slide when slide changes
  const onSlideChange = useCallback(() => {
    if (!emblaApi) return;
    setActiveSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('select', onSlideChange) // <-- update content on slide change
      .on('slideFocus', tweenScale);
  }, [emblaApi, tweenScale, setTweenNodes, setTweenFactor, onSlideChange]);

  const playerRef = useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on('waiting', () => console.log('player is waiting'));
    player.on('dispose', () => console.log('player will dispose'));
  };

  return (
    <div className="embla flex flex-col w-full justify-center items-center lg:flex-row gap-10 max-w-[1600px]">
      <div className="w-full px-[20px] lg:w-3/5 lg:p-5">
        <AnimatedContent distance={100} direction="vertical" reverse duration={1.3} ease="power3.out" initialOpacity={0} animateOpacity={true}>
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {slides.map((index) => {
                const videoJsOptions = {
                  muted: true,
                  playsInline: true,
                  controls: true,
                  responsive: true,
                  fluid: true,
                  poster: `./videos/${index + 1}.png`,
                  sources: [{ src: `./videos/${index + 1}.mp4`, type: 'video/mp4' }],
                };
                return (
                  <div className="embla__slide" key={index}>
                    <div className="embla__slide__number">
                      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="embla__controls">
            <div className="embla__buttons">
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>

            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <DotButton key={index} onClick={() => onDotButtonClick(index)} className={`embla__dot${index === selectedIndex ? ' embla__dot--selected' : ''}`} />
              ))}
            </div>
          </div>
        </AnimatedContent>
      </div>

      <div className="w-full px-[20px] items-center lg:w-2/5 lg:p-5">
        <AnimatedContent distance={100} direction="horizontal" duration={1.3} delay={0.5} ease="power3.out" initialOpacity={0} animateOpacity={true}>
          <SpotlightCard className="custom-spotlight-card lg:h-[380px]" spotlightColor="rgba(0, 229, 255, 0.2)">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide} // important: this tells Framer Motion to animate on slide change
                className="embla-content text-start flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }} // start invisible and slightly lower
                animate={{ opacity: 1, y: 0 }} // animate to fully visible
                exit={{ opacity: 0, y: -20 }} // exit animation when slide changes
                transition={{ duration: 0.3 }} // half a second
              >
                <h3 className="css-v5mywq mb-auto embla-titles">{slideData[activeSlide]?.title}</h3>
                <p className="css-14rovie mt-auto embla-description">{slideData[activeSlide]?.description}</p>
                <div className="eb-demo-row-2 mt-5 flex flex-wrap gap-2">
                  {slideData[activeSlide]?.techStacks.map((elements, idx) => (
                    <span key={idx} className="eb-demo-chip">
                      {elements}
                    </span>
                  ))}
                </div>
                <a className="eb-demo-cta-2 cursor-target w-[100px] mt-10" href={slideData[activeSlide]?.link}>
                  View Live Project
                </a>
              </motion.div>
            </AnimatePresence>
          </SpotlightCard>
        </AnimatedContent>
      </div>
    </div>
  );
};

export default EmblaCarousel;
