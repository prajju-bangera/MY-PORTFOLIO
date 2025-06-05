import { useState } from 'react';
import { FaBars, FaTimes, FaFilePdf } from 'react-icons/fa';
import '../assets/styles/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { href: '#home', name: 'HOME' },
    { href: '#about', name: 'ABOUT' },
    { href: '#skills', name: 'SKILLS' },
    { href: '#projects', name: 'PROJECTS' },
    { href: '#contact', name: 'CONTACT' }
  ];

  const openResume = () => {
    window.open('/MY RESUME.pdf', '_blank', 'noopener,noreferrer');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <a href="#home" className="logo">
            <span>Portfolio</span>
          </a>
        </div>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} onClick={() => setIsOpen(false)}>
                  {link.name}
                </a>
              </li>
            ))}
            {/* Mobile view resume link */}
            <li className="mobile-resume" onClick={() => {
              openResume();
              setIsOpen(false);
            }}>
              <FaFilePdf className="pdf-icon" />
              <span>Resume</span>
            </li>
          </ul>
        </div>

        {/* Desktop view resume link */}
        <div className="resume-icon" onClick={openResume}>
          <FaFilePdf className="pdf-icon" />
          <span>Resume</span>
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;