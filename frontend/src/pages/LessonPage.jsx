import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { FiCheckCircle, FiCircle, FiChevronRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../api/axios';

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [courseId, lessonId]);

  const loadData = async () => {
    try {
      const [courseRes, lessonsRes, progressRes] = await Promise.all([
        API.get(`/courses/${courseId}`),
        API.get(`/courses/${courseId}/lessons`),
        API.get(`/progress/course/${courseId}`)
      ]);
      setCourse(courseRes.data);
      setLessons(lessonsRes.data);
      setProgress(progressRes.data);
      const active = lessonsRes.data.find(l => l.id === parseInt(lessonId));
      setCurrentLesson(active || lessonsRes.data[0]);
    } catch (err) {
      toast.error('Failed to load lesson');
    }
    setLoading(false);
  };

  const markComplete = async () => {
    try {
      await API.post(`/progress/complete/${currentLesson.id}`);
      toast.success('Lesson marked as complete!');
      loadData();
    } catch (err) {
      toast.error('Failed to mark complete');
    }
  };

  const isCompleted = (lId) => progress.some(p => p.lessonId === lId && p.completed);

  const goToNextLesson = () => {
    const idx = lessons.findIndex(l => l.id === currentLesson.id);
    if (idx < lessons.length - 1) {
      const next = lessons[idx + 1];
      navigate(`/lesson/${courseId}/${next.id}`);
    }
  };

  if (loading) return <div className="page"><div className="container"><div className="spinner" /></div></div>;
  if (!currentLesson) return <div className="page"><div className="container"><p>Lesson not found</p></div></div>;

  const currentIdx = lessons.findIndex(l => l.id === currentLesson.id);
  const hasNext = currentIdx < lessons.length - 1;
  const completedCount = progress.filter(p => p.completed).length;
  const percent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  const getEmbedUrl = (url) => {
    if (!url) return '';
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId ? videoId.indexOf('&') : -1;
    const finalId = ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;
    return `https://www.youtube.com/embed/${finalId}?autoplay=1`;
  };

  return (
    <div className="page">
      <div className="container">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>{course?.title}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div className="progress-bar" style={{ flex: 1, maxWidth: '300px' }}>
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{percent}% complete</span>
        </div>

        <div className="lesson-layout">
          {/* Video Player */}
          <div>
            <div className="video-wrapper">
              <iframe 
                src={getEmbedUrl(currentLesson.videoUrl)} 
                title={currentLesson.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
            <div style={{ padding: '24px 0' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>{currentLesson.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>{currentLesson.content}</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {!isCompleted(currentLesson.id) && (
                  <button className="btn btn-success" onClick={markComplete}><FiCheckCircle /> Mark Complete</button>
                )}
                {isCompleted(currentLesson.id) && (
                  <span className="btn btn-secondary" style={{ cursor: 'default' }}><FiCheckCircle style={{ color: 'var(--success)' }} /> Completed</span>
                )}
                {hasNext && (
                  <button className="btn btn-primary" onClick={goToNextLesson}>Next Lesson <FiChevronRight /></button>
                )}
                {!hasNext && percent === 100 && (
                  <button className="btn btn-primary" onClick={() => navigate(`/certificate/${courseId}`)}>Get Certificate 🎓</button>
                )}
              </div>
            </div>
          </div>

          {/* Lesson Sidebar */}
          <div className="lesson-sidebar">
            <h4 style={{ fontWeight: 700, marginBottom: '16px' }}>Course Content</h4>
            {lessons.map((lesson, i) => (
              <div
                key={lesson.id}
                className={`lesson-item ${lesson.id === currentLesson.id ? 'active' : ''} ${isCompleted(lesson.id) ? 'completed' : ''}`}
                onClick={() => navigate(`/lesson/${courseId}/${lesson.id}`)}
              >
                <span className="lesson-check">
                  {isCompleted(lesson.id) ? <FiCheckCircle /> : <FiCircle />}
                </span>
                <div className="lesson-item-info">
                  <h4>{i + 1}. {lesson.title}</h4>
                  <p>{lesson.durationMinutes} min</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
