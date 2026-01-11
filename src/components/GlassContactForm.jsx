import React from 'react';

const GlassContactForm = () => {
  return (
    <div className="flex w-full h-full items-center justify-end">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 w-full h-full flex flex-col shadow-[0_8px_32px_rgba(128,0,128,0.3)] border border-white/20 text-white">
        <h2 className="text-2xl text-center font-bold mb-8">Contact Us</h2>

        <form className="flex flex-col flex-1 gap-4">
          <input type="text" placeholder="Your Name" className="p-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-purple-400 outline-none" required />
          <input type="email" placeholder="Your Email" className="p-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-purple-400 outline-none" required />
          <textarea placeholder="Your Message" className="p-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-purple-400 outline-none flex-1 resize-none" required />
          <button type="submit" className="mt-auto p-3 rounded-xl bg-purple-700 hover:bg-purple-800 hover:shadow-lg transition-all duration-300 text-white font-semibold">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default GlassContactForm;
