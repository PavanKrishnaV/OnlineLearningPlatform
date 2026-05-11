import { motion } from 'framer-motion';
import { FiCode, FiDatabase, FiLayers, FiShield, FiSmartphone, FiCloud } from 'react-icons/fi';

export default function Services() {
  const services = [
    { icon: <FiCode />, title: 'Web Development', desc: 'Learn modern web technologies including React, Angular, Vue, and Node.js from industry experts.' },
    { icon: <FiDatabase />, title: 'Data Science', desc: 'Master data analysis, machine learning, and AI with Python, R, and TensorFlow.' },
    { icon: <FiLayers />, title: 'Full Stack Development', desc: 'Become a complete full-stack developer with hands-on projects and real-world experience.' },
    { icon: <FiShield />, title: 'Cybersecurity', desc: 'Learn ethical hacking, network security, and best practices for securing applications.' },
    { icon: <FiSmartphone />, title: 'Mobile Development', desc: 'Build cross-platform mobile apps using React Native, Flutter, and native iOS/Android.' },
    { icon: <FiCloud />, title: 'Cloud Computing', desc: 'Master AWS, Azure, and GCP services for scalable cloud architecture and deployment.' }
  ];

  return (
    <div className="page">
      <div className="container">
        <div className="page-header" style={{ textAlign: 'center' }}>
          <h1>Our Services</h1>
          <p>Comprehensive learning solutions for every career path</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {services.map((s, i) => (
            <motion.div key={i} className="card" style={{ padding: '32px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <div style={{ fontSize: '2rem', color: 'var(--accent-light)', marginBottom: '16px' }}>{s.icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
