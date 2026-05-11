import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiYoutube } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>⚡ SkillBridge</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>
              Empowering learners worldwide with premium courses from industry experts.
            </p>
            <div className="social-icons">
              <a href="#"><FiGithub /></a>
              <a href="#"><FiTwitter /></a>
              <a href="#"><FiLinkedin /></a>
              <a href="#"><FiYoutube /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/courses">All Courses</Link>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h4>Categories</h4>
            <Link to="/courses?category=Programming">Programming</Link>
            <Link to="/courses?category=Web Development">Web Development</Link>
            <Link to="/courses?category=Data Science">Data Science</Link>
            <Link to="/courses?category=Cloud Computing">Cloud Computing</Link>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <Link to="/help">Help Center</Link>
            <Link to="/contact">Contact Support</Link>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} SkillBridge. All rights reserved. Built for Internship Project.</p>
        </div>
      </div>
    </footer>
  );
}
