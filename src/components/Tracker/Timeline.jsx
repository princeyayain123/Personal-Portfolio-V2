import { TimelineData } from './Data.js';
import MagicHoverCard from './MagicHoverCard.jsx';

const Timeline = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <ul className="relative">
        {/* Vertical line */}
        <div className="absolute top-0 left-4 md:left-1/2 w-[2px] h-full bg-gray-200 dark:bg-slate-800 -translate-x-0 md:-translate-x-1/2" />

        {TimelineData.map((milestone, index) => (
          <li
            key={index}
            className={`relative flex w-full mb-10
              ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}
            `}
          >
            {/* Dot */}
            <div className="absolute left-4 md:left-1/2 top-6 -translate-x-0 md:-translate-x-1/2 bg-gray-200 dark:bg-slate-800 rounded-full p-2 z-10" />

            {/* Card */}
            <div
              className={`
                w-full max-w-sm ml-12 md:ml-0
                ${index % 2 === 0 ? 'md:mr-12 text-left' : 'md:ml-12 text-left md:text-right'}
              `}
            >
              <MagicHoverCard title={milestone.title} company={milestone.company} date={milestone.date} description={milestone.description} image={milestone.image} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
