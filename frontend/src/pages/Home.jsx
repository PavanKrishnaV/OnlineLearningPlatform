import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiClock, FiUsers, FiBookOpen, FiArrowRight } from 'react-icons/fi';
import API from '../api/axios';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/courses').then(res => { setCourses(res.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const levelBadge = (level) => {
    if (level === 'Beginner') return 'badge badge-beginner';
    if (level === 'Intermediate') return 'badge badge-intermediate';
    return 'badge badge-advanced';
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Unlock Your Potential with<br /><span>World-Class Learning</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            Master in-demand skills with expert-led courses. From programming to data science, we&apos;ve got everything you need to accelerate your career.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
            <Link to="/courses" className="btn btn-primary" style={{ marginRight: '16px' }}>
              Explore Courses <FiArrowRight />
            </Link>
            <Link to="/signup" className="btn btn-secondary">Get Started Free</Link>
          </motion.div>
          <div className="hero-stats">
            <motion.div className="hero-stat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <h3>10K+</h3><p>Active Learners</p>
            </motion.div>
            <motion.div className="hero-stat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <h3>50+</h3><p>Expert Courses</p>
            </motion.div>
            <motion.div className="hero-stat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <h3>95%</h3><p>Satisfaction Rate</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="page" style={{ paddingTop: '40px' }}>
        <div className="container">
          <h2 className="section-title">Featured Courses</h2>
          <p className="section-subtitle">Handpicked courses to help you get started on your learning journey</p>

          {loading ? <div className="spinner" /> : (
            <div className="course-grid">
              {courses.slice(0, 6).map((course, i) => (
                <motion.div key={course.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/courses/${course.id}`} style={{ textDecoration: 'none' }}>
                    <div className="card">
                      <img src={course.thumbnailUrl} alt={course.title} className="course-card-img"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600'; }} />
                      <div className="course-card-body">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span className={levelBadge(course.level)}>{course.level}</span>
                          <span className="course-rating"><FiStar style={{ fill: '#f59e0b' }} /> {course.rating}</span>
                        </div>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <div className="course-meta">
                          <span><FiUsers /> {course.instructor}</span>
                          <span><FiClock /> {course.durationHours}h</span>
                          <span><FiBookOpen /> {course.totalLessons} lessons</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/courses" className="btn btn-primary">View All Courses <FiArrowRight /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
