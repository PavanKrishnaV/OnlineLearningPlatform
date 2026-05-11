import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiClock } from 'react-icons/fi';
import API from '../api/axios';

export default function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/enrollments/my').then(res => { setEnrollments(res.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>My Courses</h1>
          <p>Continue learning where you left off</p>
        </div>

        {loading ? <div className="spinner" /> : enrollments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <h3 style={{ marginBottom: '12px' }}>No courses yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Start your learning journey by enrolling in a course!</p>
            <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
          </div>
        ) : (
          <div className="course-grid">
            {enrollments.map((enrollment, i) => (
              <motion.div key={enrollment.enrollmentId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <div className="card" style={{ padding: '20px' }}>
                  <img src={enrollment.courseThumbnail} alt={enrollment.courseTitle} style={{ borderRadius: 'var(--radius-md)', height: '160px', objectFit: 'cover', width: '100%', marginBottom: '16px' }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600'; }} />
                  <h3 style={{ fontWeight: 700, marginBottom: '6px' }}>{enrollment.courseTitle}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '12px' }}>{enrollment.instructor}</p>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                      <span>Progress</span>
                      <span style={{ fontWeight: 600, color: 'var(--accent-light)' }}>{enrollment.progressPercent}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${enrollment.progressPercent}%` }} />
                    </div>
                  </div>
                  <Link to={`/courses/${enrollment.courseId}`} className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                    <FiPlay /> {enrollment.progressPercent > 0 ? 'Continue Learning' : 'Start Course'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
