import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAward, FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function CertificatePage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => { generateCert(); }, []);

  const generateCert = async () => {
    setGenerating(true);
    try {
      const res = await API.post(`/certificates/generate/${courseId}`);
      setCert(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cannot generate certificate yet');
    }
    setLoading(false);
    setGenerating(false);
  };

  const downloadPDF = () => {
    if (!cert) return;
    const doc = new jsPDF({ orientation: 'landscape' });
    // Background
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 297, 210, 'F');
    // Border
    doc.setDrawColor(99, 102, 241);
    doc.setLineWidth(3);
    doc.rect(15, 15, 267, 180);
    // Title
    doc.setTextColor(99, 102, 241);
    doc.setFontSize(36);
    doc.setFont('helvetica', 'bold');
    doc.text('Certificate of Completion', 148.5, 55, { align: 'center' });
    // Body
    doc.setTextColor(241, 245, 249);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('This is to certify that', 148.5, 80, { align: 'center' });
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(129, 140, 248);
    doc.text(cert.userName, 148.5, 100, { align: 'center' });
    doc.setTextColor(241, 245, 249);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('has successfully completed the course', 148.5, 120, { align: 'center' });
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(168, 85, 247);
    doc.text(cert.courseName, 148.5, 140, { align: 'center' });
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text(`Certificate #: ${cert.certificateNumber}`, 148.5, 165, { align: 'center' });
    doc.text(`Issued: ${new Date(cert.issuedAt).toLocaleDateString()}`, 148.5, 175, { align: 'center' });
    doc.text('SkillBridge - Online Learning Platform', 148.5, 185, { align: 'center' });
    doc.save(`Certificate_${cert.courseName.replace(/\s+/g, '_')}.pdf`);
    toast.success('Certificate downloaded!');
  };

  if (loading) return <div className="page"><div className="container"><div className="spinner" /></div></div>;

  return (
    <div className="page">
      <div className="container">
        {cert ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="certificate-card">
              <FiAward style={{ fontSize: '3rem', color: 'var(--accent-light)', marginBottom: '16px', position: 'relative' }} />
              <h2>Certificate of Completion</h2>
              <p style={{ color: 'var(--text-secondary)', position: 'relative' }}>This is to certify that</p>
              <div className="cert-name">{cert.userName}</div>
              <p style={{ color: 'var(--text-secondary)', position: 'relative' }}>has successfully completed</p>
              <div className="cert-name" style={{ color: 'var(--gradient-end)' }}>{cert.courseName}</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '16px', position: 'relative' }}>
                Certificate #: {cert.certificateNumber} · Issued: {new Date(cert.issuedAt).toLocaleDateString()}
              </p>
              <button className="btn btn-primary" onClick={downloadPDF} style={{ marginTop: '24px', position: 'relative' }}>
                <FiDownload /> Download PDF
              </button>
            </div>
          </motion.div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <h2>Certificate Not Available</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Complete all lessons in this course to earn your certificate.</p>
          </div>
        )}
      </div>
    </div>
  );
}
