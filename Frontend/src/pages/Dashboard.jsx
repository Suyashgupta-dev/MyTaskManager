import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import StatsDashboard from '../components/StatsDashboard';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Header from '../components/Header';
import ProgressDashboard from '../components/ProgressDashboard';
import AboutDeveloperModal from '../components/AboutDeveloperModal';
import Profile from './Profile';
import { 
  LogOut, Plus, CheckSquare, ClipboardList, Info, LayoutDashboard, User 
} from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 });
  const [view, setView] = useState('dashboard'); // 'dashboard' or 'profile'
  
  // Filters state
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [sort, setSort] = useState('-createdAt');
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const [loading, setLoading] = useState(true);

  // Fetch tasks and stats
  const fetchData = async () => {
    try {
      setLoading(true);
      const statsRes = await API.get('/tasks/stats');
      setStats(statsRes.data);

      const params = {};
      if (search) params.search = search;
      if (status) params.status = status;
      if (priority) params.priority = priority;
      if (sort) params.sort = sort;

      const tasksRes = await API.get('/tasks', { params });
      setTasks(tasksRes.data.tasks || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, status, priority, sort]);

  // Handle tasks operations
  const handleCreateOrUpdate = async (taskData) => {
    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, taskData);
      } else {
        await API.post('/tasks', taskData);
      }
      setIsModalOpen(false);
      setEditingTask(null);
      fetchData();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleToggle = async (id) => {
    try {
      await API.patch(`/tasks/${id}/toggle`);
      fetchData();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await API.delete(`/tasks/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <div className="brand" style={{ marginBottom: '24px' }}>
            <CheckSquare size={26} />
            <span className="glow-text-primary">TaskMasater</span>
          </div>

          {/* Navigation Menu */}
          <nav className="sidebar-menu">
            <button 
              className={`sidebar-menu-item ${view === 'dashboard' ? 'active' : ''}`}
              onClick={() => setView('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Workspace</span>
            </button>
            <button 
              className={`sidebar-menu-item ${view === 'profile' ? 'active' : ''}`}
              onClick={() => setView('profile')}
            >
              <User size={18} />
              <span>My Profile</span>
            </button>
          </nav>

          <button className="sidebar-dev-btn" onClick={() => setIsDevModalOpen(true)}>
            <Info size={16} />
            <span>Developer Info</span>
          </button>
        </div>
        
        <div className="user-profile">
          <div className="user-avatar">
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-email">{user?.email}</span>
          </div>
          <button className="logout-btn" onClick={logout} title="Log Out">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="main-content">
        {/* Workspace Header */}
        <Header 
          search={search} 
          onSearchChange={setSearch} 
          userName={user?.name} 
          hideSearch={view === 'profile'}
        />

        {view === 'dashboard' ? (
          <>
            {/* Progress Visuals Dashboard */}
            <ProgressDashboard stats={stats} tasks={tasks} />

            {/* Stats Section Cards */}
            <StatsDashboard stats={stats} />

            {/* Filter and Actions Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <div className="filter-bar glass-panel" style={{ padding: '10px 16px', borderRadius: '12px', marginBottom: 0 }}>
                <select
                  className="filter-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="TO-DO">To-Do</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  className="filter-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>

                <select
                  className="filter-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="-createdAt">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority</option>
                </select>
              </div>

              <button className="btn-primary" onClick={() => { setEditingTask(null); setIsModalOpen(true); }}>
                <Plus size={18} />
                <span>New Task</span>
              </button>
            </div>

            {/* Task Cards Grid */}
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
                <div className="spinner" style={{ width: '40px', height: '40px', color: 'var(--primary)' }}></div>
              </div>
            ) : tasks.length > 0 ? (
              <div className="tasks-grid">
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onToggle={handleToggle}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state glass-panel">
                <ClipboardList size={64} style={{ color: 'rgba(255, 255, 255, 0.05)', marginBottom: '16px' }} />
                <h3>No tasks found</h3>
                <p style={{ color: 'var(--text-dark)', fontSize: '0.9rem', maxWidth: '300px', marginTop: '4px' }}>
                  Create a new task to get started or adjust your active search and filters.
                </p>
              </div>
            )}
          </>
        ) : (
          <Profile stats={stats} />
        )}
      </main>

      {/* Task Creation/Editing Modal */}
      <TaskForm
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingTask(null); }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingTask}
      />

      {/* About Developer Modal */}
      <AboutDeveloperModal
        isOpen={isDevModalOpen}
        onClose={() => setIsDevModalOpen(false)}
      />
    </div>
  );
}
