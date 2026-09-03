'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Circle, Globe2, Volume2, VolumeX } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { content, projects, type Locale, type Project } from '@/app/content';

const marqueeTerms = ['VISUAL DESIGN', 'AI CREATION', 'WEB EXPERIENCE', 'EDITORIAL SYSTEMS', 'MOTION STUDIES'];

function Picture({ project, locale, className = '' }: { project: Project; locale: Locale; className?: string }) {
  return (
    <picture className={className}>
      {project.imageAvif && <source srcSet={project.imageAvif} type="image/avif" />}
      <img src={project.image} alt={project.alt[locale]} loading="lazy" decoding="async" />
    </picture>
  );
}

function ProjectAsset({ project, locale, className = '', showControls = false }: { project: Project; locale: Locale; className?: string; showControls?: boolean }) {
  if (project.mediaType === 'video') {
    const isWebm = project.image.endsWith('.webm');
    const fallbackMp4 = isWebm ? project.image.replace(/\.webm$/, '.mp4') : null;
    return (
      <video className={className} muted={!showControls} loop autoPlay playsInline preload="metadata" controls={showControls} aria-label={project.alt[locale]}>
        <source src={project.image} type={isWebm ? 'video/webm' : 'video/mp4'} />
        {fallbackMp4 && <source src={fallbackMp4} type="video/mp4" />}
      </video>
    );
  }

  return <Picture project={project} locale={locale} className={className} />;
}

