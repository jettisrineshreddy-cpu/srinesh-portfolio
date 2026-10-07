import React from 'react';
import { Lock, Shield, Zap } from 'lucide-react';
import './Interstitial.css';

export const Interstitial: React.FC = () => {
  return (
    <section className="interstitial">
      <div className="interstitial__bg-glow"></div>
      
      <div className="interstitial__content">
        <h2 className="interstitial__title">
          Data Security <span className="text-gradient">&</span> Performance
        </h2>
        
        <div className="interstitial__cards">
          <div className="interstitial__card">
            <Lock className="interstitial__icon" size={32} />
            <h3>Secure by Design</h3>
            <p>Implementing best practices in data governance and secure API architectures.</p>
          </div>
          
          <div className="interstitial__card">
            <Zap className="interstitial__icon" size={32} />
            <h3>High Performance</h3>
            <p>Optimized SQL queries, efficient pipelines, and lightning-fast dashboards.</p>
          </div>
          
          <div className="interstitial__card">
            <Shield className="interstitial__icon" size={32} />
            <h3>Robust Systems</h3>
            <p>Building reliable, scalable models that stand up to real-world edge cases.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
