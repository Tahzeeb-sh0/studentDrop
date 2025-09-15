import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Clock, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

interface PerformanceSectionProps {
  attendanceHistory: Array<{
    week: string;
    attendance: number;
  }>;
  subjectScores: Array<{
    subject: string;
    score: number;
  }>;
  activityLogs: Array<{
    id: number;
    type: 'assignment' | 'exam' | 'attendance' | 'library' | 'meeting';
    description: string;
    timestamp: string;
    status: 'completed' | 'pending' | 'overdue';
  }>;
}

export default function PerformanceSection({ 
  attendanceHistory, 
  subjectScores, 
  activityLogs 
}: PerformanceSectionProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <BookOpen className="h-4 w-4" />;
      case 'exam': return <AlertCircle className="h-4 w-4" />;
      case 'attendance': return <CheckCircle className="h-4 w-4" />;
      case 'library': return <BookOpen className="h-4 w-4" />;
      case 'meeting': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success-600 bg-success-100';
      case 'pending': return 'text-warning-600 bg-warning-100';
      case 'overdue': return 'text-danger-600 bg-danger-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return '#22c55e';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Performance Overview</h2>
        <p className="text-gray-600">Track your academic progress and activities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance History Chart */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">📈</span>
            Attendance History
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="week" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Scores Chart */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">📊</span>
            Subject Scores
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectScores}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="subject" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="score" 
                  radius={[4, 4, 0, 0]}
                  fill={(entry: any) => getScoreColor(entry.score)}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Activity Logs Timeline */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="mr-2">📋</span>
          Recent Activity Timeline
        </h3>
        <div className="space-y-4">
          {activityLogs.map((log, index) => (
            <div key={log.id} className="flex items-start space-x-4">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-full ${getStatusColor(log.status)}`}>
                  {getActivityIcon(log.type)}
                </div>
                {index < activityLogs.length - 1 && (
                  <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                )}
              </div>
              
              {/* Activity content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{log.description}</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(log.status)}`}>
                    {log.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
