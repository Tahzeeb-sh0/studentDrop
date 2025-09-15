import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WelcomePanel from './components/WelcomePanel';
import PerformanceSection from './components/PerformanceSection';
import RiskPrediction from './components/RiskPrediction';
import MentorChat from './components/MentorChat';
import StudentFeatures from './components/StudentFeatures';
import FacultyFeatures from './components/FacultyFeatures';
import RecruiterFeatures from './components/RecruiterFeatures';

// Mock data
const mockStudentData = {
  name: 'Alex Johnson',
  attendance: 87,
  averageScore: 82,
  riskLevel: 'medium' as const,
  riskPercentage: 35,
};

const mockFacultyData = {
  name: 'Dr. Sarah Johnson',
  department: 'Computer Science',
};

const mockRecruiterData = {
  name: 'John Smith',
  company: 'TechCorp Inc.',
};

const mockAttendanceHistory = [
  { week: 'Week 1', attendance: 90 },
  { week: 'Week 2', attendance: 85 },
  { week: 'Week 3', attendance: 88 },
  { week: 'Week 4', attendance: 82 },
  { week: 'Week 5', attendance: 87 },
  { week: 'Week 6', attendance: 85 },
  { week: 'Week 7', attendance: 89 },
  { week: 'Week 8', attendance: 87 },
];

const mockSubjectScores = [
  { subject: 'Mathematics', score: 78 },
  { subject: 'Physics', score: 85 },
  { subject: 'Chemistry', score: 82 },
  { subject: 'Biology', score: 90 },
  { subject: 'English', score: 88 },
  { subject: 'History', score: 75 },
];

const mockActivityLogs = [
  {
    id: 1,
    type: 'assignment' as const,
    description: 'Submitted Math Assignment #3',
    timestamp: '2 hours ago',
    status: 'completed' as const,
  },
  {
    id: 2,
    type: 'exam' as const,
    description: 'Physics Midterm Exam',
    timestamp: '1 day ago',
    status: 'completed' as const,
  },
  {
    id: 3,
    type: 'library' as const,
    description: 'Visited library for research',
    timestamp: '2 days ago',
    status: 'completed' as const,
  },
  {
    id: 4,
    type: 'meeting' as const,
    description: 'Mentor meeting scheduled',
    timestamp: '3 days ago',
    status: 'pending' as const,
  },
  {
    id: 5,
    type: 'assignment' as const,
    description: 'Chemistry Lab Report due',
    timestamp: '5 days ago',
    status: 'overdue' as const,
  },
];

const mockRiskExplanations = [
  {
    factor: 'Low Attendance',
    contribution: 45,
    description: 'Attendance dropped below 90% in recent weeks',
  },
  {
    factor: 'Math Performance',
    contribution: 30,
    description: 'Math scores are below class average',
  },
  {
    factor: 'Assignment Delays',
    contribution: 15,
    description: 'Some assignments submitted late',
  },
  {
    factor: 'Study Time',
    contribution: 10,
    description: 'Limited study time logged in library',
  },
];

const mockSuggestions = [
  {
    id: 1,
    action: 'Improve Attendance',
    priority: 'high' as const,
    description: 'Attend more than 90% of classes to reduce risk',
  },
  {
    id: 2,
    action: 'Math Tutoring',
    priority: 'high' as const,
    description: 'Schedule weekly math tutoring sessions',
  },
  {
    id: 3,
    action: 'Time Management',
    priority: 'medium' as const,
    description: 'Use calendar app to track assignment deadlines',
  },
  {
    id: 4,
    action: 'Study Groups',
    priority: 'low' as const,
    description: 'Join study groups for collaborative learning',
  },
];

const mockNotifications = [
  {
    id: 1,
    message: 'Attendance dropped below 90%',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    message: 'Your mentor sent you a new message',
    timestamp: '4 hours ago',
    read: false,
  },
  {
    id: 3,
    message: 'Math assignment due tomorrow',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: 4,
    message: 'Physics exam results available',
    timestamp: '2 days ago',
    read: true,
  },
];

