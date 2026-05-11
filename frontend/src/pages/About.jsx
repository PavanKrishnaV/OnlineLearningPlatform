import { motion } from 'framer-motion';
import { FiTarget, FiUsers, FiAward, FiGlobe } from 'react-icons/fi';

export default function About() {
  return (
    <div className="page">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="page-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1>About <span style={{ color: 'var(--accent-light)' }}>SkillBridge</span></h1>
            <p>Empowering the next generation of learners worldwide</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '60px' }}>
            {[
              { icon: <FiTarget />, title: 'Our Mission', desc: 'To make quality education accessible to everyone, everywhere. We believe that learning should be affordable, engaging, and effective.' },
              { icon: <FiUsers />, title: 'Our Team', desc: 'We are a team of passionate educators, developers, and designers dedicated to creating the best learning experience possible.' },
              { icon: <FiAward />, title: 'Quality Content', desc: 'Every course on SkillBridge is created by industry experts and goes through rigorous quality checks before being published.' },
              { icon: <FiGlobe />, title: 'Global Reach', desc: 'With learners from over 150 countries, SkillBridge is truly a global learning platform that transcends borders.' }
            ].map((item, i) => (
              <motion.div key={i} className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <div style={{ fontSize: '2rem', color: 'var(--accent-light)', marginBottom: '12px' }}>{item.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', padding: '40px', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Internship Final Year Project</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>
              This Online Learning Platform is developed as a Full Stack Java Project demonstrating modern web development practices including React.js, Spring Boot, MySQL, JWT Authentication, and responsive design.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
