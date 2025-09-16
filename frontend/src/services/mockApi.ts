import axios from 'axios';

// Mock API base URL (Vite uses VITE_ prefix and import.meta.env)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock data generators
const generateMockStudentData = () => ({
  id: 'student-001',
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  lastLogin: new Date().toISOString(),
  semester: 'Fall 2024',
  year: 2,
  department: 'Computer Science',
  totalCredits: 45,
  completedAssignments: 28,
  pendingAssignments: 5,
  upcomingExams: 3,
  gpa: 3.2,
  rank: 15,
  totalStudents: 120
});

const generateMockAttendanceHistory = () => {
  const weeks = [];
  for (let i = 8; i >= 1; i--) {
    const attendance = Math.max(60, Math.min(100, 85 + Math.random() * 20 - 10));
    weeks.push({
      week: `Week ${i}`,
      attendance: Math.round(attendance),
      present: Math.round(attendance * 0.8),
      absent: Math.round((100 - attendance) * 0.6),
      late: Math.round((100 - attendance) * 0.4),
      trend: attendance > 90 ? 'up' : attendance < 80 ? 'down' : 'stable'
    });
  }
  return weeks.reverse();
};

const generateMockSubjectScores = () => [
  {
    subject: 'Mathematics',
    score: 78,
    maxScore: 100,
    percentage: 78,
    trend: 'up',
    lastExam: '2024-10-15',
    average: 75,
    rank: 12,
    totalStudents: 120
  },
  {
    subject: 'Physics',
    score: 85,
    maxScore: 100,
    percentage: 85,
    trend: 'up',
    lastExam: '2024-10-12',
    average: 80,
    rank: 8,
    totalStudents: 120
  },
  {
    subject: 'Chemistry',
    score: 82,
    maxScore: 100,
    percentage: 82,
    trend: 'stable',
    lastExam: '2024-10-10',
    average: 78,
    rank: 10,
    totalStudents: 120
  },
  {
    subject: 'Biology',
    score: 90,
    maxScore: 100,
    percentage: 90,
    trend: 'up',
    lastExam: '2024-10-08',
    average: 85,
    rank: 5,
    totalStudents: 120
  },
  {
    subject: 'English',
    score: 88,
    maxScore: 100,
    percentage: 88,
    trend: 'up',
    lastExam: '2024-10-05',
    average: 82,
    rank: 6,
    totalStudents: 120
  },
  {
    subject: 'History',
    score: 75,
    maxScore: 100,
    percentage: 75,
    trend: 'down',
    lastExam: '2024-10-03',
    average: 80,
    rank: 15,
    totalStudents: 120
  }
];

const generateMockActivityLogs = () => [
  {
    id: 1,
    type: 'assignment',
    title: 'Math Assignment #3',
    description: 'Calculus problem set submitted',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    priority: 'high',
    points: 25,
    category: 'Academic'
  },
  {
    id: 2,
    type: 'exam',
    title: 'Physics Midterm',
    description: 'Midterm exam completed',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    priority: 'high',
    points: 50,
    category: 'Academic'
  },
  {
    id: 3,
    type: 'library',
    title: 'Research Session',
    description: 'Library visit for project research',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    priority: 'medium',
    points: 10,
    category: 'Academic'
  },
  {
    id: 4,
    type: 'meeting',
    title: 'Mentor Meeting',
    description: 'Scheduled meeting with academic mentor',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    priority: 'high',
    category: 'Personal'
  },
  {
    id: 5,
    type: 'submission',
    title: 'Chemistry Lab Report',
    description: 'Lab report submission due',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'overdue',
    priority: 'high',
    points: 30,
    category: 'Academic'
  }
];

