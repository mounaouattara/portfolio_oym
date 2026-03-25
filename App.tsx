import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Terminal, Cpu, Database, 
  Layers, Zap, Home, User, Briefcase, Mail,
  ChevronRight, Menu, X, ArrowRight, Download, Globe
} from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import ProjectsSection from './components/Projects';
import ContactSection from './components/Contact';
import SkillsSection from './components/Skills';
import Timeline from './components/Timeline';
import Footer from './components/Footer';

const SectionWrapper: React.FC<{ 
  id: string; 
  children: React.ReactNode; 
  variants: any; 
  transition: any;
  className?: string;
  showDynamicBg?: boolean;
  isScrollable?: boolean;
}> = ({ id, children, variants, transition, className, showDynamicBg = false, isScrollable = true }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#E8D1A7", "#9D9167", "#84592B", "#743014", "#442D1C"]
  );

  const springBg = useSpring(bgColor, { stiffness: 50, damping: 20 });

  return (
    <motion.section
      key={id}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={transition}
      className={`h-screen w-full relative z-10 ${className}`}
    >
      {showDynamicBg && (
        <motion.div 
          className="absolute inset-0 z-[-1] pointer-events-none"
          style={{ backgroundColor: springBg }}
        />
      )}
      <div 
        ref={containerRef}
        className={`relative z-10 h-full w-full ${isScrollable ? 'overflow-y-auto' : 'overflow-hidden'} flex flex-col`}
      >
        {children}
      </div>
    </motion.section>
  );
};

