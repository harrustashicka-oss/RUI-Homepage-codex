'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Circle, Globe2 } from 'lucide-react';

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
      <source srcSet={project.imageAvif} type="image/avif" />
      <img src={project.image} alt={project.alt[locale]} loading="lazy" decoding="async" />
    </picture>
  );
}

export default function PortfolioSite() {
  const [locale, setLocale] = useState<Locale>('zh');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
              <source srcSet="/assets/hero-cyber.avif" type="image/avif" />
              <img src="/assets/hero-cyber.webp" alt="" fetchPriority="high" />
            </picture>
            <video className="hero-video" autoPlay={!reduceMotion} muted loop playsInline preload="metadata" poster="/assets/hero-cyber.webp">
              <source src="/assets/avatar-animation.mp4" type="video/mp4" />
            </video>
            {!reduceMotion && (
              <>
                <video className="hero-video video-glitch-copy video-glitch-copy-a" autoPlay muted loop playsInline preload="metadata">
                  <source src="/assets/avatar-animation.mp4" type="video/mp4" />
                </video>
                <video className="hero-video video-glitch-copy video-glitch-copy-b" autoPlay muted loop playsInline preload="metadata">
                  <source src="/assets/avatar-animation.mp4" type="video/mp4" />
                </video>
                <video className="hero-video video-glitch-copy video-glitch-copy-c" autoPlay muted loop playsInline preload="metadata">
                  <source src="/assets/avatar-animation.mp4" type="video/mp4" />
                </video>
              </>
            )}
            <div className="hero-video-shade" />
            <div className="glitch-flash" />
            <div className="glitch-bars" aria-hidden="true"><i /><i /><i /><i /></div>
          </div>

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
                <Picture project={project} locale={locale} />
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
        <motion.div className="about-image-wrap" initial={{ opacity: 0, clipPath: reduceMotion ? 'none' : 'inset(0 100% 0 0)' }} whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduceMotion ? 0 : 0.75 }}>
          <picture>
            <source srcSet="/assets/about-real.avif" type="image/avif" />
            <img src="/assets/about-real.webp" alt={locale === 'zh' ? '创作者真实照片' : 'Creator portrait'} loading="lazy" />
          </picture>
          <span>HUMAN / 01</span>
        </motion.div>
        <motion.div className="about-copy" initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}>
          <p className="section-index">{copy.about.index}</p>
          <h2 id="about-title">{copy.about.title}</h2>
          <p>{copy.about.body}</p>
          <aside>{copy.about.note}</aside>
        </motion.div>
      </section>

      <section className="capabilities-section section-pad" id="capabilities" aria-labelledby="capabilities-title">
        <div className="section-heading compact">
          <p className="section-index">{copy.capabilities.index}</p>
          <h2 id="capabilities-title">{copy.capabilities.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
        </div>
        <div className="capability-list">
          {copy.capabilities.items.map((item, index) => (
            <motion.article key={item.title} initial={{ opacity: 0, x: reduceMotion ? 0 : -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: reduceMotion ? 0 : index * 0.08 }}>
              <span className="capability-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <small>{item.tools}</small>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title">
        <p className="section-index dark-index">{copy.contact.index}</p>
        <h2 id="contact-title">{copy.contact.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
        <div className="contact-bottom">
          <p>{copy.contact.body}</p>
          <span>{copy.contact.pending}</span>
        </div>
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
            <Picture project={selectedProject} locale={locale} className="dialog-picture" />
            <div className="tag-row dialog-tags">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}
