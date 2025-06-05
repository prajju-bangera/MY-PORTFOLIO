import { useEffect, useState, useRef } from 'react';
import '../assets/styles/CustomCursor.css';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverTarget, setHoverTarget] = useState(null);
  const trailRef = useRef([]);
  
  // Smooth motion values for the follower
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const followerX = useMotionValue(-100);
  const followerY = useMotionValue(-100);
  const glowX = useMotionValue(-100);
  const glowY = useMotionValue(-100);
  
  // Spring animations for smooth follow
  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const followerXSpring = useSpring(followerX, springConfig);
  const followerYSpring = useSpring(followerY, springConfig);
  const glowXSpring = useSpring(glowX, springConfig);
  const glowYSpring = useSpring(glowY, springConfig);

  // Trail positions
  const [trail, setTrail] = useState([]);
  const trailLength = 10;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPrevPosition(position);
      setPosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Update trail positions
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY }];
        if (newTrail.length > trailLength) {
          return newTrail.slice(newTrail.length - trailLength);
        }
        return newTrail;
      });
      
      // Follower follows with slight delay
      setTimeout(() => {
        followerX.set(e.clientX);
        followerY.set(e.clientY);
      }, 50);
      
      // Glow follows with more delay
      setTimeout(() => {
        glowX.set(e.clientX);
        glowY.set(e.clientY);
      }, 100);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 150);
    };

    const handleMouseEnter = (e) => {
      setIsHovering(true);
      setHoverTarget(e.target);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setHoverTarget(null);
    };

    const hoverables = document.querySelectorAll(
      'a, button, .hoverable, [data-cursor-hover], input, textarea, .project-card'
    );

    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isHovering, cursorX, cursorY, followerX, followerY, glowX, glowY, position]);

  // Determine cursor size based on hover target
  const getCursorSize = () => {
    if (!hoverTarget) return 12;
    if (hoverTarget.tagName === 'A') return 16;
    if (hoverTarget.tagName === 'BUTTON') return 24;
    if (hoverTarget.classList.contains('project-card')) return 32;
    return 18;
  };

  const getFollowerSize = () => {
    if (!hoverTarget) return 30;
    if (hoverTarget.tagName === 'A') return 40;
    if (hoverTarget.tagName === 'BUTTON') return 50;
    if (hoverTarget.classList.contains('project-card')) return 70;
    return 45;
  };

  const getGlowSize = () => {
    if (!hoverTarget) return 60;
    if (hoverTarget.tagName === 'A') return 80;
    if (hoverTarget.tagName === 'BUTTON') return 100;
    if (hoverTarget.classList.contains('project-card')) return 120;
    return 90;
  };

  // Calculate angle for line direction
  const angle = Math.atan2(position.y - prevPosition.y, position.x - prevPosition.x) * 180 / Math.PI;

  return (
    <>
      {/* Glow effect (outermost layer) */}
      <motion.div
        className={`cursor-glow ${isHovering ? 'hover' : ''}`}
        style={{
          x: glowXSpring,
          y: glowYSpring,
          width: getGlowSize(),
          height: getGlowSize(),
        }}
        animate={{
          opacity: isHovering ? 0.3 : 0.1,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 200,
        }}
      />

      {/* Trailing line */}
      {trail.length > 1 && (
        <svg
          className="cursor-trail"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        >
          <path
            d={`M ${trail.map(p => `${p.x},${p.y}`).join(' L ')}`}
            fill="none"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth={isHovering ? 2 : 1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {/* Follower circle (middle layer) */}
      <motion.div
        className={`cursor-follower ${isHovering ? 'hover' : ''}`}
        style={{
          x: followerXSpring,
          y: followerYSpring,
          width: getFollowerSize(),
          height: getFollowerSize(),
        }}
        animate={{
          opacity: isHovering ? 0.6 : 0.3,
          scale: isHovering ? 1.1 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 250,
        }}
      />

      {/* Main cursor dot (innermost layer) */}
      <motion.div
        className={`cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: getCursorSize(),
          height: getCursorSize(),
        }}
        animate={{
          scale: isClicking ? 0.7 : isHovering ? 1.5 : 1,
          opacity: 1,
        }}
        transition={{
          type: 'spring',
          damping: 10,
          stiffness: 300,
        }}
      />
    </>
  );
};

export default CustomCursor;