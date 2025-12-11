import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Moon, 
  Sun, 
  Brain, 
  Palette, 
  Download,
  User,
  Briefcase,
  FolderOpen,
  GraduationCap,
  Check,
  Cpu,
  Network,
  LineChart,
  Binary,
  Bot,
  Database,
  Code,
  Terminal,
  Layers,
  FileSpreadsheet,
  Quote,
  ExternalLink
} from 'lucide-react';

// --- DATA & CONTENT CONFIGURATION ---
// EDIT THIS SECTION TO UPDATE YOUR CONTENT
const SITE_DATA = {
  personal: {
    name: "Youssef Mejri",
    title: {
      en: "Computer Science Student & AI Enthusiast",
      fr: "Étudiant en Informatique & Passionné d'IA",
      ar: "طالب علوم الكمبيوتر وشغوف بالذكاء الاصطناعي"
    },
    roles: [
        "CS Student",
        "AI Enthusiast",
        "ML Practitioner",
        "Data Science Student",
        "Problem Solver"
    ],
    location: "Tunisia (Mahdia / Tunis / Online)",
    email: "youssef.mejri.cs@gmail.com",
    phone: "(+216) 50 453 818",
    social: {
      linkedin: "https://www.linkedin.com/in/youssef-mejri-cs/",
      github: "https://github.com/YoussefMejriCs"
    },
    resumeUrl: "/resume.pdf",
    profileUrl: "/profile.jpg" // Place your image named 'profile.jpg' in the public folder
  },
  nav: {
    about: { en: "About", fr: "À propos", ar: "حول" },
    resume: { en: "Resume", fr: "CV", ar: "سيرة ذاتية" },
    projects: { en: "Projects", fr: "Projets", ar: "مشاريع" },
    contact: { en: "Contact", fr: "Contact", ar: "اتصل" },
    download: { en: "Download CV", fr: "Télécharger CV", ar: "تحميل السيرة الذاتية" }
  },
  about: {
    heading: { en: "Hello, I'm Youssef", fr: "Salut, je suis Youssef", ar: "مرحبًا، أنا يوسف" },
    bio: {
      en: <>
        I am a <span className="text-teal-600 dark:text-teal-400 font-bold">Computer Science Student</span> driven by a relentless curiosity for <span className="text-teal-600 dark:text-teal-400 font-bold">AI</span>, <span className="text-teal-600 dark:text-teal-400 font-bold">Machine Learning</span>, and <span className="text-teal-600 dark:text-teal-400 font-bold">Data Science</span>. I pride myself on having strong <span className="text-gray-800 dark:text-gray-100 font-semibold">self-discipline</span> and effective <span className="text-gray-800 dark:text-gray-100 font-semibold">problem-solving skills</span>. Every day is an opportunity to learn, build, and improve in this ever-evolving field.
      </>,
      fr: <>
        Je suis un <span className="text-teal-600 dark:text-teal-400 font-bold">étudiant en informatique</span> animé par une curiosité incessante pour <span className="text-teal-600 dark:text-teal-400 font-bold">l'IA</span>, le <span className="text-teal-600 dark:text-teal-400 font-bold">Machine Learning</span> et la <span className="text-teal-600 dark:text-teal-400 font-bold">Data Science</span>. Je suis fier de ma <span className="text-gray-800 dark:text-gray-100 font-semibold">grande autodiscipline</span> et de mes <span className="text-gray-800 dark:text-gray-100 font-semibold">compétences efficaces en résolution de problèmes</span>. Chaque jour est une opportunité d'apprendre, de construire et de s'améliorer dans ce domaine en constante évolution.
      </>,
      ar: <>
        أنا <span className="text-teal-600 dark:text-teal-400 font-bold">طالب علوم كمبيوتر</span> يقودني فضول لا هوادة فيه تجاه <span className="text-teal-600 dark:text-teal-400 font-bold">الذكاء الاصطناعي</span>، و<span className="text-teal-600 dark:text-teal-400 font-bold">تعلم الآلة</span>، و<span className="text-teal-600 dark:text-teal-400 font-bold">علم البيانات</span>. أفتخر بامتلاكي <span className="text-gray-800 dark:text-gray-100 font-semibold">انضباط ذاتي قوي</span> و<span className="text-gray-800 dark:text-gray-100 font-semibold">مهارات فعالة في حل المشكلات</span>. كل يوم هو فرصة للتعلم والبناء والتحسين في هذا المجال دائم التطور.
      </>
    },
    // Updated Stats to reflect 7 projects
    stats: [
      { label: { en: "Projects", fr: "Projets", ar: "مشاريع" }, value: "7" },
      { label: { en: "Certifications", fr: "Certificats", ar: "شهادات" }, value: "1" }
    ],
    quote: {
      en: { text: "The goal is to turn data into information, and information into insight.", author: "Carly Fiorina" },
      fr: { text: "Le but est de transformer les données en informations, et les informations en connaissances.", author: "Carly Fiorina" },
      ar: { text: "الهدف هو تحويل البيانات إلى معلومات، والمعلومات إلى رؤية.", author: "كارلي فيورينا" }
    }
  },
  resume: {
    educationTitle: { en: "Education", fr: "Éducation", ar: "التعليم" },
    experienceTitle: { en: "Volunteering & Internships", fr: "Bénévolat et Stages", ar: "تطوع وتدريب" },
    skillsTitle: { en: "Skills", fr: "Compétences", ar: "المهارات" },
    education: [
      {
        year: "2023 - Present",
        degree: { en: "Computer Science", fr: "Informatique", ar: "علوم الكمبيوتر" },
        school: { en: "Higher Institute of Computer Science Mahdia", fr: "Institut Supérieur d'Informatique Mahdia", ar: "المعهد العالي للإعلامية بالمهدية" }
      }
    ],
    experience: [
      {
        year: "2024",
        role: "Web Developer (React.js)",
        company: "Bmerce",
        desc: {
          en: "Developed and improved user interfaces for web applications using JavaScript and React.js.",
          fr: "Développement et amélioration des interfaces utilisateur pour les applications web en utilisant JavaScript et React.js.",
          ar: "تطوير وتحسين واجهات المستخدم لتطبيقات الويب باستخدام JavaScript و React.js."
        }
      },
      {
        year: "2024",
        role: "Organization Dept Member",
        company: "Microsoft ISIMa Club",
        desc: {
          en: "Managed events focused on AI, Data Science, and Soft Skills.",
          fr: "Gestion d'événements axés sur l'IA, la science des données et les compétences générales.",
          ar: "إدارة الفعاليات التي تركز على الذكاء الاصطناعي وعلم البيانات والمهارات الشخصية."
        }
      }
    ],
    skills: [
      { name: "ML Basics (Scikit-Learn)", icon: Brain, level: 80 },
      { name: "Data Cleaning (Pandas)", icon: FileSpreadsheet, level: 85 },
      { name: "Data Visualization", icon: LineChart, level: 75 },
      { name: "React.js", icon: Code, level: 85 },
      { name: "UI/UX (Figma)", icon: Palette, level: 70 }
    ]
  },
  projects: {
    list: [
      {
        title: "Video Game Sales Predictor",
        category: "Advanced Machine Learning",
        desc: {
          en: "Developed a predictive model to forecast video game sales based on genre, platform, and critic scores. Demonstrates advanced regression and feature engineering techniques.",
          fr: "Développement d'un modèle prédictif pour les ventes de jeux vidéo basé sur le genre et les notes des critiques. Démontre des techniques avancées de régression.",
          ar: "تطوير نموذج تنبؤي لمبيعات ألعاب الفيديو بناءً على النوع والمنصة وتقييمات النقاد. يعرض تقنيات انحدار متقدمة."
        },
        tags: ["ML", "Regression", "Feature Engineering", "Python"],
        links: {
            demo: "https://video-game-sales-predictor.streamlit.app/",
            repo: "https://github.com/YoussefMejriCs/video-game-sales-predictor"
        }
      },
      {
        title: "Global Wealth Report Analysis",
        category: "Data Analysis & Visualization",
        desc: {
          en: "Comprehensive analysis and visualization of global billionaire data (The Global Wealth Report). Exploring trends, sectors, and geographical distribution of extreme wealth.",
          fr: "Analyse et visualisation complètes des données sur les milliardaires mondiaux (Global Wealth Report). Exploration des tendances géographiques et sectorielles.",
          ar: "تحليل وتصور شامل لبيانات المليارديرات العالمية (تقرير الثروة العالمية). استكشاف الاتجاهات والقطاعات والتوزيع الجغرافي للثروات."
        },
        tags: ["Data Mining", "Plotly", "Pandas", "Streamlit"],
        links: {
            demo: "https://billionaires-analysis.streamlit.app/",
            repo: "https://github.com/YoussefMejriCs/billionaires-analysis"
        }
      },
      {
        title: "Iris Classification Advanced",
        category: "Machine Learning",
        desc: {
          en: "Advanced classification of Iris flower species using ML algorithms. Interactive dashboard to visualize features and prediction results.",
          fr: "Classification avancée des espèces de fleurs d'Iris à l'aide d'algorithmes de ML. Tableau de bord interactif لتصور les données.",
          ar: "تصنيف متقدم لأنواع زهرة السوسن باستخدام خوارزميات التعلم الآلي. لوحة تحكم تفاعلية لتصور البيانات ونتائج التنبؤ."
        },
        tags: ["Streamlit", "Scikit-learn", "Python"],
        links: {
            demo: "https://iris-classifier-advanced.streamlit.app/",
            repo: "https://github.com/YoussefMejriCs/iris-classifier-advanced"
        }
      },
      {
        title: "House Price Prediction",
        category: "Machine Learning",
        desc: {
          en: "Interactive app that predicts real estate prices based on features like area and location. Powered by a trained ML model.",
          fr: "Application interactive qui prédit les prix de l'immobilier en fonction de critères. Propulsée par un modèle de ML entraîné.",
          ar: "تطبيق تفاعلي يتنبأ بأسعار العقارات بناءً على ميزات مثل المساحة والموقع. مدعوم بنموذج تعلم آلي مدرب."
        },
        tags: ["Streamlit", "Scikit-learn", "Python"],
        links: {
            demo: "https://houseprice-application.streamlit.app/",
            repo: "https://github.com/YoussefMejriCs/housePrice-app"
        }
      },
      {
        title: "Titanic Survival Prediction",
        category: "ML & Data Science",
        desc: {
          en: "Interactive Streamlit app for survival prediction using Scikit-learn. Explore the dataset and test the model live.",
          fr: "Application Streamlit interactive pour la prédiction de survie. Explorez le jeu de données et testez le modèle en direct.",
          ar: "تطبيق Streamlit تفاعلي للتنبؤ بالبقاء على قيد الحياة. استكشف البيانات واختبر النموذج مباشرة."
        },
        tags: ["Streamlit", "Scikit-learn", "Python"],
        links: {
            demo: "https://titanic-app-analyse.streamlit.app/",
            repo: "https://github.com/YoussefMejriCs/titanic-app"
        }
      },
      {
        title: "Goutina",
        category: "UI/UX Design",
        desc: {
          en: "Mobile app prototype for a food delivery service designed with Figma.",
          fr: "Prototype d'application mobile pour un service de livraison de nourriture conçu avec Figma.",
          ar: "نموذج أولي لتطبيق جوال لخدمة توصيل الطعام تم تصميمه باستخدام Figma."
        },
        tags: ["Figma", "UI/UX", "Mobile"]
      },
      {
        title: "NMS Social Network",
        category: "Product Design",
        desc: {
          en: "Anti-exploitation platform allowing users to share stories and rate companies.",
          fr: "Plateforme anti-exploitation permettant aux utilisateurs de partager des histoires et d'évaluer les entreprises.",
          ar: "منصة لمكافحة الاستغلال تتيح للمستخدمين مشاركة القصص وتقييم الشركات."
        },
        tags: ["Figma", "Social Media", "Prototyping"]
      }
    ]
  },
  languages: [
    { name: { en: "Arabic", fr: "Arabe", ar: "العربية" }, level: "Native" },
    { name: { en: "English", fr: "Anglais", ar: "الإنجليزية" }, level: "C1/Advanced" },
    { name: { en: "French", fr: "Français", ar: "الفرنسية" }, level: "B1/Intermediate" }
  ]
};

