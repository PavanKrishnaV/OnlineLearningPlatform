import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);

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
      
      // Load notes from localStorage
      const savedNotes = localStorage.getItem(`notes_${courseId}_${lessonId}`);
      if (savedNotes) setNotes(JSON.parse(savedNotes));
      else setNotes([]);
    } catch (err) {
      toast.error('Failed to load lesson');
    }
    setLoading(false);
  };

  const addNote = () => {
    if (!noteText.trim()) return;
    // Since we are using iframe, we can't easily get the current time without the API.
    // For now, we'll allow manual timestamping or just save the note.
    const newNote = {
      id: Date.now(),
      text: noteText,
      time: 0,
      timeFormatted: '--:--'
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem(`notes_${courseId}_${lessonId}`, JSON.stringify(updatedNotes));
    setNoteText('');
    toast.success('Note added!');
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(n => n.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem(`notes_${courseId}_${lessonId}`, JSON.stringify(updatedNotes));
  };

  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      toast.success('Study session complete! Take a break.');
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            <div className="video-wrapper" style={{ position: 'relative', background: '#000', borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '16/9' }}>
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

            {/* Smart Notes Section */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px', marginTop: '12px' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📝 Smart Lesson Notes
              </h4>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <input 
                  className="form-input" 
                  placeholder="Take a note at this timestamp..." 
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addNote()}
                />
                <button className="btn btn-primary" onClick={addNote}>Save</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {notes.length === 0 && (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>
                    No notes yet. Start typing above to capture key moments!
                  </p>
                )}
                {notes.map(note => (
                  <div key={note.id} style={{ display: 'flex', gap: '12px', padding: '12px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', group: 'true' }}>
                    <div
                      style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--accent)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, height: 'fit-content' }}
                    >
                      Note
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.9rem' }}>{note.text}</p>
                    </div>
                    <button 
                      onClick={() => deleteNote(note.id)}
                      style={{ background: 'none', color: 'var(--danger)', fontSize: '0.8rem', opacity: 0.6 }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Focused Study Timer */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px', marginTop: '12px', textAlign: 'center' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '12px' }}>⏱️ Focused Study Timer</h4>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-light)', marginBottom: '16px', fontFamily: 'monospace' }}>
                {formatTimer(timeLeft)}
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {!timerActive ? (
                  <button className="btn btn-primary btn-sm" onClick={() => setTimerActive(true)}>Start Session</button>
                ) : (
                  <button className="btn btn-secondary btn-sm" onClick={() => setTimerActive(false)}>Pause</button>
                )}
                <button className="btn btn-secondary btn-sm" onClick={() => { setTimerActive(false); setTimeLeft(25 * 60); }}>Reset</button>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '12px' }}>
                25 minutes of deep focus followed by a 5-minute break.
              </p>
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
