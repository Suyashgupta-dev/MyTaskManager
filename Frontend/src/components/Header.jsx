import React from 'react';
import { Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header({ search, onSearchChange, userName, hideSearch }) {
  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return 'Good morning';
    if (hrs < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getFormattedDate = () => {
    return new Date().toLocaleDateString(undefined, { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <header className="workspace-header">
      <div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          {getFormattedDate()}
        </div>
        <h1 className="glow-text-primary" style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2px' }}>
          {getGreeting()}, {userName || 'Guest'}!
        </h1>
      </div>

      <div className="header-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
        {!hideSearch && (
          <div className="search-wrapper header-search" style={{ margin: 0 }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dark)' }} />
            <input
              type="text"
              className="search-input"
              placeholder="Quick search..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
