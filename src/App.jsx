import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  ChevronRight,
  Layout,
  Server,
  ExternalLink,
  Cpu,
  Globe,
  Terminal,
  Award,
  Briefcase,
  Zap,
  Download,
  Quote // Importando ícone de aspas para corrigir o visual
} from 'lucide-react';

// --- CONFIGURAÇÃO DE DADOS ---
const portfolioData = {
  name: "Bruno Andrade",
  roles: [
    "Full Stack Architect",
    "Tech Visionary",
    "System Designer",
    "Creative Developer"
  ],
  bio: "Engenharia de software não é apenas sobre código; é sobre construir o futuro. Transformo complexidade em elegância, criando ecossistemas digitais que definem novos padrões de mercado.",
  email: "contato@brunoandrade.dev",
  experience: [
    { year: "2024 - Presente", role: "Senior Tech Lead", company: "Stark Industries", desc: "Liderando arquitetura de sistemas distribuídos e IA." },
    { year: "2021 - 2023", role: "Full Stack Specialist", company: "Global Tech", desc: "Desenvolvimento de plataformas fintech de alta performance." },
    { year: "2018 - 2021", role: "Frontend Architect", company: "Creative Agency", desc: "Criação de interfaces imersivas premiadas." }
  ],
  skills: [
    // Adicionei a classe de background (bgClass) explicitamente para o Tailwind reconhecer
    { name: "System Architecture", icon: Server, level: 98, color: "text-blue-400", bgClass: "bg-blue-400" },
    { name: "Frontend Engineering", icon: Layout, level: 95, color: "text-cyan-400", bgClass: "bg-cyan-400" },
    { name: "Cloud Native", icon: Globe, level: 90, color: "text-purple-400", bgClass: "bg-purple-400" },
    { name: "AI Integration", icon: Cpu, level: 85, color: "text-emerald-400", bgClass: "bg-emerald-400" }
  ],
  projects: [
    {
      title: "AcompanhaTec",
      category: "Management System",
      description: "Plataforma robusta para gestão institucional e acompanhamento pedagógico. Arquitetura escalável focada em otimização de fluxos administrativos e análise de dados.",
      tech: ["NEXTjs", "Node.js", "System Design"],
      image: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
      stats: "Enterprise Ready",
      link: "https://github.com/DinDja/SIAP"
    },
    {
      title: "RelationSHIP",
      category: "Social Platform",
      description: "Aplicação de encontros moderna com foco em UX/UI. Implementação de algoritmos de matching e interface reativa para conexões sociais fluidas.",
      tech: ["React Native", "Frontend Arch", "UX/UI"],
      image: "linear-gradient(135deg, #3730a3 0%, #7c3aed 100%)",
      stats: "High Engagement"
    },
    {
      title: "Barber Shop Premium",
      category: "E-commerce & SaaS",
      description: "Solução verticalizada para barbearias, integrando venda de planos e agendamentos. Sistema completo de gestão de recorrência e fidelização de clientes.",
      tech: ["React.js", "Payment Gateway", "SaaS"],
      image: "linear-gradient(135deg, #14532d 0%, #064e3b 100%)",
      stats: "Conversion Focus",
      link: "https://github.com/DinDja/Barber-Shop-REACTjs-"
    }
  ],
  testimonials: [
    { name: "Sarah Connor", role: "CTO, Skynet", text: "O código do Bruno não tem bugs, tem features não documentadas de genialidade." },
    { name: "Tony S.", role: "CEO, Stark Ind", text: "Finalmente encontrei alguém que acompanha meu ritmo. O trabalho é impecável." }
  ]
};

// --- COMPONENTES VISUAIS AVANÇADOS ---

