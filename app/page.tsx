"use client";
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SkillBar } from "@/components/skill-bar"
import { ExperienceItem } from "@/components/experience-item"
import { TypingAnimation, RotatingTitle } from "@/components/typing-animation"
import { InteractiveBackground } from "@/components/interactive-background"
import { StarryIntro } from '@/components/StarryIntro';

export default function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [mainContentVisible, setMainContentVisible] = useState(false);

  const handleIntroFinished = () => {
    setShowIntro(false);
    // Delay setting main content visible to allow StarryIntro to fade out
    setTimeout(() => setMainContentVisible(true), 50); // Small delay for CSS transition to pick up
  };
  if (showIntro) {
    return <StarryIntro onFinished={handleIntroFinished} duration={10000} />;
  }

  return (
    <div 
      className="min-h-screen bg-background transition-opacity duration-1000 ease-in-out"
      style={{ opacity: mainContentVisible ? 1 : 0 }}
    >
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">KG</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="#about" className="transition-colors hover:text-foreground/80">About</Link>
            <Link href="#projects" className="transition-colors hover:text-foreground/80">Projects</Link>
            <Link href="#experience" className="transition-colors hover:text-foreground/80">Experience</Link>
            <Link href="#skills" className="transition-colors hover:text-foreground/80">Skills</Link>
            <Link href="#contact" className="transition-colors hover:text-foreground/80">Contact</Link>
          </nav>
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              <Button asChild variant="outline">
                <Link href="#contact">Get in touch</Link>
              </Button>
            </div>
            <nav className="flex items-center">
              <Link href="https://github.com/Kartikinator" target="_blank" rel="noreferrer">
                <div className="w-9 h-9 flex items-center justify-center rounded-md border transition-colors hover:bg-accent">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <Link href="https://www.linkedin.com/in/kartikeya-gullapalli/" target="_blank" rel="noreferrer" className="ml-2">
                <div className="w-9 h-9 flex items-center justify-center rounded-md border transition-colors hover:bg-accent">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </div>
              </Link>
            </nav>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-b">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-1">
              <Link href="#about" className="block px-2 py-2 text-sm transition-colors hover:text-foreground/80" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link href="#projects" className="block px-2 py-2 text-sm transition-colors hover:text-foreground/80" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
              <Link href="#experience" className="block px-2 py-2 text-sm transition-colors hover:text-foreground/80" onClick={() => setIsMobileMenuOpen(false)}>Experience</Link>
              <Link href="#skills" className="block px-2 py-2 text-sm transition-colors hover:text-foreground/80" onClick={() => setIsMobileMenuOpen(false)}>Skills</Link>
              <Link href="#contact" className="block px-2 py-2 text-sm transition-colors hover:text-foreground/80" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <Button asChild variant="outline" className="w-full mt-3" onClick={() => setIsMobileMenuOpen(false)}>
                <Link href="#contact">Get in touch</Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative container mx-auto px-4 pt-12 pb-24 md:py-32 space-y-8 overflow-hidden">
          <InteractiveBackground />
          <div className="relative z-10 flex flex-col-reverse md:flex-row gap-8 items-center pointer-events-none">
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <TypingAnimation text="Kartikeya Gullapalli" typingSpeed={80} />
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground h-[40px] md:h-[48px]">
                <RotatingTitle
                  prefixes={["AI/ML", "Full Stack", "DevOps"]}
                  baseSuffix="Software Engineer"
                  typingSpeed={80}
                  backspaceSpeed={40}
                  delayBetweenWords={3000}
                />
              </h2>
              <p className="text-xl text-muted-foreground max-w-[600px]">
                I build intelligent systems and scalable software solutions with expertise in AI/ML, cloud technologies,
                and full-stack development.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <Button asChild size="lg" className="pointer-events-auto">
                  <Link href="#projects">View my work</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="pointer-events-auto">
                  <Link href="#contact">Contact me</Link>
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0 pointer-events-auto">
              <div className="relative h-60 w-60 md:h-80 md:w-80 overflow-hidden rounded-full border-4 border-background shadow-xl">
                <Image
                  src="/images/profile-photo.jpg"
                  alt="Kartikeya Gullapalli"
                  width={320}
                  height={320}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-muted/40 py-16 md:py-24">
          <div className="container mx-auto px-4 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-center">About Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <p className="text-lg">
                  I'm a passionate software engineer and AI/ML specialist currently pursuing my B.S. in Electrical and
                  Computer Engineering with a focus on Data Science and Information Systems at The University of Texas
                  at Austin. With experience across AI/cloud platforms, robotics, and full-stack development, I
                  specialize in building intelligent systems that solve real-world problems.
                </p>
                <p className="text-lg">
                  My expertise spans from developing AI-powered tools using AWS Bedrock and Python to implementing
                  computer vision systems for robotics applications. I'm passionate about leveraging cutting-edge
                  technologies like LLMs, computer vision, and cloud infrastructure to create scalable, efficient
                  solutions.
                </p>
                <p className="text-lg">
                  When I'm not coding, you can find me working on research projects, contributing to open source, or
                  exploring the latest developments in artificial intelligence and machine learning.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Education</h3>
                <div className="space-y-2">
                  <div>
                    <div className="font-medium">B.S. Electrical and Computer Engineering</div>
                    <div className="text-muted-foreground">Data Science and Information Systems</div>
                    <div className="text-muted-foreground">The University of Texas at Austin, 2022-2026</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Coursework: Algorithms, Machine Learning, Data Structures, Networking, Signal Processing, Embedded
                      Systems
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold pt-4">Contact</h3>
                <div className="space-y-2">
                  <div className="text-muted-foreground">(832) 378-0998</div>
                  <div className="text-muted-foreground">gkartikeyag@gmail.com</div>
                  <div className="text-muted-foreground">US Citizen</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-24 container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              title="Tala - Career Fair Platform"
              description="A comprehensive career fair platform with RESTful APIs, Supabase Auth, and PostgreSQL database with row-level security policies"
              image="/images/tala-career-fair.png"
              tags={["TypeScript", "Next.js", "PostgreSQL", "Supabase", "REST API"]}
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />
            <ProjectCard
              title="Self Adaptive LLMs"
              description="Fine-tuned domain-specific PEFT adapters on LLaMA-2-7B with metacognitive gating network for dynamic routing and optimized inference"
              image="/images/llm-adaptive.png"
              tags={["Python", "PyTorch", "LLaMA-2", "PEFT", "Machine Learning"]}
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />
            <ProjectCard
              title="Vitality - Discord Chatbot"
              description="Multipurpose Discord chatbot serving 100+ servers and 10K+ users with optimized SQL-based data persistence"
              image="/images/vitality-discord-bot.png"
              tags={["Python", "Discord API", "SQL", "REST API", "Bot Development"]}
              demoUrl="https://example.com"
              repoUrl="https://github.com"
            />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="bg-muted/40 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Work Experience</h2>
              <div className="space-y-8">
                <ExperienceItem
                  title="Software Engineer Intern – AI & Cloud"
                  company="New York Life"
                  period="May 2025 - Present"
                  description="Developing an AI-powered tool using AWS Bedrock and Python to enable insurance agents to input client details via free-text, and designing a structured data-extraction pipeline to populate client profiles, improving agent data-entry efficiency by 40%."
                  technologies={["AWS Bedrock", "Python", "AI/ML", "Data Pipeline", "Cloud Computing"]}
                />
                <ExperienceItem
                  title="Assistant Researcher"
                  company="University of Texas at Austin"
                  period="April 2025 - Present"
                  description="Building a modular execution framework for agentic AI by integrating ADAS with AFlow, enabling dynamic LLM agent orchestration, runtime evaluation, control flow, and workflow optimization. Implementing spacecraft pose estimation techniques using PnP, triangulation, and 2D-3D correspondence methods."
                  technologies={["LLM", "Computer Vision", "Python", "ADAS", "AFlow", "Pose Estimation"]}
                />
                <ExperienceItem
                  title="Software Engineer Intern – AI & ML"
                  company="Wilder Systems Robotics"
                  period="May 2024 - January 2025"
                  description="Established CI/CD pipelines connecting Label Studio, AWS APIs, and Jenkins to automate data ingestion, model training, and deployment, reducing pipeline runtime by 35%. Engineered ROS nodes leveraging computational geometry for real-time ZED stereo camera data alignment with CAD models."
                  technologies={["ROS", "AWS", "Jenkins", "Docker", "Computer Vision", "CI/CD", "Python"]}
                />
                <ExperienceItem
                  title="Software Engineer Intern – Full Stack"
                  company="Dojoko"
                  period="May 2022 - August 2022"
                  description="Designed and maintained a robust SQL database to store and manage student profiles, posts, and connection data. Built an automated Python-based recommendation system, saving the team 10 hours per week and improving connection accuracy by 20%."
                  technologies={["ReactJS", "Python", "SQL", "Data Visualization", "Recommendation Systems"]}
                />
                <ExperienceItem
                  title="Assistant Researcher"
                  company="University of Houston"
                  period="September 2020 - May 2021"
                  description="Evaluated LSTM, GRU, and bidirectional architectures using TensorFlow to improve EEG signal prediction accuracy by 15% through dropout, batch normalization, and hyperparameter tuning, resulting in improved drilling capabilities."
                  technologies={["TensorFlow", "LSTM", "GRU", "Signal Processing", "Machine Learning"]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 md:py-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">Programming Languages</h3>
                <SkillBar name="Python" percentage={95} />
                <SkillBar name="JavaScript/TypeScript" percentage={90} />
                <SkillBar name="C++" percentage={85} />
                <SkillBar name="Java" percentage={80} />
                <SkillBar name="C/C#" percentage={75} />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">AI/ML & Data Science</h3>
                <SkillBar name="TensorFlow & PyTorch" percentage={90} />
                <SkillBar name="Machine Learning" percentage={85} />
                <SkillBar name="Computer Vision" percentage={80} />
                <SkillBar name="LLMs & NLP" percentage={85} />
                <SkillBar name="Data Analysis (Pandas)" percentage={90} />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">Cloud & DevOps</h3>
                <SkillBar name="AWS (Bedrock, EC2)" percentage={85} />
                <SkillBar name="Docker & Containerization" percentage={80} />
                <SkillBar name="CI/CD Pipelines" percentage={85} />
                <SkillBar name="Jenkins" percentage={75} />
                <SkillBar name="Git & Version Control" percentage={95} />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">Full Stack & Databases</h3>
                <SkillBar name="React & Next.js" percentage={85} />
                <SkillBar name="Node.js" percentage={80} />
                <SkillBar name="PostgreSQL & MySQL" percentage={85} />
                <SkillBar name="REST APIs" percentage={90} />
                <SkillBar name="System Design" percentage={80} />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-muted/40 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">Get In Touch</h2>
              <p className="text-lg text-muted-foreground">
                I'm currently open to new opportunities and collaborations. Feel free to reach out if you'd like to work
                together!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href="mailto:gkartikeyag@gmail.com">
                    <Mail className="h-5 w-5" />
                    Email Me
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link href="https://www.linkedin.com/in/kartikeya-gullapalli/" target="_blank" rel="noreferrer">
                    <Linkedin className="h-5 w-5" />
                    LinkedIn
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 flex flex-col md:h-16 items-center md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">© 2025 Kartikeya Gullapalli. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center">

          </div>
        </div>
      </footer>
    </div>
  )
}
