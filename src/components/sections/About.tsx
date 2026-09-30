import React from 'react';
import { profileData } from '../../data/profile';
import { CheckCircle2 } from 'lucide-react';
import './About.css';

export const About: React.FC = () => {
  return (
    <section id="about" className="about section-padding">
      <div className="section-header">
        <h2 className="section-title">Professional Identity</h2>
        <div className="section-line"></div>
      </div>

      <div className="about__content">
        <div className="about__text-content">
          <p className="about__description">
            I am a {profileData.status} at {profileData.university}, {profileData.campus}. 
            My academic and professional journey is focused on the intersection of data, 
            artificial intelligence, and practical engineering.
          </p>
          <p className="about__description">
            {profileData.careerDirection} I enjoy taking raw datasets and engineering them 
            into clean, actionable models that solve real-world problems.
          </p>
          
          <div className="about__focus-areas">
            {profileData.positioning.map((item, index) => (
              <div key={index} className="about__focus-item">
                <CheckCircle2 size={20} className="about__check-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about__visual-container">
          <div className="about__glass-card">
            <div className="about__glass-header">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="about__glass-body">
              <div className="code-line"><span className="keyword">const</span> <span className="variable">analyst</span> = <span className="keyword">new</span> <span className="class">DataProfessional</span>();</div>
              <div className="code-line"><span className="variable">analyst</span>.<span className="method">loadData</span>(<span className="string">"raw_datasets"</span>);</div>
              <div className="code-line"><span className="variable">analyst</span>.<span className="method">applyAI</span>();</div>
              <div className="code-line"><span className="keyword">return</span> <span className="variable">analyst</span>.<span className="method">getInsights</span>();</div>
              <div className="code-line comment">// Ready for production</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
