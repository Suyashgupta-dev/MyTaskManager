import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { User, Mail, Key, Save, ShieldAlert, CheckCircle } from 'lucide-react';

export default function Profile({ stats }) {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { total = 0, completed = 0, pending = 0 } = stats || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!name || !email) {
      setError('Please provide a name and email.');
      return;
    }
    
    setLoading(true);
    try {
      const payload = { name, email };
      if (password) {
        if (password.length < 6) {
          setError('Password must be at least 6 characters.');
          setLoading(false);
          return;
        }
        payload.password = password;
      }
      
      const response = await API.put('/auth/profile', payload);
      
      // Update global context user details
      setUser({
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      setSuccess('Profile updated successfully!');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-card glass-panel animate-fade-in" style={{ marginTop: '20px' }}>
      <div className="profile-avatar-section">
        <div className="profile-avatar-big">
          {user?.name ? user.name[0].toUpperCase() : 'U'}
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{user?.name}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>{user?.email}</p>

        <div className="profile-stats-mini">
          <div className="profile-stat-box">
            <div className="profile-stat-val" style={{ color: 'var(--primary)' }}>{total}</div>
            <div className="stat-label" style={{ fontSize: '0.7rem' }}>Total Tasks</div>
          </div>
          <div className="profile-stat-box">
            <div className="profile-stat-val" style={{ color: 'var(--color-completed)' }}>{completed}</div>
            <div className="stat-label" style={{ fontSize: '0.7rem' }}>Completed</div>
          </div>
          <div className="profile-stat-box">
            <div className="profile-stat-val" style={{ color: 'var(--color-todo)' }}>{pending}</div>
            <div className="stat-label" style={{ fontSize: '0.7rem' }}>Pending</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert-error" style={{ marginBottom: '24px' }}>
          <ShieldAlert size={18} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert-error" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#34d399', marginBottom: '24px' }}>
          <CheckCircle size={18} />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="prof-name">Full Name</label>
            <div className="search-wrapper" style={{ flex: 'none' }}>
              <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dark)' }} />
              <input
                id="prof-name"
                type="text"
                className="search-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="prof-email">Email Address</label>
            <div className="search-wrapper" style={{ flex: 'none' }}>
              <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dark)' }} />
              <input
                id="prof-email"
                type="email"
                className="search-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="prof-pass">New Password (Leave blank to keep current)</label>
            <div className="search-wrapper" style={{ flex: 'none' }}>
              <Key size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dark)' }} />
              <input
                id="prof-pass"
                type="password"
                className="search-input"
                placeholder="Enter new password (Min. 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
            {loading ? <div className="spinner"></div> : (
              <>
                <Save size={18} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
