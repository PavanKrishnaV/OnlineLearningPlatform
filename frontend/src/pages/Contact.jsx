import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you soon.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="page">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="page-header" style={{ textAlign: 'center' }}><h1>Contact Us</h1><p>We&apos;d love to hear from you</p></div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', maxWidth: '900px', margin: '0 auto' }}>
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: '24px' }}>Get in Touch</h3>
              {[
                { icon: <FiMail />, label: 'Email', val: 'support@skillbridge.com' },
                { icon: <FiPhone />, label: 'Phone', val: '+91-9876543210' },
                { icon: <FiMapPin />, label: 'Address', val: 'Kolar, Karnataka, India' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-light)', flexShrink: 0 }}>{item.icon}</div>
                  <div><p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.label}</p><p style={{ fontWeight: 600 }}>{item.val}</p></div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '32px' }}>
              <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
              <div className="form-group"><label className="form-label">Message</label><textarea className="form-input" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required /></div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}><FiSend /> Send Message</button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
