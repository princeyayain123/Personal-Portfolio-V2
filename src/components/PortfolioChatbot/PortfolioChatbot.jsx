import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Bot, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import './portfolio-chatbot.css';

const QUICK_PROMPTS = ['What do you build?', 'Show me your projects', 'What is your experience?', 'How can I contact you?'];

const INITIAL_MESSAGE = {
  id: 'welcome',
  sender: 'bot',
  text: "Hi, I'm Julius's portfolio assistant. Ask me about his work, experience, toolkit, or availability.",
};

function getAssistantResponse(message) {
  const query = message.toLowerCase();

  if (/hello|hi\b|hey|good morning|good afternoon/.test(query)) {
    return { text: "Hello! I can help you explore Julius's projects, professional experience, technical toolkit, and contact details." };
  }

  if (/project|portfolio|work|build|dubraes|inventory|boat|cybersecurity|attendance/.test(query)) {
    return {
      text: 'Julius has five featured projects spanning a 3D boat-seat configurator, cybersecurity training, attendance management, personalized e-commerce, and a private inventory platform.',
      action: { label: 'Explore selected work', href: '#projects' },
    };
  }

  if (/skill|stack|technology|technologies|tool|react|node|mobile|three/.test(query)) {
    return {
      text: 'His toolkit includes React, Next.js, TypeScript, Node.js, Express, Laravel, Three.js, GSAP, Tailwind CSS, MongoDB, PostgreSQL, and Docker.',
      action: { label: 'See the toolkit', href: '#practice' },
    };
  }

  if (/experience|job|role|company|keep me fresh|pompanette|asian team|xfinite/.test(query)) {
    return {
      text: 'Julius currently works as a Full-Stack & Mobile App Developer at Keep Me Fresh LLC. His background also includes web development, freelance front-end work, and data-labeling experience.',
      action: { label: 'View experience', href: '#experience' },
    };
  }

  if (/available|availability|hire|freelance|collaborate|opportunity/.test(query)) {
    return {
      text: 'Yes. Julius is open to product-focused web and mobile development opportunities, as well as thoughtful freelance collaborations.',
      action: { label: 'Start a conversation', href: '#contact' },
    };
  }

  if (/contact|email|phone|message|reach/.test(query)) {
    return {
      text: 'You can reach Julius at princeyayain123@gmail.com or use the contact form near the bottom of this portfolio.',
      action: { label: 'Go to contact', href: '#contact' },
    };
  }

  if (/where|location|based|philippines|lucena/.test(query)) {
    return { text: 'Julius is based in Lucena City, Quezon, Philippines, and can collaborate remotely.' };
  }

  if (/certificate|certification|credential|ibm|huawei|tesda/.test(query)) {
    return {
      text: 'His credentials include IBM Full Stack Software Developer training, Huawei cloud-computing certification, and TESDA Computer Systems Servicing NC II.',
      action: { label: 'View credentials', href: '#certificates' },
    };
  }

  return {
    text: "I can best answer questions about Julius's projects, experience, skills, credentials, availability, and contact information. Try one of the suggested questions below.",
  };
}

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef(null);
  const replyTimerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => () => window.clearTimeout(replyTimerRef.current), []);

  useEffect(() => {
    if (!isOpen) return;
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
  }, [isOpen, messages, isTyping]);

  useEffect(() => {
    if (isOpen) window.setTimeout(() => inputRef.current?.focus(), 220);
  }, [isOpen]);

  const sendMessage = (text = input) => {
    const trimmedMessage = text.trim();
    if (!trimmedMessage || isTyping) return;

    setMessages((current) => [...current, { id: `user-${Date.now()}`, sender: 'user', text: trimmedMessage }]);
    setInput('');
    setIsTyping(true);

    replyTimerRef.current = window.setTimeout(() => {
      const response = getAssistantResponse(trimmedMessage);
      setMessages((current) => [...current, { id: `bot-${Date.now()}`, sender: 'bot', ...response }]);
      setIsTyping(false);
    }, 650);
  };

  const closeChat = () => setIsOpen(false);

  return (
    <div className="portfolio-chatbot">
      <AnimatePresence>
        {isOpen && (
          <Motion.section
            className="portfolio-chatbot__panel"
            role="dialog"
            aria-modal="false"
            aria-labelledby="portfolio-chatbot-title"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="portfolio-chatbot__header">
              <span className="portfolio-chatbot__avatar"><Bot size={22} /></span>
              <span>
                <small><i /> Online portfolio guide</small>
                <strong id="portfolio-chatbot-title">Ask about Julius</strong>
              </span>
              <button type="button" onClick={closeChat} aria-label="Close portfolio assistant"><X size={20} /></button>
            </header>

            <div className="portfolio-chatbot__messages" ref={messagesRef} data-lenis-prevent aria-live="polite">
              {messages.map((message) => (
                <Motion.div
                  className={`portfolio-chatbot__message portfolio-chatbot__message--${message.sender}`}
                  key={message.id}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.28 }}
                >
                  {message.sender === 'bot' && <span className="portfolio-chatbot__mini-avatar"><Sparkles size={13} /></span>}
                  <div>
                    <p>{message.text}</p>
                    {message.action && <a href={message.action.href} onClick={closeChat}>{message.action.label}<span>↗</span></a>}
                  </div>
                </Motion.div>
              ))}

              {isTyping && (
                <div className="portfolio-chatbot__message portfolio-chatbot__message--bot">
                  <span className="portfolio-chatbot__mini-avatar"><Sparkles size={13} /></span>
                  <div className="portfolio-chatbot__typing" aria-label="Assistant is typing"><i /><i /><i /></div>
                </div>
              )}
            </div>

            <div className="portfolio-chatbot__prompts" aria-label="Suggested questions">
              {QUICK_PROMPTS.map((prompt) => <button type="button" onClick={() => sendMessage(prompt)} disabled={isTyping} key={prompt}>{prompt}</button>)}
            </div>

            <form className="portfolio-chatbot__form" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
              <label className="sr-only" htmlFor="portfolio-chatbot-input">Ask the portfolio assistant</label>
              <input id="portfolio-chatbot-input" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask something..." autoComplete="off" />
              <button type="submit" disabled={!input.trim() || isTyping} aria-label="Send message"><Send size={18} /></button>
            </form>
          </Motion.section>
        )}
      </AnimatePresence>

      <Motion.button
        className={`portfolio-chatbot__toggle cursor-target${isOpen ? ' portfolio-chatbot__toggle--open' : ''}`}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={25} />}
        {!isOpen && <span className="portfolio-chatbot__notification">1</span>}
      </Motion.button>
    </div>
  );
}