const generateMockRiskExplanations = () => [
  {
    factor: 'Low Attendance',
    contribution: 45,
    direction: 'increase',
    description: 'Attendance dropped below 90% in recent weeks',
    currentValue: 78,
    recommendedValue: 90,
    impact: 'high',
    category: 'attendance'
  },
  {
    factor: 'Math Performance',
    contribution: 30,
    direction: 'increase',
    description: 'Math scores are below class average',
    currentValue: 78,
    recommendedValue: 85,
    impact: 'high',
    category: 'academic'
  },
  {
    factor: 'Assignment Delays',
    contribution: 15,
    direction: 'increase',
    description: 'Some assignments submitted late',
    currentValue: 3,
    recommendedValue: 0,
    impact: 'medium',
    category: 'behavioral'
  },
  {
    factor: 'Study Time',
    contribution: 10,
    direction: 'increase',
    description: 'Limited study time logged in library',
    currentValue: 2,
    recommendedValue: 5,
    impact: 'low',
    category: 'behavioral'
  }
];

const generateMockRecommendations = () => [
  {
    id: 'rec-001',
    type: 'meeting',
    title: 'Schedule Mentor Meeting',
    description: 'Book a 30-minute session to discuss academic progress and strategies',
    priority: 'high',
    estimatedImpact: 25,
    effort: 'low',
    timeline: 'This week',
    status: 'pending',
    category: 'Academic Support'
  },
  {
    id: 'rec-002',
    type: 'resource',
    title: 'Math Tutoring',
    description: 'Enroll in additional math tutoring sessions to improve performance',
    priority: 'high',
    estimatedImpact: 20,
    effort: 'medium',
    timeline: 'Next 2 weeks',
    status: 'pending',
    category: 'Academic Support'
  },
  {
    id: 'rec-003',
    type: 'action',
    title: 'Improve Attendance',
    description: 'Set daily reminders and create a study schedule to maintain 90%+ attendance',
    priority: 'medium',
    estimatedImpact: 15,
    effort: 'low',
    timeline: 'Ongoing',
    status: 'pending',
    category: 'Behavioral'
  },
  {
    id: 'rec-004',
    type: 'goal',
    title: 'Time Management',
    description: 'Use calendar app to track assignment deadlines and study sessions',
    priority: 'low',
    estimatedImpact: 10,
    effort: 'low',
    timeline: 'This month',
    status: 'pending',
    category: 'Skills Development'
  }
];

const generateMockInterventions = () => [
  {
    id: 'int-001',
    title: 'Academic Counseling Session',
    description: 'One-on-one meeting to discuss academic challenges and create improvement plan',
    mentor: 'Dr. Sarah Johnson',
    date: '2024-10-20T14:00:00Z',
    status: 'scheduled',
    notes: 'Focus on math performance and attendance improvement',
    outcome: undefined
  },
  {
    id: 'int-002',
    title: 'Study Skills Workshop',
    description: 'Attended workshop on effective study techniques and time management',
    mentor: 'Dr. Sarah Johnson',
    date: '2024-10-15T10:00:00Z',
    status: 'completed',
    notes: 'Student showed good engagement and asked relevant questions',
    outcome: 'Student implemented new study schedule and improved assignment completion rate'
  }
];

const generateMockNotifications = () => [
  {
    id: 'notif-001',
    message: 'Attendance dropped below 90% - consider scheduling a mentor meeting',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    type: 'warning',
    priority: 'high'
  },
  {
    id: 'notif-002',
    message: 'Your mentor sent you a new message about your math performance',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: false,
    type: 'info',
    priority: 'medium'
  },
  {
    id: 'notif-003',
    message: 'Math assignment due tomorrow - don\'t forget to submit',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    type: 'info',
    priority: 'medium'
  },
  {
    id: 'notif-004',
    message: 'Physics exam results are now available in your portal',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    type: 'success',
    priority: 'low'
  }
];

const generateMockMessages = () => [
  {
    id: 'msg-001',
    text: 'Hello Alex! I noticed your attendance has been improving. Keep up the great work!',
    sender: 'mentor',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    isDelivered: true,
    priority: 'low',
    category: 'general'
  },
  {
    id: 'msg-002',
    text: 'Thank you Dr. Johnson! I\'ve been trying to attend all classes.',
    sender: 'student',
    timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    isDelivered: true,
    priority: 'low',
    category: 'general'
  },
  {
    id: 'msg-003',
    text: 'That\'s excellent! How are you finding the math assignments?',
    sender: 'mentor',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    isDelivered: true,
    priority: 'medium',
    category: 'academic'
  },
  {
    id: 'msg-004',
    text: 'They\'re challenging but I\'m working through them. Could we schedule a tutoring session?',
    sender: 'student',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isRead: true,
    isDelivered: true,
    priority: 'high',
    category: 'academic'
  }
];

