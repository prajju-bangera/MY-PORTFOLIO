import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaHeart } from 'react-icons/fa';
import '../assets/styles/Footer.css';

const ExplosionFooter = () => {
  const canvasRef = useRef(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Explosion particle system
    class Particle {
      constructor() {
        this.reset();
        this.velocity = Math.random() * 0.5 + 0.1;
        this.oscillation = Math.random() * 2 + 1;
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 8 + 2;
        this.baseSize = this.size;
        this.color = `hsla(${Math.random() * 30 + 200}, 100%, ${Math.random() * 30 + 60}%, 0.8)`;
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100;
        this.angle = Math.random() * Math.PI * 2;
        this.distance = Math.random() * 150 + 50;
      }
      
      update() {
        if (this.life < this.maxLife) {
          this.life++;
          const progress = this.life / this.maxLife;
          
          // Move upward with oscillation
          this.y -= this.velocity * 2;
          this.x += Math.sin(this.life * 0.05) * this.oscillation;
          
          // Size decay with pulsing effect
          this.size = this.baseSize * (1 - progress * 0.3);
          
          // Color fade
          const alpha = 0.8 * (1 - progress * 0.5);
          this.color = `hsla(200, 100%, ${70 - progress * 30}%, ${alpha})`;
        } else {
          this.reset();
        }
      }
      
      draw() {
        // Glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0, 
          this.x, this.y, this.size * 2
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = this.color;
        ctx.fill();
      }
    }
    
    // Create particles
    const particles = Array(80).fill().map(() => new Particle());
    
    // Animation loop
const animate = () => {
  // Create a linear gradient from top to bottom
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'rgba(85, 9, 226, 0.6)');   // top color
  gradient.addColorStop(1, 'rgba(236, 127, 191, 0.6)');  // bottom color

  // Apply gradient as semi-transparent overlay for trails
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw particles
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });


      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <footer className="explosion-footer">
      <canvas ref={canvasRef} className="footer-canvas" />
      
      <div className="footer-content">
        <motion.div 
          className="footer-brand"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="footer-c-symbol">P</span>
          <h3>Prajwal | Portfolio</h3>
        </motion.div>
        
        <motion.div 
          className="footer-social"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a href="https://github.com/prajju-bangera" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/prajwal-m-p-15bb9b285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/pxjju_bxngerx?igsh=MW41amRnMHoyNHhhMQ==" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          {/* <a href="https://codepen.io/chitagchng" target="_blank" rel="noopener noreferrer">
            <FaCodepen />
          </a> */}
        </motion.div>
        
        <motion.div 
          className="footer-copyright"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          © Copyright 2025-{currentYear} Prajwal
        </motion.div>
        
        <motion.div 
          className="footer-made-with"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Made with <FaHeart className="heart-icon" /> by Prajwal
        </motion.div>
        
        <motion.div 
          className="footer-url"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* <a href="https://chipzhina.netflix.acp/flyone" target="_blank" rel="noopener noreferrer">
            chipzhina.netflix.acp/flyone
          </a> */}
        </motion.div>
      </div>
    </footer>
  );
};

export default ExplosionFooter;