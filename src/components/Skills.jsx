import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import '../assets/styles/skills.css';

const TechBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const techCategories = [
    {
      name: "Frontend",
      items: [
        { name: "HTML", iconClass: "devicon-html5-plain colored" },
        { name: "CSS", iconClass: "devicon-css3-plain colored" },
        { name: "JavaScript", iconClass: "devicon-javascript-plain colored" },
        { name: "TypeScript", iconClass: "devicon-typescript-plain colored" },
        { name: "React.js", iconClass: "devicon-react-original colored" },
        { name: "Android", iconClass: "devicon-android-plain colored" },
        { name: ".Net", iconClass: "devicon-dot-net-plain colored" },
      ]
    },
    {
      name: "Backend",
      items: [
        { name: "Node.js", iconClass: "devicon-nodejs-plain colored" },
        { name: "Express.js", iconClass: "devicon-express-original colored" },
        { name: "MongoDB", iconClass: "devicon-mongodb-plain colored" },
        { name: "MySQL", iconClass: "devicon-mysql-plain colored" },
        { name: "PHP", iconClass: "devicon-php-plain colored" },
        { name: "REST API", iconClass: "devicon-nodejs-plain colored" },
      ]
    },
    {
      name: "Programming",
      items: [
        { name: "JavaScript", iconClass: "devicon-javascript-plain colored" },
        { name: "TypeScript", iconClass: "devicon-typescript-plain colored" },
        { name: "Python", iconClass: "devicon-python-plain colored" },
        { name: "C++", iconClass: "devicon-cplusplus-plain colored" },
        { name: "Java", iconClass: "devicon-java-plain colored" },
        { name: "C#", iconClass: "devicon-csharp-plain colored" },
        { name: "R", iconClass: "devicon-rstudio-plain colored" },
      ]
    },
    {
      name: "Tech & Tools",
      items: [
        { name: "VS Code", iconClass: "devicon-vscode-plain colored" },
        { name: "NPM", iconClass: "devicon-npm-original-wordmark colored" },
        { name: "GitHub", iconClass: "devicon-github-original colored" },
        { name: "Netlify", iconClass: "devicon-netlify-plain colored" },
        { name: "Canva", iconClass: "devicon-canva-original colored" },
        { name: "Visual Studio", iconClass: "devicon-visualstudio-plain colored" },
        { name: "Figma", iconClass: "devicon-figma-plain colored" }
      ]
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  // Auto hover effect to highlight one card at a time
  useEffect(() => {
    if (!isVisible) return;

    const flatCards = techCategories.flatMap((cat, catIndex) =>
      cat.items.map((_, itemIndex) => `${catIndex}-${itemIndex}`)
    );

    let index = 0;
    const interval = setInterval(() => {
      setActiveCard(flatCards[index]);
      index = (index + 1) % flatCards.length;
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div id="skills">
      <motion.div
        className="tech-banner-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 className="section-title">
          My <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >Skills</motion.span>
        </motion.h2>

        <motion.div
          className="tech-banner"
          initial="hidden"
          animate="visible"
        >
          {techCategories.map((category, catIdx) => (
            <motion.div key={catIdx} className="section">
              <motion.h2
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {category.name}
              </motion.h2>

              <div className="grid">
                {category.items.map((tech, itemIdx) => {
                  const cardId = `${catIdx}-${itemIdx}`;
                  const isActive = activeCard === cardId;

                  return (
                    <motion.div
                      key={itemIdx}
                      className={`card ${isActive ? 'active' : ''}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="icon-wrapper">
                        <i className={tech.iconClass}></i>
                      </div>
                      {!isActive && <p className="tech-text">{tech.name}</p>}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TechBanner;
