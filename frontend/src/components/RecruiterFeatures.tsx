import React, { useState } from 'react';
import { Building2, Users, Filter, Search, CheckCircle, Star, MapPin, Calendar, Award, TrendingUp } from 'lucide-react';

interface RecruiterFeaturesProps {
  recruiterName: string;
  company: string;
}

export default function RecruiterFeatures({ recruiterName, company }: RecruiterFeaturesProps) {
  const [activeTab, setActiveTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    skills: [] as string[],
    gpa: '',
    experience: '',
    location: ''
  });

  const colleges = [
    { id: 1, name: 'University of Technology', location: 'New York', students: 2500, rating: 4.8 },
    { id: 2, name: 'Tech Institute', location: 'California', students: 1800, rating: 4.6 },
    { id: 3, name: 'Engineering College', location: 'Texas', students: 3200, rating: 4.7 },
    { id: 4, name: 'Computer Science University', location: 'Florida', students: 2100, rating: 4.9 }
  ];

  const students = [
    { 
      id: 1, 
      name: 'Alex Johnson', 
      college: 'University of Technology',
      gpa: 3.8, 
      skills: ['React', 'Node.js', 'Python', 'Machine Learning'],
      experience: '2 internships',
      verified: true,
      match: 95
    },
    { 
      id: 2, 
      name: 'Sarah Wilson', 
      college: 'Tech Institute',
      gpa: 3.9, 
      skills: ['Java', 'Spring Boot', 'AWS', 'Docker'],
      experience: '1 internship',
      verified: true,
      match: 88
    },
    { 
      id: 3, 
      name: 'Mike Chen', 
      college: 'Engineering College',
      gpa: 3.6, 
      skills: ['JavaScript', 'React', 'MongoDB', 'Git'],
      experience: '3 internships',
      verified: true,
      match: 92
    },
    { 
      id: 4, 
      name: 'Emma Davis', 
      college: 'Computer Science University',
      gpa: 3.7, 
      skills: ['Python', 'Django', 'PostgreSQL', 'Linux'],
      experience: '2 internships',
      verified: true,
      match: 85
    }
  ];

  const tabs = [
    { id: 'colleges', label: 'Colleges', icon: Building2 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'filters', label: 'Smart Filters', icon: Filter },
    { id: 'verified', label: 'Verified Data', icon: CheckCircle }
  ];

  const renderCollegesTab = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Building2 className="h-5 w-5 mr-2" />
          Partner Colleges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {colleges.map((college) => (
            <div key={college.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-lg">{college.name}</h4>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{college.rating}</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {college.location}
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <Users className="h-4 w-4 mr-1" />
                {college.students.toLocaleString()} students
              </div>
              <div className="flex space-x-2">
                <button className="btn-primary text-sm">View Students</button>
                <button className="btn-secondary text-sm">Contact</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Recruiter Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Verified Data</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Authentic student profiles
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Verified academic records
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Confirmed skill assessments
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Efficiency Benefits</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Smart filtering by skills
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Holistic student view
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Time-saving recruitment
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentsTab = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Student Profiles
        </h3>
        
        <div className="mb-6">
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search students by name, skills, or college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button className="btn-primary">
              <Search className="h-4 w-4 mr-2" />
              Search
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {students.map((student) => (
            <div key={student.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{student.name}</h4>
                    <p className="text-sm text-gray-600">{student.college}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{student.match}%</div>
                  <div className="text-xs text-gray-500">Match Score</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">GPA:</span>
                  <span className="ml-1 font-semibold">{student.gpa}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Experience:</span>
                  <span className="ml-1 font-semibold">{student.experience}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">Verified</span>
                </div>
              </div>
              
              <div className="mb-3">
                <span className="text-sm font-medium text-gray-600">Skills:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {student.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="btn-primary text-sm">View Full Profile</button>
                <button className="btn-secondary text-sm">Contact Student</button>
                <button className="btn-secondary text-sm">Schedule Interview</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFiltersTab = () => (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Filter className="h-5 w-5 mr-2" />
        Smart Filtering System
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Filter Options</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Skills Required</label>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'Machine Learning'].map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      const newSkills = selectedFilters.skills.includes(skill)
                        ? selectedFilters.skills.filter(s => s !== skill)
                        : [...selectedFilters.skills, skill];
                      setSelectedFilters({...selectedFilters, skills: newSkills});
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedFilters.skills.includes(skill)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Minimum GPA</label>
              <select 
                value={selectedFilters.gpa}
                onChange={(e) => setSelectedFilters({...selectedFilters, gpa: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Any GPA</option>
                <option value="3.5">3.5+</option>
                <option value="3.7">3.7+</option>
                <option value="3.9">3.9+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Experience Level</label>
              <select 
                value={selectedFilters.experience}
                onChange={(e) => setSelectedFilters({...selectedFilters, experience: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Any Experience</option>
                <option value="internship">Internship Experience</option>
                <option value="project">Project Experience</option>
                <option value="both">Both Internship & Project</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Location Preference</label>
              <select 
                value={selectedFilters.location}
                onChange={(e) => setSelectedFilters({...selectedFilters, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Any Location</option>
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Filter Benefits</h4>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h5 className="font-medium text-blue-900">Smart Filtering</h5>
              <p className="text-sm text-blue-700">AI-powered skill matching and candidate ranking</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h5 className="font-medium text-green-900">Holistic View</h5>
              <p className="text-sm text-green-700">Complete profile including curricular and co-curricular activities</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <h5 className="font-medium text-purple-900">Time Saving</h5>
              <p className="text-sm text-purple-700">Direct connection through single platform</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <h5 className="font-medium text-orange-900">Direct Connect</h5>
              <p className="text-sm text-orange-700">Seamless communication with qualified candidates</p>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="w-full btn-primary">Apply Filters</button>
            <button 
              onClick={() => setSelectedFilters({skills: [], gpa: '', experience: '', location: ''})}
              className="w-full btn-secondary mt-2"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVerifiedTab = () => (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <CheckCircle className="h-5 w-5 mr-2" />
        Verified Data & Quality Assurance
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Verification Process</h4>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <h5 className="font-medium">Academic Records</h5>
                <p className="text-sm text-gray-600">Verified through university systems</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <h5 className="font-medium">Skill Assessments</h5>
                <p className="text-sm text-gray-600">Validated through technical tests</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <h5 className="font-medium">Project Portfolio</h5>
                <p className="text-sm text-gray-600">Code review and project verification</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <h5 className="font-medium">Internship Records</h5>
                <p className="text-sm text-gray-600">Confirmed with previous employers</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Quality Metrics</h4>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-gray-600">Data Accuracy</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600">95%</div>
              <div className="text-sm text-gray-600">Profile Completeness</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-600">92%</div>
              <div className="text-sm text-gray-600">Recruiter Satisfaction</div>
            </div>
          </div>
          
          <div className="mt-6">
            <h5 className="font-semibold mb-2">Trust Indicators</h5>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                SSL encrypted data transmission
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Regular data audits
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                GDPR compliant
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Industry-standard security
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'colleges': return renderCollegesTab();
      case 'students': return renderStudentsTab();
      case 'filters': return renderFiltersTab();
      case 'verified': return renderVerifiedTab();
      default: return renderStudentsTab();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Recruiter Features</h2>
        <p className="text-gray-600">Advanced tools for efficient talent acquisition and candidate management</p>
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
