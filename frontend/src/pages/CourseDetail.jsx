import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiClock, FiUsers, FiBookOpen, FiPlay, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    API.get(`/courses/${id}`).then(res => { setCourse(res.data); setLoading(false); }).catch(() => setLoading(false));
    if (user) {
      API.get(`/enrollments/check/${id}`).then(res => setEnrolled(res.data.enrolled)).catch(() => {});
    }
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) { navigate('/login'); return; }
    setEnrolling(true);
    try {
      await API.post(`/enrollments/${id}`);
      setEnrolled(true);
      toast.success('Enrolled successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to enroll');
    }
    setEnrolling(false);
  };

  if (loading) return <div className="page"><div className="container"><div className="spinner" /></div></div>;
  if (!course) return <div className="page"><div className="container"><p>Course not found</p></div></div>;

  const levelBadge = (level) => {
    if (level === 'Beginner') return 'badge badge-beginner';
    if (level === 'Intermediate') return 'badge badge-intermediate';
    return 'badge badge-advanced';
  };

  return (
    <div className="page">
      <div className="container">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="course-detail-header">
            <div>
              <span className={levelBadge(course.level)}>{course.level}</span>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '16px 0' }}>{course.title}</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>{course.description}</p>
              <div className="course-meta" style={{ fontSize: '0.95rem', marginBottom: '24px' }}>
                <span><FiUsers /> {course.instructor}</span>
                <span><FiStar style={{ fill: '#f59e0b', color: '#f59e0b' }} /> {course.rating}</span>
                <span><FiClock /> {course.durationHours} hours</span>
                <span><FiBookOpen /> {course.totalLessons} lessons</span>
              </div>
              {enrolled ? (
                <Link to={`/lesson/${course.id}/${course.lessons?.[0]?.id}`} className="btn btn-primary">
                  <FiPlay /> Continue Learning
                </Link>
              ) : (
                <button className="btn btn-primary" onClick={handleEnroll} disabled={enrolling}>
                  {enrolling ? 'Enrolling...' : 'Enroll Now - Free'}
                </button>
              )}
            </div>
            <img src={course.thumbnailUrl} alt={course.title} style={{ borderRadius: 'var(--radius-lg)' }}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600'; }} />
          </div>

          {/* Lessons List */}
          <h2 className="section-title">Course Curriculum</h2>
          <p className="section-subtitle">{course.totalLessons} lessons · {course.durationHours} hours total</p>

          <div style={{ maxWidth: '700px' }}>
            {course.lessons?.map((lesson, i) => (
              <motion.div key={lesson.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginBottom: '8px', background: 'var(--bg-card)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>{lesson.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{lesson.durationMinutes} min</p>
                </div>
                {enrolled ? (
                  <Link to={`/lesson/${course.id}/${lesson.id}`} className="btn btn-secondary btn-sm"><FiPlay /> Play</Link>
                ) : (
                  <FiPlay style={{ color: 'var(--text-secondary)' }} />
                )}
              </motion.div>
            ))}
          </div>

          {/* Reviews Section */}
          <div style={{ marginTop: '60px' }}>
            <h2 className="section-title">Learner Reviews</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '32px' }}>
              {[
                { name: 'Alex Johnson', rating: 5, date: '2 days ago', text: 'This course is absolutely amazing. The instructor explains complex concepts with such ease. Highly recommended!' },
                { name: 'Sarah Miller', rating: 4, date: '1 week ago', text: 'Great content and the projects are very helpful. The new smart notes feature is a game changer.' },
                { name: 'David Chen', rating: 5, date: '3 days ago', text: 'Top-notch production quality. I learned more in 5 hours here than in my entire semester at college.' }
              ].map((rev, i) => (
                <div key={i} className="card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h4 style={{ fontWeight: 700 }}>{rev.name}</h4>
                    <div style={{ color: 'var(--warning)', display: 'flex', gap: '2px' }}>
                      {[...Array(rev.rating)].map((_, i) => <FiStar key={i} style={{ fill: 'currentColor' }} />)}
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '12px' }}>&quot;{rev.text}&quot;</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{rev.date}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