// 1. Starfield Background (Otimizado para Mobile)
const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Reduzimos a quantidade de estrelas em telas menores para performance
    const starCount = width < 768 ? 60 : 150;

    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2,
      size: Math.random() * 1.5,
      speed: Math.random() * 0.2 + 0.05
    }));

    let animationFrameId;

    const animate = () => {
      ctx.fillStyle = '#020617'; 
      ctx.fillRect(0, 0, width, height);

      stars.forEach(star => {
        const alpha = Math.min(star.z, 1) * 0.8;
        ctx.fillStyle = `rgba(148, 163, 184, ${alpha})`;
        
        ctx.beginPath();
        const currentSize = Math.max(0.5, star.size * star.z);
        ctx.arc(star.x, star.y, currentSize, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed * (width < 768 ? 0.5 : 1);
        star.z += 0.002;

        if (star.y < 0 || star.z > 2) {
          star.y = height;
          star.x = Math.random() * width;
          star.z = 0.1;
          star.speed = Math.random() * 0.2 + 0.05;
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none" />;
};

// 2. Tilt Card Effect (PERFORMANCE FIX: Manipulação direta do DOM para evitar lag)
const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    // Cálculos geométricos sem re-renderizar o React
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    // Aplica transformações diretamente no estilo do elemento
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1)`;
    
    // Atualiza o efeito de brilho
    if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`;
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-100 ease-out transform-gpu ${className}`}
      style={{ willChange: 'transform' }} // Dica para o navegador otimizar
    >
      {children}
      <div
        ref={glowRef}
        className={`absolute inset-0 pointer-events-none rounded-2xl z-20 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  );
};

// 3. Typewriter Effect
const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(timeout);
  }, []);

  useEffect(() => {
    if (index >= words.length) return;

    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000); 
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="font-mono text-blue-400">
      {words[index].substring(0, subIndex)}
      <span className={`${blink ? 'opacity-100' : 'opacity-0'} transition-opacity inline-block ml-0.5`}>|</span>
    </span>
  );
};

const ScrollProgress = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollTop;
      const heightWin = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = (scrollTotal / heightWin) * 100;
      setWidth(scroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 z-[100]" style={{ width: `${width}%` }} />;
};

