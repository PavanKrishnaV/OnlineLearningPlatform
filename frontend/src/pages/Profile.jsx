import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiAward, FiBookOpen } from 'react-icons/fi';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    API.get('/enrollments/my').then(res => setEnrollments(res.data)).catch(() => {});
    API.get('/certificates/my').then(res => setCertificates(res.data)).catch(() => {});
  }, []);

  return (
    <div className="page">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="page-header"><h1>My Profile</h1></div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            <div className="stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5rem' }}>
                  <FiUser />
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{user?.fullName}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}><FiMail style={{ marginRight: '4px' }} />{user?.email}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {user?.roles?.map(r => <span key={r} className="badge badge-beginner">{r.replace('ROLE_', '')}</span>)}
              </div>
            </div>
            <div className="stat-card"><h3><FiBookOpen /> Courses Enrolled</h3><div className="stat-value">{enrollments.length}</div></div>
            <div className="stat-card"><h3><FiAward /> Certificates</h3><div className="stat-value">{certificates.length}</div></div>
            <div className="stat-card">
              <h3>⚡ Learning Streak</h3>
              <div className="stat-value" style={{ color: '#fb923c' }}>7 Days</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>You&apos;re on fire! Keep it up.</p>
            </div>
            <div className="stat-card">
              <h3>💎 Skill Points (XP)</h3>
              <div className="stat-value" style={{ color: '#fbbf24' }}>1,250</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Next level: Expert</p>
            </div>
          </div>

          {certificates.length > 0 && (
            <>
              <h2 className="section-title">My Certificates</h2>
              <div style={{ display: 'grid', gap: '12px', maxWidth: '600px' }}>
                {certificates.map(cert => (
                  <div key={cert.id} className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FiAward style={{ fontSize: '1.5rem', color: 'var(--accent-light)' }} />
                    <div>
                      <h4 style={{ fontWeight: 600 }}>{cert.courseName}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>#{cert.certificateNumber} · Issued {new Date(cert.issuedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
