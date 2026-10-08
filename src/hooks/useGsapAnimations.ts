import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function useGsapAnimations() {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    // ─── HERO (delayed to wait for loader) ───────────────────────────
    const heroTl = gsap.timeline({ delay: 1.5 });
    heroTl
      .fromTo('.hero__status',    { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo('.hero__title-line',{ opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' }, '-=0.4')
      .fromTo('.hero__subtitle',  { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo('.hero__statement', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
      .fromTo('.hero__actions',   { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4');

    // ─── SECTION HEADERS ─────────────────────────────────────────────────
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

    // ─── SKILLS ───────────────────────────────────────────────────────────
    gsap.fromTo('.skill-col',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '#skills', start: 'top 75%' },
      }
    );

    // ─── CERTIFICATIONS ───────────────────────────────────────────────────
    gsap.fromTo('.cert-item',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '#certifications', start: 'top 80%' },
      }
    );

    // ─── CONTACT ──────────────────────────────────────────────────────────
    gsap.fromTo('.contact__headline',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.0, ease: 'power4.out',
        scrollTrigger: { trigger: '#contact', start: 'top 70%' },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [prefersReduced]);
}
