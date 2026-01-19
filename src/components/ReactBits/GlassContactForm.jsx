import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GlassContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [contacts, setContacts] = useState([]);

  const handleRequest = (e) => {
    e.preventDefault();

    axios
      .post('https://personal-portfolio-server-1-sh0m.onrender.com/api/contacts', {
        name,
        email,
        message,
      })
      .then((res) => {
        console.log('asdas');
      })
      .catch(console.log);
  };

  return (
    <div className="flex w-full h-full items-center justify-end">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl px-5 py-10 md:p-10 w-full h-full flex flex-col shadow-[0_8px_32px_rgba(128,0,128,0.3)] border border-white/20 text-white">
        <h2 className="text-3xl text-start font-bold mb-2"> Contact Us</h2>
        <p className="text-lg text-start font-normal mb-8">Let's align our constellations! Reach out and let the magic of collaboration illuminate our skies.</p>

        <form className="flex flex-col flex-1 gap-4" onSubmit={handleRequest}>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Your Name"
            className="p-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Your Email"
            className="p-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="p-3 rounded-xl bg-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-purple-400 outline-none flex-1 resize-none"
            required
          />
          <button type="submit" className="cursor-target mt-auto p-3 rounded-xl bg-purple-700 hover:bg-purple-800 hover:shadow-lg transition-all duration-300 text-white font-semibold">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default GlassContactForm;
