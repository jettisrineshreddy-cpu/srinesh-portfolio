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
    const heroTl = gsap.timeline({ delay: 2.2 });
    heroTl.fromTo('.hero__status', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
          .fromTo('.hero__title-line', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' }, '-=0.4')
          .fromTo('.hero__subtitle', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .fromTo('.hero__statement', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.6')
          .fromTo('.hero__actions', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4');

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

    // Skills now handled entirely by CSS marquee animation

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

    // Interstitial animation
    gsap.fromTo(
      '.interstitial__title',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.interstitial',
          start: 'top 70%',
        }
      }
    );
    
    gsap.fromTo(
      '.interstitial__card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.interstitial__cards',
          start: 'top 75%',
        }
      }
    );

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
