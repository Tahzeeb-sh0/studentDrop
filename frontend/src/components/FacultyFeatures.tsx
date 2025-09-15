import React, { useState } from 'react';
import { Users, Building2, GraduationCap, Trophy, Calendar, BarChart3, FileText, Award, BookOpen, UserCheck, Clock, CheckCircle, XCircle, AlertTriangle, Download, Eye, Edit, Plus } from 'lucide-react';

interface FacultyFeaturesProps {
  facultyName: string;
  department: string;
}

interface Student {
  id: number;
  name: string;
  rollNo: string;
  attendance: number;
  performance: string;
  gpa: number;
  lastSeen: string;
  status: 'present' | 'absent' | 'late';
}

interface Class {
  id: string;
  name: string;
  subject: string;
  time: string;
  room: string;
  students: number;
  status: 'active' | 'scheduled' | 'completed';
}

interface Event {
  id: number;
  title: string;
  type: 'meeting' | 'exam' | 'workshop' | 'conference';
  date: string;
  time: string;
  location: string;
  attendees: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export default function FacultyFeatures({ facultyName, department }: FacultyFeaturesProps) {
  const [activeTab, setActiveTab] = useState('students');
  const [selectedClass, setSelectedClass] = useState('CS-301');
  const [rollCallMode, setRollCallMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Alex Johnson', rollNo: 'CS-001', attendance: 95, performance: 'A+', gpa: 3.8, lastSeen: '2 hours ago', status: 'present' },
    { id: 2, name: 'Sarah Wilson', rollNo: 'CS-002', attendance: 88, performance: 'A', gpa: 3.7, lastSeen: '1 day ago', status: 'absent' },
    { id: 3, name: 'Mike Chen', rollNo: 'CS-003', attendance: 75, performance: 'B+', gpa: 3.2, lastSeen: '3 hours ago', status: 'late' },
    { id: 4, name: 'Emma Davis', rollNo: 'CS-004', attendance: 92, performance: 'A-', gpa: 3.6, lastSeen: '1 hour ago', status: 'present' },
    { id: 5, name: 'John Smith', rollNo: 'CS-005', attendance: 65, performance: 'C+', gpa: 2.8, lastSeen: '2 days ago', status: 'absent' },
    { id: 6, name: 'Lisa Brown', rollNo: 'CS-006', attendance: 90, performance: 'A', gpa: 3.5, lastSeen: '30 min ago', status: 'present' },
    { id: 7, name: 'David Lee', rollNo: 'CS-007', attendance: 82, performance: 'B', gpa: 3.1, lastSeen: '4 hours ago', status: 'present' },
    { id: 8, name: 'Maria Garcia', rollNo: 'CS-008', attendance: 78, performance: 'B-', gpa: 2.9, lastSeen: '1 day ago', status: 'absent' }
  ]);

  const [classes] = useState<Class[]>([
    { id: 'CS-301', name: 'Data Structures', subject: 'CS-301', time: '09:00 AM', room: 'Room 101', students: 45, status: 'active' },
    { id: 'CS-302', name: 'Algorithms', subject: 'CS-302', time: '11:00 AM', room: 'Room 102', students: 42, status: 'active' },
    { id: 'CS-303', name: 'Database Systems', subject: 'CS-303', time: '02:00 PM', room: 'Room 103', students: 38, status: 'scheduled' },
    { id: 'CS-304', name: 'Software Engineering', subject: 'CS-304', time: '04:00 PM', room: 'Room 104', students: 40, status: 'completed' }
  ]);

  const [events] = useState<Event[]>([
    { id: 1, title: 'Faculty Meeting', type: 'meeting', date: '2024-01-15', time: '3:00 PM', location: 'Conference Room A', attendees: 25, status: 'upcoming' },
    { id: 2, title: 'Midterm Exam - CS-301', type: 'exam', date: '2024-01-18', time: '10:00 AM', location: 'Room 101', attendees: 45, status: 'upcoming' },
    { id: 3, title: 'AI Workshop', type: 'workshop', date: '2024-01-20', time: '2:00 PM', location: 'Lab 201', attendees: 30, status: 'upcoming' },
    { id: 4, title: 'Curriculum Review', type: 'meeting', date: '2024-01-12', time: '10:00 AM', location: 'Dean\'s Office', attendees: 15, status: 'completed' }
  ]);