// API Service Functions
export const studentApi = {
  // Get student profile
  getProfile: async (studentId: string) => {
    // In real implementation, this would make an API call
    return generateMockStudentData();
  },

  // Get performance data
  getPerformance: async (studentId: string, startDate?: string, endDate?: string) => {
    return {
      attendance: generateMockAttendanceHistory(),
      scores: generateMockSubjectScores(),
      activity: generateMockActivityLogs()
    };
  },

  // Get risk analysis
  getRiskAnalysis: async (studentId: string) => {
    return {
      studentId,
      riskScore: 35,
      riskCategory: 'medium',
      explanations: generateMockRiskExplanations(),
      recommendations: generateMockRecommendations(),
      interventions: generateMockInterventions(),
      generatedAt: new Date().toISOString()
    };
  },

  // Get notifications
  getNotifications: async (unreadOnly: boolean = false) => {
    const notifications = generateMockNotifications();
    return unreadOnly ? notifications.filter(n => !n.read) : notifications;
  },

  // Mark notification as read
  markNotificationRead: async (notificationId: string) => {
    // In real implementation, this would make an API call
    return { success: true };
  },

  // Mark all notifications as read
  markAllNotificationsRead: async () => {
    // In real implementation, this would make an API call
    return { success: true };
  }
};

export const chatApi = {
  // Get chat history
  getChatHistory: async (studentId: string, limit: number = 100) => {
    return generateMockMessages();
  },

  // Send message
  sendMessage: async (message: string, attachments?: File[]) => {
    // In real implementation, this would make an API call
    return {
      id: `msg-${Date.now()}`,
      text: message,
      sender: 'student',
      timestamp: new Date().toISOString(),
      isRead: false,
      isDelivered: true
    };
  },

  // Send reaction
  sendReaction: async (messageId: string, emoji: string) => {
    // In real implementation, this would make an API call
    return { success: true };
  }
};

export const mlApi = {
  // Get risk prediction
  predictRisk: async (studentId: string, overrideFeatures?: Record<string, any>) => {
    // In real implementation, this would call the ML service
    return {
      studentId,
      score: 0.35,
      category: 'medium',
      topContributors: [
        { feature: 'attendance_rate', impact: 0.45 },
        { feature: 'math_score', impact: 0.30 }
      ],
      modelVersion: 'v20241015-01',
      explanation: {
        shap: [
          ['attendance_rate', 0.45],
          ['math_score', 0.30]
        ]
      }
    };
  },

  // Train model
  trainModel: async (algorithm: string = 'random_forest', hyperparams?: Record<string, any>) => {
    // In real implementation, this would trigger model training
    return {
      modelVersion: 'v20241015-02',
      accuracy: 0.87,
      message: 'Model training completed successfully'
    };
  },

  // Get model versions
  getModelVersions: async () => {
    return [
      {
        version: 'v20241015-02',
        accuracy: 0.87,
        trainedAt: new Date().toISOString(),
        status: 'active'
      },
      {
        version: 'v20241001-01',
        accuracy: 0.84,
        trainedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'archived'
      }
    ];
  }
};

export const mentorApi = {
  // Get mentor profile
  getMentorProfile: async (mentorId: string) => {
    return {
      id: mentorId,
      name: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      lastSeen: new Date().toISOString(),
      department: 'Computer Science',
      specialization: ['Machine Learning', 'Data Science', 'Academic Counseling'],
      rating: 4.8,
      totalStudents: 25
    };
  },

  // Schedule meeting
  scheduleMeeting: async (studentId: string, mentorId: string, dateTime: string, notes?: string) => {
    return {
      id: `meeting-${Date.now()}`,
      studentId,
      mentorId,
      dateTime,
      notes,
      status: 'scheduled'
    };
  }
};

export default api;
