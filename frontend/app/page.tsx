"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { Home as HomeIcon, Briefcase, GraduationCap, FolderGit2, ExternalLink, Mail } from "lucide-react";

const summary =
  "I am an AI and Cloud Infrastructure Engineer with 4+ years of experience bridging ML Engineering, MLOps, and SRE. Building and deploying production-grade ML systems on AWS. Proven impact: cut federal compliance check time by 90% via Agentic AI pipelines, achieved 92% anomaly detection precision, maintained 99.99% availability for provider-level hybrid cloud and reduced MTTR by 25% across multi-cloud IaaS. Uniquely positioned at the intersection of AI/ML engineering and cloud reliability.";

const experience = [
  {
    role: "AI and Cloud Infrastructure Engineer",
    company: "Eleftheria Capital, Atlanta, GA",
    companyUrl: "https://elefcap.com",
    duration: "Jan 2026 - Present",
    description:
      "",
      bullets: [
        "Designed a low-latency options trading infrastructure using Terraform, Docker, and Kubernetes for zero-downtime execution in AWS.",
        "Engineered an end-to-end ML- driven trading strategy and sentiment analysis pipeline, deployed to AWS.",
        "Developed Python and Bash automation scripts for data ingestion and service releases to run strategy logic",
        "Maintaining optimal infrastructure health via Linux administration, performance tuning, and Prometheus/Grafana observability pipelines.",
        "Maintaining reliable CI/CD pipelines using GitHub Actions for seamless IaC updates and service rollouts.",
      ],

  },
  {
    role: "Machine Learning Engineer and Teaching Assistant",
    company: "University of Maryland, College Park, MD",
    companyUrl: "https://it.umd.edu/",
    duration: "Feb 2024 - Dec 2025",
    description:
      "",
      bullets: [
        "Engineered an automated research proposal review pipeline using Agentic AI, RAG, and OCR (AWS Textract, Bedrock), reducing federal compliance check time by 90% and mitigating the risk of funding cancellations.",
        "Built a production-grade NLP translation pipeline, achieving 97% accuracy to enhance cross-lingual research.",
        "Delivered proactive GCP cloud support eliminating critical system downtime for stakeholders.",
        "Evaluated the use of cutting edge AI tools and frameworks to enhance research funding opportunity discovery and compliance processes.",
        "As a TA, I directed technical training for 60+ engineers on Docker and Kubernetes orchestration.",
        ],
  },
  {
    role: "Site Reliability Engineer",
    company: "SysEleven GmBH, Berlin, Germany",
    companyUrl: "https://www.syseleven.de/en/",
    duration: "Jul 2021 - Dec 2023",
    description:
      "",
      bullets: [
        "Maintained a hybrid multi-cloud IaaS (OpenStack, AWS S3) using Ansible and Terraform, ensuring 99.99% availability for enterprise tenants; configured and managed Linux-based KVM/QEMU hypervisors.",
        "Provisioned and maintained bare-metal servers with OS installations, OpenStack configurations (Nova, Cinder, Neutron), system patching, OS upgrades, and capacity planning.",
        "Pioneered the company’s first ML initiative: designed an end-to-end automated anomaly detection system for platform logs achieving 92% precision over baseline methods.",
        "Expanded provider-level observability via Prometheus queries and Grafana dashboards/alerts; tracked SLIs/SLOs, reducing MTTR by 25%.",
        "Troubleshooting platform-level network connectivity and DNS failures across tenant environments using standard Linux diagnostic tools.",
        "Participated in on-call rotations and blameless post-mortems; wrote Python/Bash automation for operational tooling and maintained platform-wide CI/CD pipelines to reduce toil."
      ],
  },
];