  const tabs = [
    { id: 'students', label: 'Students', icon: Users },
    { id: 'classes', label: 'Classes', icon: GraduationCap },
    { id: 'rollcall', label: 'Roll Call', icon: UserCheck },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'analysis', label: 'Analysis', icon: BarChart3 }
  ];

  const handleRollCallToggle = (studentId: number) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, status: student.status === 'present' ? 'absent' : 'present' }
        : student
    ));
  };

  const handleMarkAllPresent = () => {
    setStudents(students.map(student => ({ ...student, status: 'present' })));
  };

  const handleMarkAllAbsent = () => {
    setStudents(students.map(student => ({ ...student, status: 'absent' })));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-100';
      case 'absent': return 'text-red-600 bg-red-100';
      case 'late': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-4 w-4" />;
      case 'absent': return <XCircle className="h-4 w-4" />;
      case 'late': return <Clock className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const renderStudentsTab = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Student Management
          </h3>
          <div className="flex items-center space-x-2">
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>{cls.name} - {cls.subject}</option>
              ))}
            </select>
            <button 
              onClick={() => setRollCallMode(!rollCallMode)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                rollCallMode ? 'bg-red-500 text-white' : 'bg-primary-500 text-white'
              }`}
            >
              {rollCallMode ? 'Exit Roll Call' : 'Start Roll Call'}
            </button>
          </div>
        </div>

        {rollCallMode && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-blue-900">Roll Call Mode Active</h4>
              <div className="flex space-x-2">
                <button onClick={handleMarkAllPresent} className="btn-primary text-sm">
                  Mark All Present
                </button>
                <button onClick={handleMarkAllAbsent} className="btn-secondary text-sm">
                  Mark All Absent
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium">Date:</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <span className="text-sm text-gray-600">
                {students.filter(s => s.status === 'present').length} / {students.length} Present
              </span>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Roll No</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Attendance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Performance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">GPA</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Last Seen</th>
                {rollCallMode && <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>}
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono text-sm">{student.rollNo}</td>
                  <td className="py-3 px-4 font-medium">{student.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            student.attendance >= 90 ? 'bg-green-500' : 
                            student.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{width: `${student.attendance}%`}}
                        ></div>
                      </div>
                      <span className="text-sm">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.performance.startsWith('A') ? 'bg-green-100 text-green-800' :
                      student.performance.startsWith('B') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {student.performance}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">{student.gpa}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{student.lastSeen}</td>
                  {rollCallMode && (
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleRollCallToggle(student.id)}
                        className={`flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${getStatusColor(student.status)}`}
                      >
                        {getStatusIcon(student.status)}
                        <span className="ml-1 capitalize">{student.status}</span>
                      </button>
                    </td>
                  )}
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <UserCheck className="h-5 w-5 mr-2" />
          Faculty Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Easy Monitoring</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Real-time attendance tracking
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Performance analytics dashboard
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Spot weak students early
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Administrative Benefits</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                No paperwork required
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Easy performance reports
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                NAAC accreditation support
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClassesTab = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center">
            <GraduationCap className="h-5 w-5 mr-2" />
            Class Management
          </h3>
          <button className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Class
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls) => (
            <div key={cls.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-lg">{cls.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  cls.status === 'active' ? 'bg-green-100 text-green-800' :
                  cls.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {cls.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {cls.time}
                </div>
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2" />
                  {cls.room}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {cls.students} students
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <button className="btn-primary text-sm flex-1">View Students</button>
                <button className="btn-secondary text-sm">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Building2 className="h-5 w-5 mr-2" />
          Department Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{classes.length}</div>
            <div className="text-sm text-gray-600">Active Classes</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{students.length}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">87%</div>
            <div className="text-sm text-gray-600">Avg Attendance</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRollCallTab = () => (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <UserCheck className="h-5 w-5 mr-2" />
        Digital Roll Call System
      </h3>
      
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-blue-900">Quick Roll Call</h4>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Date:</span>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <span className="text-green-600 font-medium">
            ✓ {students.filter(s => s.status === 'present').length} Present
          </span>
          <span className="text-red-600 font-medium">
            ✗ {students.filter(s => s.status === 'absent').length} Absent
          </span>
          <span className="text-yellow-600 font-medium">
            ⏰ {students.filter(s => s.status === 'late').length} Late
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <div key={student.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-medium">{student.name}</h5>
              <span className="text-sm text-gray-500">{student.rollNo}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Attendance: {student.attendance}%</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                {student.status}
              </span>
            </div>
            <button
              onClick={() => handleRollCallToggle(student.id)}
              className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                student.status === 'present' 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {student.status === 'present' ? 'Mark Absent' : 'Mark Present'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button onClick={handleMarkAllPresent} className="btn-primary">
          Mark All Present
        </button>
        <button onClick={handleMarkAllAbsent} className="btn-secondary">
          Mark All Absent
        </button>
        <button className="btn-secondary flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Export Roll Call
        </button>
      </div>
    </div>
  );

  const renderLeaderboardTab = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Trophy className="h-5 w-5 mr-2" />
          Department Leaderboard
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                <Trophy className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Computer Science</h4>
                <p className="text-sm text-gray-600">Average Score: 87%</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-600">1st</div>
              <div className="text-sm text-gray-600">Rank</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Information Technology</h4>
                <p className="text-sm text-gray-600">Average Score: 82%</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-600">2nd</div>
              <div className="text-sm text-gray-600">Rank</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Electronics</h4>
                <p className="text-sm text-gray-600">Average Score: 79%</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">3rd</div>
              <div className="text-sm text-gray-600">Rank</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Award className="h-5 w-5 mr-2" />
          Top Performing Students
        </h3>
        <div className="space-y-3">
          {students.slice(0, 5).map((student, index) => (
            <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-400' : 
                  index === 2 ? 'bg-orange-500' : 'bg-gray-300'
                }`}>
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div>
                  <h5 className="font-medium">{student.name}</h5>
                  <p className="text-sm text-gray-600">{student.rollNo}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{student.performance}</div>
                <div className="text-sm text-gray-600">{student.gpa} GPA</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEventsTab = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Faculty Events
          </h3>
          <button className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Upcoming Events</h4>
            <div className="space-y-3">
              {events.filter(e => e.status === 'upcoming').map((event) => (
                <div key={event.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{event.title}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                      event.type === 'exam' ? 'bg-red-100 text-red-800' :
                      event.type === 'workshop' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees} attendees
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Recent Events</h4>
            <div className="space-y-3">
              {events.filter(e => e.status === 'completed').map((event) => (
                <div key={event.id} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{event.title}</h5>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Completed
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Performance Reports
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Generate Reports</h4>
            <div className="space-y-3">
              <button className="w-full btn-primary flex items-center justify-center">
                <FileText className="h-4 w-4 mr-2" />
                Class Performance Report
              </button>
              <button className="w-full btn-secondary flex items-center justify-center">
                <Users className="h-4 w-4 mr-2" />
                Attendance Summary
              </button>
              <button className="w-full btn-secondary flex items-center justify-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Student Progress Report
              </button>
              <button className="w-full btn-secondary flex items-center justify-center">
                <Award className="h-4 w-4 mr-2" />
                NAAC Accreditation Report
              </button>
              <button className="w-full btn-secondary flex items-center justify-center">
                <Trophy className="h-4 w-4 mr-2" />
                Department Leaderboard Report
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Recent Reports</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">CS-301 Performance Report</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">2 days ago</span>
                  <button className="text-primary-600 hover:text-primary-700">
                    <Download className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">Monthly Attendance Summary</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">1 week ago</span>
                  <button className="text-primary-600 hover:text-primary-700">
                    <Download className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">NAAC Report Q1</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">2 weeks ago</span>
                  <button className="text-primary-600 hover:text-primary-700">
                    <Download className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Report Analytics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">15</div>
            <div className="text-sm text-gray-600">Reports Generated</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">92%</div>
            <div className="text-sm text-gray-600">Report Accuracy</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">48</div>
            <div className="text-sm text-gray-600">Hours Saved</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalysisTab = () => (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <BarChart3 className="h-5 w-5 mr-2" />
        Easy Analysis Dashboard
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">92%</div>
          <div className="text-sm text-gray-600">Average Attendance</div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">85%</div>
          <div className="text-sm text-gray-600">Pass Rate</div>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">78%</div>
          <div className="text-sm text-gray-600">Student Satisfaction</div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Student Analysis Dashboard</h4>
        <div className="h-64 bg-white rounded border flex items-center justify-center">
          <p className="text-gray-500">Interactive analytics charts will be displayed here</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="font-semibold mb-3">Key Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <h5 className="font-medium text-green-900">Strong Performance</h5>
            <p className="text-sm text-green-700">75% of students are performing above average</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <h5 className="font-medium text-yellow-900">Attention Needed</h5>
            <p className="text-sm text-yellow-700">3 students require immediate intervention</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-blue-900">Attendance Trend</h5>
            <p className="text-sm text-blue-700">Attendance has improved by 5% this month</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <h5 className="font-medium text-purple-900">Engagement Level</h5>
            <p className="text-sm text-purple-700">High engagement in practical sessions</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'students': return renderStudentsTab();
      case 'classes': return renderClassesTab();
      case 'rollcall': return renderRollCallTab();
      case 'leaderboard': return renderLeaderboardTab();
      case 'events': return renderEventsTab();
      case 'reports': return renderReportsTab();
      case 'analysis': return renderAnalysisTab();
      default: return renderStudentsTab();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Faculty Features</h2>
        <p className="text-gray-600">Comprehensive tools for faculty management and student monitoring</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Active Tab Content */}
      {renderActiveTab()}
    </div>
  );
}