// --- COMPONENTS ---

const SkillBar = ({ name, level, icon: Icon }) => (
  <div className="mb-4 group">
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <Icon size={16} className="text-teal-500" />
        {name}
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">{level}%</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
      <div 
        className="bg-teal-500 h-2.5 rounded-full transition-all duration-1000 ease-out group-hover:bg-teal-400" 
        style={{ width: `${level}%` }}
      ></div>
    </div>
  </div>
);

const ProjectCard = ({ title, category, desc, tags, links }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 flex flex-col h-full group">
    <div className="flex justify-between items-start mb-4">
      <div>
        <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">{category}</span>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 group-hover:text-teal-500 transition-colors">{title}</h3>
      </div>
      <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-full">
        <FolderOpen size={18} className="text-gray-600 dark:text-gray-300" />
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow leading-relaxed">
      {desc}
    </p>
    
    {/* Buttons Section for Projects with Links */}
    {links && (
        <div className="flex flex-wrap gap-3 mb-6">
            {links.demo && (
                <a href={links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 px-4 py-2 rounded-full transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transform hover:-translate-y-0.5">
                    <ExternalLink size={14} /> Live Demo
                </a>
            )}
            {links.repo && (
                <a href={links.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-full transition-colors border border-gray-200 dark:border-gray-600">
                    <Github size={14} /> Code
                </a>
            )}
        </div>
    )}

    <div className="flex flex-wrap gap-2 mt-auto">
      {tags.map((tag, i) => (
        <span key={i} className="px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300 text-xs rounded-full font-medium">
          #{tag}
        </span>
      ))}
    </div>
  </div>
);

const TimelineItem = ({ year, title, subtitle, desc }) => (
  <div className="relative pl-8 pb-8 border-l-2 border-gray-200 dark:border-gray-700 last:pb-0 last:border-0">
    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-500 ring-4 ring-white dark:ring-gray-900"></div>
    <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-1 block">{year}</span>
    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h4>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{subtitle}</p>
    {desc && <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>}
  </div>
);

// --- MAIN APP ---

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('about');
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('en'); // 'en', 'fr', 'ar'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Handle Page Title
  useEffect(() => {
    document.title = "Youssef Mejri | AI & Data Science Portfolio";
  }, []);

  // Handle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle Role Rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % SITE_DATA.personal.roles.length);
    }, 3000); // Change role every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Handle Text Direction
  const isRTL = lang === 'ar';
  
  const toggleTheme = () => setDarkMode(!darkMode);
  const changeLang = (l) => setLang(l);

  // Copy to clipboard function
  const handleCopy = (text, field) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
    document.body.removeChild(textArea);
  };

  const navItems = [
    { id: 'about', label: SITE_DATA.nav.about[lang], icon: User },
    { id: 'resume', label: SITE_DATA.nav.resume[lang], icon: Briefcase },
    { id: 'projects', label: SITE_DATA.nav.projects[lang], icon: FolderOpen },
    { id: 'contact', label: SITE_DATA.nav.contact[lang], icon: Mail },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* --- TOP BAR (Mobile & Desktop Controls) --- */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <div className="font-bold text-xl tracking-tight flex items-center gap-2">
          {/* JUST TEXT, NO IMAGE */}
          <span className="hidden sm:inline">Youssef.</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Download CV (Replaces Menu) */}
          <a 
            href={SITE_DATA.personal.resumeUrl}
            download
            className="md:hidden p-2 text-teal-600 dark:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            title={SITE_DATA.nav.download[lang]}
          >
            <Download size={20} />
          </a>

          {/* Language Switcher */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {['en', 'fr', 'ar'].map((l) => (
              <button
                key={l}
                onClick={() => changeLang(l)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${lang === l ? 'bg-white dark:bg-gray-700 shadow-sm text-teal-600 dark:text-teal-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="pt-20 pb-0 md:pb-6 px-4 md:px-8 h-screen flex flex-col md:flex-row gap-6 max-w-7xl mx-auto overflow-hidden">
        
        {/* --- SIDEBAR / NAVIGATION (Desktop) --- */}
        <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden shrink-0 h-[calc(100vh-7rem)]">
          <div className="p-8 text-center border-b border-gray-100 dark:border-gray-700 bg-gradient-to-b from-teal-50/50 to-transparent dark:from-teal-900/10">
            {/* DESKTOP SIDEBAR IMAGE (Restored) */}
            <div className="w-24 h-24 mx-auto bg-white dark:bg-gray-700 rounded-full mb-4 overflow-hidden border-4 border-white dark:border-gray-600 shadow-lg flex items-center justify-center">
               <img 
                 src={SITE_DATA.personal.profileUrl} 
                 alt="Youssef"
                 className="w-full h-full object-cover"
                 onError={(e) => {
                   e.target.onerror = null; 
                   e.target.style.display = 'none';
                   e.target.parentElement.innerHTML = '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
                 }}
               />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">{SITE_DATA.personal.name}</h2>
            {/* DYNAMIC ROLE TEXT */}
            <p className="text-xs text-teal-600 dark:text-teal-400 mt-2 uppercase tracking-wide font-semibold min-h-[1.5em] transition-opacity duration-300">
                {SITE_DATA.personal.roles[roleIndex]}
            </p>
          </div>
          
          <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                  activeTab === item.id 
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="px-4 pb-2">
             <a 
                href={SITE_DATA.personal.resumeUrl}
                download
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-teal-50 dark:hover:bg-teal-900/20 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition-all text-sm font-semibold"
             >
                <Download size={16} />
                {SITE_DATA.nav.download[lang]}
             </a>
          </div>

          <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-center gap-4 text-gray-400">
            <a href={SITE_DATA.personal.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-500 transition-colors"><Linkedin size={20} /></a>
            <a href={SITE_DATA.personal.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-teal-500 transition-colors"><Github size={20} /></a>
            <a href={`mailto:${SITE_DATA.personal.email}`} className="hover:text-teal-500 transition-colors"><Mail size={20} /></a>
          </div>
        </aside>

        {/* --- BOTTOM NAVIGATION (Mobile Only) --- */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 px-6 py-3 flex justify-between items-center safe-area-bottom shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === item.id 
                  ? 'text-teal-500' 
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-grow bg-white dark:bg-gray-800 rounded-t-3xl md:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden relative h-[calc(100vh-5rem)] md:h-[calc(100vh-7rem)]">
          {/* Increased pb-32 for mobile to clear bottom nav comfortably */}
          <div className="h-full overflow-y-auto p-6 md:p-10 scrollbar-hide pb-32 md:pb-10">
            
            {/* --- ABOUT TAB --- */}
            {activeTab === 'about' && (
              <div className="animate-fadeIn min-h-full flex flex-col items-center justify-center relative overflow-hidden text-center py-12 md:py-0">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(#38b2ac_1px,transparent_1px)] [background-size:20px_20px]"></div>
                </div>

                {/* Content */}
                <div className="max-w-4xl relative z-10 px-6">
                  {/* Name / Heading */}
                  <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                    {SITE_DATA.about.heading[lang]} <span className="text-teal-500">.</span>
                  </h1>
                  
                  {/* Bio */}
                  <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto font-light">
                    {SITE_DATA.about.bio[lang]}
                  </p>

                  {/* Quote - Vertical Stack for Better Mobile Display */}
                  <div className="inline-flex flex-col items-center gap-3 mt-4 px-8 py-6 bg-teal-50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-800/30 rounded-2xl max-w-lg mx-auto">
                        <Quote size={24} className="text-teal-500 mb-1" />
                        <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300 italic leading-relaxed">
                          "{SITE_DATA.about.quote[lang].text}"
                        </p>
                        <div className="w-10 h-1 bg-teal-500/20 rounded-full my-1"></div>
                        <p className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                          {SITE_DATA.about.quote[lang].author}
                        </p>
                  </div>
                </div>
              </div>
            )}

            {/* --- RESUME TAB --- */}
            {activeTab === 'resume' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fadeIn min-h-full">
                
                {/* Left Column: Education & Experience */}
                <div className="space-y-10">
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg text-teal-600 dark:text-teal-400">
                        <Briefcase size={20} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{SITE_DATA.resume.experienceTitle[lang]}</h2>
                    </div>
                    <div className="space-y-6">
                      {SITE_DATA.resume.experience.map((job, i) => (
                        <TimelineItem 
                          key={i}
                          year={job.year}
                          title={job.role}
                          subtitle={job.company}
                          desc={job.desc[lang]}
                        />
                      ))}
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg text-teal-600 dark:text-teal-400">
                        <GraduationCap size={20} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{SITE_DATA.resume.educationTitle[lang]}</h2>
                    </div>
                    <div className="space-y-6">
                      {SITE_DATA.resume.education.map((edu, i) => (
                        <TimelineItem 
                          key={i}
                          year={edu.year}
                          title={edu.degree[lang]}
                          subtitle={edu.school[lang]}
                        />
                      ))}
                    </div>
                  </section>
                </div>

                {/* Right Column: Skills & Languages */}
                <div className="space-y-10">
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg text-teal-600 dark:text-teal-400">
                        <Brain size={20} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{SITE_DATA.resume.skillsTitle[lang]}</h2>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                      {SITE_DATA.resume.skills.map((skill, i) => (
                        <SkillBar key={i} {...skill} />
                      ))}
                    </div>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Languages</h3>
                    <div className="flex flex-wrap gap-3">
                      {SITE_DATA.languages.map((langItem, i) => (
                        <div key={i} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{langItem.name[lang]}</span>
                          <span className="text-sm text-teal-500 ml-2">({langItem.level})</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

              </div>
            )}

            {/* --- PROJECTS TAB --- */}
            {activeTab === 'projects' && (
              <div className="animate-fadeIn min-h-full">
                <div className="flex justify-between items-end mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                     {SITE_DATA.nav.projects[lang]}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {SITE_DATA.projects.list.map((project, i) => (
                    <ProjectCard 
                      key={i}
                      title={project.title}
                      category={project.category}
                      desc={project.desc[lang]}
                      tags={project.tags}
                      links={project.links}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* --- CONTACT TAB --- */}
            {activeTab === 'contact' && (
              <div className="animate-fadeIn max-w-4xl mx-auto py-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">{SITE_DATA.nav.contact[lang]}</h2>
                
                {/* Compact Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Email */}
                  <button 
                    onClick={() => handleCopy(SITE_DATA.personal.email, 'email')}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-700/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all text-left group relative"
                  >
                    <div className="p-3 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full group-hover:scale-110 transition-transform shrink-0">
                      <Mail size={20} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</h3>
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{SITE_DATA.personal.email}</p>
                    </div>
                    {copiedField === 'email' && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-teal-500 bg-teal-50 dark:bg-teal-900/50 px-2 py-1 rounded-md animate-fadeIn">
                           <Check size={14} />
                           <span className="text-xs font-bold">Copied</span>
                        </div>
                    )}
                  </button>

                  {/* Phone */}
                  <button 
                    onClick={() => handleCopy(SITE_DATA.personal.phone, 'phone')}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-700/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all text-left group relative"
                  >
                    <div className="p-3 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full group-hover:scale-110 transition-transform shrink-0">
                      <Phone size={20} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Phone</h3>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{SITE_DATA.personal.phone}</p>
                    </div>
                    {copiedField === 'phone' && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-teal-500 bg-teal-50 dark:bg-teal-900/50 px-2 py-1 rounded-md animate-fadeIn">
                           <Check size={14} />
                           <span className="text-xs font-bold">Copied</span>
                        </div>
                    )}
                  </button>

                  {/* Location */}
                  <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-700/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="p-3 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Location</h3>
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{SITE_DATA.personal.location}</p>
                    </div>
                  </div>

                  {/* Social Links (Integrated) */}
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Social</h3>
                    <div className="flex gap-3">
                        <a href={SITE_DATA.personal.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 dark:bg-gray-600 rounded-full hover:bg-teal-500 hover:text-white transition-colors">
                            <Linkedin size={20} />
                        </a>
                        <a href={SITE_DATA.personal.social.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 dark:bg-gray-600 rounded-full hover:bg-teal-500 hover:text-white transition-colors">
                            <Github size={20} />
                        </a>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        /* Custom scrollbar for content area */
        .scrollbar-hide::-webkit-scrollbar {
            width: 8px;
        }
        .scrollbar-hide::-webkit-scrollbar-track {
            background: transparent;
        }
        .scrollbar-hide::-webkit-scrollbar-thumb {
            background-color: rgba(156, 163, 175, 0.3);
            border-radius: 20px;
        }
        .dark .scrollbar-hide::-webkit-scrollbar-thumb {
            background-color: rgba(75, 85, 99, 0.5);
        }
      `}</style>
    </div>
  );
}