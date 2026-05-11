import { motion } from 'framer-motion';
import { FiHelpCircle } from 'react-icons/fi';
import { useState } from 'react';

const faqs = [
  { q: 'How do I enroll in a course?', a: 'Simply browse the courses page, click on a course you like, and click the "Enroll Now" button. You need to be logged in to enroll.' },
  { q: 'Are the courses free?', a: 'Yes! All courses on SkillBridge are currently free of charge. Simply create an account and start learning.' },
  { q: 'How do I track my progress?', a: 'Your progress is automatically tracked as you complete lessons. Visit "My Courses" to see your overall progress for each enrolled course.' },
  { q: 'How do I get a certificate?', a: 'Complete all lessons in a course to earn your certificate. Once all lessons are marked complete, you can download your certificate as a PDF.' },
  { q: 'Can I watch videos offline?', a: 'Currently, videos are streamed online. You need an internet connection to watch course videos.' },
  { q: 'How do I contact support?', a: 'Visit our Contact page or email us at support@learnhub.com. We typically respond within 24 hours.' }
];

export default function Help() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="page">
      <div className="container">
        <div className="page-header" style={{ textAlign: 'center' }}><h1>Help & Support</h1><p>Frequently asked questions</p></div>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', background: 'none', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem', textAlign: 'left' }}>
                <FiHelpCircle style={{ color: 'var(--accent-light)', flexShrink: 0 }} />
                {faq.q}
              </button>
              {openIndex === i && (
                <div style={{ padding: '0 20px 16px 48px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>{faq.a}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
