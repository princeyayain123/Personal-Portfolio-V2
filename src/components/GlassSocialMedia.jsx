import React from 'react';

const GlassSocialMedia = () => {
  return (
    <div className="flex items-center justify-end ">
      <div className="text-start bg-white/10 backdrop-blur-md rounded-2xl p-10 w-full max-w-md shadow-[0_8px_32px_rgba(128,0,128,0.3)] border border-white/20 text-white ">
        <h2 className="text-2xl text-center font-bold mb-8">Contact Us</h2>

        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="p-3 rounded-xl bg-white/20 placeholder-white/70 text-white border-none focus:ring-2 focus:ring-purple-400 outline-none" required />
          <input type="email" placeholder="Your Email" className="p-3 rounded-xl bg-white/20 placeholder-white/70 text-white border-none focus:ring-2 focus:ring-purple-400 outline-none" required />
          <textarea placeholder="Your Message" rows="4" className="p-3 rounded-xl bg-white/20 placeholder-white/70 text-white border-none focus:ring-2 focus:ring-purple-400 outline-none" required></textarea>
          <button type="submit" className="mt-4 p-3 rounded-xl bg-purple-700 hover:bg-purple-800 hover:shadow-lg transition-all duration-300 text-white font-semibold">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default GlassSocialMedia;
