import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiSun, FiMoon, FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-logo">⚡ SkillBridge</Link>

        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" className={isActive('/')} onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/courses" className={isActive('/courses')} onClick={() => setMenuOpen(false)}>Courses</Link></li>
          {user && <li><Link to="/my-courses" className={isActive('/my-courses')} onClick={() => setMenuOpen(false)}>My Courses</Link></li>}
          <li><Link to="/about" className={isActive('/about')} onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" className={isActive('/contact')} onClick={() => setMenuOpen(false)}>Contact</Link></li>
          {user && isAdmin() && <li><Link to="/admin" className={isActive('/admin')} onClick={() => setMenuOpen(false)}>Admin</Link></li>}
        </ul>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          {user ? (
            <>
              <Link to="/profile" className="btn btn-secondary btn-sm"><FiUser /> {user.fullName?.split(' ')[0]}</Link>
              <button className="btn btn-secondary btn-sm" onClick={logout}><FiLogOut /></button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
