import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowLeft, BarChart3, Eye, RefreshCw, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { getAnalyticsSummary } from '../utils/portfolioAnalytics';
import './analytics-dashboard.css';

const EMPTY_SUMMARY = {
  totalVisitors: 0,
  totalPageViews: 0,
  viewsPerVisitor: 0,
  todayVisitors: 0,
  todayPageViews: 0,
  trend: [],
  updatedAt: null,
};

const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value || 0);

function AnalyticsTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="analytics-tooltip">
      <strong>{label}</strong>
      {payload.map((item) => <span key={item.dataKey}><i style={{ background: item.color }} />{item.name}: {formatNumber(item.value)}</span>)}
    </div>
  );
}

function MetricCard({ icon, marker, label, value, detail, accent = false }) {
  return (
    <article className={`analytics-metric${accent ? ' analytics-metric--accent' : ''}`}>
      <div className="analytics-metric__top"><span>{marker}</span>{icon}</div>
      <strong>{value}</strong>
      <h2>{label}</h2>
      <p>{detail}</p>
    </article>
  );
}

export default function AnalyticsDashboard() {
  const [summary, setSummary] = useState(EMPTY_SUMMARY);
  const [isLoading, setIsLoading] = useState(true);

  const loadAnalytics = () => {
    setIsLoading(true);
    getAnalyticsSummary(7).then((data) => {
      setSummary(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    let active = true;

    getAnalyticsSummary(7).then((data) => {
      if (!active) return;
      setSummary(data);
      setIsLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  const hasTraffic = summary.totalVisitors > 0 || summary.totalPageViews > 0;

  return (
    <main className="analytics-dashboard">
      <div className="analytics-dashboard__glow" aria-hidden="true" />
      <div className="analytics-shell">
        <nav className="analytics-nav">
          <Link to="/"><ArrowLeft size={17} /> Back to portfolio</Link>
          <span><i /> Live public analytics</span>
        </nav>

        <header className="analytics-hero">
          <div>
            <span className="analytics-eyebrow"><BarChart3 size={15} /> Portfolio dashboard</span>
            <h1>How people<br /><em>find the work.</em></h1>
          </div>
          <div className="analytics-hero__aside">
            <p>A privacy-conscious overview of portfolio traffic, measured through anonymous browser and page-view counters.</p>
            <button type="button" onClick={loadAnalytics} disabled={isLoading}><RefreshCw size={15} className={isLoading ? 'is-spinning' : ''} /> Refresh data</button>
          </div>
        </header>

        <section className={`analytics-metrics${isLoading ? ' is-loading' : ''}`} aria-label="Traffic summary">
          <MetricCard icon={<Users size={19} />} marker="01" label="Unique browsers" value={formatNumber(summary.totalVisitors)} detail="Approximate visitors across devices" accent />
          <MetricCard icon={<Eye size={19} />} marker="02" label="Portfolio views" value={formatNumber(summary.totalPageViews)} detail="Production homepage loads" />
          <MetricCard icon={<Sparkles size={19} />} marker="03" label="Views per visitor" value={summary.viewsPerVisitor.toFixed(1)} detail="Average pages loaded per browser" />
          <MetricCard icon={<BarChart3 size={19} />} marker="04" label="Views today" value={formatNumber(summary.todayPageViews)} detail={`${formatNumber(summary.todayVisitors)} new browser${summary.todayVisitors === 1 ? '' : 's'} today`} />
        </section>

        <section className="analytics-grid">
          <article className="analytics-chart-card">
            <header>
              <div><span>Last seven days</span><h2>Traffic trend</h2></div>
              <div className="analytics-legend"><span><i className="is-views" /> Views</span><span><i className="is-visitors" /> Visitors</span></div>
            </header>

            <div className="analytics-chart" aria-label="Seven-day portfolio traffic chart">
              {!hasTraffic && !isLoading && <div className="analytics-empty"><Sparkles size={22} /><strong>Tracking is ready</strong><p>Data will appear after the first production portfolio visit.</p></div>}
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={summary.trend} margin={{ top: 14, right: 8, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff9cff" stopOpacity={0.4} /><stop offset="100%" stopColor="#ff9cff" stopOpacity={0} /></linearGradient>
                    <linearGradient id="visitorsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a99aef" stopOpacity={0.34} /><stop offset="100%" stopColor="#a99aef" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,.07)" vertical={false} />
                  <XAxis dataKey="label" tick={{ fill: '#9d8aa3', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fill: '#9d8aa3', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<AnalyticsTooltip />} cursor={{ stroke: 'rgba(255,156,255,.25)' }} />
                  <Area type="monotone" dataKey="pageViews" name="Views" stroke="#ff9cff" strokeWidth={2.5} fill="url(#viewsFill)" />
                  <Area type="monotone" dataKey="visitors" name="Visitors" stroke="#a99aef" strokeWidth={2} fill="url(#visitorsFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          <aside className="analytics-notes">
            <div className="analytics-note analytics-note--primary">
              <ShieldCheck size={24} />
              <span><small>Privacy first</small><strong>No names, emails, locations, or personal profiles are collected.</strong></span>
            </div>
            <div className="analytics-note">
              <span className="analytics-note__number">01</span>
              <span><small>Unique browser</small><p>Counted once using a random identifier stored only in that browser.</p></span>
            </div>
            <div className="analytics-note">
              <span className="analytics-note__number">02</span>
              <span><small>Public counter</small><p>These basic totals are shared publicly and should be treated as approximate.</p></span>
            </div>
            <div className="analytics-updated">
              <span>Last refreshed</span>
              <strong>{summary.updatedAt ? summary.updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Loading…'}</strong>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
