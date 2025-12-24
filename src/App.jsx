import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  ArrowUpRight,
  ArrowUp,
  Monitor,
  Smartphone,
  Database,
  Layers,
  Terminal,
  Briefcase,
  Code2,
  Cpu,
  Globe,
  Server,
  GitBranch,
  FileText,
  Wrench
} from 'lucide-react';

const skillCategories = [
  {
    title: "Architecture & Engineering",
    icon: Cpu,
    skills: [
      "Full Stack Architect",
      "System Designer",
      "Scalable System Design",
      "API Design & Integration",
      "Backend Security"
    ]
  },
  {
    title: "Frontend Ecosystem",
    icon: Monitor,
    skills: [
      "React & Next.js",
      "Responsive UI Design",
      "Component Architecture",
      "State Management",
      "Design Systems"
    ]
  },
  {
    title: "Backend & Data",
    icon: Database,
    skills: [
      "Database Modeling",
      "Prisma ORM",
      "Firebase & Firestore",
      "Auth & Authorization",
      "Performance Tuning"
    ]
  },
  {
    title: "DevOps & Workflow",
    icon: GitBranch,
    skills: [
      "Git Workflow",
      "CI/CD Concepts",
      "Environment Config",
      "Package Management"
    ]
  },
  {
    title: "Quality & Maintenance",
    icon: Wrench,
    skills: [
      "Debugging",
      "Error Handling",
      "Legacy Migration",
      "Code Refactoring"
    ]
  },
  {
    title: "Product & Strategy",
    icon: Globe,
    skills: [
      "Tech Leadership",
      "Technical Documentation",
      "Educational Systems",
      "Problem Solving"
    ]
  }
];

const typingSkills = skillCategories.flatMap(cat => cat.skills);

const portfolioData = {
  name: "Bruno Andrade",
  role: "Full Stack Architect",
  bio: "Transformo complexidade em elegância. Especialista em arquitetura de software escalável e interfaces de alta precisão.",
  email: "brunomomoshiki@gmail.com",
  social: {
    github: "https://github.com/DinDja",
    linkedin: "#",
    email: "mailto:brunomomoshiki@gmail.com"
  },
  experience: [
    {
      year: "2025 - Presente",
      role: "Tech Lead",
      company: "Secretaria de Educação da Bahia",
      desc: "Liderança técnica no desenvolvimento do ecossistema AcompanhaTec. Gestão de equipe de desenvolvimento e arquitetura de infraestrutura backend para o sistema."
    },
    {
      year: "2018 - 2023",
      role: "Frontend Developer",
      company: "Web3 Projects",
      desc: "Atuação semi-autônoma focada na construção de interfaces descentralizadas e desenvolvimento de redes sociais no ambiente Web3."
    }
  ],
  skills: [
    { name: "Frontend Architecture", icon: Monitor },
    { name: "Backend Systems", icon: Database },
    { name: "Mobile Solutions", icon: Smartphone },
    { name: "UI/UX Design", icon: Layers }
  ],
  projects: [
    {
      title: "Barber Shop Plan",
      category: "SaaS Solution",
      description: "Solução digital completa para gestão de barbearias, otimizando o agendamento e o fluxo de atendimento profissional.",
      tech: ["React", "Scheduling Logic", "Modern UI"],
      link: "https://barbershopplan.netlify.app"
    },
    {
      title: "Marineford Game",
      category: "Action Game",
      description: "Simulador de batalha épica com mecânicas de estratégia e combate em tempo real.",
      tech: ["JavaScript", "Game Loop", "Canvas API"],
      link: "https://marinefordgame.netlify.app/"
    },
    {
      title: "VestQuiz",
      category: "Action Game",
      description: "Plataforma de estudo para o vestibular com Quiz e simulados, ranking e dicas..",
      tech: ["JavaScript", "Game Loop", "Canvas API"],
      link: "https://marinefordgame.netlify.app/"
    },
    {
      title: "AcompanhaTec",
      category: "Government System",
      description: "Sistema de gestão em larga escala para acompanhamento pedagógico institucional.",
      tech: ["Next.js", "Firebase", "Analytics"],
      link: "https://acompanhatec.educacao.ba.gov.br/"
    },
    {
      title: "Studio",
      category: "Creative Management",
      description: "Plataforma sofisticada para gestão de ativos criativos e fluxos de trabalho de design.",
      tech: ["React", "Node.js", "Asset Mgmt"],
      link: "https://studiocanvasbr.netlify.app"
    },
    {
      title: "LoveBuilder",
      category: "Interactive App",
      description: "Aplicação interativa focada na construção de narrativas e experiências digitais personalizadas.",
      tech: ["Next.js", "Interactive UI", "Storytelling"],
      link: "https://lovebuilder.netlify.app"
    },
    {
      title: "GameCenter",
      category: "Entertainment Hub",
      description: "Central de jogos web otimizada com performance nativa e biblioteca de clássicos recriados.",
      tech: ["Canvas API", "Game Logic", "Optimization"],
      link: "https://gamecenter-bruno.netlify.app"
    }
  ]
};