const education = [
  {
    degree: "Master of Engineering in Cloud Engineering",
    school: "University of Maryland, College Park",
    year: "2024 - 2025",
  },
  {
    degree: "Master of Science in Data and Knowledge Engineering(Applied ML)",
    school: "Otto Von Guericke University, Magdeburg, Germany",
    year: "2019 - 2023",
  },
  {
    degree: "Bachelor of Engineering in Computer Science and Engineering",
    school: "Dr. Ambedkar Institute of Technology, India",
    year: "2013 - 2017",
  },
];

const projects = [
  {
    title: "Ecommerce Application And Deployment Using AWS",
    description:
      "Ecommerce application built and deployed on AWS for scalable hosting and storage.",
    github: "https://github.com/deeksha-2825/ecommerce-application.git",
  },
  {
    title: "Clinical Decision Support System Of Cervical Intraepithelial Neoplasia Using Machine Learning",
    description:
      "Machine Learning model built to detect Cervical Intraepithelial Neoplasia (CIN).",
    github: "https://github.com/deeksha-2825/A-clinical-decision-support-system-of-cervical-intraepithelial-neoplasia-clinic-diagnosis.git",
  },
  {
    title: "Doctor Appointment Booking System Deployment Using Kubernetes",
    description:
      "An application for booking doctor appointments deployed using Kubernetes.",
    github: "https://github.com/deeksha-2825/doctor-office-application.git",
  },
  {
    title: "Opentelemetry Application using Docker and Kubernetes",
    description:
      "Opentelemetry application deployed using Docker and Kubernetes for monitoring and observability.",
    github: "https://github.com/deeksha-2825/opentelemetry-kubernetes.git",
  },
  {
    title: "Other Projects",
    description:
      "For other projects, please visit my GitHub profile.",
    github: "https://github.com/deeksha-2825",
  },
];

const TABS = ["home", "experience", "education", "projects"] as const;
type TabId = typeof TABS[number];

