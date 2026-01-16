import MagicHoverCard from './MagicHoverCard.jsx';
import { TimelineData } from './Data.js';

const Timeline = () => {
  return (
    <div className="w-full mx-auto md:p-6 px-2 py-6">
      {/* Vertical Line */}
      <div className="relative border-l-4 dark:border-slate-700 border-gray-300">
        {TimelineData.map((milestone, index) => (
          <div key={index} className="mb-20 relative">
            {/* Icon / Dot */}
            <div
              className={`
                absolute top-1/2 -left-0 transform -translate-x-1/2 -translate-y-1/2
                rounded-full p-2 z-10
                flex items-center justify-center
                bg-gradient-to-tr from-blue-400 to-indigo-500
                dark:from-slate-600 dark:to-slate-500
                shadow-lg
              `}
            >
              {/* Render the React icon component */}
              {milestone.icon && <milestone.icon className="w-5 h-5 text-white" />}
            </div>

            {/* Timeline card */}
            <div className="pl-10 w-full max-w-xl text-start">
              <MagicHoverCard title={milestone.title} company={milestone.company} date={milestone.date} description={milestone.description} image={milestone.image} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
