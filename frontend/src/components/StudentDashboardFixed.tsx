import React from 'react';

// StudentDashboardFixed.tsx
// Ready-to-use React component (TSX) that fixes spacing, alignment and responsiveness
// - Uses Tailwind CSS classes (make sure Tailwind is configured in your project)
// - Mobile-first and responsive grid layout
// - Equal-height cards, consistent padding, and sensible typography

interface MetricCardProps {
  title: string;
  value: React.ReactNode;
  meta?: string;
  accent?: string; // Tailwind text color class, e.g., 'text-blue-500'
  icon?: React.ReactNode | null;
}

// Example metric card component
const MetricCard: React.FC<MetricCardProps> = ({ title, value, meta, accent = 'text-blue-500', icon = null }) => {
  return (
    <article className="bg-white shadow-md rounded-2xl p-6 h-full flex flex-col justify-between overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="text-sm font-medium text-gray-500 truncate">{title}</div>
          <div className="mt-3">
            {/* value: responsive size, break-words so big numbers shrink or wrap */}
            <div className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight break-words" style={{ wordBreak: 'break-word' }}>
              {value}
            </div>
            {meta && <div className="text-xs text-gray-400 mt-1">{meta}</div>}
          </div>
        </div>
        <div className={`ml-4 flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl ${accent} bg-opacity-10`} aria-hidden>
          {/* Simple inline SVG placeholder */}
          {icon ? (
            icon
          ) : (
            <svg className={`w-6 h-6 ${accent}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1V7m-5 12v-6a2 2 0 00-2-2h-4a2 2 0 00-2 2v6" />
            </svg>
          )}
        </div>
      </div>
    </article>
  );
};

interface QuickActionProps {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode | null;
}

// Quick action button used in quick actions grid
const QuickAction: React.FC<QuickActionProps> = ({ label, onClick, icon = null }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="flex items-center justify-start gap-3 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition w-full"
  >
    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-50 flex-shrink-0">
      {icon || (
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      )}
    </span>
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </button>
);

interface RiskCardProps {
  score?: React.ReactNode;
  level?: string;
  description?: string;
  percent?: number | string;
}

// Dropout Risk Analysis card
const RiskCard: React.FC<RiskCardProps> = ({ score = '3500%', level = 'MEDIUM', description = 'AI-powered prediction with explanations', percent = 35 }) => {
  // percent should be numeric 0-100 for progress bar only
  const normalized = Math.max(0, Math.min(100, Number(percent)));

  return (
    <section className="bg-white p-6 rounded-2xl shadow-md h-full flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Dropout Risk Analysis</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>

        <div className="text-right ml-4">
          {/* Use clamp for responsive numeric size so it never breaks layout */}
          <div className="font-extrabold text-red-600 leading-tight" style={{ fontSize: 'clamp(1.25rem, 3.6vw, 3rem)' }}>
            {score}
          </div>
          <div className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">{level}</div>
        </div>
      </div>

      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="h-2 rounded-full bg-orange-500 transition-all" style={{ width: `${normalized}%` }}></div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="text-xs text-gray-500">Risk Score</div>
          <div className="text-sm font-medium text-gray-700">{normalized}%</div>
        </div>
      </div>
    </section>
  );
};

// Main dashboard component
const StudentDashboardFixed: React.FC = () => {
  // Sample data — replace with real data from props, context, or API
  const metrics = [
    { title: 'Attendance Rate', value: '87%', meta: 'Good', accent: 'text-blue-500' },
    { title: 'Average Score', value: '82%', meta: 'Rank: 15/120', accent: 'text-green-500' },
    { title: 'Dropout Risk', value: '3500%', meta: 'MEDIUM', accent: 'text-orange-500' },
    { title: 'Completed Assignments', value: '28', meta: '5 pending • 3 exams', accent: 'text-purple-500' },
  ];

  const smallMetrics = [
    { title: 'Average Attendance', value: '83.8%', accent: 'text-blue-500' },
    { title: 'Average Score', value: '83.0%', accent: 'text-green-500' },
    { title: 'Total Activities', value: '5', accent: 'text-purple-500' },
    { title: 'Completion Rate', value: '60%', accent: 'text-orange-500' },
  ];

  return (
    <main className="px-6 py-8 max-w-7xl mx-auto space-y-10">
      {/* Top metrics grid: responsive and equal-height */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {metrics.map((m, idx) => (
            <MetricCard key={idx} title={m.title} value={m.value} meta={(m as any).meta} accent={(m as any).accent} />
          ))}
        </div>
      </section>

      {/* Quick actions — grouped and spaced consistently */}
      <section>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickAction label="View Grades" />
            <QuickAction label="Schedule Meeting" />
            <QuickAction label="Risk Analysis" />
            <QuickAction label="Set Goals" />
          </div>
        </div>
      </section>

      {/* Lower area: mix of small metrics and a large dropout risk card */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="grid grid-cols-2 gap-6 lg:col-span-2">
            {smallMetrics.map((m, i) => (
              <MetricCard key={i} title={m.title} value={m.value} accent={(m as any).accent} />
            ))}
          </div>

          {/* Risk card spans one column on large screens and full width on mobile */}
          <div className="lg:col-span-1">
            <RiskCard score={'3500%'} level={'MEDIUM'} description={'AI-powered prediction with explanations'} percent={35} />
          </div>
        </div>
      </section>

      {/* Footer spacing note (optional) */}
      <div className="text-center text-xs text-gray-400">Dashboard is responsive — resize the window to inspect columns and spacing.</div>
    </main>
  );
};

export default StudentDashboardFixed;


