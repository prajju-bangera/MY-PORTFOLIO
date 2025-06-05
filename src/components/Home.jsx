import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
import '../assets/styles/home.css';
// import { FaPaperPlane, FaFileAlt, FaLaptopCode } from 'react-icons/fa';
import { useState } from 'react';

const Home = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setTimeout(() => setActiveButton(null), 1000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        delay: 0.3, 
        duration: 1,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 120,
        damping: 12,
        mass: 0.5
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 500,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
      transition: { 
        type: 'spring',
        stiffness: 600
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const imageVariants = {
    hidden: { scale: 0.7, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        delay: 0.6
      }
    },
    hover: {
      scale: 1.03,
      rotate: 2,
      transition: {
        type: 'spring',
        stiffness: 400
      }
    }
  };

  const floatingVariants = {
    initial: { y: 0 },
    float: {
      y: [-15, 15],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: "easeInOut"
      }
    }
  };

  // Generate random sparkles
  const sparkles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 0.5 + 0.5,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2
  }));

  return (
    <section className="home-section">
      {/* Floating shapes background */}
      <div className="floating-shapes">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <motion.div
        className="home-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="home-content">
          <motion.div className="home-text">
            <motion.h1 className="home-title" variants={textVariants}>   <h4 className='intro'>Hi, I'm</h4> <br />
          <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              ><span className="large-letter" style={{}}>Prajwal</span></motion.span>
            </motion.h1>
            
            {/* <motion.h2 className="home-subtitle" variants={textVariants}>
              Frontend Developer
            </motion.h2> */}
            
            <motion.p className="home-description" variants={textVariants}>
             <span> <h2>Iam a Frontend Developer. </h2></span>
            I create beautiful, responsive, and user-friendly web applications.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="home-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {/* <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <a 
                href="/MY RESUME.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className={`btn primary-btn ${activeButton === 'resume' ? 'active' : ''}`}
                onClick={() => handleButtonClick('resume')}
              >
                <span className="text">MY RESUME</span>
                <FaFileAlt className="icon" />
              </a>
            </motion.div> */}
            {/* <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <a 
                href="/resume.pdf" 
                download
                className={`btn primary-btn ${activeButton === 'resume' ? 'active' : ''}`}
                onClick={() => handleButtonClick('resume')}
              >
                <span className="text">CONTACT ME</span>
                <FaPaperPlane className="icon" />
              </a>
            </motion.div> */}
          </motion.div>
          <motion.div 
  className="home-actions"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1 }}
>
  {/* Your existing buttons... */}
  
  {/* Social Icons */}
  <motion.div 
    className="social-icons"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2 }}
  >
    <a 
      href="https://github.com/prajju-bangera/ " 
      target="_blank" 
      rel="noopener noreferrer"
      className="social-icon"
      data-tooltip="GitHub"
    >
      <i className="fab fa-github"></i>
    </a>
    <a 
      href="https://www.linkedin.com/in/prajwal-m-p-15bb9b285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app " 
      target="_blank" 
      rel="noopener noreferrer"
      className="social-icon"
      data-tooltip="LinkedIn"
    >
      <i className="fab fa-linkedin-in"></i>
    </a>
{/* <a 
  href="mailto:prajwalmp931@gmail.com?subject=Portfolio%20Inquiry&body=Hello%20Prajwal" 
  className="social-icon"
  data-tooltip="Email"
  onClick={(e) => {
    e.preventDefault();
window.location.href = "mailto:prajwalmp931@gmail.com?subject=Portfolio Inquiry";  }}
>
  <i className="fas fa-envelope"></i>
</a> */}
    <a 
      href="https://www.instagram.com/pxjju_bxngerx?igsh=MW41amRnMHoyNHhhMQ==" 
      target="_blank" 
      rel="noopener noreferrer"
      className="social-icon"
      data-tooltip="Instagram"
    >
      <i className="fab fa-instagram"></i>
    </a>
    {/* Resume Icon */}
    <a 
      href="/MY RESUME.pdf" 
      target="_blank" 
      rel="noopener noreferrer"
      className="social-icon"
      data-tooltip="Resume"
    >
      <i className="fas fa-file-download"></i>
    </a>
  </motion.div>
</motion.div>
        </div>
        
        <motion.div 
          className="home-image"
          variants={imageVariants}
          whileHover="hover"
        >
         <motion.div className="avatar-container">
  {/* Outer Half Circle - Rotates */}
  <motion.div 
    className="outer-half-circle"
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }}
  />
  
  {/* Middle Full Circle - Stationary */}
  <div className="middle-full-circle" />
  
  {/* Profile Image */}
  <motion.img 
    src="/images/pajju.jpg" 
    alt="Profile" 
    className="avatar"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5, duration: 0.5 }}
    whileHover={{ scale: 1.03 }}
  />
  
  {/* Glow Effect */}
  <div className="avatar-glow" />
  
  {/* Sparkles Animation (keep your existing sparkles code) */}
  <div className="avatar-sparkles">
    {sparkles.map(sparkle => (
      <motion.div
        key={sparkle.id}
        style={{
          position: 'absolute',
          left: `${sparkle.x}%`,
          top: `${sparkle.y}%`,
          width: `${sparkle.size}rem`,
          height: `${sparkle.size}rem`,
          backgroundColor: 'white',
          borderRadius: '50%',
          filter: 'blur(1px)'
        }}
        animate={{
          opacity: [0, 0.8, 0],
          scale: [0.5, 1.2, 0.5],
          y: [-10, 10],
          x: [-5, 5]
        }}
        transition={{
          duration: sparkle.duration,
          delay: sparkle.delay,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
    ))}
  </div>
</motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;