export default function PortfolioSite() {
  const [locale, setLocale] = useState<Locale>('zh');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [heroSoundOn, setHeroSoundOn] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const copy = content[locale];

  useEffect(() => {
    const saved = window.localStorage.getItem('portfolio-locale');
    if (saved === 'zh' || saved === 'en') {
      const timer = window.setTimeout(() => setLocale(saved), 0);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    window.localStorage.setItem('portfolio-locale', locale);
  }, [locale]);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const startVideo = () => {
      void video.play().catch(() => undefined);
    };

    startVideo();
    video.addEventListener('canplay', startVideo);
    return () => video.removeEventListener('canplay', startVideo);
  }, []);

  const changeLocale = () => setLocale((current) => (current === 'zh' ? 'en' : 'zh'));

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label={locale === 'zh' ? '返回首页' : 'Back to top'}>
          <span className="brand-mark">P/01</span>
          <span>{copy.brand}</span>
        </a>
        <nav className="nav-links" aria-label={locale === 'zh' ? '主导航' : 'Primary navigation'}>
          <a href="#work">{copy.nav.work}</a>
          <a href="#about">{copy.nav.about}</a>
          <a href="#capabilities">{copy.nav.capabilities}</a>
          <a href="#contact">{copy.nav.contact}</a>
          <button className="lang-toggle" type="button" onClick={changeLocale} aria-label={locale === 'zh' ? 'Switch to English' : '切换为中文'}>
            <Globe2 aria-hidden="true" size={14} /> {locale === 'zh' ? 'EN' : '中'}
          </button>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-frame">
          <div className="hero-video-stage" aria-hidden="true">
            <picture className="hero-video-poster">
              <img src="/assets/hero-video-poster.png" alt="" fetchPriority="high" />
            </picture>
            <video ref={heroVideoRef} className="hero-video" autoPlay muted loop playsInline preload="auto" poster="/assets/hero-video-poster.png">
              <source src="/assets/avatar-animation.mp4" type="video/mp4" />
            </video>
            <video className="hero-video video-glitch-copy video-glitch-copy-a" autoPlay muted loop playsInline preload="metadata">
              <source src="/assets/avatar-animation.mp4" type="video/mp4" />
            </video>
            <video className="hero-video video-glitch-copy video-glitch-copy-b" autoPlay muted loop playsInline preload="metadata">
              <source src="/assets/avatar-animation.mp4" type="video/mp4" />
            </video>
            <video className="hero-video video-glitch-copy video-glitch-copy-c" autoPlay muted loop playsInline preload="metadata">
              <source src="/assets/avatar-animation.mp4" type="video/mp4" />
            </video>
            <div className="hero-video-shade" />
            <div className="glitch-flash" />
            <div className="glitch-bars" aria-hidden="true"><i /><i /><i /><i /></div>
          </div>
          <button
            className="hero-sound-toggle"
            type="button"
            onClick={() => {
              const video = heroVideoRef.current;
              if (!video) return;
              const next = !heroSoundOn;
              video.muted = !next;
              setHeroSoundOn(next);
              void video.play().catch(() => undefined);
            }}
            aria-pressed={heroSoundOn}
            aria-label={heroSoundOn ? (locale === 'zh' ? '关闭首屏声音' : 'Mute hero video') : (locale === 'zh' ? '开启首屏声音' : 'Enable hero sound')}
          >
            {heroSoundOn ? <Volume2 aria-hidden="true" size={16} /> : <VolumeX aria-hidden="true" size={16} />}
            <span>{heroSoundOn ? (locale === 'zh' ? '声音开启' : 'Sound on') : (locale === 'zh' ? '开启声音' : 'Sound off')}</span>
          </button>

          <div className="hero-grid" aria-hidden="true" />
          <div className="scanline" aria-hidden="true" />
          <p className="hero-kicker">{copy.hero.kicker}</p>
          <div className="hero-copy">
            <p>{copy.hero.eyebrow}</p>
            <motion.h1
              id="hero-title"
              className="hero-scene-title"
              data-text={copy.hero.title.replaceAll('\n', ' ')}
              key={`${locale}-hero-title`}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.42 }}
            >
              {copy.hero.title.split('\n').map((line) => <span key={line}>{line}</span>)}
            </motion.h1>
          </div>
          <a className="hero-cta" href="#work">
            {copy.hero.cta} <ArrowDownRight aria-hidden="true" size={16} />
          </a>
        </div>
      </section>

      <div className="marquee" aria-label="Creative disciplines">
        <div className="marquee-track">
          {[...marqueeTerms, ...marqueeTerms].map((term, index) => (
            <span key={`${term}-${index}`} aria-hidden={index >= marqueeTerms.length}>
              {term} <Circle aria-hidden="true" size={9} fill="currentColor" />
            </span>
          ))}
        </div>
      </div>

      <section className="work-section section-pad" id="work" aria-labelledby="work-title">
        <motion.div className="section-heading" initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }}>
          <p className="section-index">{copy.work.index}</p>
          <h2 id="work-title">{copy.work.title}</h2>
          <p>{copy.work.intro}</p>
        </motion.div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <motion.button
              className={`project-card project-card-${index + 1}`}
              key={project.id}
              type="button"
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.14 }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : (index % 2) * 0.08 }}
              aria-label={`${copy.work.open}: ${project.title[locale]}`}
            >
              <div className="project-media">
                <ProjectAsset project={project} locale={locale} />
                <span className="project-open"><ArrowUpRight aria-hidden="true" size={18} /></span>
              </div>
              <div className="project-meta">
                <span>{project.category[locale]} / {project.year}</span>
                <h3>{project.title[locale]}</h3>
                <p>{project.summary[locale]}</p>
                <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="about-section section-pad" id="about" aria-labelledby="about-title">
        <div className="about-image-wrap">
          <img src="/assets/about-portrait.png" alt={locale === 'zh' ? '创作者肖像' : 'Creator portrait'} loading="lazy" />
          <span>PORTRAIT / 01</span>
        </div>
        <motion.div className="about-copy" initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}>
          <p className="section-index">{copy.about.index}</p>
          <p className="about-identity">{copy.about.identity}</p>
          <h2 id="about-title">{copy.about.name}</h2>
          <p className="about-role">{copy.about.title}</p>
          <div className="about-body">
            {copy.about.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <aside>{copy.about.quote.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</aside>
        </motion.div>
      </section>

      <section className="capabilities-section section-pad" id="capabilities" aria-labelledby="capabilities-title">
        <div className="section-heading compact">
          <p className="section-index">{copy.capabilities.index}</p>
          <h2 id="capabilities-title">{copy.capabilities.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
          <p className="practice-summary">{copy.capabilities.intro}</p>
        </div>
        <div className="capability-list">
          {copy.capabilities.items.map((item, index) => (
            <motion.article key={item.title} initial={{ opacity: 0, x: reduceMotion ? 0 : -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: reduceMotion ? 0 : index * 0.08 }}>
              <span className="capability-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <span className="capability-arrow" aria-hidden="true">↗</span>
            </motion.article>
          ))}
        </div>
        <div className="practice-contact" id="contact">
          <div className="practice-contact-heading">
            <div>
              <p className="section-index">{copy.contact.index}</p>
              <h3 id="contact-title">{copy.contact.title}</h3>
            </div>
            <p>{copy.contact.body}</p>
          </div>
          <div className="contact-grid" aria-labelledby="contact-title">
            {copy.contact.channels.map((channel, index) => channel.href ? (
              <a
                className="contact-channel"
                href={channel.href}
                key={channel.label}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                <span className="contact-channel-index">0{index + 1}</span>
                <span className="contact-channel-label">{channel.label}</span>
                <strong>{channel.value}</strong>
                <ArrowUpRight aria-hidden="true" size={22} />
              </a>
            ) : (
              <div className="contact-channel" key={channel.label}>
                <span className="contact-channel-index">0{index + 1}</span>
                <span className="contact-channel-label">{channel.label}</span>
                <strong>{channel.value}</strong>
                <span className="contact-channel-dot" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-section" aria-label="Design statement">
        <h2>DESIGN IS A WAY OF SEEING.</h2>
        <p>设计，是理解世界的一种方式。</p>
      </section>

      <footer>
        <span>P/01</span>
        <p>{copy.footer}</p>
        <a href="#top" aria-label={locale === 'zh' ? '返回顶部' : 'Back to top'}>↑</a>
      </footer>

      <Dialog open={Boolean(selectedProject)} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="project-dialog" aria-label={copy.dialog.projectLabel}>
            <DialogHeader>
              <p className="dialog-index">{selectedProject.category[locale]} / {selectedProject.year}</p>
              <DialogTitle>{selectedProject.title[locale]}</DialogTitle>
              <DialogDescription>{selectedProject.summary[locale]}</DialogDescription>
            </DialogHeader>
            <ProjectAsset project={selectedProject} locale={locale} className="dialog-picture" showControls />
            <div className="tag-row dialog-tags">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}
