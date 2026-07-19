import React from 'react';
import { Calendar, Edit, Trash, Check } from 'lucide-react';

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const isOverdue = task.duedate && new Date(task.duedate) < new Date() && !task.completed;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={`task-card glass-panel priority-${task.priority} animate-fade-in`}>
      <div className="task-header">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div 
            className={`custom-checkbox ${task.completed ? 'checked' : ''}`}
            onClick={() => onToggle(task._id)}
          >
            {task.completed && <Check size={14} strokeWidth={3} />}
          </div>
          <h4 className={`task-title ${task.completed ? 'completed' : ''}`}>
            {task.title}
          </h4>
        </div>
        <span className="badge" style={{ 
          background: 'rgba(255, 255, 255, 0.05)', 
          border: '1px solid var(--border)',
          color: task.completed ? 'var(--text-dark)' : 'var(--text-main)'
        }}>
          {task.category}
        </span>
      </div>

      <p className={`task-desc ${task.completed ? 'completed' : ''}`}>
        {task.description}
      </p>

      <div className="task-meta">
        {task.duedate && (
          <span className={`task-date ${isOverdue ? 'overdue' : ''}`}>
            <Calendar size={14} />
            <span>{formatDate(task.duedate)}</span>
            {isOverdue && <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>(Overdue)</span>}
          </span>
        )}
        
        <span className="badge" style={{ 
          marginLeft: 'auto',
          background: `var(--priority-${task.priority})`,
          color: '#000',
          fontWeight: 700,
          opacity: 0.9
        }}>
          {task.priority}
        </span>
      </div>

      <div className="task-actions">
        <button 
          className="action-icon-btn" 
          onClick={() => onEdit(task)}
          title="Edit Task"
        >
          <Edit size={16} />
        </button>
        <button 
          className="action-icon-btn delete" 
          onClick={() => onDelete(task._id)}
          title="Delete Task"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}