// Reusable scroll reveal animation component
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (currentRef) observer.unobserve(currentRef); // Stop observing once visible
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep track of section elements
  const sectionRefs = useRef<Record<TabId, HTMLElement | null>>({
    home: null,
    experience: null,
    education: null,
    projects: null,
  });

  // Smooth scroll to a section on click
  const scrollToSection = (id: TabId) => {
    setActiveTab(id);
    const element = sectionRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Setup intersection observer to track which section is currently active while scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Filter elements that are currently intersecting
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // If multiple are visible, pick the first one
          const id = visibleEntries[0].target.getAttribute("id") as TabId;
          if (id && TABS.includes(id)) {
            setActiveTab(id);
          }
        }
      },
      {
        root: containerRef.current,
        // Require the top of the element to reach the top 30% of the viewport to trigger, 
        // and detach before it leaves the bottom 60%.
        rootMargin: "-30% 0px -60% 0px", 
        threshold: 0,
      }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const NavButton = ({ id, icon: Icon, label }: { id: TabId, icon: any, label: string }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`group relative flex w-full items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-500 ease-out ${
        activeTab === id
          ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
          : "text-white/50 hover:bg-white/5 hover:text-white/90"
      }`}
    >
      {activeTab === id && (
         <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
      )}
      <Icon className={`h-5 w-5 transition-transform duration-500 ${activeTab === id ? "scale-110 text-cyan-300" : "group-hover:scale-110"}`} />
      <span className="text-sm font-medium tracking-wide">{label}</span>
    </button>
  );

  return (
    <main className="relative h-screen max-h-screen overflow-hidden bg-[#050816] text-white flex flex-col lg:flex-row">
      {/* Background ambient animations */}
      <div className="portfolio-grid absolute inset-0 opacity-20 pointer-events-none" />
      <div className="portfolio-glow portfolio-glow-a pointer-events-none" />
      <div className="portfolio-glow portfolio-glow-b pointer-events-none" />
      <div className="portfolio-glow portfolio-glow-c pointer-events-none" />

      {/* Cinematic Sidebar (Fixed) */}
      <aside className="relative z-30 w-full border-b border-white/5 bg-black/40 backdrop-blur-2xl lg:w-80 lg:border-b-0 lg:border-r lg:h-screen flex flex-col justify-between p-8 xl:p-10 shadow-[20px_0_40px_rgba(0,0,0,0.4)] shrink-0">
        <div>
           {/* Sidebar Brand / Identity */}
           <div className="mb-12 animate-in slide-in-from-left-8 duration-700 fade-in">
             <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_24px_rgba(34,211,238,0.4)] mb-6">
                <span className="text-xl font-bold text-white tracking-widest">DR</span>
             </div>
             <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Deeksha<br/>Ramakrishna</h1>
             <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/60 font-semibold mb-6">AI and Cloud Infrastructure Engineer</p>
             <a 
               href="/resume.pdf" 
               target="_blank" 
               rel="noreferrer" 
               className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-semibold tracking-wide text-white transition-all hover:bg-white/10 hover:text-cyan-300 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] w-fit"
             >
               View Resume
             </a>
           </div>

           {/* Navigation */}
           <nav className="flex flex-col gap-2 animate-in slide-in-from-left-8 duration-700 delay-150 fade-in fill-mode-both">
              <NavButton id="home" icon={HomeIcon} label="Home" />
              <NavButton id="experience" icon={Briefcase} label="Experience" />
              <NavButton id="education" icon={GraduationCap} label="Education" />
              <NavButton id="projects" icon={FolderGit2} label="Projects" />
           </nav>
        </div>

        <div className="hidden lg:block animate-in slide-in-from-left-8 duration-700 delay-300 fade-in fill-mode-both">
           <p className="text-xs text-white/30">© 2026 Deeksha Ramakrishna</p>
        </div>
      </aside>

      {/* Main Content Area (Scrollable container) */}
      <div 
        ref={containerRef}
        className="relative z-20 flex-1 w-full h-full overflow-y-auto scroll-smooth"
      >
         <div className="mx-auto max-w-4xl px-6 sm:px-12 lg:px-16 flex flex-col gap-y-32 py-24 pb-48">
        
          {/* HOME SECTION */}
          <section 
            id="home" 
            ref={el => { sectionRefs.current.home = el; }} 
            className="flex flex-col justify-center gap-8 min-h-[60vh] scroll-mt-24 py-12"
          >
            <Reveal delay={100}>
              <div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300 backdrop-blur-md w-fit shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                 <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
                 </span>
                 Available for opportunities
              </div>
            </Reveal>
            <Reveal delay={200}>
              <h2 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
                Scalling <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Intelligence,</span> <br/>Engineering Reliability.
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="max-w-2xl text-lg leading-relaxed text-white/60 font-light">
                {summary}
              </p>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                 <button 
                   onClick={() => scrollToSection("experience")}
                   className="rounded-full bg-white text-black px-8 py-4 text-sm font-semibold tracking-wide hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                 >
                   View My Background
                 </button>
                 <div className="flex items-center gap-4">
                   <a 
                     href="https://github.com/deeksha-2825" 
                     target="_blank" 
                     rel="noreferrer" 
                     className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:text-cyan-300 hover:border-cyan-500/30 transition-all text-white/70 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                     title="https://github.com/deeksha-2825"
                   >
                     <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                   </a>
                   <a 
                     href="https://linkedin.com/in/deeksha-ramakrishna" 
                     target="_blank" 
                     rel="noreferrer" 
                     className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:text-cyan-300 hover:border-cyan-500/30 transition-all text-white/70 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                     title="https://linkedin.com/in/deeksha-ramakrishna"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                   </a>
                   <a 
                     href="https://mail.google.com/mail/?view=cm&fs=1&to=deeksharamakrishna6@gmail.com" 
                     target="_blank"
                     rel="noreferrer"
                     className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:text-fuchsia-300 hover:border-fuchsia-500/30 transition-all text-white/70 hover:scale-110 hover:shadow-[0_0_15px_rgba(217,70,239,0.2)]"
                     title="deeksharamakrishna6@gmail.com"
                   >
                     <Mail className="w-5 h-5" />
                   </a>
                 </div>
              </div>
            </Reveal>
          </section>

          {/* EXPERIENCE SECTION */}
          <section 
            id="experience" 
            ref={el => { sectionRefs.current.experience = el; }} 
            className="flex flex-col gap-6 scroll-mt-24"
          >
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
                 <Briefcase className="h-8 w-8 text-cyan-400" /> Experience
              </h2>
            </Reveal>
            {experience.map((item, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <article
                  className="portfolio-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:bg-white/[0.07] transition-colors duration-500"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.08),transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex flex-col justify-between sm:flex-row sm:items-start gap-4 border-b border-white/5 pb-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-white tracking-tight">{item.role}</h3>
                      {/* @ts-ignore */}
                      {(item as any).companyUrl ? (
                        <a href={(item as any).companyUrl} target="_blank" rel="noopener noreferrer" className="mt-2 text-sm font-medium uppercase tracking-widest text-cyan-300/80 hover:text-cyan-100 hover:underline transition-all inline-flex items-center gap-1 group/link w-fit">
                          {item.company}
                          <ExternalLink className="h-3 w-3 opacity-50 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <p className="mt-2 text-sm font-medium uppercase tracking-widest text-cyan-300/80">{item.company}</p>
                      )}
                    </div>
                    <span className="shrink-0 rounded-full border border-white/10 bg-black/40 px-4 py-1.5 text-xs font-medium tracking-wider text-white/60 shadow-inner">
                      {item.duration}
                    </span>
                  </div>
                  <p className="relative z-10 mt-6 leading-relaxed text-white/70 font-light text-base">
                    {item.description}
                  </p>
                  {/* @ts-ignore */}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="relative z-10 mt-4 space-y-2 text-white/70 font-light text-base list-disc list-outside ml-4">
                      {/* @ts-ignore */}
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="pl-2 marker:text-cyan-400">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </section>

          {/* EDUCATION SECTION */}
          <section 
            id="education" 
            ref={el => { sectionRefs.current.education = el; }} 
            className="flex flex-col gap-6 scroll-mt-24"
          >
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
                 <GraduationCap className="h-8 w-8 text-fuchsia-400" /> Education
              </h2>
            </Reveal>
            {education.map((item, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <article
                  className="portfolio-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:bg-white/[0.07] transition-colors duration-500"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.08),transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex flex-col justify-between sm:flex-row sm:items-center gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white tracking-tight">{item.degree}</h3>
                      <p className="mt-2 text-sm font-medium uppercase tracking-widest text-fuchsia-300/80">{item.school}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/10 bg-black/40 px-4 py-1.5 text-xs font-medium tracking-wider text-white/60 shadow-inner">
                      {item.year}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </section>

          {/* PROJECTS SECTION */}
          <section 
            id="projects" 
            ref={el => { sectionRefs.current.projects = el; }} 
            className="flex flex-col gap-6 scroll-mt-24"
          >
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
                 <FolderGit2 className="h-8 w-8 text-blue-400" /> Project Works
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((item, idx) => (
                <Reveal key={idx} delay={idx * 150} className="h-full">
                  <article
                    className="portfolio-card h-full flex flex-col group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:bg-white/[0.07] transition-colors duration-500"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative z-10 flex flex-col flex-1">
                      <h3 className="text-xl font-semibold text-white tracking-tight">{item.title}</h3>
                      <p className="mt-4 leading-relaxed text-white/70 font-light max-w-2xl flex-1">{item.description}</p>
                      <div className="mt-8 flex items-center gap-3">
                        <a
                          href={item.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/40 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10 hover:text-cyan-300 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                        >
                          <FolderGit2 className="h-4 w-4" />
                          View Source
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        
        </div>
      </div>
    </main>
  );
}
