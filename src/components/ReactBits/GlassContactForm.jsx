import React, { useEffect, useState } from 'react';
import { MdOutlineDone } from 'react-icons/md';
import axios from 'axios';

const GlassContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let interval;

    if (visible) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress <= 0) {
            setVisible(false);
            clearInterval(interval);
            setTimeout(() => {
              setProgress(100);
            }, 500);
          }
          return prevProgress - 1;
        });
      }, 50);
    }

    return () => {
      clearInterval(interval);
    };
  }, [visible]);

  const handleRequest = (e) => {
    e.preventDefault();

    axios
      .post('https://personal-portfolio-server-1-sh0m.onrender.com/api/contacts', {
        name,
        email,
        message,
      })
      .then((res) => {
        setVisible(true);
      })
      .catch(console.log);
  };

  return (
    <>
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

      <div className={` ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[100px] opacity-0'} transition-all duration-300  rounded-md bg-white fixed bottom-[20px] left-[20px] z-50 text-text notificationShadow flex items-start justify-between px-5 py-4 dark:bg-slate-800 dark:shadow-none dark:border dark:border-slate-700 gap-[10px]`}>
        <div className="flex items-center gap-[10px]">
          <MdOutlineDone className="text-green-500 text-[1.3rem] mt-0.5 border border-green-500 rounded-full p-0.5" />
          <div className="text-start">
            <h3 className="text-[1rem] dark:text-[#abc2d3] font-[600]">Thank you for contacting me!</h3>
            <p className="text-[0.8rem] dark:text-slate-400">I will reach you out ASAP!</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-[3px] bg-green-500 rounded" style={{ width: `${progress}%` }}></div>
      </div>
    </>
  );
};

export default GlassContactForm;
