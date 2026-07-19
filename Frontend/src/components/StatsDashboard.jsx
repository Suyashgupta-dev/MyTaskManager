import React from 'react';
import { ListTodo, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function StatsDashboard({ stats }) {
  const { total = 0, completed = 0, pending = 0, overdue = 0 } = stats || {};

  const cardData = [
    {
      label: 'Total Tasks',
      value: total,
      icon: <ListTodo size={24} style={{ color: 'var(--primary)' }} />,
      bgIcon: 'rgba(139, 92, 246, 0.1)',
    },
    {
      label: 'Completed',
      value: completed,
      icon: <CheckCircle size={24} style={{ color: 'var(--color-completed)' }} />,
      bgIcon: 'rgba(16, 185, 129, 0.1)',
    },
    {
      label: 'Pending',
      value: pending,
      icon: <Clock size={24} style={{ color: 'var(--color-todo)' }} />,
      bgIcon: 'rgba(251, 191, 36, 0.1)',
    },
    {
      label: 'Overdue',
      value: overdue,
      icon: <AlertTriangle size={24} style={{ color: 'var(--color-overdue)' }} />,
      bgIcon: 'rgba(239, 68, 68, 0.1)',
    },
  ];

  return (
    <div className="stats-grid animate-fade-in">
      {cardData.map((card, idx) => (
        <div key={idx} className="stat-card glass-panel">
          <div>
            <div className="stat-label">{card.label}</div>
            <div className="stat-val">{card.value}</div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: card.bgIcon }}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
