import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import '../assets/styles/projects.css';

const projects = [
  {
    id: 1,
    title: 'Catering Service Website',
    description: 'RATNSHREE Catering is a premium online platform offering seamless event booking and personalized catering services for every occasion.',
    technologies: ['Reactjs', 'Nodejs', 'MongoDb', 'Css'],
    image: '/images/project1.jpg',
    githubLink: 'https://github.com/prajju-bangera/Catering-service',
    // liveLink: 'https://example.com'
  },
  {
    id: 2,
    title: 'DISHDASH Table and Food Ordering Webiste',
    description: 'DISHDASH is a smart food ordering and table booking website offering a seamless dining experience with curated menus and real-time reservations.',
    technologies: ['HTML', 'Node.js', 'MongoDB', 'Express'],
    image: '/images/project2.jpg',
    githubLink: 'https://github.com/prajju-bangera/Food-Website-main',
    // liveLink: 'https://example.com'
  },
  {
    id: 3,
    title: 'EDUJUNCTION Learning Portal Website',
    description: 'EDUJUNCTION is a dynamic learning platform that connects students to curated online courses, certifications, and top educational resources across various fields.',
    technologies: ['Reactjs', 'Css'],
    image: '/images/project3.jpg',
    githubLink: 'https://github.com/prajju-bangera/EDUJUNCTION-learning-website',
    liveLink: 'https://edujunction.netlify.app/'
  },
  {
    id: 4,
    title: 'FURNICART Ecommerce Webiste',
    description: 'FURNICART is a modern e-commerce platform for discovering and ordering premium furniture products like sofas, dining sets, and home décor essentials with doorstep delivery.',
    technologies: ['Reactjs', 'Node.js', 'MongoDB', 'Express'],
    image: '/images/project4.jpg',
    githubLink: 'https://github.com',
    liveLink: 'https://example.com'
  }
];

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="projects-section" id="projects">
      <div className="container">
       <motion.h2 
                  className="section-title"
                  // variants={textVariants}
                >
                  My <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  >Projects</motion.span>
                </motion.h2>
        
        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div 
              className="project-card"
              key={project.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-links">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index}>{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;