const mockMessages = [
  {
    id: 1,
    text: 'Hello Alex! I noticed your attendance has been improving. Keep up the great work!',
    sender: 'mentor' as const,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
  {
    id: 2,
    text: 'Thank you Dr. Johnson! I\'ve been trying to attend all classes.',
    sender: 'student' as const,
    timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
  {
    id: 3,
    text: 'That\'s excellent! How are you finding the math assignments?',
    sender: 'mentor' as const,
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
  {
    id: 4,
    text: 'They\'re challenging but I\'m working through them. Could we schedule a tutoring session?',
    sender: 'student' as const,
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isRead: true,
  },
];

export default function App() {
  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'mentor' | 'student' | 'faculty' | 'recruiter';
  } | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'dashboard'>('login');
  const [activeTab, setActiveTab] = useState('home');
  const [predictionResult, setPredictionResult] = useState<{
    risk_percent: number;
    category: 'low' | 'medium' | 'high';
  } | null>(null);
  const [studentId, setStudentId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [training, setTraining] = useState(false);
  const [lastTrainMsg, setLastTrainMsg] = useState<string | null>(null);
  const [messages, setMessages] = useState(mockMessages);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    if (token) {
      // Verify token and get user info
      fetch('http://localhost:4000/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
          setCurrentView('dashboard');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        setToken(null);
      });
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        setCurrentView('dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('Login failed. Please check if backend is running.');
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as 'admin' | 'mentor' | 'student' | 'faculty' | 'recruiter';

    try {
      const response = await fetch('http://localhost:4000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await response.json();
      if (response.ok) {
        alert('Account created successfully! Please login.');
        setCurrentView('login');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      alert('Signup failed. Please check if backend is running.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setCurrentView('login');
  };

  const handlePrediction = async () => {
    if (!studentId) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/ml/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: parseInt(studentId) })
      });

      const data = await response.json();
      if (response.ok) {
        setPredictionResult(data);
      } else {
        alert('Prediction failed');
      }
    } catch (error) {
      alert('Prediction failed. Please check if ML service is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleTrainModel = async () => {
    setTraining(true);
    setLastTrainMsg(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/ml/train', {
        method: 'POST',
      });
      const data = await response.json();
      if (response.ok) {
        setLastTrainMsg(`${data.message} (accuracy: ${data.accuracy})`);
      } else {
        setLastTrainMsg('Training failed');
      }
    } catch (_err) {
      setLastTrainMsg('Training failed. Check ML service.');
    } finally {
      setTraining(false);
    }
  };

  const handleSendMessage = (messageText: string) => {
    const newMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'student' as const,
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    setMessages([...messages, newMessage]);

    // Simulate mentor response
    setTimeout(() => {
      const mentorResponse = {
        id: messages.length + 2,
        text: 'That sounds great! I\'ll check my schedule and get back to you with available times.',
        sender: 'mentor' as const,
        timestamp: new Date().toISOString(),
        isRead: false,
      };
      setMessages(prev => [...prev, mentorResponse]);
    }, 2000);
  };

  const getRoleBasedTabs = () => {
    if (!user) return [];
    
    switch (user.role) {
      case 'student':
        return [
          { id: 'home', label: 'Home', icon: '🏠' },
          { id: 'features', label: 'My Features', icon: '🎯' },
          { id: 'performance', label: 'Performance', icon: '📊' },
          { id: 'risk', label: 'Risk Analysis', icon: '⚠️' },
          { id: 'chat', label: 'Mentor Chat', icon: '💬' },
        ];
      case 'faculty':
        return [
          { id: 'home', label: 'Home', icon: '🏠' },
          { id: 'features', label: 'Faculty Tools', icon: '👨‍🏫' },
          { id: 'performance', label: 'Student Performance', icon: '📊' },
          { id: 'risk', label: 'Risk Analysis', icon: '⚠️' },
          { id: 'chat', label: 'Student Chat', icon: '💬' },
        ];
      case 'recruiter':
        return [
          { id: 'home', label: 'Home', icon: '🏠' },
          { id: 'features', label: 'Recruiter Tools', icon: '🎯' },
          { id: 'performance', label: 'Candidate Analysis', icon: '📊' },
          { id: 'risk', label: 'Risk Assessment', icon: '⚠️' },
          { id: 'chat', label: 'Candidate Chat', icon: '💬' },
        ];
      case 'admin':
        return [
          { id: 'home', label: 'Home', icon: '🏠' },
          { id: 'performance', label: 'System Overview', icon: '📊' },
          { id: 'risk', label: 'Risk Management', icon: '⚠️' },
          { id: 'chat', label: 'Admin Chat', icon: '💬' },
        ];
      default:
        return [
          { id: 'home', label: 'Home', icon: '🏠' },
          { id: 'performance', label: 'Performance', icon: '📊' },
          { id: 'risk', label: 'Risk Analysis', icon: '⚠️' },
          { id: 'chat', label: 'Chat', icon: '💬' },
        ];
    }
  };

  const renderRoleDashboard = (role: string) => {
    if (role === 'student') {
      return (
        <div className="card">
          <h3>🎯 Your Risk Overview</h3>
          <p style={{color:'#666', marginBottom: '0.75rem'}}>Run a prediction to view your current risk status.</p>
          <div className="prediction-form">
            <div className="form-group">
              <label>Your Student ID</label>
              <input type="number" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Enter your student ID" />
            </div>
            <button onClick={handlePrediction} disabled={loading || !studentId} className="btn-primary">
              {loading ? 'Analyzing...' : 'Check My Risk'}
            </button>
          </div>
          {predictionResult && (
            <div className="prediction-result">
              <div className={`risk-level ${predictionResult.category}`}>
                <h4>Risk Level: {predictionResult.category.toUpperCase()}</h4>
                <div className="risk-percentage">{predictionResult.risk_percent}% Risk</div>
              </div>
            </div>
          )}
        </div>
      );
    }
    if (role === 'faculty') {
      return (
        <div className="card">
          <h3>👥 Student Monitoring</h3>
          <p style={{color:'#666', marginBottom: '0.75rem'}}>Quickly assess students by ID and review alerts.</p>
          <div className="prediction-form">
            <div className="form-group">
              <label>Student ID</label>
              <input type="number" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Enter student ID" />
            </div>
            <button onClick={handlePrediction} disabled={loading || !studentId} className="btn-primary">
              {loading ? 'Analyzing...' : 'Predict Risk'}
            </button>
          </div>
          {predictionResult && (
            <div className="prediction-result">
              <div className={`risk-level ${predictionResult.category}`}>
                <h4>Risk Level: {predictionResult.category.toUpperCase()}</h4>
                <div className="risk-percentage">{predictionResult.risk_percent}% Risk</div>
              </div>
            </div>
          )}
        </div>
      );
    }
    if (role === 'recruiter') {
      return (
        <div className="card">
          <h3>🎯 Candidate Assessment</h3>
          <p style={{color:'#666', marginBottom: '0.75rem'}}>Evaluate candidate risk and potential.</p>
          <div className="prediction-form">
            <div className="form-group">
              <label>Candidate ID</label>
              <input type="number" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Enter candidate ID" />
            </div>
            <button onClick={handlePrediction} disabled={loading || !studentId} className="btn-primary">
              {loading ? 'Analyzing...' : 'Assess Candidate'}
            </button>
          </div>
          {predictionResult && (
            <div className="prediction-result">
              <div className={`risk-level ${predictionResult.category}`}>
                <h4>Risk Level: {predictionResult.category.toUpperCase()}</h4>
                <div className="risk-percentage">{predictionResult.risk_percent}% Risk</div>
              </div>
            </div>
          )}
        </div>
      );
    }
    // admin
    return (
      <div className="card">
        <h3>🧠 Model Operations (Admin)</h3>
        <p style={{color:'#666', marginBottom: '0.75rem'}}>Trigger model training and review latest accuracy.</p>
        <div className="actions-list" style={{gridTemplateColumns:'1fr'}}>
          <button className="action-btn" onClick={handleTrainModel} disabled={training}>
            <span className="action-icon">🔄</span>
            {training ? 'Training…' : 'Train Model'}
          </button>
        </div>
        {lastTrainMsg && (<p style={{marginTop:'0.75rem', color:'#333'}}>{lastTrainMsg}</p>)}
      </div>
    );
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8">
            <WelcomePanel {...mockStudentData} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PerformanceSection
                attendanceHistory={mockAttendanceHistory}
                subjectScores={mockSubjectScores}
                activityLogs={mockActivityLogs}
              />
              <RiskPrediction
                riskScore={mockStudentData.riskPercentage}
                riskCategory={mockStudentData.riskLevel}
                explanations={mockRiskExplanations}
                suggestions={mockSuggestions}
              />
            </div>
          </div>
        );
      case 'features':
        if (user?.role === 'student') {
          return <StudentFeatures studentId="CS-001" studentName={user.name} />;
        } else if (user?.role === 'faculty') {
          return <FacultyFeatures facultyName={user.name} department="Computer Science" />;
        } else if (user?.role === 'recruiter') {
          return <RecruiterFeatures recruiterName={user.name} company="TechCorp Inc." />;
        }
        return <div>Features not available for this role</div>;
      case 'performance':
        return <PerformanceSection
          attendanceHistory={mockAttendanceHistory}
          subjectScores={mockSubjectScores}
          activityLogs={mockActivityLogs}
        />;
      case 'risk':
        return <RiskPrediction
          riskScore={mockStudentData.riskPercentage}
          riskCategory={mockStudentData.riskLevel}
          explanations={mockRiskExplanations}
          suggestions={mockSuggestions}
        />;
      case 'chat':
        return <MentorChat
          messages={messages}
          onSendMessage={handleSendMessage}
          isConnected={isConnected}
        />;
      default:
        return <WelcomePanel {...mockStudentData} />;
    }
  };

  if (!user) {
    return (
      <div className="app">
        <div className="auth-container">
          <div className="auth-header">
            <h1>🎓 StudentDrop</h1>
            <p>AI-Powered Student Dropout Prevention</p>
          </div>
          
          <div className="auth-tabs">
            <button 
              className={currentView === 'login' ? 'active' : ''}
              onClick={() => setCurrentView('login')}
            >
              Login
            </button>
            <button 
              className={currentView === 'signup' ? 'active' : ''}
              onClick={() => setCurrentView('signup')}
            >
              Sign Up
            </button>
          </div>

          {currentView === 'login' && (
            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" required />
              </div>
              <button type="submit" className="btn-primary">Login</button>
            </form>
          )}

          {currentView === 'signup' && (
            <form onSubmit={handleSignup} className="auth-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" required />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select name="role" required>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="recruiter">Recruiter</option>
                  <option value="mentor">Mentor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="btn-primary">Sign Up</button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>🎓 StudentDrop</h1>
          <div className="user-info">
            <span>Welcome, {user.name}</span>
            <span className="role-badge">{user.role}</span>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="dashboard">
          <div className="dashboard-header">
            <h2>Dashboard</h2>
            <p>Monitor student risk and take preventive actions</p>
          </div>

          {/* Role-based Tab Navigation */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {getRoleBasedTabs().map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="dashboard-grid">
            {user && renderRoleDashboard(user.role)}
            <div className="card">
              <h3>🔍 Student Risk Prediction</h3>
              <div className="prediction-form">
                <div className="form-group">
                  <label>Student ID</label>
                  <input 
                    type="number" 
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter student ID"
                  />
                </div>
                <button 
                  onClick={handlePrediction}
                  disabled={loading || !studentId}
                  className="btn-primary"
                >
                  {loading ? 'Analyzing...' : 'Predict Risk'}
                </button>
              </div>

              {predictionResult && (
                <div className="prediction-result">
                  <div className={`risk-level ${predictionResult.category}`}>
                    <h4>Risk Level: {predictionResult.category.toUpperCase()}</h4>
                    <div className="risk-percentage">
                      {predictionResult.risk_percent}% Risk
                    </div>
                  </div>
                  <div className="risk-description">
                    {predictionResult.category === 'low' && 'Student is performing well with minimal risk.'}
                    {predictionResult.category === 'medium' && 'Student shows some concerning patterns. Monitor closely.'}
                    {predictionResult.category === 'high' && 'High risk detected. Immediate intervention recommended.'}
                  </div>
                </div>
              )}
            </div>

            <div className="card">
              <h3>📊 Quick Stats</h3>
              <div className="stats-grid">
                <div className="stat">
                  <div className="stat-number">1,247</div>
                  <div className="stat-label">Total Students</div>
                </div>
                <div className="stat">
                  <div className="stat-number">23</div>
                  <div className="stat-label">At Risk</div>
                </div>
                <div className="stat">
                  <div className="stat-number">98.1%</div>
                  <div className="stat-label">Retention Rate</div>
                </div>
                <div className="stat">
                  <div className="stat-number">85%</div>
                  <div className="stat-label">Model Accuracy</div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>🚨 Recent Alerts</h3>
              <div className="alerts-list">
                <div className="alert-item high">
                  <div className="alert-icon">⚠️</div>
                  <div className="alert-content">
                    <div className="alert-title">High Risk Detected</div>
                    <div className="alert-desc">Student #1001 shows concerning patterns</div>
                  </div>
                </div>
                <div className="alert-item medium">
                  <div className="alert-icon">📊</div>
                  <div className="alert-content">
                    <div className="alert-title">Attendance Drop</div>
                    <div className="alert-desc">Student #1002 missed 3 classes</div>
                  </div>
                </div>
                <div className="alert-item low">
                  <div className="alert-icon">✅</div>
                  <div className="alert-content">
                    <div className="alert-title">Improvement Noted</div>
                    <div className="alert-desc">Student #1003 grades improving</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>🛠️ Actions</h3>
              <div className="actions-list">
                <button className="action-btn">
                  <span className="action-icon">📧</span>
                  Send Email Alert
                </button>
                <button className="action-btn">
                  <span className="action-icon">📞</span>
                  Schedule Meeting
                </button>
                <button className="action-btn">
                  <span className="action-icon">📋</span>
                  Generate Report
                </button>
                <button className="action-btn">
                  <span className="action-icon">🔄</span>
                  Retrain Model
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="mt-8">
            {renderActiveTab()}
          </div>
        </div>
      </main>
    </div>
  );
}