import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiCpu } from 'react-icons/fi';

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I am your SkillBridge AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI thinking
    setTimeout(() => {
      let botResponse = "That's a great question! I'm currently analyzing your learning path. For more details, you can visit our Help Center or contact support.";
      
      if (input.toLowerCase().includes('course')) {
        botResponse = "We have over 50 expert-led courses in Programming, Data Science, and more. You can explore them in the 'Courses' tab!";
      } else if (input.toLowerCase().includes('certificate')) {
        botResponse = "You can earn a verified certificate by completing 100% of the lessons in any course. Your certificates will appear in your Profile.";
      } else if (input.toLowerCase().includes('note')) {
        botResponse = "Yes! Use our new 'Smart Notes' feature on any lesson page to capture key moments with timestamps.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
          zIndex: 10000,
          cursor: 'pointer',
          border: 'none'
        }}
      >
        {isOpen ? <FiX /> : <FiCpu />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '30px',
              width: '350px',
              height: '450px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10000,
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--success)' }} />
              <h4 style={{ fontWeight: 700, fontSize: '1rem' }}>SkillBridge AI Assistant</h4>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-primary)',
                  color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                  fontSize: '0.9rem',
                  border: msg.role === 'bot' ? '1px solid var(--border)' : 'none'
                }}>
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: '15px', borderTop: '1px solid var(--border)', display: 'flex', gap: '10px' }}>
              <input 
                className="form-input"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                style={{ flex: 1, padding: '10px' }}
              />
              <button className="btn btn-primary" style={{ padding: '10px' }} onClick={handleSend}>
                <FiSend />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
