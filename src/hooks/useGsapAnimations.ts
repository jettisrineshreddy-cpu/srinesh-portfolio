import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function useGsapAnimations() {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    // Hero element animations
    const heroTl = gsap.timeline();
    heroTl.fromTo('.hero__badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
          .fromTo('.hero__title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
          .fromTo('.hero__statement', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.6')
          .fromTo('.hero__actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
          .fromTo('.hero__visual', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.2)' }, '-=0.8');

    // Section headers
    gsap.utils.toArray('.section-header').forEach((header: any) => {
      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
          },
        }
      );
    });

    // About content
    gsap.fromTo(
      '.about__text-content',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about__content',
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo(
      '.about__glass-card',
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about__content',
          start: 'top 80%',
        }
      }
    );

    // Project cards staggered
    gsap.utils.toArray('.projects__grid').forEach((grid: any) => {
      gsap.fromTo(
        grid.querySelectorAll('.project-card'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
          },
        }
      );
    });

    // Skill groups staggered
    gsap.utils.toArray('.skills__grid').forEach((grid: any) => {
      gsap.fromTo(
        grid.querySelectorAll('.skill-group'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
          },
        }
      );
    });

    // Certifications staggered
    gsap.utils.toArray('.certifications__grid').forEach((grid: any) => {
      gsap.fromTo(
        grid.querySelectorAll('.cert-card'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
          },
        }
      );
    });

    // Research cards staggered
    gsap.utils.toArray('.research-cloud__grid').forEach((grid: any) => {
      gsap.fromTo(
        grid.querySelectorAll('.focus-card'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
          },
        }
      );
    });

    // Contact container
    gsap.fromTo(
      '.contact__container',
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact__container',
          start: 'top 85%',
        }
      }
    );

    // Refresh ScrollTrigger to recalculate dimensions
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [prefersReduced]);
}
