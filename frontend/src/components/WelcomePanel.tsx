import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface WelcomePanelProps {
  studentName: string;
  attendance: number;
  averageScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  riskPercentage: number;
}

export default function WelcomePanel({ 
  studentName, 
  attendance, 
  averageScore, 
  riskLevel, 
  riskPercentage 
}: WelcomePanelProps) {
  // Data for attendance pie chart
  const attendanceData = [
    { name: 'Present', value: attendance, color: '#22c55e' },
    { name: 'Absent', value: 100 - attendance, color: '#ef4444' }
  ];

  // Data for subjects bar chart
  const subjectsData = [
    { subject: 'Math', score: 85 },
    { subject: 'Science', score: 78 },
    { subject: 'English', score: 92 },
    { subject: 'History', score: 88 },
    { subject: 'Art', score: 95 }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-success-600 bg-success-100';
      case 'medium': return 'text-warning-600 bg-warning-100';
      case 'high': return 'text-danger-600 bg-danger-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return '✅';
      case 'medium': return '⚠️';
      case 'high': return '🚨';
      default: return '❓';
    }
  };

  return (
    <div className="pt-20 pb-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Hello, {studentName} 👋
        </h1>
        <p className="text-lg text-gray-600">
          Welcome to your personalized student dashboard
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Attendance Card */}
        <div className="card hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Attendance</h3>
            <span className="text-2xl">📅</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-20 h-20">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={35}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{attendance}%</div>
              <div className="text-sm text-gray-500">Current</div>
            </div>
          </div>
        </div>

        {/* Average Score Card */}
        <div className="card hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Average Score</h3>
            <span className="text-2xl">📊</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-20 h-20">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectsData.slice(0, 3)}>
                  <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{averageScore}%</div>
              <div className="text-sm text-gray-500">Overall</div>
            </div>
          </div>
        </div>

        {/* Risk Level Card */}
        <div className="card hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Risk Level</h3>
            <span className="text-2xl">{getRiskIcon(riskLevel)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(riskLevel)}`}>
                {riskLevel.toUpperCase()}
              </div>
              <div className="text-xs text-gray-500 mt-1">Risk Level</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{riskPercentage}%</div>
              <div className="text-sm text-gray-500">Risk Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl font-bold text-primary-600">12</div>
          <div className="text-sm text-gray-600">Active Courses</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl font-bold text-success-600">8</div>
          <div className="text-sm text-gray-600">Assignments Due</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl font-bold text-warning-600">3</div>
          <div className="text-sm text-gray-600">Upcoming Exams</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl font-bold text-primary-600">15</div>
          <div className="text-sm text-gray-600">Days to Graduation</div>
        </div>
      </div>
    </div>
  );
}
