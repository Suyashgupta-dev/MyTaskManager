import React from 'react';

export default function ProgressDashboard({ stats, tasks = [] }) {
  const { total = 0, completed = 0 } = stats || {};

  // 1. Completion Percentage
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // SVG parameters for circle
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  // 2. Category Completion Rates
  const categories = ['work', 'personal', 'shopping', 'others'];
  const categoryStats = categories.map((cat) => {
    const catTasks = tasks.filter((t) => t.category === cat);
    const catTotal = catTasks.length;
    const catCompleted = catTasks.filter((t) => t.completed).length;
    const rate = catTotal > 0 ? Math.round((catCompleted / catTotal) * 100) : 0;
    return { name: cat, total: catTotal, completed: catCompleted, rate };
  });

  return (
    <div className="progress-container">
      {/* Circle percentage progress */}
      <div className="progress-circular-card glass-panel animate-fade-in">
        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px' }}>Completion Rate</h4>
        
        <div className="circular-progress">
          <svg>
            <circle 
              className="bg-circle" 
              cx="60" 
              cy="60" 
              r={radius} 
            />
            <circle 
              className="fg-circle" 
              cx="60" 
              cy="60" 
              r={radius} 
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="circular-progress-text">{completionPercentage}%</div>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {completed} of {total} tasks cleared
        </div>
      </div>

      {/* Progress Bars for Categories */}
      <div className="progress-bars-card glass-panel animate-fade-in">
        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px' }}>Category Progress</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {categoryStats.map((cat) => (
            <div key={cat.name} className="progress-bar-wrapper">
              <div className="progress-bar-label">
                <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{cat.name}</span>
                <span style={{ color: 'var(--text-muted)' }}>
                  {cat.rate}% ({cat.completed}/{cat.total})
                </span>
              </div>
              <div className="progress-bar-track">
                <div 
                  className="progress-bar-fill" 
                  style={{ 
                    width: `${cat.rate}%`, 
                    backgroundColor: cat.name === 'work' ? 'var(--primary)' :
                                     cat.name === 'personal' ? 'var(--secondary)' :
                                     cat.name === 'shopping' ? 'var(--color-todo)' : 'var(--text-dark)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
