import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
// import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';


import './App.css';
import './assets/styles/animation.css';
import 'devicon/devicon.min.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <CustomCursor/>

      <AnimatePresence mode="wait">
        <Home />
        <About />
        <Skills />
        <Projects />
        {/* <Resume /> */}
        <Contact />
        <Footer />

      </AnimatePresence>
    </div>
  );
}

export default App;