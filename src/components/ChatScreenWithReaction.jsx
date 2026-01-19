import { useState, useRef, useEffect, useMemo } from 'react';

// framer motion
import { motion, AnimatePresence } from 'framer-motion';

// react icons
import { LuHeart, LuSend, LuThumbsUp } from 'react-icons/lu';
import { FaRegSmile } from 'react-icons/fa';

import axios from 'axios';

function getMyId() {
  let id = localStorage.getItem('me');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('me', id);
  }
  return id;
}

const ChatScreenWithReaction = () => {
  const MY_ID = useMemo(() => getMyId(), []);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [reactingTo, setReactingTo] = useState(null);
  const inputRef = useRef(null);

  const getSender = (message) => (message.senderId === MY_ID ? 'me' : 'other');

  // Load messages
  useEffect(() => {
    axios
      .get('https://personal-portfolio-server-1-sh0m.onrender.com/api/users')
      .then((res) => setMessages(res.data))
      .catch(console.log);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      text: newMessage,
      senderId: MY_ID,
      senderProfile: {
        avatar: 'https://i.pravatar.cc/40?u=' + MY_ID,
      },
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      reaction: null,
    };

    setMessages((prev) => [...prev, message]);

    axios
      .post('https://personal-portfolio-server-1-sh0m.onrender.com/api/users', message)
      .then((res) => {
        setMessages((prev) => [...prev, res.data]);
      })
      .catch(console.log);

    setNewMessage('');
    inputRef.current?.focus();
  };

  const handleReaction = (messageId, reaction) => {
    setMessages((prev) => prev.map((m) => (m.id === messageId ? { ...m, reaction: m.reaction === reaction ? null : reaction } : m)));
    setReactingTo(null);
  };

  const messageVariants = {
    hidden: (sender) => ({
      opacity: 0,
      y: 20,
      x: sender === 'me' ? 50 : -50,
      scale: 0.9,
    }),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 220, damping: 18 },
    },
    exit: { opacity: 0, y: 10, scale: 0.9 },
  };

  return (
    <div className="flex flex-col border border-white/30 rounded-lg shadow w-full h-full">
      <div className="flex-1 p-4 pr-8 overflow-y-auto max-h-[320px]">
        <AnimatePresence>
          {messages.map((message) => {
            const sender = getSender(message);

            return (
              <motion.div key={message.id} custom={sender} variants={messageVariants} initial="hidden" animate="visible" exit="exit" layout className={`mb-4 flex ${sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className="relative max-w-md flex items-end gap-2">
                  {sender === 'other' && <img src={message.senderProfile?.avatar} className="w-8 h-8 rounded-full" />}

                  <div>
                    <div className={`px-4 py-2 rounded-xl text-sm ${sender === 'me' ? 'bg-blue-50 dark:bg-blue-900/90 rounded-br-none' : 'bg-gray-50 dark:bg-slate-800 rounded-bl-none'}`}>{message.text}</div>
                    <div className={`mt-1 text-xs text-gray-500 ${sender === 'me' ? 'text-right' : 'text-left'}`}>{message.timestamp}</div>
                  </div>

                  {sender === 'me' && <img src={message.senderProfile?.avatar} className="w-8 h-8 rounded-full" />}

                  {message.reaction && (
                    <span onClick={() => setReactingTo(message.id)} className="absolute -right-2 bottom-2 bg-white dark:bg-slate-800 rounded-full min-w-[25px] min-h-[25px] flex items-center justify-center cursor-pointer">
                      {message.reaction === 'love' && <LuHeart size={12} color="red" />}
                      {message.reaction === 'like' && <LuThumbsUp size={12} color="blue" />}
                      {message.reaction === 'smile' && <FaRegSmile size={12} color="gold" />}
                    </span>
                  )}

                  {sender === 'other' && !message.reaction && (
                    <button onClick={() => setReactingTo(message.id)} className="absolute bottom-2 -right-2 bg-gray-100 dark:bg-slate-700 rounded-full p-1">
                      <FaRegSmile size={14} />
                    </button>
                  )}

                  <AnimatePresence>
                    {reactingTo === message.id && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute -bottom-6 right-0 bg-white dark:bg-slate-800 rounded-full p-1 flex gap-1 shadow">
                        <button onClick={() => handleReaction(message.id, 'love')}>
                          <LuHeart size={15} />
                        </button>
                        <button onClick={() => handleReaction(message.id, 'like')}>
                          <LuThumbsUp size={15} />
                        </button>
                        <button onClick={() => handleReaction(message.id, 'smile')}>
                          <FaRegSmile size={16} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="p-4">
        <div className="flex gap-2">
          <input ref={inputRef} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 px-4 py-3 rounded-full border dark:bg-slate-900" placeholder="Type a message..." />
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleSendMessage} className="min-w-[50px] rounded-full bg-pink-400 flex items-center justify-center">
            <LuSend size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreenWithReaction;
