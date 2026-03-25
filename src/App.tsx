import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  Lightbulb, 
  Star, 
  Code, 
  Network, 
  GitBranch, 
  Layout, 
  FileOutput, 
  ThumbsUp, 
  TrendingUp, 
  CheckCircle,
  BrainCircuit,
  ArrowRight,
  FileText,
  Cpu,
  Sparkles,
  Bot
} from 'lucide-react';

const slides = [
  {
    id: 1,
    type: 'title',
    title: 'AI Resume Analyzer',
    subtitle: 'Smart Resume Evaluation using AI',
    author: 'Sharath',
    icon: BrainCircuit
  },
  {
    id: 2,
    type: 'list',
    title: 'Problem Statement',
    points: [
      'Many resumes are rejected due to ATS filtering',
      'Candidates don’t know why their resumes fail',
      'Need for automated resume evaluation'
    ],
    icon: AlertTriangle
  },
  {
    id: 3,
    type: 'list',
    title: 'Solution Overview',
    points: [
      'AI-powered Resume Analyzer',
      'Upload PDF resumes',
      'Get ATS score, feedback, and suggestions instantly'
    ],
    icon: Lightbulb
  },
  {
    id: 4,
    type: 'grid',
    title: 'Features',
    points: [
      'ATS Score calculation',
      'Resume summary generation',
      'Job role suggestions',
      'Resume improvement tips',
      'Downloadable report',
      'Dark/Light mode UI'
    ],
    icon: Star
  },
  {
    id: 5,
    type: 'tech',
    title: 'Technologies Used',
    points: [
      { name: 'Python (Flask)', desc: 'Backend framework' },
      { name: 'Groq API', desc: 'LLM - LLaMA 3.1' },
      { name: 'PyPDF2', desc: 'PDF text extraction' },
      { name: 'HTML, CSS, JS', desc: 'Frontend UI' }
    ],
    icon: Code
  },
  {
    id: 6,
    type: 'flow',
    title: 'System Architecture',
    points: [
      'User uploads resume (PDF)',
      'Backend extracts text using PyPDF2',
      'Sends prompt to AI model via Groq API',
      'AI analyzes and returns structured output',
      'Displays ATS score and report'
    ],
    icon: Network
  },
  {
    id: 7,
    type: 'flow',
    title: 'Code Workflow',
    points: [
      'Flask handles routing and file upload',
      'Extract text from PDF',
      'Send formatted prompt to LLM',
      'Parse ATS score using regex',
      'Render results in UI'
    ],
    icon: GitBranch
  },
  {
    id: 8,
    type: 'grid',
    title: 'User Interface',
    points: [
      'Simple upload system',
      'Attractive gradient design',
      'ATS score display',
      'Scrollable result section',
      'Download report option'
    ],
    icon: Layout
  },
  {
    id: 9,
    type: 'stats',
    title: 'Sample Output',
    stats: {
      score: 75,
      verdict: 'Needs Improvement',
      roles: ['Software Developer', 'Data Analyst'],
      suggestions: 'Add more quantifiable achievements. Include relevant keywords.'
    },
    icon: FileOutput
  },
  {
    id: 10,
    type: 'grid',
    title: 'Advantages',
    points: [
      'Saves time',
      'AI-based insights',
      'Improves job chances',
      'Easy to use'
    ],
    icon: ThumbsUp
  },
  {
    id: 11,
    type: 'list',
    title: 'Future Enhancements',
    points: [
      'Support for DOCX files',
      'Resume keyword optimization',
      'Integration with job portals',
      'Personalized recommendations'
    ],
    icon: TrendingUp
  },
  {
    id: 12,
    type: 'conclusion',
    title: 'Conclusion',
    points: [
      'AI Resume Analyzer helps candidates improve resumes',
      'Makes job application process smarter and efficient'
    ],
    icon: CheckCircle
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.9
    })
  };

  const renderSlide = (slide: any) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center text-center h-full space-y-8">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
              className="p-8 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl mb-4"
            >
              <BrainCircuit size={80} className="text-white" />
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
            >
              {slide.title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-white/80 font-light tracking-wide"
            >
              {slide.subtitle}
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 pt-8 border-t border-white/20 w-64"
            >
              <p className="text-white/60 uppercase tracking-widest text-sm font-semibold">Created by</p>
              <p className="text-xl font-medium mt-1">{slide.author}</p>
            </motion.div>
          </div>
        );

      case 'list':
        return (
          <ul className="space-y-6 max-w-3xl mx-auto w-full">
            {slide.points.map((point: string, idx: number) => (
              <motion.li 
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-6 text-2xl bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="mt-1 p-2 bg-white/10 rounded-full shrink-0">
                  <ArrowRight size={20} className="text-white" />
                </div>
                <span className="leading-relaxed">{point}</span>
              </motion.li>
            ))}
          </ul>
        );

      case 'grid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
            {slide.points.map((point: string, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 text-xl bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="p-3 bg-white/10 rounded-xl shrink-0">
                  <Sparkles size={24} className="text-white" />
                </div>
                <span className="font-medium">{point}</span>
              </motion.div>
            ))}
          </div>
        );

      case 'tech':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
            {slide.points.map((tech: any, idx: number) => {
              const icons = [Code, Cpu, FileText, Layout];
              const Icon = icons[idx % icons.length];
              return (
                <motion.div 
                  key={idx}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center gap-4 bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 shadow-lg"
                >
                  <div className="p-5 bg-white/10 rounded-2xl">
                    <Icon size={40} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{tech.name}</h3>
                    <p className="text-white/70 text-lg">{tech.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        );

      case 'flow':
        return (
          <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full relative">
            {/* Connecting line */}
            <div className="absolute left-[1.45rem] top-6 bottom-6 w-0.5 bg-white/20 -z-0" />
            {slide.points.map((point: string, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-6 relative z-10"
              >
                <div className="w-12 h-12 rounded-full bg-[#2a8bf2] flex items-center justify-center font-bold text-xl border-4 border-[#00f2fe] shrink-0 shadow-lg">
                  {idx + 1}
                </div>
                <div className="flex-1 bg-white/10 p-5 rounded-2xl border border-white/20 text-xl backdrop-blur-sm shadow-xl">
                  {point}
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'stats':
        return (
          <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto h-full items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-1 bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center aspect-square max-w-sm relative overflow-hidden shadow-xl"
            >
              {/* Circular Progress */}
              <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="88" className="stroke-white/10" strokeWidth="16" fill="none" />
                <motion.circle 
                  cx="96" cy="96" r="88" 
                  className="stroke-white" 
                  strokeWidth="16" 
                  fill="none" 
                  strokeDasharray="553"
                  initial={{ strokeDashoffset: 553 }}
                  animate={{ strokeDashoffset: 553 - (553 * slide.stats.score) / 100 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-bold">{slide.stats.score}</span>
                <span className="text-white/60 text-lg mt-1">/ 100</span>
              </div>
              <h3 className="text-2xl font-semibold mt-8 text-white/90">{slide.stats.verdict}</h3>
            </motion.div>

            <div className="flex-1 flex flex-col gap-6">
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg"
              >
                <h4 className="text-white/60 uppercase tracking-wider text-sm font-bold mb-3">Suggested Roles</h4>
                <div className="flex flex-wrap gap-3">
                  {slide.stats.roles.map((role: string, i: number) => (
                    <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-lg border border-white/20">
                      {role}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 p-6 rounded-2xl border border-white/10 flex-1 shadow-lg"
              >
                <h4 className="text-white/60 uppercase tracking-wider text-sm font-bold mb-3">AI Suggestions</h4>
                <p className="text-xl leading-relaxed">{slide.stats.suggestions}</p>
              </motion.div>
            </div>
          </div>
        );

      case 'conclusion':
        return (
          <div className="flex flex-col items-center justify-center text-center h-full space-y-12 max-w-4xl mx-auto">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="p-8 bg-white/10 rounded-full border border-white/20 shadow-2xl"
            >
              <Bot size={80} className="text-white" />
            </motion.div>
            <div className="space-y-8">
              {slide.points.map((point: string, idx: number) => (
                <motion.p 
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.2 }}
                  className="text-3xl md:text-4xl font-medium leading-tight text-white/90"
                >
                  {point}
                </motion.p>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4facfe] to-[#00f2fe] text-white overflow-hidden flex flex-col font-sans selection:bg-white/30">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex items-center justify-center p-4 md:p-8 lg:p-16">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.3 }
            }}
            className="w-full max-w-6xl aspect-video bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col relative overflow-hidden"
          >
            {/* Slide Header (except for title slide) */}
            {slides[currentSlide].type !== 'title' && (
              <div className="px-8 md:px-12 py-6 md:py-8 border-b border-white/10 flex items-center gap-4 bg-white/5">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md shadow-inner">
                  {React.createElement(slides[currentSlide].icon, { size: 32, className: "text-white" })}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{slides[currentSlide].title}</h2>
              </div>
            )}

            {/* Slide Body */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
              {renderSlide(slides[currentSlide])}
            </div>
            
            {/* Slide Number */}
            <div className="absolute bottom-6 right-8 text-white/50 font-mono text-sm font-medium">
              {currentSlide + 1} / {slides.length}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="h-24 flex items-center justify-between px-8 md:px-16 pb-6 z-10">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-4 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 transition-all backdrop-blur-md border border-white/10 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
        
        {/* Progress Dots */}
        <div className="flex gap-2 md:gap-3 flex-wrap justify-center px-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentSlide ? 1 : -1);
                setCurrentSlide(idx);
              }}
              className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 md:w-12 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'w-2 md:w-3 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-4 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 transition-all backdrop-blur-md border border-white/10 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
