import React from 'react';
import { X, Mail, Code } from 'lucide-react';

export default function AboutDeveloperModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel dev-modal-content animate-fade-in">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code size={20} style={{ color: 'var(--primary)' }} />
            <h2 style={{ fontSize: '1.25rem' }}>About the Developer</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="dev-avatar-glow">SG</div>
          
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '4px 0 2px 0' }}>Suyash Gupta</h3>
          <p style={{ color: 'var(--primary)', fontSize: '0.88rem', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Full Stack Developer & AI Engineer
          </p>

          <p style={{ 
            color: 'var(--text-muted)', 
            fontSize: '0.9rem', 
            margin: '16px 0', 
            lineHeight: '1.6', 
            textAlign: 'center',
            maxWidth: '420px'
          }}>
            Hi! I am a passionate developer focused on building interactive, premium web applications. 
            I love integrating robust backend infrastructures with high-performance, polished frontends.
          </p>

          <div className="dev-tech-tags">
            <span className="dev-tech-tag">React.js</span>
            <span className="dev-tech-tag">Node.js</span>
            <span className="dev-tech-tag">Express</span>
            <span className="dev-tech-tag">MongoDB</span>
            <span className="dev-tech-tag">REST APIs</span>
            <span className="dev-tech-tag">Vanilla CSS</span>
          </div>

          <div className="dev-links">
            <a href="https://github.com/Suyashgupta-dev" target="_blank" rel="noopener noreferrer">
              <svg size={16} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <svg size={16} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a href="mailto:suyas@example.com">
              <Mail size={16} />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
