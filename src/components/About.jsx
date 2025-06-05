import { motion } from 'framer-motion';
// import { useState, useEffect } from 'react';
import '../assets/styles/about.css';

const About = () => {
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

  // Word jump animation variants
  const wordContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const wordJump = (delay = 0) => ({
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: [0, -20, 0],
      transition: {
        delay: delay,
        duration: 0.5,
        ease: "easeOut",
        times: [0, 0.5, 1]
      }
    }
  });

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

  // Text content with word jump effect
  const paragraphs = [
    "I'm a passionate frontend developer with a strong foundation in web technologies. I love creating beautiful, responsive, and user-friendly interfaces that provide seamless user experiences.",
    "My development journey began in college, and I've been continuously expanding my skills through hands-on projects."
  ];

  // Function to split text into words and wrap each word in a motion.span
  const renderJumpingWords = (text, paragraphIndex) => {
    return text.split(' ').map((word, wordIndex) => (
      <motion.span
        key={`word-${paragraphIndex}-${wordIndex}`}
        variants={wordJump(wordIndex * 0.05 + paragraphIndex * 0.3)}
        style={{ display: 'inline-block', marginRight: '5px' }}
      >
        {word}
      </motion.span>
    ));
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
    <section className="about-section" id="about">
      {/* Floating shapes background */}
      <div className="floating-shapes">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="section-title"
          initial="hidden"
          animate="visible"
          variants={wordContainer}
        >
          {renderJumpingWords("About Me", 0)}
          <motion.span 
            className="typing-cursor"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.h2>

        <div className="about-content-wrapper">
          <motion.div 
            className="about-text-content"
            initial="hidden"
            animate="visible"
            variants={wordContainer}
          >
            {paragraphs.map((text, index) => (
              <motion.p 
                key={index}
                variants={wordContainer}
                className="glow-text"
              >
                {renderJumpingWords(text, index)}
                {index === paragraphs.length - 1 && (
                  <motion.span 
                    className="typing-cursor"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 1 }}
                  />
                )}
              </motion.p>
            ))}
          </motion.div>
          
          <motion.div 
            className="about-graphic"
            variants={imageVariants}
            whileHover="hover"
          >
            <motion.div
              className="avatar-container1"
              initial="hidden"
              animate={["visible", "float"]}
              style={{ backgroundColor: 'black' }}
            >
              <motion.div 
                className="avatar-border"
                animate={{
                  rotate: 360,
                  transition: {
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              />
              <div className="avatar-wrapper">
                <motion.img 
                  src="/images/hacker.jpg"  
                  alt="About Me" 
                  className="avatar1"
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  style={{ 
                    objectFit: 'cover',
                    mixBlendMode: 'lighten'
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills section */}
    
        {/* </motion.div> */}
      </motion.div>
    </section>
  );
};

export default About;