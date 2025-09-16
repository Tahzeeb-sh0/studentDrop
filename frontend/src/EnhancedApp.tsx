import React, { useState, useEffect, useCallback } from 'react';
import EnhancedNavbar from './components/EnhancedNavbar';
import EnhancedWelcomePanel from './components/EnhancedWelcomePanel';
import EnhancedPerformanceSection from './components/EnhancedPerformanceSection';
import EnhancedRiskPrediction from './components/EnhancedRiskPrediction';
import EnhancedMentorChat from './components/EnhancedMentorChat';
import { studentApi, chatApi, mlApi, mentorApi } from './services/mockApi';
// import { io, Socket } from 'socket.io-client';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'mentor' | 'student' | 'faculty' | 'recruiter';
  avatar?: string;
  lastLogin?: string;
}

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
  priority: 'low' | 'medium' | 'high';
}

interface StudentData {
  name: string;
  attendance: number;
  averageScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  riskPercentage: number;
  semester: string;
  year: number;
  department: string;
  lastLogin: string;
  totalCredits: number;
  completedAssignments: number;
  pendingAssignments: number;
  upcomingExams: number;
  gpa: number;
  rank: number;
  totalStudents: number;
}

interface AttendanceData {
  week: string;
  attendance: number;
  present: number;
  absent: number;
  late: number;
  trend: 'up' | 'down' | 'stable';
}

interface ScoreData {
  subject: string;
  score: number;
  maxScore: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  lastExam: string;
  average: number;
  rank: number;
  totalStudents: number;
}

interface ActivityLog {
  id: number;
  type: 'assignment' | 'exam' | 'library' | 'meeting' | 'login' | 'submission' | 'event';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'overdue' | 'in_progress';
  priority: 'low' | 'medium' | 'high';
  points?: number;
  category: string;
}

interface RiskExplanation {
  factor: string;
  contribution: number;
  direction: 'increase' | 'decrease';
  description: string;
  currentValue: number;
  recommendedValue?: number;
  impact: 'high' | 'medium' | 'low';
  category: 'academic' | 'attendance' | 'behavioral' | 'demographic';
}

interface Recommendation {
  id: string;
  type: 'meeting' | 'resource' | 'action' | 'goal';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedImpact: number;
  effort: 'low' | 'medium' | 'high';
  timeline: string;
  status: 'pending' | 'in_progress' | 'completed';
  category: string;
}

interface Intervention {
  id: string;
  title: string;
  description: string;
  mentor: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
  outcome?: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'student' | 'mentor' | 'system';
  timestamp: string;
  isRead: boolean;
  isDelivered: boolean;
  attachments?: any[];
  replyTo?: string;
  reactions?: any[];
  isTyping?: boolean;
  priority?: 'low' | 'medium' | 'high';
  category?: 'general' | 'academic' | 'personal' | 'urgent';
}

