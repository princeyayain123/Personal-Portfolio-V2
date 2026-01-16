import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const MagicHoverCard = ({ title, company, date, description, image }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring = how slow / lazy it follows
  const springX = useSpring(mouseX, {
    stiffness: 80, // LOWER = slower follow
    damping: 25,
    mass: 1.2,
  });

  const springY = useSpring(mouseY, {
    stiffness: 80,
    damping: 25,
    mass: 1.2,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - 160);
      mouseY.set(e.clientY - rect.top - 100);
    }
  };

  return (
    <div className="relative py-4 px-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onMouseMove={handleMouseMove} ref={cardRef}>
      <h3 className="css-v5mywq mb-auto embla-titles">{title}</h3>
      <p className="text-lg font-semibold opacity-75 mb-2">{company}</p> <p className="text-normal opacity-75 font-normal mb-4">{date}</p>
      <button className="eb-demo-cta-2 cursor-target w-[100px] mt-10 cursor-target">Read More</button>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-0 left-0 z-50 w-80 rounded-xl backdrop-blur-lg dark:bg-slate-900/40 bg-white/60 border border-white/20 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] overflow-hidden"
            style={{
              x: springX,
              y: springY,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
          >
            <div className="p-5">
              {/* Image container */}
              <div className="relative h-48 w-full rounded-xl overflow-hidden">
                {/* Skeleton */}
                {isLoading && <div className="absolute inset-0 bg-gray-600 dark:bg-gray-700 animate-pulse"></div>}

                {/* Actual image */}
                <img alt={title} src={image} className={`object-cover w-full h-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`} onLoad={() => setIsLoading(false)} />
              </div>
              <h3 className="mb-1 text-lg font-bold text-white mt-4">{title}</h3>
              {date}
              <p className="text-sm text-white opacity-75 font-[400]">{description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MagicHoverCard;
