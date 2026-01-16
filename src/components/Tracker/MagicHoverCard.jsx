import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MagicHoverCard = ({ title, company, date, description, image }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div className="relative py-4 px-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onMouseMove={handleMouseMove} ref={cardRef}>
      <h3 className="css-v5mywq mb-auto embla-titles">{title}</h3>
      <p className="text-lg font-semibold opacity-75 mb-2">{company}</p> <p className="text-normal opacity-75 font-normal mb-4">{date}</p>
      <button className="eb-demo-cta-2 cursor-target w-[100px] mt-10">Read More</button>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-0 left-0 z-50 w-80 rounded-xl backdrop-blur-lg dark:bg-slate-900/40 bg-white/60 border border-white/20 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePosition.x - 160,
              y: mousePosition.y - 100,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
          >
            <div className="p-5">
              <img alt="zenui banner" src={image} className="object-cover rounded-xl" />
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
