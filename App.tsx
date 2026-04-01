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
  bgColors?: string[];
}> = ({ id, children, variants, transition, className, showDynamicBg = false, isScrollable = true, bgColors }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  // More vibrant and distinct colors for the transition - Earthy to Deep
  const defaultColors = ["#FFFFFF", "#E8D1A7", "#9D9167", "#84592B", "#743014", "#442D1C"];
  const colors = bgColors || defaultColors;
  
  // Adjusted steps to ensure background stays white longer at the top
  const steps = colors.map((_, i) => {
    if (i === 0) return 0;
    if (i === 1) return 0.15; // Start transition later
    return 0.15 + (i - 1) * (0.85 / (colors.length - 2));
  });

  const bgColor = useTransform(
    scrollYProgress,
    steps,
    colors
  );

  return (
    <motion.section
      key={id}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={transition}
      style={{ backgroundColor: showDynamicBg ? bgColor : 'transparent' }}
      className={`h-full w-full relative z-10 ${className}`}
    >
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
    <div className="flex flex-col md:flex-row w-full min-h-full">
    {/* Sidebar - Vertical on Desktop, Hidden on Mobile */}
    <div className="hidden md:flex w-32 border-r border-black/5 flex-col items-center justify-start py-32 px-0 sticky top-0 h-screen bg-transparent z-40">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold font-mono opacity-20 leading-none">{number}</span>
        </div>
        <div className="h-32 w-[1px] bg-black/5" />
        <div className="[writing-mode:vertical-rl] writing-vertical-rl flex flex-row items-center gap-4">
          <span className="micro-label whitespace-nowrap text-[10px] opacity-60 font-bold tracking-widest uppercase">{label}</span>
          <h2 className="display-text text-2xl whitespace-nowrap font-bold tracking-tighter uppercase">{title.replace('_', ' ')}</h2>
        </div>
      </div>
    </div>
    
    {/* Main Content Area */}
    <div className="flex-1 px-4 md:px-12 lg:px-20 py-6 md:py-12 overflow-x-hidden">
      {/* Page Introduction & Mini-Menu (At a glance) */}
      {(description || menuItems) && (
        <div className="mb-6 md:mb-8 border-b border-black/10 pb-6 md:pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-1.5 h-1.5 bg-black rounded-[0.3px] animate-pulse" />
                <span className="text-[8px] md:text-[10px] font-mono font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]">Page_Overview</span>
              </div>
              <h1 className="text-3xl md:text-6xl font-mono font-bold text-fg mb-3 md:mb-6 uppercase tracking-tighter leading-none">
                {title.replace('_', ' ')}
              </h1>
              {description && (
                <p className="text-xs md:text-sm font-mono text-black/60 leading-relaxed italic border-l-2 border-black/5 pl-4 py-1 max-w-lg">
                  {">"} {description}
                </p>
              )}
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-4 md:gap-6">
              <div className="hidden sm:block md:block text-right">
                <p className="text-[8px] md:text-[9px] font-mono opacity-40 uppercase tracking-[0.4em]">{subLabel1}</p>
                <p className="text-[8px] md:text-[9px] font-mono opacity-20 uppercase tracking-[0.2em] mt-1">{subLabel2}</p>
              </div>

              {menuItems && (
                <div className="flex flex-col gap-2 md:gap-4 items-start md:items-end w-full hidden md:flex">
                  <span className="text-[7px] md:text-[8px] font-mono opacity-30 uppercase tracking-widest">Quick_Navigation</span>
                  <div className="flex flex-wrap gap-2 md:gap-4 justify-start md:justify-end">
                    {menuItems.map((item, i) => (
                      <a 
                        key={i} 
                        href={item.href} 
                        className="px-2 py-1 md:px-4 md:py-2 bg-black/5 border border-black/10 text-[7px] md:text-[9px] font-mono font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all active:scale-95"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {children}
    </div>
  </div>
);

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [isCyberMode, setIsCyberMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasMovedMouse, setHasMovedMouse] = useState(false);
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [titleIndex, setTitleIndex] = useState(0);

  const titles = ["DATA SCIENTIST", "DATA ANALYST", "AI ENGINEER", "ML ENGINEER"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
      systemStatus: 'Statut_Système',
      optimal: 'Optimal',
      overdrive: 'SURCHARGE',
      neuralLink: 'Lien_Neural_Actif',
      vaporLink: 'LIEN_VAPOR_ÉTABLI',
      module01: 'Module_01 // Interface_Principale',
      module99: 'Module_99 // Interface_Cyber',
      revert: 'Revert_Protocol?',
      burst: 'Burst_the_core?',
      burstBubble: 'CLICK / BURST THE BUBBLE',
      closeCore: 'FERMER',
      lost: '"lost in the grid"',
      giveItATry: '"give it a try" — whispered the heart',
      downloadCV: 'CV',
      uplink: 'Lien',
      protocol: 'Protocole',
      copyright: '© 2026',
      pageOverview: 'Aperçu_Page',
      quickNav: 'Navigation_Rapide',
      navInterface: 'INTERFACE_NAV',
      coreSync: 'SYNC_NOYAU: ACTIF',
      section: 'SECTION',
      coords: 'COORD',
      projectsLabel: 'Archives_Projets',
      projectsTitle: 'PROJETS',
      aboutLabel: 'Profil_Neural',
      aboutTitle: 'Mon_Parcours',
      skillsLabel: 'Stack_Technique',
      skillsTitle: 'Mes Compétences',
      passionLabel: 'Énergie_Perso',
      passionTitle: 'Mes_Passions',
      contactLabel: 'Connexion',
      contactTitle: 'Contactez-moi'
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
      burstBubble: 'CLICK / BURST THE BUBBLE',
      closeCore: 'CLOSE',
      lost: '"lost in the grid"',
      giveItATry: '"give it a try" — whispered the heart',
      downloadCV: 'CV',
      uplink: 'Uplink',
      protocol: 'Protocol',
      copyright: '© 2026',
      pageOverview: 'Page_Overview',
      quickNav: 'Quick_Navigation',
      navInterface: 'NAV_INTERFACE',
      coreSync: 'CORE_SYNC: ACTIVE',
      section: 'SECTION',
      coords: 'COORDS',
      projectsLabel: 'Project_Archives',
      projectsTitle: 'PROJECTS',
      aboutLabel: 'Neural_Profile',
      aboutTitle: 'My_Background',
      skillsLabel: 'Tech_Stack',
      skillsTitle: 'My Skills',
      passionLabel: 'Personal_Drive',
      passionTitle: 'My_Passions',
      contactLabel: 'Uplink',
      contactTitle: 'Connection'
    }
  };

  const t = translations[lang];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!hasMovedMouse) setHasMovedMouse(true);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hasMovedMouse]);

  const tabs = [
    { id: 'home', label: t.home },
    { id: 'projects', label: t.projects },
    { id: 'about', label: t.about },
    { id: 'skills', label: t.skills },
    { id: 'passion', label: t.passion },
    { id: 'contact', label: t.contact },
  ];

  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  const handleScrollToggle = () => {
    // Look for any scrollable container in the document
    const activeContainer = document.querySelector('.overflow-y-auto');
    if (activeContainer) {
      const currentScroll = activeContainer.scrollTop;
      const maxScroll = activeContainer.scrollHeight - activeContainer.clientHeight;
      
      // If we are closer to the bottom (more than 10% from top and past halfway), go to top. 
      // Otherwise go to bottom.
      if (currentScroll > maxScroll / 2) {
        activeContainer.scrollTo({ top: 0, behavior: 'smooth' });
        setScrollDirection('down');
      } else {
        activeContainer.scrollTo({ top: activeContainer.scrollHeight, behavior: 'smooth' });
        setScrollDirection('up');
      }
    }
  };

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
            className={`px-4 sm:px-12 transition-colors duration-1000 ${isCyberMode ? 'bg-[#050B24]' : ''}`}
            isScrollable={false}
          >
            <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6">
              {/* Massive Background Title - Hidden or simplified on mobile */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <motion.h1 
                  key={isCyberMode ? 'cyber-bg' : 'normal-bg'}
                  className={`display-text text-[25vw] md:text-[25vw] tracking-tighter leading-none select-none whitespace-nowrap hidden sm:block ${isCyberMode ? 'opacity-[0.1] text-cyan-400' : 'opacity-[0.03] text-black'}`}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: isCyberMode ? 0.1 : 0.03 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                >
                  {isCyberMode ? 'CYBER' : 'XENON'}
                </motion.h1>
              </div>

              {/* Decorative elements */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[95vw] md:w-[80vw] md:h-[80vw] max-w-[1000px] max-h-[1000px] thin-circle pointer-events-none z-0 transition-all duration-1000 ${isCyberMode ? 'opacity-20 border-cyan-500/50' : 'opacity-10 border-black'}`} />
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] pointer-events-none z-0 transition-all duration-1000 ${isCyberMode ? 'grainy-glow-cyan opacity-40' : 'grainy-glow-blue opacity-20'}`} />
              
              {/* Corner Labels - Responsive positioning */}
                  <div className={`absolute top-20 md:top-24 left-6 md:left-8 flex flex-col z-30 transition-colors duration-1000 ${isCyberMode ? 'text-cyan-400' : 'text-black'}`}>
                    <span className="text-[7px] md:text-[8px] font-mono font-bold uppercase tracking-[0.2em] md:tracking-[0.5em] mb-1">SYSTEM_STATUS: {isCyberMode ? 'OVERDRIVE' : 'OPTIMAL'}</span>
                    <span className="text-[6px] md:text-[7px] font-mono opacity-40 uppercase tracking-[0.1em] md:tracking-[0.2em]">{isCyberMode ? 'VAPOR_LINK_ACTIVE' : 'NEURAL_LINK_ESTABLISHED'}</span>
                  </div>
                  
                  <div className={`absolute top-20 md:top-24 right-6 md:right-8 z-30 text-right transition-colors duration-1000 ${isCyberMode ? 'text-cyan-400' : 'text-black'}`}>
                    <span className="micro-label text-[6px] md:text-[6px]">{isCyberMode ? 'MODULE_99' : 'MODULE_01'}</span>
                  </div>

              {/* Central Content */}
              <div className="relative z-20 flex flex-col items-center gap-6 md:gap-8 w-full max-w-5xl px-4">
                  <div className="relative group">
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
                    className={`w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[450px] md:h-[450px] flex items-center justify-center relative shadow-2xl cursor-pointer transition-all duration-1000 ${isCyberMode ? 'bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-xl rounded-2xl' : 'liquid-shape animate-liquid'}`}
                  >
                    <AnimatePresence mode="wait">
                      {!isCyberMode ? (
                        <motion.div 
                          key="normal-core"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                          <span className="text-[12px] md:text-[18px] font-mono tracking-[0.8em] opacity-30 uppercase font-bold animate-pulse">the_core</span>
                          
                          {/* Hint inside the core */}
                          <AnimatePresence>
                            {hasMovedMouse && !isCyberMode && (
                              <motion.div 
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ 
                                  opacity: [0, 1, 0.5, 1, 0.5, 1],
                                  y: 0 
                                }}
                                transition={{ 
                                  opacity: { duration: 2, times: [0, 0.2, 0.4, 0.6, 0.8, 1] },
                                  y: { duration: 0.5 }
                                }}
                                className="mt-2 pointer-events-none text-center"
                              >
                                <span className="text-[7px] md:text-[8px] font-mono uppercase tracking-[0.2em] whitespace-nowrap text-black opacity-60">
                                  {t.burst}
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="cyber-core"
                          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          exit={{ opacity: 0, scale: 1.5 }}
                          className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                          {/* Cyber Token / Cube Visual */}
                          <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-lg shadow-[0_0_30px_rgba(34,211,238,0.3)] animate-pulse" />
                          <div className="absolute inset-4 border border-fuchsia-500/30 rounded-lg" />
                          <div className="text-cyan-400 font-mono text-lg md:text-3xl tracking-[0.2em] font-bold uppercase">AI_CORE</div>
                          
                          {/* Close button inside core for Cyber Mode */}
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-4 flex items-center gap-2 text-cyan-400/60 hover:text-cyan-400 transition-colors"
                          >
                            <X size={12} />
                            <span className="text-[8px] font-mono font-bold uppercase tracking-widest">{t.closeCore}</span>
                          </motion.div>

                          {/* Arrows and Labels - Hidden on small mobile */}
                          {[
                            { label: 'DATA SCIENCE', angle: -45, x: -180, y: -180 },
                            { label: 'DATA ANALYSIS', angle: 45, x: 180, y: -180 },
                            { label: 'AI ENGINEER', angle: 135, x: 180, y: 180 },
                            { label: 'ML ENGINEER', angle: 225, x: -180, y: 180 }
                          ].map((item, i) => (
                            <motion.div
                              key={i}
                              className="absolute hidden md:flex flex-col items-center gap-2"
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

                  {/* Hint under the core - REMOVED from here, moved inside core */}
                </div>

                <div className="text-center space-y-4 md:space-y-6">
                  <motion.h2 
                    key={titles[titleIndex]}
                    className={`display-text text-3xl sm:text-6xl md:text-8xl tracking-tight leading-none transition-colors duration-1000 ${isCyberMode ? 'text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'text-black'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {titles[titleIndex]}
                  </motion.h2>
                  <motion.p 
                    className={`text-sm md:text-lg font-bold uppercase tracking-[0.5em] font-mono transition-colors duration-1000 ${isCyberMode ? 'text-fuchsia-400' : 'text-black opacity-80'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    MOUNA OUATTARA
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

              <div className={`absolute bottom-8 md:bottom-12 left-0 w-full flex justify-between items-end z-30 transition-colors duration-1000 ${isCyberMode ? 'text-cyan-400' : 'text-black'}`}>
                <div className="flex gap-6 md:gap-12">
                  <div className="flex flex-col">
                    <span className="micro-label mb-1 text-[6px] md:text-[8px]">{t.uplink}</span>
                    <span className="text-[8px] md:text-[10px] font-mono opacity-60">{isCyberMode ? 'CYBER_LINK_01' : 'AIS_DEV_2026'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="micro-label mb-1 text-[6px] md:text-[8px]">{t.protocol}</span>
                    <span className="text-[8px] md:text-[10px] font-mono opacity-60">{isCyberMode ? 'VAPOR_V1' : 'XENON_V4'}</span>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-[9px] font-mono opacity-20 uppercase tracking-[0.2em]">{t.copyright} 2026 {isCyberMode ? 'Cyber_Labs' : 'Xenon_Labs'}</span>
                  <span className="text-[6px] font-mono opacity-10 uppercase tracking-widest mt-1">v1.2.1-build-0401</span>
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
            showDynamicBg={false}
            className="px-0"
          >
            <PageLayout
              number="02"
              label={t.projectsLabel}
              title={t.projectsTitle}
              subLabel1="Proof_of_Concept // 2024-2026"
              subLabel2="Total_Entries: 08"
              description={lang === 'fr' ? "Une exploration de mes projets les plus significatifs en Science des Données et IA. Chaque projet est une démonstration de résolution de problèmes complexes par l'analyse et l'ingénierie." : "An exploration of my most significant projects in Data Science and AI. Each project is a demonstration of complex problem solving through analysis and engineering."}
              menuItems={[
                { label: 'VISION', href: '#vision' },
                { label: 'NLP', href: '#nlp' },
                { label: 'FORECAST', href: '#forecast' },
                { label: 'ANALYTICS', href: '#analytics' }
              ]}
            >
              <ProjectsSection lang={lang} />
            </PageLayout>
          </SectionWrapper>
        );
      case 'about':
        return (
          <SectionWrapper
            id="about"
            variants={variants}
            transition={transition}
            showDynamicBg={false}
            className="px-0"
          >
            <PageLayout
              number="03"
              label={t.aboutLabel}
              title={t.aboutTitle}
              subLabel1="Philosophy // Evolution"
              subLabel2="Status: Verified"
              description={lang === 'fr' ? "Mon parcours académique et professionnel. De la curiosité mathématique à l'expertise technique, voici comment j'ai construit mon socle de compétences." : "My academic and professional journey. From mathematical curiosity to technical expertise, here is how I built my skill base."}
              menuItems={[
                { label: 'BIO', href: '#bio' },
                { label: 'TIMELINE', href: '#timeline-section' },
                { label: 'EDUCATION', href: '#education' }
              ]}
            >
              <About lang={lang} />
              <div id="timeline-section" className="mt-12 md:mt-24 scroll-mt-32 pb-32 md:pb-[50vh]">
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
            showDynamicBg={false}
            className="px-0"
          >
            <PageLayout
              number="04"
              label={t.skillsLabel}
              title={t.skillsTitle}
              subLabel1="Tooling // Systems"
              subLabel2="Sync_Rate: 98.4%"
              description={lang === 'fr' ? "Un aperçu détaillé de mes compétences techniques. Je maîtrise les outils modernes de traitement de données, de modélisation IA et de déploiement." : "A detailed overview of my technical skills. I master modern tools for data processing, AI modeling and deployment."}
              menuItems={[
                { label: 'LANGUAGES', href: '#languages' },
                { label: 'FRAMEWORKS', href: '#frameworks' },
                { label: 'TOOLS', href: '#tools' }
              ]}
            >
              <SkillsSection lang={lang} />
            </PageLayout>
          </SectionWrapper>
        );
      case 'passion':
        return (
          <SectionWrapper
            id="passion"
            variants={variants}
            transition={transition}
            showDynamicBg={false}
            className="px-0"
          >
            <PageLayout
              number="05"
              label={t.passionLabel}
              title={t.passionTitle}
              subLabel1="Entertainment // Hobbies"
              subLabel2="Status: Human"
              description={lang === 'fr' ? "Au-delà du code et des données, ce qui m'anime au quotidien. Cinéma, jeux vidéo et curiosités qui nourrissent ma créativité." : "Beyond code and data, what drives me daily. Cinema, video games and curiosities that feed my creativity."}
              menuItems={[
                { label: 'MOVIES', href: '#movies' },
                { label: 'GAMES', href: '#games' },
                { label: 'MOOD', href: '#mood' }
              ]}
            >
              <div className="space-y-12 md:space-y-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                  <div id="movies" className="space-y-6 md:space-y-8 scroll-mt-32">
                    <h3 className="text-xl md:text-2xl font-mono font-bold border-b border-black/10 pb-4 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-black rounded-[0.3px]" />
                      {lang === 'fr' ? 'Derniers Films' : 'Latest Movies'}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {['No Other Choices', 'Parasite', 'Strange Darlings'].map((movie, i) => (
                        <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-black/5 border border-black/5 hover:border-black/20 transition-all group">
                          <img src={`https://picsum.photos/seed/movie${i}/300/40`} alt={movie} className="w-full sm:w-[200px] md:w-[300px] h-[60px] sm:h-[40px] object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" referrerPolicy="no-referrer" />
                          <span className="font-mono text-sm font-bold uppercase tracking-tight">{movie}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div id="games" className="space-y-6 md:space-y-8 scroll-mt-32">
                    <h3 className="text-xl md:text-2xl font-mono font-bold border-b border-black/10 pb-4 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-black rounded-[0.3px]" />
                      {lang === 'fr' ? 'Derniers Jeux' : 'Latest Games'}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {['Night in the Woods', 'Gris', 'Into the Dead: Our Darkests Hour'].map((game, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-black/5 border border-black/5 hover:border-black/20 transition-all group">
                          <img src={`https://picsum.photos/seed/game${i}/100/100`} alt={game} className="w-16 h-16 md:w-[100px] md:h-[100px] object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" referrerPolicy="no-referrer" />
                          <span className="font-mono text-sm font-bold uppercase tracking-tight">{game}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div id="sports" className="space-y-6 md:space-y-8 scroll-mt-32">
                    <h3 className="text-xl md:text-2xl font-mono font-bold border-b border-black/10 pb-4 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-black rounded-[0.3px]" />
                      {lang === 'fr' ? 'Sports & Activités' : 'Sports & Activities'}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {['Hiking', 'Swimming', 'Escalade'].map((sport, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-black/5 border border-black/5 hover:border-black/20 transition-all group">
                          <div className="w-16 h-16 md:w-[100px] md:h-[100px] bg-black/10 flex items-center justify-center overflow-hidden">
                            <img src={`https://picsum.photos/seed/sport${i}/100/100`} alt={sport} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" referrerPolicy="no-referrer" />
                          </div>
                          <span className="font-mono text-sm font-bold uppercase tracking-tight">{sport}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div id="mood" className="flex flex-col items-center gap-6 md:gap-8 py-8 md:py-12 border-t border-black/10 scroll-mt-32">
                  <span className="micro-label">{lang === 'fr' ? 'Indicateur_Humeur' : 'Mood_Indicator'}</span>
                  <div className="w-48 h-48 md:w-64 md:h-64 bg-black/5 border border-black/10 flex items-center justify-center rounded-lg">
                    <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{lang === 'fr' ? 'Humeur: Créative' : 'Mood: Creative'}</span>
                  </div>
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
            showDynamicBg={false}
            className="px-0"
          >
            <PageLayout
              number="06"
              label={t.contactLabel}
              title={t.contactTitle}
              subLabel1="Collaboration // Network"
              subLabel2="Availability: Open"
              description={lang === 'fr' ? "Prêt pour de nouveaux défis ou une collaboration innovante ? Contactez-moi via les canaux sécurisés ci-dessous." : "Ready for new challenges or innovative collaboration? Contact me via the secure channels below."}
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
        className="fixed inset-0 -z-10 bg-white"
      />
      
      <div className="grid-bg" />
      
      {/* HUD Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
        <div className="absolute top-4 left-4 md:top-10 md:left-10 hud-corner border-r-0 border-b-0 opacity-20 md:opacity-100" />
        <div className="absolute top-4 right-4 md:top-10 md:right-10 hud-corner border-l-0 border-b-0 opacity-20 md:opacity-100" />
        <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 hud-corner border-r-0 border-t-0 opacity-20 md:opacity-100" />
        <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 hud-corner border-l-0 border-t-0 opacity-20 md:opacity-100" />
        
        <div className="absolute top-1/2 left-4 md:left-10 h-12 md:h-32 w-[1px] bg-black/5 md:bg-black/10 -translate-y-1/2" />
        <div className="absolute top-1/2 right-4 md:right-10 h-12 md:h-32 w-[1px] bg-black/5 md:bg-black/10 -translate-y-1/2" />
        
        <div className="absolute top-8 md:top-10 left-1/2 w-24 md:w-32 h-[1px] bg-black/5 md:bg-black/10 -translate-x-1/2" />
        <div className="absolute bottom-8 md:bottom-10 left-1/2 w-24 md:w-32 h-[1px] bg-black/5 md:bg-black/10 -translate-x-1/2" />
      </div>

      {/* Split Navigation - Integrated HUD Style */}
      <nav className={`fixed top-0 left-0 w-full z-[100] h-14 md:h-auto px-6 md:px-12 md:py-10 grid grid-cols-3 items-center pointer-events-none font-mono transition-all duration-500 ${
        activeSection === 'home' 
          ? 'bg-transparent border-none md:bg-transparent md:border-none' 
          : 'bg-white backdrop-blur-md border-b border-black/5 md:bg-transparent md:backdrop-blur-none md:border-none'
      }`}>
        {/* Left Side: Logo & Status */}
        <div className="flex justify-start items-center h-full">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="pointer-events-auto cursor-pointer flex flex-col justify-center"
            whileHover={{ x: 5 }}
            onClick={() => setActiveSection('home')}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`border border-black/20 flex items-center justify-center font-bold relative transition-all duration-500 ${
                activeSection === 'home' 
                  ? 'w-8 h-8 md:w-12 md:h-12 text-base md:text-xl' 
                  : 'w-8 h-8 md:w-10 md:h-10 text-base md:text-[14px]'
              }`}>
                <div className="absolute -top-0.5 -left-0.5 w-1 h-1 border-t border-l border-black" />
                <div className="absolute -bottom-0.5 -right-0.5 w-1 h-1 border-b border-r border-black" />
                MO
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center: Page Title (Mobile only, non-home) */}
        <div className="flex justify-center items-center h-full">
          {activeSection !== 'home' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden text-[11px] font-bold uppercase tracking-[0.4em] text-black whitespace-nowrap text-center"
            >
              {tabs.find(t => t.id === activeSection)?.label}
            </motion.div>
          )}
        </div>

        {/* Right Side: Navigation Links */}
        <div className="pointer-events-auto flex justify-end items-center h-full">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 bg-black text-white border border-black/10 backdrop-blur-md shadow-lg active:scale-95 transition-transform"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-500 relative py-2 group whitespace-nowrap ${
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

          <div className="hidden md:flex items-center gap-4 opacity-20">
            <div className="h-[1px] w-24 bg-black" />
            <span className="text-[9px] tracking-[0.5em]">{t.navInterface}</span>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu - Moved outside nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 z-[200] bg-white flex flex-col pointer-events-auto"
          >
            {/* Background Pattern for Mobile Menu */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden flex items-center justify-center">
              <div className="display-text text-[40vw] rotate-90">MENU</div>
            </div>

            <div className="flex items-center justify-between px-6 h-14 border-b border-black/5 relative z-20">
              <div className="w-8 h-8 border border-black/20 flex items-center justify-center font-bold font-mono text-base relative">
                <div className="absolute -top-0.5 -left-0.5 w-1 h-1 border-t border-l border-black" />
                <div className="absolute -bottom-0.5 -right-0.5 w-1 h-1 border-b border-r border-black" />
                MO
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 bg-black text-white rounded-[0.3px] shadow-xl active:scale-90 transition-transform"
                aria-label="Close Menu"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center flex-1 w-full relative z-10 px-6">
              <div className="flex flex-col items-center gap-3 w-full">
                {tabs.map((tab, idx) => (
                  <motion.button
                    key={tab.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, ease: "easeOut" }}
                    onClick={() => {
                      setActiveSection(tab.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full py-1.5 text-base font-bold uppercase tracking-[0.4em] relative group text-center transition-colors ${
                      activeSection === tab.id ? 'text-black' : 'text-black/20'
                    }`}
                  >
                    {tab.label}
                    {activeSection === tab.id && (
                      <motion.div 
                        layoutId="mobile-nav-line"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-black"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="pb-12 pt-8 flex flex-col items-center gap-4 opacity-30 text-[9px] font-mono tracking-widest uppercase border-t border-black/5">
              <span>MOUNA_OUATTARA // 2026</span>
              <div className="w-12 h-[1px] bg-black/20" />
              <span>SYSTEM_CORE: STABLE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Tabbed with AnimatePresence */}
      <main className={`relative z-10 w-full h-screen overflow-hidden transition-all duration-500 ${activeSection === 'home' ? 'pt-0' : 'pt-14 md:pt-0'}`}>
        <AnimatePresence mode="wait">
          {renderSection()}
        </AnimatePresence>
      </main>

      {/* Scroll Toggle Button - Only on non-home pages */}
      {activeSection !== 'home' && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleScrollToggle}
          className={`fixed bottom-16 md:bottom-20 right-4 md:right-10 z-[100] p-3 md:p-4 border backdrop-blur-md shadow-xl pointer-events-auto transition-all duration-500 ${
            isCyberMode 
              ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' 
              : 'bg-white border-black/10 text-black'
          }`}
        >
          {scrollDirection === 'down' ? <ChevronRight className="rotate-90" size={20} /> : <ChevronRight className="-rotate-90" size={20} />}
        </motion.button>
      )}

      {/* Bottom Right Controls: CV & Languages - Only on home page */}
      {activeSection === 'home' && (
        <div className="fixed bottom-16 md:bottom-20 right-4 md:right-10 z-[100] flex flex-col items-end gap-2 md:gap-4 pointer-events-none">
          {/* Download CV Button */}
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/CV_Mouna_Ouattara.pdf'; // Path to the file in the public folder
              link.download = 'CV_Mouna_Ouattara.pdf';
              link.click();
            }}
            className={`pointer-events-auto flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 border font-mono transition-all duration-500 group ${
              isCyberMode 
                ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:bg-cyan-500/20' 
                : 'bg-white border-black/10 text-black hover:bg-black hover:text-white shadow-lg'
            }`}
          >
            <Download className="w-3 h-3 md:w-4 md:h-4 group-hover:animate-bounce" />
            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">{t.downloadCV}</span>
          </motion.button>

          {/* Language Switcher */}
          <div className={`pointer-events-auto flex items-center gap-3 md:gap-4 px-4 md:px-6 py-1.5 md:py-2 border font-mono transition-all duration-500 ${
            isCyberMode 
              ? 'bg-black/40 border-cyan-400/30 text-cyan-400' 
              : 'bg-white/80 border-black/5 text-black'
          }`}>
            <Globe className={`w-3 h-3 md:w-4 md:h-4 ${isCyberMode ? 'text-cyan-400' : 'opacity-40'}`} />
            <div className="flex items-center gap-1.5 md:gap-2">
              <button 
                onClick={() => setLang('fr')}
                className={`text-[8px] md:text-[10px] font-bold transition-all ${lang === 'fr' ? (isCyberMode ? 'text-cyan-400' : 'text-black') : 'opacity-30 hover:opacity-60'}`}
              >
                FR
              </button>
              <span className="text-[8px] md:text-[10px] opacity-20">/</span>
              <button 
                onClick={() => setLang('en')}
                className={`text-[8px] md:text-[10px] font-bold transition-all ${lang === 'en' ? (isCyberMode ? 'text-cyan-400' : 'text-black') : 'opacity-30 hover:opacity-60'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom HUD Status Bar */}
      <div className="fixed bottom-0 left-0 w-full h-8 md:h-12 border-t border-black/5 bg-white/60 backdrop-blur-md z-50 flex items-center justify-between px-4 md:px-10 font-mono text-[8px] md:text-[10px] tracking-widest text-black/40">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-[0.3px] animate-pulse" />
            <span className="hidden sm:inline">{t.coreSync}</span>
            <span className="sm:hidden">SYNC</span>
          </div>
          <div className="h-3 md:h-4 w-[1px] bg-black/10" />
          <span>{t.section}: {activeSection.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <span className="hidden md:inline">{t.coords}: {Math.round(mousePos.x)}, {Math.round(mousePos.y)}</span>
          <div className="hidden md:block h-4 w-[1px] bg-black/10" />
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
