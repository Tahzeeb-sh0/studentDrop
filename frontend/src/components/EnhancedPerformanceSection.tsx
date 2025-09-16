import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Activity,
  Target,
  Award,
  FileText,
  Users,
  BarChart3
} from 'lucide-react';

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

interface EnhancedPerformanceSectionProps {
  attendanceHistory: AttendanceData[];
  subjectScores: ScoreData[];
  activityLogs: ActivityLog[];
  onViewDetails?: (type: string, data: any) => void;
}

const EnhancedPerformanceSection: React.FC<EnhancedPerformanceSectionProps> = ({
  attendanceHistory,
  subjectScores,
  activityLogs,
  onViewDetails
}) => {
  const [activeChart, setActiveChart] = useState<'attendance' | 'scores' | 'radar'>('attendance');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'semester'>('month');

  // Calculate statistics
  const avgAttendance = attendanceHistory.reduce((sum, item) => sum + item.attendance, 0) / attendanceHistory.length;
  const avgScore = subjectScores.reduce((sum, item) => sum + item.percentage, 0) / subjectScores.length;
  const totalActivities = activityLogs.length;
  const completedActivities = activityLogs.filter(log => log.status === 'completed').length;
  const pendingActivities = activityLogs.filter(log => log.status === 'pending').length;

  // Prepare radar chart data
  const radarData = [
    { subject: 'Mathematics', score: subjectScores.find(s => s.subject === 'Mathematics')?.percentage || 0, fullMark: 100 },
    { subject: 'Physics', score: subjectScores.find(s => s.subject === 'Physics')?.percentage || 0, fullMark: 100 },
    { subject: 'Chemistry', score: subjectScores.find(s => s.subject === 'Chemistry')?.percentage || 0, fullMark: 100 },
    { subject: 'Biology', score: subjectScores.find(s => s.subject === 'Biology')?.percentage || 0, fullMark: 100 },
    { subject: 'English', score: subjectScores.find(s => s.subject === 'English')?.percentage || 0, fullMark: 100 },
    { subject: 'History', score: subjectScores.find(s => s.subject === 'History')?.percentage || 0, fullMark: 100 }
  ];

  // Prepare pie chart data for activity distribution
  const activityDistribution = activityLogs.reduce((acc, log) => {
    acc[log.type] = (acc[log.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(activityDistribution).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
    color: getActivityColor(type)
  }));

  function getActivityColor(type: string): string {
    const colors: Record<string, string> = {
      assignment: '#3B82F6',
      exam: '#EF4444',
      library: '#10B981',
      meeting: '#F59E0B',
      login: '#8B5CF6',
      submission: '#06B6D4',
      event: '#EC4899'
    };
    return colors[type] || '#6B7280';
  }

  function getActivityIcon(type: string) {
    const icons: Record<string, any> = {
      assignment: FileText,
      exam: BookOpen,
      library: BookOpen,
      meeting: Users,
      login: Activity,
      submission: CheckCircle,
      event: Award
    };
    const Icon = icons[type] || Activity;
    return <Icon className="w-4 h-4" />;
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }

  function getPriorityColor(priority: string) {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  }

  function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border-l-4 border-blue-500 flex flex-col min-h-[160px]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center space-x-1">
              {avgAttendance >= 90 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 break-words leading-tight">
            <span className="truncate inline-block max-w-full align-bottom">{avgAttendance.toFixed(1)}%</span>
          </h3>
          <p className="text-gray-600 text-sm">Average Attendance</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border-l-4 border-green-500 flex flex-col min-h-[160px]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center space-x-1">
              {avgScore >= 80 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 break-words leading-tight">
            <span className="truncate inline-block max-w-full align-bottom">{avgScore.toFixed(1)}%</span>
          </h3>
          <p className="text-gray-600 text-sm">Average Score</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border-l-4 border-purple-500 flex flex-col min-h-[160px]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Completed</div>
              <div className="text-lg font-bold text-purple-600 break-words leading-tight">
                <span className="truncate inline-block max-w-[12ch] align-bottom">{completedActivities}/{totalActivities}</span>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 break-words leading-tight">
            <span className="truncate inline-block max-w-full align-bottom">{totalActivities}</span>
          </h3>
          <p className="text-gray-600 text-sm">Total Activities</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border-l-4 border-orange-500 flex flex-col min-h-[160px]">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Pending</div>
              <div className="text-lg font-bold text-orange-600 break-words leading-tight">
                <span className="truncate inline-block max-w-[8ch] align-bottom">{pendingActivities}</span>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 break-words leading-tight">
            <span className="truncate inline-block max-w-full align-bottom">{Math.round((completedActivities / totalActivities) * 100)}%</span>
          </h3>
          <p className="text-gray-600 text-sm">Completion Rate</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Performance Analytics</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveChart('attendance')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeChart === 'attendance'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Attendance
            </button>
            <button
              onClick={() => setActiveChart('scores')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeChart === 'scores'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Scores
            </button>
            <button
              onClick={() => setActiveChart('radar')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeChart === 'radar'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Subject Analysis
            </button>
          </div>
        </div>

        <div className="h-80">
          {activeChart === 'attendance' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="attendance"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {activeChart === 'scores' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectScores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="percentage" 
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeChart === 'radar' && (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Overdue</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {activityLogs.slice(0, 10).map((log, index) => (
            <div
              key={log.id}
              className={`flex items-start space-x-4 p-4 rounded-xl border-l-4 ${getPriorityColor(log.priority)} hover:bg-gray-50 transition-colors cursor-pointer`}
              onClick={() => onViewDetails?.('activity', log)}
            >
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(log.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {log.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                    {log.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{log.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(log.timestamp)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{log.category}</span>
                    {log.points && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        +{log.points} pts
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activityLogs.length > 10 && (
          <div className="text-center mt-6">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View all activities ({activityLogs.length})
            </button>
          </div>
        )}
      </div>

      {/* Activity Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h3>
          <div className="space-y-4">
            {subjectScores.map((subject) => (
              <div
                key={subject.subject}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => onViewDetails?.('subject', subject)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">{subject.subject}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {subject.percentage}%
                    </div>
                    <div className="text-xs text-gray-500">
                      Rank {subject.rank}/{subject.totalStudents}
                    </div>
                  </div>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPerformanceSection;
