import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiCpu, FiTrash2 } from 'react-icons/fi';

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: '👋 Hi! I am your SkillBridge AI Assistant. I am trained to answer your doubts about our courses (Java, React, Python, Spring Boot, AWS, ML) and the platform itself. What doubt can I solve for you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Comprehensive Knowledge Base for Doubt Solving
  const solveDoubt = (question) => {
    const q = question.toLowerCase();

    // 1. Platform & Project Doubts
    if (q.includes('skillbridge') || q.includes('about project') || q.includes('what is this project')) {
      return "SkillBridge is a premium, production-grade Online Learning Platform built by Pavan Krishna V as a Major Project. It features expert video courses, progress tracking, smart notes, Pomodoro study timer, and automated digital certificate generation!";
    }
    if (q.includes('pavan') || q.includes('developed by') || q.includes('author') || q.includes('who built')) {
      return "This project was developed by Pavan Krishna V as a Final Year Major Project at Kolar, Karnataka, India.";
    }
    if (q.includes('tech stack') || q.includes('backend') || q.includes('frontend') || q.includes('database')) {
      return "SkillBridge uses a modern Full-Stack architecture: Java 17 + Spring Boot 3.2 for the backend REST APIs, Spring Security + JWT for authentication, H2 in-memory database, and React 19 + Vite + Framer Motion for the premium frontend UI.";
    }
    if (q.includes('certificate') || q.includes('cert') || q.includes('download')) {
      return "To earn a verified digital certificate, you must complete 100% of the lessons in a course. Once complete, a 'Get Certificate 🎓' button appears on the lesson page, allowing you to download a verified PDF with a unique QR code!";
    }
    if (q.includes('note') || q.includes('smart note')) {
      return "Smart Notes allow you to jot down key concepts directly while watching a video lesson. Your notes are securely saved in your browser storage so you never lose track of important timestamps!";
    }
    if (q.includes('timer') || q.includes('pomodoro') || q.includes('study timer')) {
      return "The built-in Pomodoro Study Timer follows the scientifically proven 25-minute focus rule. It helps you maintain deep concentration while learning, followed by a suggested 5-minute break.";
    }

    // 2. Java Doubts
    if (q.includes('oop') || q.includes('object oriented')) {
      return "Object-Oriented Programming (OOP) in Java revolves around 4 core pillars: Encapsulation (hiding data), Inheritance (code reusability), Polymorphism (one interface, multiple forms), and Abstraction (hiding implementation details).";
    }
    if (q.includes('polymorphism')) {
      return "Polymorphism in Java allows objects to take on many forms. It occurs in two ways: Compile-time (Method Overloading - same method name, different parameters) and Runtime (Method Overriding - child class redefining parent method).";
    }
    if (q.includes('inheritance')) {
      return "Inheritance is a mechanism where one class acquires the properties and behaviors of a parent class using the 'extends' keyword. It promotes code reusability and establishes a parent-child relationship.";
    }
    if (q.includes('list') && q.includes('set')) {
      return "The main difference in Java Collections: A List (like ArrayList) maintains insertion order and allows duplicate elements. A Set (like HashSet) does not maintain order and strictly prohibits duplicate elements.";
    }
    if (q.includes('stream') || q.includes('java 8')) {
      return "Java Streams (introduced in Java 8) allow declarative processing of collections. They support powerful functional operations like filter(), map(), and reduce() to manipulate data cleanly without boilerplate loops.";
    }
    if (q.includes('multithreading') || q.includes('thread')) {
      return "Multithreading in Java allows concurrent execution of two or more parts of a program to maximize CPU utilization. Threads can be created by extending the Thread class or implementing the Runnable interface.";
    }

    // 3. React Doubts
    if (q.includes('virtual dom') || q.includes('dom')) {
      return "The Virtual DOM is a lightweight in-memory representation of the real Real DOM. React uses it to compare UI changes (diffing) and only updates the exact changed nodes in the real DOM, making React incredibly fast!";
    }
    if (q.includes('state') && q.includes('props')) {
      return "Difference between State and Props in React: 'State' is internal data managed within a component that can change over time. 'Props' (properties) are read-only data passed from a parent component to a child component.";
    }
    if (q.includes('useeffect') || q.includes('effect')) {
      return "The useEffect hook in React is used to perform side effects in functional components, such as fetching data from an API, subscribing to events, or manually manipulating the DOM after rendering.";
    }
    if (q.includes('usestate') || q.includes('state hook')) {
      return "The useState hook allows functional components to store and update local state. It returns an array containing the current state value and a function to update it.";
    }
    if (q.includes('jsx')) {
      return "JSX (JavaScript XML) is a syntax extension for React that allows you to write HTML-like markup directly inside your JavaScript files. Under the hood, Babel converts JSX into React.createElement() calls.";
    }

    // 4. Python & Data Science Doubts
    if (q.includes('numpy')) {
      return "NumPy (Numerical Python) is a powerful library for mathematical and scientific computing in Python. It provides support for large, multi-dimensional arrays and matrices, along with high-level mathematical functions.";
    }
    if (q.includes('pandas') || q.includes('dataframe')) {
      return "Pandas is the premier data analysis library in Python. Its core data structure is the DataFrame—a tabular, spreadsheet-like structure that makes data cleaning, filtering, and aggregation incredibly simple.";
    }
    if (q.includes('matplotlib') || q.includes('chart')) {
      return "Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations (like line charts, bar plots, and scatter plots) in Python.";
    }
    if (q.includes('list') && q.includes('tuple')) {
      return "In Python, a List is mutable (can be changed after creation) and defined with square brackets []. A Tuple is immutable (cannot be changed) and defined with parentheses ().";
    }

    // 5. Spring Boot Doubts
    if (q.includes('dependency injection') || q.includes('ioc') || q.includes('autowired')) {
      return "Dependency Injection (DI) is a design pattern where Spring's Inversion of Control (IoC) container automatically instantiates and injects required dependencies (objects) into a class, usually via the @Autowired annotation.";
    }
    if (q.includes('jpa') || q.includes('hibernate')) {
      return "Spring Data JPA provides a robust abstraction layer over Hibernate/JPA. By simply extending interfaces like JpaRepository, Spring automatically generates all SQL queries for CRUD operations without writing boilerplate code.";
    }
    if (q.includes('spring security') || q.includes('jwt')) {
      return "Spring Security is a powerful framework that provides authentication and authorization. In SkillBridge, we combine it with JWT (JSON Web Tokens) to ensure stateless, secure REST API endpoints.";
    }
    if (q.includes('restcontroller') || q.includes('controller')) {
      return "In Spring Boot, @Controller is used for traditional web apps returning HTML views. @RestController is a specialized version combining @Controller and @ResponseBody, specifically designed for REST APIs returning JSON data.";
    }

    // 6. AWS & Cloud Doubts
    if (q.includes('ec2') || q.includes('virtual machine')) {
      return "Amazon EC2 (Elastic Compute Cloud) provides scalable virtual servers in the cloud. It allows developers to configure CPU, memory, and networking to deploy web applications securely.";
    }
    if (q.includes('s3') || q.includes('bucket')) {
      return "Amazon S3 (Simple Storage Service) is an object storage service offering industry-leading scalability and security. It is widely used to store images, videos, backups, and static website files inside 'buckets'.";
    }

    // 7. Machine Learning Doubts
    if (q.includes('machine learning') || q.includes('ml')) {
      return "Machine Learning is a subset of Artificial Intelligence where algorithms learn patterns from historical data to make predictions or decisions without being explicitly programmed.";
    }
    if (q.includes('supervised') && q.includes('unsupervised')) {
      return "Supervised Learning uses labeled training data (e.g., predicting house prices from known past sales). Unsupervised Learning finds hidden patterns in unlabeled data (e.g., clustering customers based on purchasing behavior).";
    }
    if (q.includes('linear regression')) {
      return "Linear Regression is a fundamental supervised ML algorithm used to predict a continuous numerical output (like salary or temperature) by fitting a best-fit straight line through historical data points.";
    }

    // Smart Fallback for unmapped doubts
    return `That is an excellent doubt! In the context of our SkillBridge curriculum, understanding "${question}" requires analyzing its core underlying principles. I recommend reviewing the specific course video lesson where our expert instructor breaks this topic down with practical examples! You can also check our Help Center for documentation.`;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    const newMessages = [...messages, { role: 'user', text: userMsg }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Simulate AI analyzing the doubt
    setTimeout(() => {
      const botResponse = solveDoubt(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 800);
  };

  const clearChat = () => {
    setMessages([
      { role: 'bot', text: '👋 Chat cleared! What new doubt can I solve for you today?' }
    ]);
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
          width: '65px',
          height: '65px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.8rem',
          boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
          zIndex: 10000,
          cursor: 'pointer',
          border: 'none',
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
              bottom: '110px',
              right: '30px',
              width: '380px',
              height: '520px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10000,
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{ padding: '18px 20px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }} />
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '1.05rem', margin: 0 }}>SkillBridge AI Assistant</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Expert Doubt Solver</span>
                </div>
              </div>
              <button 
                onClick={clearChat}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.1rem' }}
                title="Clear Chat"
              >
                <FiTrash2 />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-lg)',
                    background: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-primary)',
                    color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                    fontSize: '0.92rem',
                    lineHeight: '1.5',
                    border: msg.role === 'bot' ? '1px solid var(--border)' : 'none',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ alignSelf: 'flex-start', padding: '10px 16px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)', fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}
                >
                  🤖 AI is analyzing your doubt...
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div style={{ padding: '16px', borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)', display: 'flex', gap: '10px' }}>
              <input 
                className="form-input"
                placeholder="Ask any course or project doubt..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              />
              <button 
                className="btn btn-primary" 
                style={{ padding: '0 20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                onClick={handleSend}
              >
                <FiSend style={{ fontSize: '1.2rem' }} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
