import { TimelineData } from './Data.js';
const Timeline = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <ul className="relative before:absolute before:top-0 before:left-1/2 before:h-full before:w-1 before:bg-gray-200 dark:before:bg-slate-800 before:-translate-x-1/2">
        {TimelineData.map((milestone, index) => (
          <li key={index} className={`relative flex mb-10 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            {/* Center icon */}
            <div className="absolute left-1/2 top-6 -translate-x-1/2 bg-gray-200 dark:bg-slate-800 rounded-full p-2 z-10" />

            {/* Card */}
            <div
              className={`w-full max-w-md border rounded-md shadow-md
              dark:bg-slate-900 dark:border-slate-700
              ${index % 2 === 0 ? 'mr-12 text-right' : 'ml-12 text-left'}`}
            >
              <div className="py-3 px-4">
                <div className="text-lg font-semibold dark:text-[#abc2d3]">{milestone.title}</div>
                <div className="text-primary text-sm">{milestone.date}</div>
                <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">{milestone.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