const ThemeSwitch = ({ isDark, toggleTheme }) => {
  return (
    <>
      <style>{`
        .theme-switch {
          --toggle-size: 10px;
          --container-width: 5.625em;
          --container-height: 2.5em;
          --container-radius: 6.25em;
          --container-light-bg: #3D7EAE;
          --container-night-bg: #1D1F2C;
          --circle-container-diameter: 3.375em;
          --sun-moon-diameter: 2.125em;
          --sun-bg: #ECCA2F;
          --moon-bg: #C4C9D1;
          --spot-color: #959DB1;
          --circle-container-offset: calc((var(--circle-container-diameter) - var(--container-height)) / 2 * -1);
          --stars-color: #fff;
          --clouds-color: #F3FDFF;
          --back-clouds-color: #AACADF;
          --transition: .5s cubic-bezier(0, -0.02, 0.4, 1.25);
          --circle-transition: .3s cubic-bezier(0, -0.02, 0.35, 1.17);
        }

        .theme-switch, .theme-switch *, .theme-switch *::before, .theme-switch *::after {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-size: var(--toggle-size);
        }

        .theme-switch__container {
          width: var(--container-width);
          height: var(--container-height);
          background-color: var(--container-light-bg);
          border-radius: var(--container-radius);
          overflow: hidden;
          cursor: pointer;
          -webkit-box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94);
          box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94);
          -webkit-transition: var(--transition);
          -o-transition: var(--transition);
          transition: var(--transition);
          position: relative;
        }

        .theme-switch__container::before {
          content: "";
          position: absolute;
          z-index: 1;
          inset: 0;
          -webkit-box-shadow: 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset, 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
          box-shadow: 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset, 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
          border-radius: var(--container-radius)
        }

        .theme-switch__checkbox {
          display: none;
        }

        .theme-switch__circle-container {
          width: var(--circle-container-diameter);
          height: var(--circle-container-diameter);
          background-color: rgba(255, 255, 255, 0.1);
          position: absolute;
          left: var(--circle-container-offset);
          top: var(--circle-container-offset);
          border-radius: var(--container-radius);
          -webkit-box-shadow: inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), 0 0 0 0.625em rgba(255, 255, 255, 0.1), 0 0 0 1.25em rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), 0 0 0 0.625em rgba(255, 255, 255, 0.1), 0 0 0 1.25em rgba(255, 255, 255, 0.1);
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-transition: var(--circle-transition);
          -o-transition: var(--circle-transition);
          transition: var(--circle-transition);
          pointer-events: none;
        }

        .theme-switch__sun-moon-container {
          pointer-events: auto;
          position: relative;
          z-index: 2;
          width: var(--sun-moon-diameter);
          height: var(--sun-moon-diameter);
          margin: auto;
          border-radius: var(--container-radius);
          background-color: var(--sun-bg);
          -webkit-box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset;
          box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset;
          -webkit-filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25)) drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
          filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25)) drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
          overflow: hidden;
          -webkit-transition: var(--transition);
          -o-transition: var(--transition);
          transition: var(--transition);
        }

        .theme-switch__moon {
          -webkit-transform: translateX(100%);
          -ms-transform: translateX(100%);
          transform: translateX(100%);
          width: 100%;
          height: 100%;
          background-color: var(--moon-bg);
          border-radius: inherit;
          -webkit-box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #969696 inset;
          box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #969696 inset;
          -webkit-transition: var(--transition);
          -o-transition: var(--transition);
          transition: var(--transition);
          position: relative;
        }

        .theme-switch__spot {
          position: absolute;
          top: 0.75em;
          left: 0.312em;
          width: 0.75em;
          height: 0.75em;
          border-radius: var(--container-radius);
          background-color: var(--spot-color);
          -webkit-box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
          box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
        }

        .theme-switch__spot:nth-of-type(2) {
          width: 0.375em;
          height: 0.375em;
          top: 0.937em;
          left: 1.375em;
        }

        .theme-switch__spot:nth-last-of-type(3) {
          width: 0.25em;
          height: 0.25em;
          top: 0.312em;
          left: 0.812em;
        }

        .theme-switch__clouds {
          width: 1.25em;
          height: 1.25em;
          background-color: var(--clouds-color);
          border-radius: var(--container-radius);
          position: absolute;
          bottom: -0.625em;
          left: 0.312em;
          -webkit-box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color), 4.625em -1.75em 0 0.437em var(--clouds-color), 4em -0.625em var(--back-clouds-color), 4.125em -2.125em 0 0.437em var(--back-clouds-color);
          box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color), 4.625em -1.75em 0 0.437em var(--clouds-color), 4em -0.625em var(--back-clouds-color), 4.125em -2.125em 0 0.437em var(--back-clouds-color);
          -webkit-transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
          -o-transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
          transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
        }

        .theme-switch__stars-container {
          position: absolute;
          color: var(--stars-color);
          top: -100%;
          left: 0.312em;
          width: 2.75em;
          height: auto;
          -webkit-transition: var(--transition);
          -o-transition: var(--transition);
          transition: var(--transition);
        }

        .theme-switch__checkbox:checked + .theme-switch__container {
          background-color: var(--container-night-bg);
        }

        .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container {
          left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter));
        }

        .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container:hover {
          left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter) - 0.187em)
        }

        .theme-switch__circle-container:hover {
          left: calc(var(--circle-container-offset) + 0.187em);
        }

        .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__moon {
          -webkit-transform: translate(0);
          -ms-transform: translate(0);
          transform: translate(0);
        }

        .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__clouds {
          bottom: -4.062em;
        }

        .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__stars-container {
          top: 50%;
          -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
        }
      `}</style>

      <label className="theme-switch">
        <input
          type="checkbox"
          className="theme-switch__checkbox"
          checked={isDark}
          onChange={toggleTheme}
        />
        <div className="theme-switch__container">
          <div className="theme-switch__clouds"></div>
          <div className="theme-switch__stars-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z" fill="currentColor"></path>
            </svg>
          </div>
          <div className="theme-switch__circle-container">
            <div className="theme-switch__sun-moon-container">
              <div className="theme-switch__moon">
                <div className="theme-switch__spot"></div>
                <div className="theme-switch__spot"></div>
                <div className="theme-switch__spot"></div>
              </div>
            </div>
          </div>
        </div>
      </label>
    </>
  );
};

