import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiBookOpen, FiUserCheck, FiTrash2, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../api/axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [tab, setTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', instructor: '', category: 'Programming', thumbnailUrl: '', rating: 4.5, durationHours: 10, level: 'Beginner' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [statsRes, usersRes, enrollRes, coursesRes] = await Promise.all([
        API.get('/admin/stats'),
        API.get('/admin/users'),
        API.get('/admin/enrollments'),
        API.get('/courses')
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setEnrollments(enrollRes.data);
      setCourses(coursesRes.data);
    } catch (err) {
      toast.error('Failed to load admin data');
    }
    setLoading(false);
  };

  const deleteCourse = async (id) => {
    if (!confirm('Delete this course?')) return;
    try {
      await API.delete(`/courses/${id}`);
      toast.success('Course deleted');
      loadData();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const addCourse = async (e) => {
    e.preventDefault();
    try {
      await API.post('/courses', newCourse);
      toast.success('Course created!');
      setShowAddCourse(false);
      setNewCourse({ title: '', description: '', instructor: '', category: 'Programming', thumbnailUrl: '', rating: 4.5, durationHours: 10, level: 'Beginner' });
      loadData();
    } catch (err) {
      toast.error('Failed to create course');
    }
  };

  if (loading) return <div className="page"><div className="container"><div className="spinner" /></div></div>;

  return (
    <div className="page">
      <div className="container">
        <div className="page-header"><h1>Admin Dashboard</h1><p>Manage your platform</p></div>

        {/* Stats */}
        <div className="dashboard-grid" style={{ marginBottom: '40px' }}>
          <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h3><FiUsers /> Total Users</h3><div className="stat-value">{stats.totalUsers}</div>
          </motion.div>
          <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3><FiBookOpen /> Total Courses</h3><div className="stat-value">{stats.totalCourses}</div>
          </motion.div>
          <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3><FiUserCheck /> Enrollments</h3><div className="stat-value">{stats.totalEnrollments}</div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="filter-tabs" style={{ marginBottom: '24px' }}>
          {['overview', 'courses', 'users', 'enrollments'].map(t => (
            <button key={t} className={`filter-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Courses Tab */}
        {tab === 'courses' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>Manage Courses</h3>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddCourse(!showAddCourse)}><FiPlus /> Add Course</button>
            </div>
            {showAddCourse && (
              <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} onSubmit={addCourse}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} required /></div>
                  <div className="form-group"><label className="form-label">Instructor</label><input className="form-input" value={newCourse.instructor} onChange={e => setNewCourse({ ...newCourse, instructor: e.target.value })} required /></div>
                  <div className="form-group"><label className="form-label">Category</label>
                    <select className="form-input" value={newCourse.category} onChange={e => setNewCourse({ ...newCourse, category: e.target.value })}>
                      <option>Programming</option><option>Web Development</option><option>Data Science</option><option>Cloud Computing</option>
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">Level</label>
                    <select className="form-input" value={newCourse.level} onChange={e => setNewCourse({ ...newCourse, level: e.target.value })}>
                      <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">Thumbnail URL</label><input className="form-input" value={newCourse.thumbnailUrl} onChange={e => setNewCourse({ ...newCourse, thumbnailUrl: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">Duration (hrs)</label><input className="form-input" type="number" value={newCourse.durationHours} onChange={e => setNewCourse({ ...newCourse, durationHours: parseInt(e.target.value) })} /></div>
                </div>
                <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" rows={3} value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} required /></div>
                <button type="submit" className="btn btn-primary">Create Course</button>
              </motion.form>
            )}
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead><tr><th>Title</th><th>Category</th><th>Instructor</th><th>Level</th><th>Lessons</th><th>Actions</th></tr></thead>
                <tbody>
                  {courses.map(c => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600 }}>{c.title}</td><td>{c.category}</td><td>{c.instructor}</td><td>{c.level}</td><td>{c.totalLessons}</td>
                      <td><button className="btn btn-danger btn-sm" onClick={() => deleteCourse(c.id)}><FiTrash2 /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Users Tab */}
        {tab === 'users' && (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Roles</th></tr></thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}><td>{u.id}</td><td>{u.fullName}</td><td>{u.email}</td><td>{u.roles?.join(', ')}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Enrollments Tab */}
        {tab === 'enrollments' && (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead><tr><th>User</th><th>Email</th><th>Course</th><th>Progress</th><th>Enrolled</th></tr></thead>
              <tbody>
                {enrollments.map(e => (
                  <tr key={e.id}><td>{e.userName}</td><td>{e.userEmail}</td><td>{e.courseTitle}</td>
                    <td><div className="progress-bar" style={{ width: '100px' }}><div className="progress-fill" style={{ width: `${e.progressPercent}%` }} /></div> {e.progressPercent}%</td>
                    <td>{new Date(e.enrolledAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Overview Tab */}
        {tab === 'overview' && (
          <div style={{ color: 'var(--text-secondary)', padding: '40px 0', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>Welcome, Admin! 🎉</h3>
            <p>Use the tabs above to manage courses, users, and enrollments.</p>
          </div>
        )}
      </div>
    </div>
  );
}