const PageLayout: React.FC<{
  number: string;
  label: string;
  title: string;
  subLabel1: string;
  subLabel2: string;
  description?: string;
  menuItems?: { label: string; href: string }[];
  children: React.ReactNode;
}> = ({ number, label, title, subLabel1, subLabel2, description, menuItems, children }) => (
  <div className="flex w-full min-h-full">
    {/* Left Vertical Title Column */}
    <div className="w-24 md:w-32 border-r border-black/10 flex flex-col items-center py-32 sticky top-0 h-screen">
      <div className="flex flex-col items-center gap-8">
        <span className="text-4xl font-bold font-mono opacity-10">{number}</span>
        <div className="h-32 w-[1px] bg-black/10" />
        <div className="writing-vertical-rl rotate-180 flex flex-col gap-4 items-center">
          <span className="micro-label whitespace-nowrap">{label}</span>
          <h2 className="display-text text-2xl whitespace-nowrap">{title}</h2>
        </div>
      </div>
    </div>
    
    {/* Main Content Area */}
    <div className="flex-1 px-12 md:px-20 py-32">
      {/* Page Introduction & Mini-Menu (At a glance) */}
      {(description || menuItems) && (
        <div className="mb-20 border-b border-black/10 pb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em]">Page_Overview</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-mono font-bold text-fg mb-6 uppercase tracking-tighter leading-none">
                {title.replace('_', ' ')}
              </h1>
              {description && (
                <p className="text-sm font-mono text-black/60 leading-relaxed italic">
                  {">"} {description}
                </p>
              )}
            </div>
            
            {menuItems && (
              <div className="flex flex-col gap-4">
                <span className="text-[8px] font-mono opacity-30 uppercase tracking-widest">Quick_Navigation</span>
                <div className="flex flex-wrap gap-4">
                  {menuItems.map((item, i) => (
                    <a 
                      key={i} 
                      href={item.href} 
                      className="px-4 py-2 bg-black/5 border border-black/10 text-[9px] font-mono font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-start justify-between mb-12 gap-4 border-b border-black/10 pb-8">
        <div className="hidden md:block">
          {/* Empty space to align with left column if needed, but we already have the column */}
        </div>
        <div className="text-right ml-auto">
          <p className="text-[9px] font-mono opacity-40 uppercase tracking-[0.4em]">{subLabel1}</p>
          <p className="text-[9px] font-mono opacity-20 uppercase tracking-[0.2em] mt-1">{subLabel2}</p>
        </div>
      </div>
      {children}
    </div>
  </div>
);

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [isCyberMode, setIsCyberMode] = useState(false);
  const [lang, setLang] = useState<'fr' | 'en'>('fr');

  const translations = {
    fr: {
      home: 'ACCUEIL',
      projects: 'PROJETS',
      about: 'PROFIL',
      skills: 'COMPÉTENCES',
      passion: 'PASSIONS',
      contact: 'CONTACT',
      dataScientist: 'DATA SCIENTIST',
      dataAnalyst: 'DATA ANALYST',
      subTitle: 'Mouna Ouattara // Data Analyst, AI Engineer & Machine Learning Engineer',
      systemStatus: 'System_Status',
      optimal: 'Optimal',
      overdrive: 'OVERDRIVE',
      neuralLink: 'Neural_Link_Active',
      vaporLink: 'VAPOR_LINK_ESTABLISHED',
      module01: 'Module_01 // Core_Interface',
      module99: 'Module_99 // Cyber_Interface',
      revert: 'Revert_Protocol?',
      burst: 'Burst_the_core?',
      lost: '"lost in the grid"',
      giveItATry: '"give it a try" — whispered the heart',
      downloadCV: 'Télécharger CV',
      uplink: 'Uplink',
      protocol: 'Protocol',
      copyright: '© 2026',
      pageOverview: 'Page_Overview',
      quickNav: 'Quick_Navigation',
      navInterface: 'NAV_INTERFACE',
      coreSync: 'CORE_SYNC: ACTIVE',
      section: 'SECTION',
      coords: 'COORDS'
    },
    en: {
      home: 'HOME',
      projects: 'PROJECTS',
      about: 'PROFILE',
      skills: 'SKILLS',
      passion: 'PASSIONS',
      contact: 'CONTACT',
      dataScientist: 'DATA SCIENTIST',
      dataAnalyst: 'DATA ANALYST',
      subTitle: 'Mouna Ouattara // Data Analyst, AI Engineer & Machine Learning Engineer',
      systemStatus: 'System_Status',
      optimal: 'Optimal',
      overdrive: 'OVERDRIVE',
      neuralLink: 'Neural_Link_Active',
      vaporLink: 'VAPOR_LINK_ESTABLISHED',
      module01: 'Module_01 // Core_Interface',
      module99: 'Module_99 // Cyber_Interface',
      revert: 'Revert_Protocol?',
      burst: 'Burst_the_core?',
      lost: '"lost in the grid"',
      giveItATry: '"give it a try" — whispered the heart',
      downloadCV: 'Download CV',
      uplink: 'Uplink',
      protocol: 'Protocol',
      copyright: '© 2026',
      pageOverview: 'Page_Overview',
      quickNav: 'Quick_Navigation',
      navInterface: 'NAV_INTERFACE',
      coreSync: 'CORE_SYNC: ACTIVE',
      section: 'SECTION',
      coords: 'COORDS'
    }
  };

  const t = translations[lang];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const tabs = [
    { id: 'home', label: t.home },
    { id: 'projects', label: t.projects },
    { id: 'about', label: t.about },
    { id: 'skills', label: t.skills },
    { id: 'passion', label: t.passion },
    { id: 'contact', label: t.contact },
  ];

  const renderSection = () => {
    const transition = {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    };

    const variants = {
      initial: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
      animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, scale: 1.1, filter: 'blur(10px)' }
    };

    switch (activeSection) {
      case 'home':
        return (
          <SectionWrapper
            id="home"
            variants={variants}
            transition={transition}
            className={`px-12 transition-colors duration-1000 ${isCyberMode ? 'bg-[#050B24]' : ''}`}
            isScrollable={false}
          >
            <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
              {/* Massive Background Title */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <motion.h1 
                  key={isCyberMode ? 'cyber-bg' : 'normal-bg'}
                  className={`display-text text-[20vw] md:text-[25vw] tracking-tighter leading-none select-none whitespace-nowrap ${isCyberMode ? 'opacity-[0.1] text-cyan-400' : 'opacity-[0.03] text-black'}`}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: isCyberMode ? 0.1 : 0.03 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                >
                  {isCyberMode ? 'CYBER_CORE' : 'XENON CORE'}
                </motion.h1>
              </div>

              {/* Decorative elements */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] thin-circle pointer-events-none z-0 transition-all duration-1000 ${isCyberMode ? 'opacity-20 border-cyan-500/50' : 'opacity-10 border-black'}`} />
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] pointer-events-none z-0 transition-all duration-1000 ${isCyberMode ? 'grainy-glow-cyan opacity-40' : 'grainy-glow-blue opacity-20'}`} />
              
              {/* Corner Labels - Moved further out to avoid overlap with nav */}
              <div className={`absolute top-32 left-0 flex flex-col z-30 transition-colors duration-1000 ${isCyberMode ? 'text-cyan-400' : 'text-black'}`}>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] mb-1">{t.systemStatus}: {isCyberMode ? t.overdrive : t.optimal}</span>
                <span className="text-[9px] font-mono opacity-40 uppercase tracking-[0.2em]">{isCyberMode ? t.vaporLink : t.neuralLink}</span>
              </div>
              
              <div className={`absolute top-32 right-0 z-30 text-right transition-colors duration-1000 ${isCyberMode ? 'text-cyan-400' : 'text-black'}`}>
                <span className="micro-label">{isCyberMode ? t.module99 : t.module01}</span>
              </div>

              {/* Central Content */}
              <div className="relative z-20 flex flex-col items-center gap-12">
                <div className="relative group">
                  {/* CV Download Icon on Hover */}
                  <motion.div 
                    className={`absolute -top-10 -right-10 z-40 p-3 rounded-full border transition-all duration-500 cursor-pointer flex items-center gap-2 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 ${isCyberMode ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-white border-black/10 text-black shadow-lg'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Logic to download CV
                      const link = document.createElement('a');
                      link.href = '#'; // Replace with actual CV path
                      link.download = 'CV_Mouna_Ouattara.pdf';
                      link.click();
                    }}
                  >
                    <Download size={16} />
                    <span className="text-[8px] font-mono font-bold uppercase tracking-widest">{t.downloadCV}</span>
                  </motion.div>

                  <motion.div 
                    onClick={() => setIsCyberMode(!isCyberMode)}
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: isCyberMode ? [0, 90, 180, 270, 360] : [0, 2, -2, 0]
                    }}
                    transition={{ 
                      scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                      rotate: isCyberMode ? { duration: 20, repeat: Infinity, ease: "linear" } : { duration: 8, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className={`w-[406px] h-[406px] md:w-[550px] md:h-[550px] flex items-center justify-center relative shadow-2xl cursor-pointer transition-all duration-1000 ${isCyberMode ? 'bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-xl rounded-2xl' : 'liquid-shape animate-liquid'}`}
                  >
                    <AnimatePresence mode="wait">
                      {!isCyberMode ? (
                        <motion.div 
                          key="normal-core"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <span className="text-[18px] font-mono tracking-[0.8em] opacity-30 uppercase font-bold animate-pulse">the_core</span>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="cyber-core"
                          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          exit={{ opacity: 0, scale: 1.5 }}
                          className="relative w-64 h-64 md:w-[450px] md:h-[450px] flex items-center justify-center"
                        >
                          {/* Cyber Token / Cube Visual */}
                          <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-lg shadow-[0_0_30px_rgba(34,211,238,0.3)] animate-pulse" />
                          <div className="absolute inset-4 border border-fuchsia-500/30 rounded-lg" />
                          <div className="text-cyan-400 font-mono text-xl md:text-3xl tracking-[0.2em] font-bold uppercase">AI_CORE</div>
                          
                          {/* Arrows and Labels */}
                          {[
                            { label: 'DATA SCIENCE', angle: -45, x: -180, y: -180 },
                            { label: 'DATA ANALYSIS', angle: 45, x: 180, y: -180 },
                            { label: 'AI ENGINEER', angle: 135, x: 180, y: 180 },
                            { label: 'ML ENGINEER', angle: 225, x: -180, y: 180 }
                          ].map((item, i) => (
                            <motion.div
                              key={i}
                              className="absolute flex flex-col items-center gap-2"
                              initial={{ opacity: 0, x: 0, y: 0 }}
                              animate={{ opacity: 1, x: item.x, y: item.y }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                            >
                              <div className="w-12 h-[1px] bg-cyan-400/50" style={{ transform: `rotate(${item.angle}deg)` }} />
                              <span className="text-[10px] font-mono text-cyan-400/80 tracking-widest whitespace-nowrap bg-black/40 px-2 py-1 rounded border border-cyan-400/20">{item.label}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Floating Quotes */}
                    {!isCyberMode && (
                      <>
                        <div className="absolute -top-12 -left-20 text-[10px] font-mono opacity-30 max-w-[140px] text-right hidden md:block">
                          "it's pointless"<br/><span className="opacity-50">- said reason</span>
                        </div>
                        <div className="absolute top-1/2 -right-32 -translate-y-1/2 text-[10px] font-mono opacity-30 max-w-[140px] hidden md:block">
                          "it's risky"<br/><span className="opacity-50">- said experience</span>
                        </div>
                        <div className="absolute -bottom-12 -left-20 text-[10px] font-mono opacity-30 max-w-[140px] text-right hidden md:block">
                          "it's impossible"<br/><span className="opacity-50">- said pride</span>
                        </div>
                      </>
                    )}
                  </motion.div>

                  {/* Hover Hint */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
                  >
                    <span className={`text-[9px] font-mono uppercase tracking-[0.3em] whitespace-nowrap ${isCyberMode ? 'text-cyan-400' : 'text-black opacity-40'}`}>
                      {isCyberMode ? t.revert : t.burst}
                    </span>
                  </motion.div>
                </div>

                <div className="text-center space-y-6">
                  <motion.h2 
                    key={isCyberMode ? 'cyber-title' : 'normal-title'}
                    className={`display-text text-6xl md:text-9xl tracking-tight leading-none transition-colors duration-1000 ${isCyberMode ? 'text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'text-black'}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {isCyberMode ? t.dataAnalyst : t.dataScientist}
                  </motion.h2>
                  <motion.p 
                    key={isCyberMode ? 'cyber-sub' : 'normal-sub'}
                    className={`text-[10px] md:text-xs uppercase tracking-[0.4em] font-mono transition-colors duration-1000 ${isCyberMode ? 'text-fuchsia-400 opacity-80' : 'opacity-40 text-black'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                  >
                    {t.subTitle}
                  </motion.p>
                  
                  {isCyberMode && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto"
                    >
                      {[
                        { title: 'NEURAL_ARCH', desc: 'Deep Learning Systems' },
                        { title: 'DATA_MINING', desc: 'Pattern Extraction' },
                        { title: 'PREDICTIVE_AI', desc: 'Forecasting Models' },
                        { title: 'ML_OPS', desc: 'Pipeline Automation' }
                      ].map((skill, i) => (
                        <div key={i} className="text-left border-l border-cyan-400/20 pl-3">
                          <div className="text-[9px] text-cyan-400 font-bold tracking-widest">{skill.title}</div>
                          <div className="text-[8px] text-cyan-400/40 font-mono uppercase">{skill.desc}</div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  <div className={`text-[10px] font-mono max-w-[250px] mx-auto mt-6 italic transition-colors duration-1000 ${isCyberMode ? 'text-cyan-400/40' : 'opacity-30 text-black'}`}>
                    {isCyberMode ? t.lost : t.giveItATry}
                  </div>
                </div>
              </div>

              <div className={`absolute bottom-12 left-0 w-full flex justify-between items-end z-30 transition-colors duration-1000 ${isCyberMode ? 'text-cyan-400' : 'text-black'}`}>
                <div className="flex gap-12">
                  <div className="flex flex-col">
                    <span className="micro-label mb-1">{t.uplink}</span>
                    <span className="text-[10px] font-mono opacity-60">{isCyberMode ? 'CYBER_LINK_01' : 'AIS_DEV_2026'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="micro-label mb-1">{t.protocol}</span>
                    <span className="text-[10px] font-mono opacity-60">{isCyberMode ? 'VAPOR_V1' : 'XENON_V4'}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono opacity-20 uppercase tracking-[0.2em]">{t.copyright} 2026 {isCyberMode ? 'Cyber_Labs' : 'Xenon_Labs'}</span>
                </div>
              </div>
            </div>
          </SectionWrapper>
        );
      case 'projects':
        return (
          <SectionWrapper
            id="projects"
            variants={variants}
            transition={transition}
            showDynamicBg={true}
            className="px-0"
          >
            <PageLayout
              number="02"
              label="Data_Archive"
              title="Selected_Works"
              subLabel1="Proof_of_Concept // 2024-2026"
              subLabel2="Total_Entries: 08"
              description="Une exploration de mes projets les plus significatifs en Science des Données et IA. Chaque projet est une démonstration de résolution de problèmes complexes par l'analyse et l'ingénierie."
              menuItems={[
                { label: 'VISION', href: '#vision' },
                { label: 'NLP', href: '#nlp' },
                { label: 'FORECAST', href: '#forecast' },
                { label: 'ANALYTICS', href: '#analytics' }
              ]}
            >
              <ProjectsSection />
            </PageLayout>
          </SectionWrapper>
        );
      case 'about':
        return (
          <SectionWrapper
            id="about"
            variants={variants}
            transition={transition}
            showDynamicBg={true}
            className="px-0"
          >
            <PageLayout
              number="03"
              label="Neural_Profile"
              title="Background"
              subLabel1="Philosophy // Evolution"
              subLabel2="Status: Verified"
              description="Mon parcours académique et professionnel. De la curiosité mathématique à l'expertise technique, voici comment j'ai construit mon socle de compétences."
              menuItems={[
                { label: 'BIO', href: '#bio' },
                { label: 'TIMELINE', href: '#timeline' },
                { label: 'EDUCATION', href: '#education' }
              ]}
            >
              <About />
              <div className="mt-32">
                <Timeline />
              </div>
            </PageLayout>
          </SectionWrapper>
        );
      case 'skills':
        return (
          <SectionWrapper
            id="skills"
            variants={variants}
            transition={transition}
            showDynamicBg={true}
            className="px-0"
          >
            <PageLayout
              number="04"
              label="Tech_Stack"
              title="Capabilities"
              subLabel1="Tooling // Systems"
              subLabel2="Sync_Rate: 98.4%"
              description="Un aperçu détaillé de mes compétences techniques. Je maîtrise les outils modernes de traitement de données, de modélisation IA et de déploiement."
              menuItems={[
                { label: 'LANGUAGES', href: '#languages' },
                { label: 'FRAMEWORKS', href: '#frameworks' },
                { label: 'TOOLS', href: '#tools' }
              ]}
            >
              <SkillsSection />
            </PageLayout>
          </SectionWrapper>
        );
      case 'passion':
        return (
          <SectionWrapper
            id="passion"
            variants={variants}
            transition={transition}
            showDynamicBg={true}
            className="px-0"
          >
            <PageLayout
              number="05"
              label="Personal_Drive"
              title="Passions"
              subLabel1="Entertainment // Hobbies"
              subLabel2="Status: Human"
              description="Au-delà du code et des données, ce qui m'anime au quotidien. Cinéma, jeux vidéo et curiosités qui nourrissent ma créativité."
              menuItems={[
                { label: 'MOVIES', href: '#movies' },
                { label: 'GAMES', href: '#games' },
                { label: 'MOOD', href: '#mood' }
              ]}
            >
              <div className="space-y-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <h3 className="text-2xl font-mono font-bold border-b border-black/10 pb-4">Latest Movies</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {['Inception', 'The Matrix', 'Interstellar'].map((movie, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-black/5 border border-black/5 hover:border-black/20 transition-all">
                          <img src={`https://picsum.photos/seed/movie${i}/300/40`} alt={movie} className="w-[300px] h-[40px] object-cover grayscale opacity-60" referrerPolicy="no-referrer" />
                          <span className="font-mono text-sm">{movie}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-8">
                    <h3 className="text-2xl font-mono font-bold border-b border-black/10 pb-4">Latest Games</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {['Elden Ring', 'Cyberpunk 2077', 'Zelda: TotK'].map((game, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-black/5 border border-black/5 hover:border-black/20 transition-all">
                          <img src={`https://picsum.photos/seed/game${i}/100/100`} alt={game} className="w-[100px] h-[100px] object-cover grayscale opacity-60" referrerPolicy="no-referrer" />
                          <span className="font-mono text-sm">{game}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-8 py-12 border-t border-black/10">
                  <span className="micro-label">Mood_Indicator</span>
                  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ6eGZ6eGZ6eGZ6eGZ6eGZ6eGZ6eGZ6eGZ6eGZ6eGZ6eGZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/vFKqnCdLPNOKc/giphy.gif" alt="Funny Cat" className="w-64 h-64 object-cover rounded-lg shadow-xl" referrerPolicy="no-referrer" />
                </div>
              </div>
            </PageLayout>
          </SectionWrapper>
        );
      case 'contact':
        return (
          <SectionWrapper
            id="contact"
            variants={variants}
            transition={transition}
            showDynamicBg={true}
            className="px-0"
          >
            <PageLayout
              number="06"
              label="Uplink"
              title="Connection"
              subLabel1="Collaboration // Network"
              subLabel2="Availability: Open"
              description="Prêt pour de nouveaux défis ou une collaboration innovante ? Contactez-moi via les canaux sécurisés ci-dessous."
              menuItems={[
                { label: 'EMAIL', href: 'mailto:mounaouattara04@gmail.com' },
                { label: 'LINKEDIN', href: '#' },
                { label: 'GITHUB', href: '#' }
              ]}
            >
              <ContactSection />
              <div className="mt-32">
                <Footer />
              </div>
            </PageLayout>
          </SectionWrapper>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen text-fg selection:bg-accent selection:text-bg overflow-hidden font-sans">
      {/* Dynamic Background Color */}
      <motion.div 
        className="fixed inset-0 -z-10 bg-[#F2F2F2]"
      />
      
      <div className="grid-bg" />
      
      {/* HUD Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
        <div className="absolute top-10 left-10 hud-corner border-r-0 border-b-0" />
        <div className="absolute top-10 right-10 hud-corner border-l-0 border-b-0" />
        <div className="absolute bottom-10 left-10 hud-corner border-r-0 border-t-0" />
        <div className="absolute bottom-10 right-10 hud-corner border-l-0 border-t-0" />
        
        <div className="absolute top-1/2 left-10 h-32 w-[1px] bg-black/10 -translate-y-1/2" />
        <div className="absolute top-1/2 right-10 h-32 w-[1px] bg-black/10 -translate-y-1/2" />
        
        <div className="absolute top-10 left-1/2 w-32 h-[1px] bg-black/10 -translate-x-1/2" />
        <div className="absolute bottom-10 left-1/2 w-32 h-[1px] bg-black/10 -translate-x-1/2" />
      </div>

      {/* Split Navigation - Integrated HUD Style */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-12 py-10 flex justify-between items-start pointer-events-none font-mono">
        {/* Left Side: Logo & Status */}
        <motion.div 
          className="pointer-events-auto cursor-pointer flex flex-col gap-4"
          whileHover={{ x: 5 }}
          onClick={() => setActiveSection('home')}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-black/20 flex items-center justify-center font-bold text-xl relative">
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-black" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-black" />
              MO
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase">Mouna_Ouattara</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                <span className="text-[8px] opacity-40 tracking-[0.2em]">DATA_ANALYST // AI_ENGINEER // V4.0</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Navigation Links */}
        <div className="pointer-events-auto flex flex-col items-end gap-6">
          <div className="flex items-center gap-10">
            {/* Language Switcher */}
            <div className="flex items-center gap-2 mr-4 border-r border-black/10 pr-4">
              <Globe size={12} className="opacity-40" />
              <button 
                onClick={() => setLang('fr')}
                className={`text-[9px] font-bold transition-all ${lang === 'fr' ? 'text-black' : 'text-black/30 hover:text-black/60'}`}
              >
                FR
              </button>
              <span className="text-[9px] opacity-20">/</span>
              <button 
                onClick={() => setLang('en')}
                className={`text-[9px] font-bold transition-all ${lang === 'en' ? 'text-black' : 'text-black/30 hover:text-black/60'}`}
              >
                EN
              </button>
            </div>

            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-500 relative py-2 group ${
                  activeSection === tab.id ? 'text-black' : 'text-black/30 hover:text-black/60'
                }`}
              >
                <span className="relative z-10">{tab.label}</span>
                {activeSection === tab.id && (
                  <motion.div 
                    layoutId="nav-glow"
                    className="absolute inset-0 bg-black/5 -z-10 blur-sm rounded-sm"
                  />
                )}
                <div className={`absolute bottom-0 left-0 h-[1px] bg-black transition-all duration-500 ${activeSection === tab.id ? 'w-full' : 'w-0 group-hover:w-1/2'}`} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 opacity-20">
            <div className="h-[1px] w-24 bg-black" />
            <span className="text-[9px] tracking-[0.5em]">{t.navInterface}</span>
          </div>
        </div>
      </nav>

      {/* Main Content - Tabbed with AnimatePresence */}
      <main className="relative z-10 w-full h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          {renderSection()}
        </AnimatePresence>
      </main>

      {/* Bottom HUD Status Bar */}
      <div className="fixed bottom-0 left-0 w-full h-12 border-t border-black/5 bg-white/60 backdrop-blur-md z-50 flex items-center justify-between px-10 font-mono text-[10px] tracking-widest text-black/40">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
            <span>{t.coreSync}</span>
          </div>
          <div className="h-4 w-[1px] bg-black/10" />
          <span>{t.section}: {activeSection.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-8">
          <span>{t.coords}: {Math.round(mousePos.x)}, {Math.round(mousePos.y)}</span>
          <div className="h-4 w-[1px] bg-black/10" />
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