const EnhancedApp: React.FC = () => {
  // State management
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'dashboard'>('login');
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  // Data state
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceData[]>([]);
  const [subjectScores, setSubjectScores] = useState<ScoreData[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [riskExplanations, setRiskExplanations] = useState<RiskExplanation[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Socket connection
  const [socket, setSocket] = useState<any | null>(null);

  // Initialize app
  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token]);

  // Load data when user is authenticated
  useEffect(() => {
    if (user && user.role === 'student') {
      loadStudentData();
    }
  }, [user]);

  // Initialize socket connection
  useEffect(() => {
    if (user) {
      // Temporarily disable socket connection
      setIsConnected(true);
      console.log('Socket connection disabled for demo');
      
      // const newSocket = io('ws://localhost:4000', {
      //   auth: { token }
      // });

      // newSocket.on('connect', () => {
      //   setIsConnected(true);
      //   console.log('Connected to chat server');
      // });

      // newSocket.on('disconnect', () => {
      //   setIsConnected(false);
      //   console.log('Disconnected from chat server');
      // });

      // newSocket.on('message', (message: Message) => {
      //   setMessages(prev => [...prev, message]);
      // });

      // newSocket.on('notification', (notification: Notification) => {
      //   setNotifications(prev => [notification, ...prev]);
      // });

      // setSocket(newSocket);

      // return () => {
      //   newSocket.close();
      // };
    }
  }, [user, token]);

  const verifyToken = async () => {
    try {
      // In real implementation, verify token with backend
      const mockUser: User = {
        id: 'user-001',
        name: 'Alex Johnson',
        email: 'alex.johnson@university.edu',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        lastLogin: new Date().toISOString()
      };
      setUser(mockUser);
      setCurrentView('dashboard');
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  const loadStudentData = async () => {
    setLoading(true);
    try {
      // Load all student data in parallel
      const [
        profile,
        performance,
        riskAnalysis,
        notificationsData,
        messagesData
      ] = await Promise.all([
        studentApi.getProfile('student-001'),
        studentApi.getPerformance('student-001'),
        studentApi.getRiskAnalysis('student-001'),
        studentApi.getNotifications(),
        chatApi.getChatHistory('student-001')
      ]);

      setStudentData({
        name: profile.name,
        attendance: 87,
        averageScore: 82,
        riskLevel: riskAnalysis.riskCategory,
        riskPercentage: riskAnalysis.riskScore * 100,
        semester: 'Fall 2024',
        year: 2,
        department: 'Computer Science',
        lastLogin: profile.lastLogin,
        totalCredits: 45,
        completedAssignments: 28,
        pendingAssignments: 5,
        upcomingExams: 3,
        gpa: 3.2,
        rank: 15,
        totalStudents: 120
      });

      setAttendanceHistory(performance.attendance);
      setSubjectScores(performance.scores);
      setActivityLogs(performance.activity);
      setRiskExplanations(riskAnalysis.explanations);
      setRecommendations(riskAnalysis.recommendations);
      setInterventions(riskAnalysis.interventions);
      setNotifications(notificationsData);
      setMessages(messagesData);
    } catch (error) {
      console.error('Failed to load student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // In real implementation, make API call
      const mockToken = 'mock-jwt-token';
      setToken(mockToken);
      localStorage.setItem('token', mockToken);
      await verifyToken();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setCurrentView('login');
    if (socket) {
      socket.close();
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleNotificationRead = async (notificationId: string) => {
    try {
      await studentApi.markNotificationRead(notificationId);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await studentApi.markAllNotificationsRead();
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const handleSendMessage = async (message: string, attachments?: File[]) => {
    try {
      const newMessage = await chatApi.sendMessage(message, attachments);
      setMessages(prev => [...prev, newMessage]);
      
      // Send via socket if connected
      if (socket) {
        socket.emit('message', newMessage);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleSendReaction = async (messageId: string, emoji: string) => {
    try {
      await chatApi.sendReaction(messageId, emoji);
      // Update local state
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId
            ? {
                ...msg,
                reactions: [
                  ...(msg.reactions || []),
                  { emoji, count: 1, users: [user?.id || ''] }
                ]
              }
            : msg
        )
      );
    } catch (error) {
      console.error('Failed to send reaction:', error);
    }
  };

  const handleReply = (messageId: string, text: string) => {
    // Implementation for reply functionality
    console.log('Replying to message:', messageId, text);
  };

  const handleForward = (messageId: string, recipientId: string) => {
    // Implementation for forward functionality
    console.log('Forwarding message:', messageId, 'to:', recipientId);
  };

  const handleScheduleMeeting = async () => {
    try {
      const meeting = await mentorApi.scheduleMeeting(
        'student-001',
        'mentor-001',
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        'Academic progress discussion'
      );
      console.log('Meeting scheduled:', meeting);
    } catch (error) {
      console.error('Failed to schedule meeting:', error);
    }
  };

  const handleViewProfile = (userId: string) => {
    console.log('Viewing profile:', userId);
  };

  const handleViewDetails = (type: string, data: any) => {
    console.log('Viewing details:', type, data);
  };

  const handleTakeAction = (recommendation: Recommendation) => {
    console.log('Taking action on recommendation:', recommendation);
  };

  const handleScheduleIntervention = () => {
    console.log('Scheduling intervention');
  };

  // Mock mentor data
  const mentorData = {
    id: 'mentor-001',
    name: 'Dr. Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    status: 'online' as const,
    lastSeen: new Date().toISOString(),
    department: 'Computer Science',
    specialization: ['Machine Learning', 'Data Science', 'Academic Counseling'],
    rating: 4.8,
    totalStudents: 25
  };

  const studentDataForChat = {
    id: 'student-001',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'online' as const,
    lastSeen: new Date().toISOString(),
    year: 2,
    department: 'Computer Science',
    riskLevel: 'medium' as const
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">SD</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">StudentDrop</h1>
            <p className="text-gray-600">AI-Powered Student Dropout Prevention</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Demo credentials: Use any email/password to login
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedNavbar
        user={user}
        onLogout={handleLogout}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        notifications={notifications}
        onNotificationRead={handleNotificationRead}
        onMarkAllRead={handleMarkAllRead}
        unreadCount={notifications.filter(n => !n.read).length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && studentData && (
          <div className="space-y-8">
            <EnhancedWelcomePanel
              student={studentData}
              onViewDetails={handleViewDetails}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <EnhancedPerformanceSection
                attendanceHistory={attendanceHistory}
                subjectScores={subjectScores}
                activityLogs={activityLogs}
                onViewDetails={handleViewDetails}
              />
              <EnhancedRiskPrediction
                riskScore={studentData.riskPercentage}
                riskCategory={studentData.riskLevel}
                explanations={riskExplanations}
                recommendations={recommendations}
                interventions={interventions}
                onViewDetails={handleViewDetails}
                onTakeAction={handleTakeAction}
                onScheduleIntervention={handleScheduleIntervention}
              />
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <EnhancedPerformanceSection
            attendanceHistory={attendanceHistory}
            subjectScores={subjectScores}
            activityLogs={activityLogs}
            onViewDetails={handleViewDetails}
          />
        )}

        {activeTab === 'risk' && studentData && (
          <EnhancedRiskPrediction
            riskScore={studentData.riskPercentage}
            riskCategory={studentData.riskLevel}
            explanations={riskExplanations}
            recommendations={recommendations}
            interventions={interventions}
            onViewDetails={handleViewDetails}
            onTakeAction={handleTakeAction}
            onScheduleIntervention={handleScheduleIntervention}
          />
        )}

        {activeTab === 'chat' && (
          <div className="max-w-4xl mx-auto">
            <EnhancedMentorChat
              student={studentDataForChat}
              mentor={mentorData}
              messages={messages}
              onSendMessage={handleSendMessage}
              onSendReaction={handleSendReaction}
              onReply={handleReply}
              onForward={handleForward}
              onScheduleMeeting={handleScheduleMeeting}
              onViewProfile={handleViewProfile}
              isConnected={isConnected}
            />
          </div>
        )}

        {/* Other tabs would render their respective components */}
        {!['home', 'performance', 'risk', 'chat'].includes(activeTab) && (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} View
            </h2>
            <p className="text-gray-600">
              This feature is coming soon. Check back later for updates!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default EnhancedApp;
