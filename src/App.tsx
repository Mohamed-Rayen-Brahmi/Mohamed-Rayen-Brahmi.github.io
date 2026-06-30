import { PortfolioProvider } from './context/PortfolioContext';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSequence from './components/HeroSequence';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <PortfolioProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <Background />
        <CustomCursor />
        <Navbar />

        <main>
          {/* Unified hero + scroll-driven sword sequence (pinned, 300vh) */}
          <HeroSequence />

          {/* Projects revealed after the slash */}
          <Projects />

          <About />
          <Skills />
          <Experience />
          <Timeline />
          <Contact />
        </main>

        <Footer />
        <ProjectModal />
      </div>
    </PortfolioProvider>
  );
}

export default App;
