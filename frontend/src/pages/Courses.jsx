import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiStar, FiClock, FiUsers, FiBookOpen } from 'react-icons/fi';
import API from '../api/axios';

const CATEGORIES = ['All', 'Programming', 'Web Development', 'Data Science', 'Cloud Computing'];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    API.get('/courses').then(res => {
      setCourses(res.data);
      setFiltered(res.data);
      setLoading(false);
      const cat = searchParams.get('category');
      if (cat) { setActiveCategory(cat); filterByCategory(res.data, cat); }
    }).catch(() => setLoading(false));
  }, []);

  const filterByCategory = (list, cat) => {
    if (cat === 'All') { setFiltered(list); return; }
    setFiltered(list.filter(c => c.category === cat));
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setSearch('');
    filterByCategory(courses, cat);
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    setActiveCategory('All');
    if (!val.trim()) { setFiltered(courses); return; }
    setFiltered(courses.filter(c => c.title.toLowerCase().includes(val.toLowerCase()) || c.description.toLowerCase().includes(val.toLowerCase())));
  };

  const levelBadge = (level) => {
    if (level === 'Beginner') return 'badge badge-beginner';
    if (level === 'Intermediate') return 'badge badge-intermediate';
    return 'badge badge-advanced';
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Explore Courses</h1>
          <p>Discover courses taught by industry experts</p>
        </div>

        <div className="search-bar">
          <input className="form-input" placeholder="Search courses..." value={search} onChange={handleSearch} />
          <button className="btn btn-primary btn-sm"><FiSearch /></button>
        </div>

        <div className="filter-tabs">
          {CATEGORIES.map(cat => (
            <button key={cat} className={`filter-tab ${activeCategory === cat ? 'active' : ''}`} onClick={() => handleCategoryClick(cat)}>{cat}</button>
          ))}
        </div>

        {loading ? <div className="spinner" /> : filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '60px 0' }}>No courses found.</p>
        ) : (
          <div className="course-grid">
            {filtered.map((course, i) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
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
      </div>
    </div>
  );
}