const Navbar = ({ toggleTheme, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-zinc-950/90 border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-sm shadow-sm dark:shadow-none' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <a href="#" className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
          BA<span className="text-emerald-500">.</span>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#projects" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">Projetos</a>
          <a href="#about" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">Sobre</a>
          <a href="#timeline" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">Jornada</a>

          <div className="flex items-center">
            <ThemeSwitch isDark={isDark} toggleTheme={toggleTheme} />
          </div>

          <a href="#contact" className="px-5 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-bold rounded-sm hover:border-emerald-500 hover:text-emerald-500 transition-all">
            Contato
          </a>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeSwitch isDark={isDark} toggleTheme={toggleTheme} />

          <button className="text-zinc-900 dark:text-zinc-100 hover:text-emerald-500 transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-6 md:hidden flex flex-col space-y-4 shadow-xl">
          <a href="#projects" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-500" onClick={() => setIsOpen(false)}>Projetos</a>
          <a href="#about" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-500" onClick={() => setIsOpen(false)}>Sobre</a>
          <a href="#timeline" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-500" onClick={() => setIsOpen(false)}>Jornada</a>
          <a href="#contact" className="text-emerald-500 font-bold" onClick={() => setIsOpen(false)}>Contato</a>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % typingSkills.length;
      const fullText = typingSkills[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section className="min-h-screen flex items-center pt-20 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.1] mb-4 transition-colors duration-300">
            Bruno <br className="hidden md:block" />
            Andrade<span className="text-emerald-500">.</span>
          </h1>

          <div className="h-[60px] flex items-center mb-8">
            <span className="text-xl md:text-3xl font-mono text-zinc-500 dark:text-zinc-500">
              {'>'} <span className="text-emerald-600 dark:text-emerald-500">{text}</span>
              <span className="animate-pulse ml-1 text-emerald-500">|</span>
            </span>
          </div>

          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-12 transition-colors duration-300">
            {portfolioData.bio}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#projects" className="px-8 py-4 bg-emerald-500 text-white dark:text-zinc-950 font-bold rounded-sm hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
              Ver Projetos <ArrowUpRight size={18} />
            </a>

            <a
              href="/bruno-andrade-cv.pdf"
              download
              className="px-8 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 font-bold rounded-sm hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all flex items-center justify-center gap-2"
            >
              <FileText size={18} /> Download CV
            </a>

            <a
              href={portfolioData.social.github}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 border border-zinc-200 dark:border-zinc-800/50 text-zinc-500 dark:text-zinc-400 font-medium rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:white transition-colors flex items-center justify-center gap-2"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {portfolioData.skills.map((skill, idx) => (
          <div key={idx} className="flex flex-col gap-2 group cursor-default">
            <skill.icon className="text-zinc-400 dark:text-zinc-600 group-hover:text-emerald-500 transition-colors duration-300" size={24} />
            <h3 className="text-zinc-700 dark:text-zinc-100 font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-100 transition-colors">{skill.name}</h3>
            <div className="h-0.5 w-12 bg-zinc-200 dark:bg-zinc-800 group-hover:bg-emerald-500 transition-colors duration-300 mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TechArsenal = () => {
  return (
    <section className="py-24 bg-zinc-100 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 transition-colors">Capacidades Técnicas</h2>
          <div className="h-1 w-20 bg-emerald-500"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-500 max-w-2xl text-lg transition-colors">
            Stack tecnológica organizada por domínios de competência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-8 hover:border-emerald-500/50 transition-all duration-300 shadow-sm dark:shadow-none"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-zinc-50 dark:bg-zinc-900/50 rounded-sm text-emerald-600 dark:text-emerald-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors">
                  <category.icon size={20} />
                </div>
                <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-100 transition-colors">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIndex) => (
                  <span
                    key={sIndex}
                    className="px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 text-xs font-mono border border-zinc-200 dark:border-zinc-800/50 rounded-sm group-hover:border-emerald-500/30 group-hover:text-emerald-600 dark:group-hover:text-emerald-400/80 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Timeline = () => {
  return (
    <section id="timeline" className="py-32 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 transition-colors">Jornada Profissional</h2>
          <div className="h-1 w-20 bg-emerald-500"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800"></div>

          {portfolioData.experience.map((item, index) => (
            <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 bg-white dark:bg-zinc-950 border-2 border-emerald-500 rounded-full md:-translate-x-1/2 z-20 box-content shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>

              <div className="hidden md:block w-5/12"></div>

              <div className="w-full md:w-5/12 pl-8 md:pl-0 relative z-10">
                <div className="group">
                  <span className="text-emerald-600 dark:text-emerald-500 font-mono text-xs font-bold mb-2 block tracking-widest">{item.year}</span>
                  <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{item.role}</h3>
                  <div className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-4 flex items-center gap-2">
                    <Briefcase size={14} className="text-emerald-500" /> {item.company}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-500 text-sm leading-relaxed border-l border-zinc-200 dark:border-zinc-800 pl-4 group-hover:border-emerald-500 transition-colors">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 bg-zinc-100 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div className="relative order-2 lg:order-1">
            <div className="relative bg-zinc-900 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-2xl group hover:border-emerald-500/30 transition-colors duration-500">
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-800/50 dark:bg-zinc-900/50 border-b border-zinc-700 dark:border-zinc-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-600 dark:bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-600 dark:bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-600 dark:bg-zinc-700" />
                </div>
                <div className="text-xs text-emerald-500/80 font-mono flex items-center gap-2">
                  <Terminal size={12} /> bruno@dev:~
                </div>
              </div>
              <div className="p-6 overflow-x-auto bg-zinc-900 dark:bg-zinc-950">
                <pre className="font-mono text-sm leading-relaxed text-zinc-300">
                  <div className="flex"><span className="text-emerald-500 mr-2">const</span> <span className="text-zinc-100">profile</span> <span className="text-emerald-500">=</span> <span className="text-emerald-500">{`{`}</span></div>
                  <div className="flex ml-4"><span className="text-emerald-500">name:</span> <span className="text-zinc-300">"{portfolioData.name}"</span>,</div>
                  <div className="flex ml-4"><span className="text-emerald-500">role:</span> <span className="text-zinc-300">"{portfolioData.role}"</span>,</div>
                  <div className="flex ml-4"><span className="text-emerald-500">focus:</span> <span className="text-zinc-500">[</span></div>
                  <div className="flex ml-8"><span className="text-zinc-300">"Architecture"</span>,</div>
                  <div className="flex ml-8"><span className="text-zinc-300">"Performance"</span>,</div>
                  <div className="flex ml-8"><span className="text-zinc-300">"Design System"</span></div>
                  <div className="flex ml-4"><span className="text-zinc-500">]</span>,</div>
                  <div className="flex ml-4"><span className="text-emerald-500">init:</span> <span className="text-emerald-500">async</span> <span className="text-emerald-500">()</span> <span className="text-emerald-500">=&gt;</span> <span className="text-emerald-500">{`{`}</span></div>
                  <div className="flex ml-8"><span className="text-emerald-500">return</span> <span className="text-zinc-100">Excellence</span>.<span className="text-emerald-400">build</span>();</div>
                  <div className="flex ml-4"><span className="text-emerald-500">{'}'}</span></div>
                  <div className="flex"><span className="text-emerald-500">{'}'}</span>;</div>
                </pre>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 transition-colors">Arquitetura & Design</h2>
            <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed transition-colors">
              <p>
                A tecnologia deve ser invisível. Meu foco é construir sistemas robustos que operam silenciosamente, entregando performance e estabilidade sem atrito.
              </p>
              <p>
                Mais do que escrever código, desenho ecossistemas. Integro engenharia de dados e design de interfaces para transformar processos burocráticos complexos em experiências digitais intuitivas e de alto desempenho.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="border-l-2 border-emerald-500 pl-6">
                <h4 className="text-zinc-900 dark:text-zinc-100 font-bold mb-2 transition-colors">Frontend</h4>
                <p className="text-sm text-zinc-500">React, Next.js, Tailwind</p>
              </div>
              <div className="border-l-2 border-emerald-500 pl-6">
                <h4 className="text-zinc-900 dark:text-zinc-100 font-bold mb-2 transition-colors">Backend</h4>
                <p className="text-sm text-zinc-500">Node.js, Firebase, MongoDB</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <a href={project.link} target="_blank" rel="noreferrer" className="group block bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 h-full flex flex-col shadow-sm dark:shadow-none">
      <div className="p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-sm bg-emerald-50 dark:bg-transparent">
            {project.category}
          </span>
          <ArrowUpRight className="text-zinc-400 dark:text-zinc-600 group-hover:text-emerald-500 transition-colors" size={20} />
        </div>

        <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
          {project.tech.map((tech, i) => (
            <span key={i} className="text-xs font-mono text-zinc-500 dark:text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-500/70 transition-colors">
              {tech}{i < project.tech.length - 1 ? ' •' : ''}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-32 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 transition-colors">Projetos Selecionados</h2>
            <div className="h-1 w-20 bg-emerald-500"></div>
          </div>
          <a href={portfolioData.social.github} className="text-zinc-600 dark:text-zinc-500 hover:text-emerald-500 transition-colors flex items-center gap-2 text-sm font-medium">
            Ver repositório completo <Github size={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 transition-colors">Pronto para colaborar?</h2>
        <p className="text-zinc-600 dark:text-zinc-500 text-xl mb-12 transition-colors">
          Estou disponível para projetos de alta complexidade e consultoria estratégica.
        </p>
        <a
          href={`mailto:${portfolioData.email}`}
          className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-500 text-white dark:text-zinc-950 font-bold text-lg rounded-sm hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
        >
          <Mail size={20} /> Iniciar Conversa
        </a>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-zinc-500 dark:text-zinc-500 text-sm font-mono">
          © {new Date().getFullYear()} Bruno Andrade. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href={portfolioData.social.github} className="text-zinc-600 hover:text-emerald-500 transition-colors">
            <Github size={20} />
          </a>
          <a href={portfolioData.social.linkedin} className="text-zinc-600 hover:text-emerald-500 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${portfolioData.email}`} className="text-zinc-600 hover:text-emerald-500 transition-colors">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-emerald-500 text-white dark:text-zinc-950 shadow-lg hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
    >
      <ArrowUp size={24} />
    </button>
  );
};

const App = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);

    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen font-sans bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-800 dark:selection:text-emerald-100 transition-colors duration-300">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      <Hero />
      <Stats />
      <TechArsenal />
      <Timeline />
      <About />
      <Projects />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;