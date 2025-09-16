import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Brain,
  Target,
  BookOpen,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Info,
  Lightbulb,
  BarChart3,
  Activity,
  Zap,
  Shield,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';

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

interface EnhancedRiskPredictionProps {
  riskScore: number;
  riskCategory: 'low' | 'medium' | 'high';
  explanations: RiskExplanation[];
  recommendations: Recommendation[];
  interventions: Intervention[];
  onViewDetails?: (type: string, data: any) => void;
  onTakeAction?: (recommendation: Recommendation) => void;
  onScheduleIntervention?: () => void;
}

const EnhancedRiskPrediction: React.FC<EnhancedRiskPredictionProps> = ({
  riskScore,
  riskCategory,
  explanations,
  recommendations,
  interventions,
  onViewDetails,
  onTakeAction,
  onScheduleIntervention
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'explanations' | 'recommendations' | 'interventions'>('overview');
  const [selectedFactor, setSelectedFactor] = useState<string | null>(null);
  const [showWhatIf, setShowWhatIf] = useState(false);
  const [whatIfValues, setWhatIfValues] = useState<Record<string, number>>({});

  // Calculate risk trend (mock data for demonstration)
  const riskTrend = [
    { week: 'Week 1', risk: 25 },
    { week: 'Week 2', risk: 30 },
    { week: 'Week 3', risk: 35 },
    { week: 'Week 4', risk: 40 },
    { week: 'Week 5', risk: 45 },
    { week: 'Week 6', risk: 50 },
    { week: 'Week 7', risk: 55 },
    { week: 'Week 8', risk: riskScore }
  ];

  // Prepare SHAP waterfall data
  const waterfallData = explanations.map((exp, index) => ({
    factor: exp.factor,
    contribution: exp.contribution,
    cumulative: explanations.slice(0, index + 1).reduce((sum, e) => sum + e.contribution, 0),
    color: exp.direction === 'increase' ? '#EF4444' : '#10B981'
  }));

  // Prepare category distribution
  const categoryData = explanations.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + Math.abs(exp.contribution);
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData).map(([category, value]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value,
    color: getCategoryColor(category)
  }));

  function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      academic: '#3B82F6',
      attendance: '#10B981',
      behavioral: '#F59E0B',
      demographic: '#8B5CF6'
    };
    return colors[category] || '#6B7280';
  }

  function getRiskColor(level: string) {
    switch (level) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-orange-50 border-orange-200';
      default: return 'bg-green-50 border-green-200';
    }
  }

  function getRiskIcon(level: string) {
    switch (level) {
      case 'high': return <AlertTriangle className="w-6 h-6" />;
      case 'medium': return <Clock className="w-6 h-6" />;
      default: return <CheckCircle className="w-6 h-6" />;
    }
  }

  function getPriorityColor(priority: string) {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  }

  function getImpactColor(impact: string) {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  }

  function getEffortColor(effort: string) {
    switch (effort) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
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

  const calculateWhatIfRisk = () => {
    // Simple what-if calculation (in real implementation, this would call the ML model)
    let newRisk = riskScore;
    Object.entries(whatIfValues).forEach(([factor, value]) => {
      const explanation = explanations.find(exp => exp.factor === factor);
      if (explanation) {
        const improvement = value - explanation.currentValue;
        newRisk += (improvement * explanation.contribution) / 100;
      }
    });
    return Math.max(0, Math.min(100, newRisk));
  };

  return (
    <div className="space-y-6">
      {/* Risk Overview Card */}
      <div className={`bg-white rounded-2xl p-6 shadow-md ${getRiskColor(riskCategory)} border-2`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white rounded-xl">
              {getRiskIcon(riskCategory)}
            </div>
            <div>
              <h2 className="text-2xl font-bold">Dropout Risk Analysis</h2>
              <p className="text-gray-600">AI-powered prediction with explanations</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold break-words leading-tight">
              <span className="truncate inline-block max-w-[10ch] align-bottom">{riskScore}%</span>
            </div>
            <div className="text-sm text-gray-600">Risk Score</div>
          </div>
        </div>

        {/* Risk Meter */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Risk Level</span>
            <span className="text-sm font-medium text-gray-700">{riskCategory.toUpperCase()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all duration-1000 ${
                riskCategory === 'high' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                riskCategory === 'medium' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                'bg-gradient-to-r from-green-500 to-green-600'
              }`}
              style={{ width: `${riskScore}%` }}
            ></div>
          </div>
        </div>

        {/* Risk Trend */}
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={riskTrend}>
              <Area
                type="monotone"
                dataKey="risk"
                stroke={riskCategory === 'high' ? '#EF4444' : riskCategory === 'medium' ? '#F59E0B' : '#10B981'}
                fill={riskCategory === 'high' ? '#FEE2E2' : riskCategory === 'medium' ? '#FEF3C7' : '#D1FAE5'}
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'explanations', label: 'AI Explanations', icon: Brain },
            { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
            { id: 'interventions', label: 'Interventions', icon: Target }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-gray-900">{explanations.length}</div>
                <div className="text-sm text-gray-600">Risk Factors</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-gray-900">{recommendations.length}</div>
                <div className="text-sm text-gray-600">Recommendations</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-gray-900">{interventions.length}</div>
                <div className="text-sm text-gray-600">Interventions</div>
              </div>
            </div>

            {/* Factor Categories */}
            <div className="h-64">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factor Categories</h3>
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
        )}

        {activeTab === 'explanations' && (
          <div className="space-y-6">
            {/* SHAP Waterfall Chart */}
            <div className="h-64">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Contributions (SHAP)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waterfallData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="factor" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="contribution" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Explanations */}
            <div className="space-y-4">
              {explanations.map((explanation, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-l-4 ${getPriorityColor(explanation.impact)} hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => setSelectedFactor(explanation.factor)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{explanation.factor}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        explanation.direction === 'increase' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {explanation.direction === 'increase' ? '+' : '-'}{Math.abs(explanation.contribution).toFixed(1)}%
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        explanation.impact === 'high' ? 'bg-red-100 text-red-700' :
                        explanation.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {explanation.impact}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{explanation.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Current: {explanation.currentValue}</span>
                    {explanation.recommendedValue && (
                      <span className="text-blue-600">Recommended: {explanation.recommendedValue}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            {/* What-if Analysis */}
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">What-if Analysis</h3>
                <button
                  onClick={() => setShowWhatIf(!showWhatIf)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {showWhatIf ? 'Hide' : 'Show'} Simulator
                </button>
              </div>
              {showWhatIf && (
                <div className="space-y-4">
                  {explanations.map((explanation) => (
                    <div key={explanation.factor} className="flex items-center space-x-4">
                      <label className="w-32 text-sm font-medium text-gray-700">
                        {explanation.factor}:
                      </label>
                      <input
                        type="number"
                        value={whatIfValues[explanation.factor] || explanation.currentValue}
                        onChange={(e) => setWhatIfValues(prev => ({
                          ...prev,
                          [explanation.factor]: parseFloat(e.target.value)
                        }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      New Risk: {calculateWhatIfRisk().toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Change: {(calculateWhatIfRisk() - riskScore).toFixed(1)}%
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Recommendations List */}
            <div className="space-y-4">
              {recommendations.map((recommendation) => (
                <div
                  key={recommendation.id}
                  className={`p-4 rounded-xl border-l-4 ${getPriorityColor(recommendation.priority)} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{recommendation.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        recommendation.priority === 'high' ? 'bg-red-100 text-red-700' :
                        recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {recommendation.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        recommendation.effort === 'high' ? 'bg-red-100 text-red-700' :
                        recommendation.effort === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {recommendation.effort} effort
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Impact: {recommendation.estimatedImpact}%</span>
                      <span>Timeline: {recommendation.timeline}</span>
                      <span>Category: {recommendation.category}</span>
                    </div>
                    <button
                      onClick={() => onTakeAction?.(recommendation)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Take Action
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'interventions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Intervention History</h3>
              <button
                onClick={onScheduleIntervention}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Schedule New
              </button>
            </div>

            <div className="space-y-4">
              {interventions.map((intervention) => (
                <div
                  key={intervention.id}
                  className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{intervention.title}</h4>
                      <p className="text-sm text-gray-600">{intervention.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      intervention.status === 'completed' ? 'bg-green-100 text-green-700' :
                      intervention.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {intervention.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                    <span>Mentor: {intervention.mentor}</span>
                    <span>Date: {new Date(intervention.date).toLocaleDateString()}</span>
                  </div>
                  {intervention.notes && (
                    <div className="mt-2 p-2 bg-white rounded border text-sm text-gray-600">
                      {intervention.notes}
                    </div>
                  )}
                  {intervention.outcome && (
                    <div className="mt-2 p-2 bg-green-50 rounded border text-sm text-green-700">
                      <strong>Outcome:</strong> {intervention.outcome}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedRiskPrediction;
