import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Calendar, BookOpen, AlertTriangle, CheckCircle, Clock, Target } from 'lucide-react';

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

interface EnhancedWelcomePanelProps {
  student: StudentData;
  onViewDetails?: (metric: string) => void;
}

const EnhancedWelcomePanel: React.FC<EnhancedWelcomePanelProps> = ({
  student,
  onViewDetails
}) => {
  const [animatedValues, setAnimatedValues] = useState({
    attendance: 0,
    averageScore: 0,
    riskPercentage: 0,
    gpa: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate counters
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const animateValue = (start: number, end: number, callback: (value: number) => void) => {
      let current = start;
      const increment = (end - start) / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        callback(Math.round(current * 100) / 100);
      }, stepDuration);
    };

    setTimeout(() => {
      animateValue(0, student.attendance, (value) => 
        setAnimatedValues(prev => ({ ...prev, attendance: value }))
      );
      animateValue(0, student.averageScore, (value) => 
        setAnimatedValues(prev => ({ ...prev, averageScore: value }))
      );
      animateValue(0, student.riskPercentage, (value) => 
        setAnimatedValues(prev => ({ ...prev, riskPercentage: value }))
      );
      animateValue(0, student.gpa, (value) => 
        setAnimatedValues(prev => ({ ...prev, gpa: value }))
      );
    }, 300);
  }, [student]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      case 'medium': return <Clock className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getAttendanceTrend = (attendance: number) => {
    if (attendance >= 90) return { icon: TrendingUp, color: 'text-green-600', text: 'Excellent' };
    if (attendance >= 80) return { icon: TrendingUp, color: 'text-green-500', text: 'Good' };
    if (attendance >= 70) return { icon: TrendingDown, color: 'text-yellow-500', text: 'Needs Improvement' };
    return { icon: TrendingDown, color: 'text-red-500', text: 'Critical' };
  };

  const attendanceTrend = getAttendanceTrend(animatedValues.attendance);

  return (
    <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Hello, {student.name}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Here's your academic snapshot for {student.semester} {student.year}
            </p>
            <div className="flex items-center mt-2 text-sm text-blue-200">
              <Calendar className="w-4 h-4 mr-1" />
              Last active: {new Date(student.lastLogin).toLocaleDateString()}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{student.department}</div>
            <div className="text-blue-200">Year {student.year}</div>
          </div>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Attendance Card */}
        <div 
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-blue-500 flex flex-col min-h-[180px]"
          onClick={() => onViewDetails?.('attendance')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center space-x-1">
              <attendanceTrend.icon className={`w-4 h-4 ${attendanceTrend.color}`} />
              <span className={`text-sm font-medium ${attendanceTrend.color}`}>
                {attendanceTrend.text}
              </span>
            </div>
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-2xl font-bold text-gray-900 break-words leading-tight">
              <span className="truncate inline-block max-w-full align-bottom">{animatedValues.attendance}%</span>
            </h3>
            <p className="text-gray-600 text-sm">Attendance Rate</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${animatedValues.attendance}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Average Score Card */}
        <div 
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-green-500 flex flex-col min-h-[180px]"
          onClick={() => onViewDetails?.('scores')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">GPA</div>
              <div className="text-lg font-bold text-green-600 break-words leading-tight">
                <span className="truncate inline-block max-w-[8ch] align-bottom">{animatedValues.gpa.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-2xl font-bold text-gray-900 break-words leading-tight">
              <span className="truncate inline-block max-w-full align-bottom">{animatedValues.averageScore}%</span>
            </h3>
            <p className="text-gray-600 text-sm">Average Score</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Rank: {student.rank}/{student.totalStudents}</span>
              <span className="text-green-600 font-medium">
                {student.completedAssignments} completed
              </span>
            </div>
          </div>
        </div>

        {/* Risk Level Card */}
        <div 
          className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 flex flex-col min-h-[180px] ${
            student.riskLevel === 'high' ? 'border-red-500' : 
            student.riskLevel === 'medium' ? 'border-orange-500' : 'border-green-500'
          }`}
          onClick={() => onViewDetails?.('risk')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${
              student.riskLevel === 'high' ? 'bg-red-100' : 
              student.riskLevel === 'medium' ? 'bg-orange-100' : 'bg-green-100'
            }`}>
              {getRiskIcon(student.riskLevel)}
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(student.riskLevel)}`}>
              {student.riskLevel.toUpperCase()}
            </div>
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-2xl font-bold text-gray-900 break-words leading-tight">
              <span className="truncate inline-block max-w-full align-bottom">{animatedValues.riskPercentage}%</span>
            </h3>
            <p className="text-gray-600 text-sm">Dropout Risk</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  student.riskLevel === 'high' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                  student.riskLevel === 'medium' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                  'bg-gradient-to-r from-green-500 to-green-600'
                }`}
                style={{ width: `${animatedValues.riskPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div 
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-purple-500 flex flex-col min-h-[180px]"
          onClick={() => onViewDetails?.('progress')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Credits</div>
              <div className="text-lg font-bold text-purple-600 break-words leading-tight">
                <span className="truncate inline-block max-w-[8ch] align-bottom">{student.totalCredits}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-2xl font-bold text-gray-900 break-words leading-tight">
              <span className="truncate inline-block max-w-full align-bottom">{student.completedAssignments}</span>
            </h3>
            <p className="text-gray-600 text-sm">Completed Assignments</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-orange-600 font-medium">
                {student.pendingAssignments} pending
              </span>
              <span className="text-blue-600 font-medium">
                {student.upcomingExams} exams
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors min-h-[56px]">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">View Grades</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors min-h-[56px]">
            <Calendar className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">Schedule Meeting</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors min-h-[56px]">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">Risk Analysis</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors min-h-[56px]">
            <Target className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Set Goals</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedWelcomePanel;
