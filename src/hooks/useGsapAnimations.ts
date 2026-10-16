import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function useGsapAnimations(introComplete: boolean = true) {
  const prefersReduced = useReducedMotion();

  // ─── HERO (entrance when intro completes) ─────────────────────────
  useEffect(() => {
    if (prefersReduced || !introComplete) return;

    const heroTl = gsap.timeline({ delay: 0.1 });
    heroTl
      .fromTo('.hero__status',    { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      .fromTo('.hero__title-line',{ opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power4.out' }, '-=0.3')
      .fromTo('.hero__subtitle',  { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero__statement', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero__actions',   { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
  }, [introComplete, prefersReduced]);

  // ─── SCROLLTRIGGER ANIMATIONS ───────────────────────────────────────
  useEffect(() => {
    if (prefersReduced) return;

    // ─── SECTION HEADERS ────────────────────────────────────────────────
    gsap.utils.toArray('.section-header').forEach((header: any) => {
      gsap.fromTo(
        header,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: header, start: 'top 88%' },
        }
      );
    });

    // ─── ABOUT — label, statement lines, body, photo, metadata ─────────
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
      // Label
      gsap.fromTo('.about__label',
        { opacity: 0, y: 10 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: aboutSection, start: 'top 70%' },
        }
      );
      // Statement lines (staggered)
      gsap.fromTo('.about__statement-line',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: aboutSection, start: 'top 70%' },
        }
      );
      // Body text
      gsap.fromTo('.about__body-text',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.about__bottom-grid', start: 'top 80%' },
        }
      );
      // Photo frame (clip-path reveal)
      gsap.fromTo('.about__photo-frame',
        { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
        {
          opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.0, ease: 'power4.out',
          scrollTrigger: { trigger: '.about__top-right', start: 'top 75%' },
        }
      );
      // Photo tag
      gsap.fromTo('.about__photo-tag',
        { opacity: 0, y: 8 },
        {
          opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.8,
          scrollTrigger: { trigger: '.about__top-right', start: 'top 75%' },
        }
      );
      // Metadata items (staggered from right)
      gsap.fromTo('.about__meta-item',
        { opacity: 0, x: 20 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.about__metadata', start: 'top 80%' },
        }
      );
    }

    // ─── SKILLS ─────────────────────────────────────────────────────────
    gsap.fromTo('.skill-col',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '#skills', start: 'top 75%' },
      }
    );

    // ─── PROJECTS — intro title + each showcase ─────────────────────────
    const projectsIntro = document.querySelector('.projects__intro');
    if (projectsIntro) {
      gsap.fromTo(projectsIntro,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: projectsIntro, start: 'top 85%' },
        }
      );
    }

    // Each project showcase (header, visual, footer)
    gsap.utils.toArray('.project-showcase').forEach((entry: any) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: entry, start: 'top 80%' },
      });

      const header = entry.querySelector('.project-showcase__header');
      const visual = entry.querySelector('.project-showcase__visual-wrapper');
      const footer = entry.querySelector('.project-showcase__footer');

      if (header) {
        tl.fromTo(header,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
      }
      if (visual) {
        tl.fromTo(visual,
          { opacity: 0, scale: 0.97, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.4'
        );
      }
      if (footer) {
        tl.fromTo(footer,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.6'
        );
      }
    });

    // ─── CERTIFICATIONS / EXPERIENCE ────────────────────────────────────
    // Experience items
    const expItems = document.querySelectorAll('.experience__list .cert-item');
    if (expItems.length > 0) {
      gsap.fromTo(expItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '#certifications', start: 'top 80%' },
        }
      );
    }

    // Credential cert items
    const credItems = document.querySelectorAll('.certs__list:not(.experience__list) .cert-item');
    if (credItems.length > 0) {
      gsap.fromTo(credItems,
        { opacity: 0, y: 15 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: '#credentials', start: 'top 82%' },
        }
      );
    }

    // Education block
    const eduBlock = document.querySelector('.edu__block');
    if (eduBlock) {
      gsap.fromTo(eduBlock,
        { opacity: 0, y: 15 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: '#education', start: 'top 85%' },
        }
      );
    }

    // ─── RESEARCH / CURRENT FOCUS ───────────────────────────────────────
    gsap.fromTo('.focus-stat',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '#research', start: 'top 75%' },
      }
    );

    gsap.fromTo('.focus-panel',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.focus-panels', start: 'top 80%' },
      }
    );

    // ─── CONTACT ────────────────────────────────────────────────────────
    gsap.fromTo('.contact__headline',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.0, ease: 'power4.out',
        scrollTrigger: { trigger: '#contact', start: 'top 70%' },
      }
    );

    gsap.fromTo('.contact__desc',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '#contact', start: 'top 65%' },
      }
    );

    gsap.fromTo('.contact__link',
      { opacity: 0, x: -15 },
      {
        opacity: 1, x: 0, duration: 0.5, ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.contact__links', start: 'top 85%' },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [prefersReduced]);
}
