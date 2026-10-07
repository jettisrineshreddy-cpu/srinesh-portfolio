import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Loader.css';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // If reduced motion, just skip immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    tl.to(text1Ref.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
    })
    .to(text1Ref.current, {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
      delay: 0.3
    })
    .to(text2Ref.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
    })
    .to(text2Ref.current, {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
      delay: 0.3
    })
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader__content">
        <div className="loader__text-mask">
          <span className="loader__text" ref={text1Ref}>J. SRINESH</span>
        </div>
        <div className="loader__text-mask">
          <span className="loader__text loader__text--small" ref={text2Ref}>AI / DATA / ENGINEERING</span>
        </div>
      </div>
    </div>
  );
};