// --- SEÇÕES PRINCIPAIS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Expertise', href: '#about' },
    { name: 'Jornada', href: '#timeline' },
    { name: 'Projetos', href: '#projects' },
  ];

  return (
    <>
      <ScrollProgress />
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50 py-4 shadow-lg shadow-blue-900/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="relative group z-50">
            <div className="text-2xl font-black tracking-tighter text-white">
              BA<span className="text-blue-500">.</span>
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-blue-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </a>
            ))}
            <a href="#contact" className="px-5 py-2.5 bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-300 hover:scale-105">
              Hire Me
            </a>
          </div>

          <button className="md:hidden text-white hover:text-blue-400 transition-colors z-50" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-0 left-0 w-full h-screen bg-slate-950/95 backdrop-blur-xl transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-bold text-slate-300 hover:text-blue-400 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="px-8 py-3 bg-blue-600 text-white font-bold rounded shadow-lg shadow-blue-600/20" onClick={() => setIsOpen(false)}>
              CONTACT ME
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[80vw] md:w-[500px] h-[80vw] md:h-[500px] bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[80vw] md:w-[500px] h-[80vw] md:h-[500px] bg-purple-600/10 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-6 z-10 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-blue-500/20 rounded-full bg-blue-500/5 backdrop-blur-md animate-fade-in-down">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
          <span className="text-blue-300 text-xs font-bold tracking-widest uppercase">System Online • v2.5.0</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
          Bruno <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 animate-gradient-x">Andrade</span>
        </h1>

        <div className="text-xl md:text-3xl text-slate-400 mb-10 h-10 font-light">
          I am a <Typewriter words={portfolioData.roles} />
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-12">
          <a href="#projects" className="group relative px-8 py-4 bg-white text-slate-950 font-bold tracking-wider overflow-hidden rounded-sm transition-all hover:scale-105 w-full md:w-auto text-center">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-2 group-hover:text-white transition-colors">
              VER PORTFOLIO <ChevronRight size={18} />
            </div>
          </a>

          <a href="#contact" className="w-full md:w-auto text-center px-8 py-4 bg-transparent border border-slate-700 text-white font-bold tracking-wider hover:bg-slate-800/50 hover:border-slate-500 transition-all rounded-sm flex items-center justify-center gap-3 group">
            <Mail size={18} className="group-hover:text-blue-400 transition-colors" />
            CONTATO
          </a>
        </div>

        {/* Tech Stack Strip */}
        <div className="mt-32 pt-10 border-t border-white/5 w-full max-w-4xl mx-auto flex flex-wrap justify-center gap-6 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
          {['REACT', 'NODE.JS', 'AWS', 'PYTHON', 'DOCKER', 'TS'].map((tech) => (
            <span key={tech} className="text-sm font-bold text-slate-500 font-mono tracking-widest hover:text-blue-400 transition-colors cursor-default">{tech}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 bg-slate-950/80 backdrop-blur-sm relative border-t border-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Code/Terminal Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-20"></div>
            <div className="relative bg-[#0d1117] border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                  <Terminal size={12} /> bruno@server:~
                </div>
              </div>
              <div className="p-6 overflow-x-auto custom-scrollbar">
                <pre className="font-mono text-sm leading-relaxed">
                  <div className="flex"><span className="text-pink-400 mr-2">const</span> <span className="text-blue-400">developer</span> <span className="text-slate-300">=</span> <span className="text-yellow-300">{`{`}</span></div>
                  <div className="flex ml-4"><span className="text-blue-300">name:</span> <span className="text-green-400">"{portfolioData.name}"</span>,</div>
                  <div className="flex ml-4"><span className="text-blue-300">level:</span> <span className="text-purple-400">"Senior"</span>,</div>
                  <div className="flex ml-4"><span className="text-blue-300">traits:</span> <span className="text-yellow-300">[</span></div>
                  <div className="flex ml-8"><span className="text-green-400">"Architect"</span>,</div>
                  <div className="flex ml-8"><span className="text-green-400">"Problem Solver"</span>,</div>
                  <div className="flex ml-8"><span className="text-green-400">"Leader"</span></div>
                  <div className="flex ml-4"><span className="text-yellow-300">]</span>,</div>
                  <div className="flex ml-4"><span className="text-blue-300">execute:</span> <span className="text-pink-400">async function</span>() <span className="text-yellow-300">{`{`}</span></div>
                  <div className="flex ml-8"><span className="text-pink-400">return</span> <span className="text-purple-400">await</span> <span className="text-blue-400">Success</span>.build();</div>
                  <div className="flex ml-4"><span className="text-yellow-300">{'}'}</span></div>
                  <div className="flex"><span className="text-yellow-300">{'}'}</span>;</div>
                </pre>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-blue-400 font-bold tracking-wider uppercase text-sm mb-4">
              <Zap size={16} /> Expertise Técnica
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              Arquitetando o <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Futuro Digital</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8 border-l-2 border-blue-500/30 pl-6">
              {portfolioData.bio}
            </p>

            <div className="space-y-6">
              {portfolioData.skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3 text-white font-medium">
                      <skill.icon size={18} className={skill.color} />
                      {skill.name}
                    </div>
                    <span className="text-xs font-mono text-slate-500">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out group-hover:shadow-[0_0_10px_currentColor] ${skill.bgClass}`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Timeline = () => {
  return (
    <section id="timeline" className="py-32 bg-slate-950/90 backdrop-blur-sm relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Jornada Profissional</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line - Ajustada posição para evitar sobreposição */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>

          {portfolioData.experience.map((item, index) => (
            <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              {/* Dot - Reposicionado para ficar exato na linha em mobile e desktop */}
              <div className="absolute left-[-8px] md:left-1/2 w-4 h-4 bg-slate-950 border-2 border-blue-500 rounded-full md:-translate-x-1/2 z-20 shadow-[0_0_10px_rgba(59,130,246,0.5)] mt-1.5 md:mt-0"></div>

              {/* Content Spacer for Desktop */}
              <div className="hidden md:block w-5/12"></div>

              {/* Card - Adicionado padding-left (pl-8) no mobile para afastar do dot */}
              <div className="w-full md:w-5/12 pl-8 md:pl-0 relative z-10">
                <div className="bg-slate-900/80 border border-white/5 p-6 rounded-lg hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1">
                  <span className="text-blue-400 font-mono text-xs font-bold mb-2 block">{item.year}</span>
                  <h3 className="text-xl font-bold text-white mb-1">{item.role}</h3>
                  <div className="text-slate-400 text-sm font-medium mb-4 flex items-center gap-2">
                    <Briefcase size={14} /> {item.company}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
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

const Projects = () => {
  return (
    <section id="projects" className="py-32 bg-slate-950/80 backdrop-blur-md relative overflow-hidden border-t border-slate-900/50">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-2 block">Portfólio</span>
            <h2 className="text-4xl md:text-6xl font-black text-white">Projetos <br />Selecionados</h2>
          </div>
          <a href="https://github.com/DinDja?tab=repositories" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
            Ver repositório completo <Github size={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, index) => (
            <TiltCard key={index} className="h-full">
              <div className="group h-full bg-slate-900/80 border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 flex flex-col">
                <div
                  className="h-56 w-full relative overflow-hidden p-6 flex flex-col justify-between"
                  style={{ background: project.image }}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500"></div>

                  <div className="relative z-10 flex justify-between items-start">
                    <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded border border-white/10">
                      {project.category}
                    </span>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all">
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  <div className="relative z-10">
                    <span className="text-4xl font-black text-white/20 absolute -bottom-4 -right-4 select-none">0{index + 1}</span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow bg-slate-900/50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold font-mono bg-emerald-400/10 px-2 py-1 rounded">
                      <Award size={12} /> {project.stats}
                    </div>
                  </div>

                  <p className="text-slate-400 mb-8 leading-relaxed text-sm flex-grow">
                    {project.description}
                  </p>

                  <div className="pt-6 border-t border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-[10px] uppercase font-bold text-slate-400 tracking-wider hover:text-white hover:border-slate-600 transition-colors cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-slate-950/90 border-t border-white/5 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-white mb-16">O que dizem os líderes</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {portfolioData.testimonials.map((t, i) => (
            <div key={i} className="bg-gradient-to-br from-slate-900 to-slate-900/50 p-8 rounded-2xl border border-white/5 relative hover:border-blue-500/20 transition-colors">
              <div className="absolute -top-6 -left-4 text-blue-500/20">
                <Quote size={64} fill="currentColor" />
              </div>
              <p className="text-slate-300 italic mb-6 relative z-10 pl-4">{t.text}</p>
              <div className="flex items-center gap-4 pl-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-500 font-bold border border-white/5">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{t.name}</h4>
                  <span className="text-slate-500 text-xs uppercase tracking-wide">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-slate-950/90 relative overflow-hidden border-t border-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-[#0b1221]/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
          {/* Decorative Grid */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>

          <div className="grid md:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-4xl font-black text-white mb-6">Vamos Construir<br />o Impossível?</h2>
              <p className="text-slate-400 mb-10 text-lg">
                Seu projeto merece a melhor engenharia. Estou disponível para consultoria estratégica e desenvolvimento de alto nível.
              </p>

              <div className="space-y-6">
                <a href={`mailto:${portfolioData.email}`} className="flex items-center gap-4 text-slate-300 hover:text-white group transition-colors">
                  <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center group-hover:border-blue-500 transition-colors">
                    <Mail size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 block mb-1">Email</span>
                    <span className="text-lg font-medium">{portfolioData.email}</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-slate-300 hover:text-white group transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center group-hover:border-green-500 transition-colors">
                    <div className="text-green-500">
                        <Download size={20} />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 block mb-1">Currículo</span>
                    <span className="text-lg font-medium">Download CV.pdf</span>
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nome</label>
                  <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition-colors" placeholder="Sr. Stark" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                  <input type="email" className="w-full bg-slate-900/50 border border-slate-700 rounded p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition-colors" placeholder="stark@avengers.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Tipo de Projeto</label>
                <select className="w-full bg-slate-900/50 border border-slate-700 rounded p-4 text-white focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition-colors appearance-none">
                  <option>Web Application</option>
                  <option>System Architecture</option>
                  <option>Consulting</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Mensagem</label>
                <textarea rows="4" className="w-full bg-slate-900/50 border border-slate-700 rounded p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition-colors resize-none" placeholder="Breve descrição do desafio..."></textarea>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all rounded transform active:scale-[0.98]">
                Iniciar Transmissão
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950/90 backdrop-blur-md border-t border-slate-900 py-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black text-white mb-2">BA<span className="text-blue-500">.</span></h2>
            <p className="text-slate-500 text-sm max-w-xs">
              Construindo experiências digitais que transcendem o ordinário.
            </p>
          </div>

          <div className="flex space-x-8">
            <a href="#" className="text-slate-500 hover:text-white transition-colors hover:scale-110 transform duration-200">
              <Github size={24} />
            </a>
            <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors hover:scale-110 transform duration-200">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors hover:scale-110 transform duration-200">
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-slate-600">
          <div>© {new Date().getFullYear()} Bruno Andrade. All rights reserved.</div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            SYSTEM STATUS: OPTIMAL
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- APP PRINCIPAL ---
const App = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-blue-500/30 selection:text-white font-sans overflow-x-hidden">
      <Starfield />
      <Navbar />
      <Hero />
      <Timeline />
      <About />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;