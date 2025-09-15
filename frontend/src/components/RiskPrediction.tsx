import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

interface RiskPredictionProps {
  riskScore: number;
  riskCategory: 'low' | 'medium' | 'high';
  explanations: Array<{
    factor: string;
    contribution: number;
    description: string;
  }>;
  suggestions: Array<{
    id: number;
    action: string;
    priority: 'high' | 'medium' | 'low';
    description: string;
  }>;
}

export default function RiskPrediction({ 
  riskScore, 
  riskCategory, 
  explanations, 
  suggestions 
}: RiskPredictionProps) {
  const getRiskColor = (category: string) => {
    switch (category) {
      case 'low': return 'text-success-600 bg-success-100 border-success-200';
      case 'medium': return 'text-warning-600 bg-warning-100 border-warning-200';
      case 'high': return 'text-danger-600 bg-danger-100 border-danger-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getProgressColor = (category: string) => {
    switch (category) {
      case 'low': return 'bg-success-500';
      case 'medium': return 'bg-warning-500';
      case 'high': return 'bg-danger-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-danger-600 bg-danger-100';
      case 'medium': return 'text-warning-600 bg-warning-100';
      case 'low': return 'text-success-600 bg-success-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (category: string) => {
    switch (category) {
      case 'low': return <CheckCircle className="h-6 w-6 text-success-600" />;
      case 'medium': return <AlertTriangle className="h-6 w-6 text-warning-600" />;
      case 'high': return <TrendingUp className="h-6 w-6 text-danger-600" />;
      default: return <TrendingDown className="h-6 w-6 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Risk Analysis</h2>
        <p className="text-gray-600">AI-powered dropout risk assessment and recommendations</p>
      </div>

      {/* Risk Score Card */}
      <div className="card">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            {getRiskIcon(riskCategory)}
            <h3 className="text-2xl font-bold text-gray-900 ml-3">Risk Assessment</h3>
          </div>
          
          <div className="mb-6">
            <div className="text-6xl font-bold text-gray-900 mb-2">{riskScore}%</div>
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold border-2 ${getRiskColor(riskCategory)}`}>
              {riskCategory.toUpperCase()} RISK
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div 
              className={`h-4 rounded-full transition-all duration-1000 ${getProgressColor(riskCategory)}`}
              style={{ width: `${riskScore}%` }}
            ></div>
          </div>
          
          <p className="text-gray-600">
            {riskCategory === 'low' && 'You are performing well with minimal dropout risk.'}
            {riskCategory === 'medium' && 'Some concerning patterns detected. Monitor your progress closely.'}
            {riskCategory === 'high' && 'High risk detected. Immediate intervention recommended.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Explanations */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">🤖</span>
            AI Risk Analysis
          </h3>
          <div className="space-y-4">
            {explanations.map((explanation, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{explanation.factor}</h4>
                  <span className="text-sm font-semibold text-primary-600">
                    {explanation.contribution}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">{explanation.description}</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${explanation.contribution}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Suggestions */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">💡</span>
            Recommended Actions
          </h3>
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{suggestion.action}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(suggestion.priority)}`}>
                    {suggestion.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Trends */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="mr-2">📈</span>
          Risk Trend Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-success-50 rounded-lg">
            <TrendingDown className="h-8 w-8 text-success-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-success-600">-5%</div>
            <div className="text-sm text-gray-600">Risk Decrease</div>
            <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
          </div>
          <div className="text-center p-4 bg-warning-50 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-warning-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-warning-600">2</div>
            <div className="text-sm text-gray-600">Risk Factors</div>
            <div className="text-xs text-gray-500 mt-1">Require attention</div>
          </div>
          <div className="text-center p-4 bg-primary-50 rounded-lg">
            <Lightbulb className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary-600">85%</div>
            <div className="text-sm text-gray-600">Model Accuracy</div>
            <div className="text-xs text-gray-500 mt-1">Prediction confidence</div>
          </div>
        </div>
      </div>
    </div>
  );
}
