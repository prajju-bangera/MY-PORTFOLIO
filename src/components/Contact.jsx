import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import '../assets/styles/contact.css';  

const Contact = () => {
  const form = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("https://portfolio-b3997-default-rtdb.firebaseio.com/Contact.json", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      if (res.ok) {
        setSubmitStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  // Social media links data
  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/prajju-bangera" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/prajwal-m-p-15bb9b285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
    { icon: <FaTwitter />, url: "https://twitter.com/yourusername" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/pxjju_bxngerx?igsh=MW41amRnMHoyNHhhMQ==" },
    { icon: <FaEnvelope />, url: "mailto:prajwalmp931@gmail.com" }
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <motion.h2 
                  className="section-title"
                  // variants={textVariants}
                >
                  Get In  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  >Touch</motion.span>
                </motion.h2>

        <motion.div
          className="contact-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="pentagon-container" variants={itemVariants}>
            
            <div className="pentagon-border">
              <div className="pentagon-image">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`social-icon social-icon-${index}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {link.icon}
                    </motion.div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div className="contact-form-container" variants={itemVariants}>
            <form ref={form} onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="user_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                />
                <span className="input-highlight"></span>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="user_email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  required
                />
                <span className="input-highlight"></span>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your Message"
                  rows="5"
                  required
                ></textarea>
                <span className="input-highlight"></span>
              </div>
              <motion.button 
                type="submit" 
                disabled={isSubmitting} 
                className="submit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div className="alert success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  Message sent successfully!
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div className="alert error" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  Failed to send message. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;