import React, { useState } from 'react';
import { QrCode, Upload, Brain, Trophy, Calendar, Target, BarChart3, Gift, Users, Award, Filter, Building2 } from 'lucide-react';

interface StudentFeaturesProps {
  studentId: string;
  studentName: string;
}

export default function StudentFeatures({ studentId, studentName }: StudentFeaturesProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [qrCode, setQrCode] = useState(`https://studentdrop.com/profile/${studentId}`);
  const [interests, setInterests] = useState(['Machine Learning', 'Web Development', 'Data Science']);
  const [mockTestScore, setMockTestScore] = useState(85);
  const [rewards, setRewards] = useState([
    { id: 1, title: 'Scholarship', amount: '$500', status: 'earned' },
    { id: 2, title: 'Event Pass', discount: '50%', status: 'available' }
  ]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: QrCode },
    { id: 'interests', label: 'Interests', icon: Target },
    { id: 'ai-twin', label: 'AI Twin', icon: Brain },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'mock-test', label: 'Mock Test', icon: BarChart3 },
    { id: 'analysis', label: 'Analysis', icon: BarChart3 },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'vision', label: 'Vision Board', icon: Target },
    { id: 'events', label: 'Events', icon: Calendar }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <QrCode className="h-5 w-5 mr-2" />
          Student Profile & QR Code
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="bg-gray-100 p-8 rounded-lg text-center mb-4">
              <div className="w-32 h-32 bg-white rounded-lg mx-auto flex items-center justify-center border-2 border-dashed border-gray-300">
                <QrCode className="h-16 w-16 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mt-2">QR Code</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">Profile Link:</span>
                <span className="text-sm text-blue-600">{qrCode}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">Student UID:</span>
                <span className="text-sm font-mono">{studentId}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Profile Benefits</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Verified profile (no running around)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Placement trust
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                AI guidance
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Long-term identity
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInterestsTab = () => (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Target className="h-5 w-5 mr-2" />
        Academic Interests & Skills
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Add Interest</label>
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Enter interest..." 
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button className="btn-primary">Add</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {interests.map((interest, index) => (
            <div key={index} className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
              <span className="text-primary-700 font-medium">{interest}</span>
              <button className="ml-2 text-red-500 hover:text-red-700">×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAITwinTab = () => (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Brain className="h-5 w-5 mr-2" />
        AI Twin Assistant
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto flex items-center justify-center mb-4">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-center mb-2">Your AI Twin</h4>
            <p className="text-sm text-gray-600 text-center">Personalized academic assistant</p>
          </div>
          <div className="space-y-3">
            <button className="w-full btn-primary">Chat with AI Twin</button>
            <button className="w-full btn-secondary">View Learning Path</button>
            <button className="w-full btn-secondary">Get Study Recommendations</button>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">AI Guidance Features</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Personalized study plans
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Career path recommendations
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Skill gap analysis
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              24/7 academic support
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderUploadTab = () => (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Upload className="h-5 w-5 mr-2" />
        Document Upload
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Upload Pictures or PDFs</p>
            <button className="btn-primary">Choose Files</button>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Recent Uploads</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Resume.pdf</span>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Profile Picture.jpg</span>
              <span className="text-xs text-gray-500">1 week ago</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Certificates.pdf</span>
              <span className="text-xs text-gray-500">2 weeks ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMockTestTab = () => (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <BarChart3 className="h-5 w-5 mr-2" />
        Mock Tests & Assessments
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg mb-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{mockTestScore}%</div>
              <p className="text-gray-600">Latest Mock Test Score</p>
            </div>
          </div>
          <div className="space-y-3">
            <button className="w-full btn-primary">Take New Mock Test</button>
            <button className="w-full btn-secondary">View Test History</button>
            <button className="w-full btn-secondary">Practice Questions</button>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Available Tests</h4>
          <div className="space-y-3">
            <div className="p-3 border border-gray-200 rounded-lg">
              <h5 className="font-medium">Technical Aptitude</h5>
              <p className="text-sm text-gray-600">50 questions • 60 minutes</p>
              <div className="mt-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg">
              <h5 className="font-medium">Logical Reasoning</h5>
              <p className="text-sm text-gray-600">40 questions • 45 minutes</p>
              <div className="mt-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
              </div>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg">
              <h5 className="font-medium">Communication Skills</h5>
              <p className="text-sm text-gray-600">30 questions • 30 minutes</p>
              <div className="mt-2">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Scheduled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalysisTab = () => (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <BarChart3 className="h-5 w-5 mr-2" />
        Performance Analysis
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">85%</div>
          <div className="text-sm text-gray-600">Overall Performance</div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">92%</div>
          <div className="text-sm text-gray-600">Technical Skills</div>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">78%</div>
          <div className="text-sm text-gray-600">Soft Skills</div>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Visualized Data</h4>
        <div className="h-64 bg-white rounded border flex items-center justify-center">
          <p className="text-gray-500">Interactive charts and graphs will be displayed here</p>
        </div>
      </div>
    </div>
  );

  const renderRewardsTab = () => (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Gift className="h-5 w-5 mr-2" />
        Rewards & Benefits
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Available Rewards</h4>
          <div className="space-y-3">
            {rewards.map((reward) => (
              <div key={reward.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">{reward.title}</h5>
                    {reward.amount && <p className="text-green-600 font-semibold">{reward.amount}</p>}
                    {reward.discount && <p className="text-blue-600 font-semibold">{reward.discount} off</p>}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    reward.status === 'earned' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {reward.status === 'earned' ? 'Earned' : 'Available'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Reward Benefits</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Scholarships for top performers
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Discounted event passes
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Exclusive workshop access
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Priority placement opportunities
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderVisionBoardTab = () => (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Target className="h-5 w-5 mr-2" />
        Vision Board & Goals
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Add Goal</label>
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Enter your goal..." 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="btn-primary">Add</button>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <h5 className="font-medium">Become a Full-Stack Developer</h5>
              <p className="text-sm text-gray-600">Target: 6 months</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
                <span className="text-xs text-gray-500">60% complete</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <h5 className="font-medium">Get Internship at Tech Company</h5>
              <p className="text-sm text-gray-600">Target: 3 months</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '30%'}}></div>
                </div>
                <span className="text-xs text-gray-500">30% complete</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Achievement Timeline</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium">Completed Web Development Course</p>
                <p className="text-xs text-gray-500">2 weeks ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">1</span>
              </div>
              <div>
                <p className="text-sm font-medium">Build Portfolio Website</p>
                <p className="text-xs text-gray-500">In progress</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm">2</span>
              </div>
              <div>
                <p className="text-sm font-medium">Apply for Internships</p>
                <p className="text-xs text-gray-500">Upcoming</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEventsTab = () => (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Calendar className="h-5 w-5 mr-2" />
        Upcoming Events
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3">This Week</h4>
          <div className="space-y-3">
            <div className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">Tech Talk: AI in Web Development</h5>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Today</span>
              </div>
              <p className="text-sm text-gray-600">2:00 PM - 3:30 PM</p>
              <p className="text-xs text-gray-500">Room 101</p>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">Mock Interview Session</h5>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Tomorrow</span>
              </div>
              <p className="text-sm text-gray-600">10:00 AM - 12:00 PM</p>
              <p className="text-xs text-gray-500">Career Center</p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">This Month</h4>
          <div className="space-y-3">
            <div className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">Hackathon 2024</h5>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Next Week</span>
              </div>
              <p className="text-sm text-gray-600">48-hour coding competition</p>
              <p className="text-xs text-gray-500">Main Campus</p>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">Career Fair</h5>
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">2 weeks</span>
              </div>
              <p className="text-sm text-gray-600">Meet top recruiters</p>
              <p className="text-xs text-gray-500">Convention Center</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'interests': return renderInterestsTab();
      case 'ai-twin': return renderAITwinTab();
      case 'upload': return renderUploadTab();
      case 'mock-test': return renderMockTestTab();
      case 'analysis': return renderAnalysisTab();
      case 'rewards': return renderRewardsTab();
      case 'vision': return renderVisionBoardTab();
      case 'events': return renderEventsTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Student Features</h2>
        <p className="text-gray-600">Comprehensive tools for academic success and career development</p>
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
