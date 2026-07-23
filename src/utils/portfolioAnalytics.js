const API_BASE = 'https://api.counterapi.dev/v1';
const NAMESPACE = import.meta.env.VITE_COUNTER_NAMESPACE || 'julius-yayain-portfolio-v2-live';
const VISITOR_KEY = 'julius-portfolio-visitor-id';

let trackedThisPageLoad = false;

const counterUrl = (name, action = '') => `${API_BASE}/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(name)}${action ? `/${action}` : ''}`;
const utcDateKey = (date = new Date()) => date.toISOString().slice(0, 10);

async function incrementCounter(name) {
  const response = await fetch(counterUrl(name, 'up'), { method: 'GET', mode: 'cors', cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to increment ${name}`);
  return response.json();
}

export async function readCounter(name) {
  try {
    const response = await fetch(counterUrl(name), { method: 'GET', mode: 'cors', cache: 'no-store' });
    if (!response.ok) return 0;
    const data = await response.json();
    return Number(data.count) || 0;
  } catch {
    return 0;
  }
}

export async function trackPortfolioVisit() {
  if (!import.meta.env.PROD || trackedThisPageLoad) return;
  trackedThisPageLoad = true;

  const today = utcDateKey();
  let isNewVisitor = false;

  try {
    if (!window.localStorage.getItem(VISITOR_KEY)) {
      window.localStorage.setItem(VISITOR_KEY, window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`);
      isNewVisitor = true;
    }
  } catch {
    isNewVisitor = false;
  }

  const updates = [incrementCounter('pageviews-total'), incrementCounter(`pageviews-${today}`)];

  if (isNewVisitor) {
    updates.push(incrementCounter('visitors-total'), incrementCounter(`visitors-${today}`));
  }

  await Promise.allSettled(updates);
}

export async function getAnalyticsSummary(days = 7) {
  const dates = Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - (days - index - 1));
    return utcDateKey(date);
  });

  const [totalVisitors, totalPageViews, ...dailyCounts] = await Promise.all([
    readCounter('visitors-total'),
    readCounter('pageviews-total'),
    ...dates.flatMap((date) => [readCounter(`visitors-${date}`), readCounter(`pageviews-${date}`)]),
  ]);

  const trend = dates.map((date, index) => ({
    date,
    label: new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`)),
    visitors: dailyCounts[index * 2] || 0,
    pageViews: dailyCounts[index * 2 + 1] || 0,
  }));

  const today = trend.at(-1) || { visitors: 0, pageViews: 0 };

  return {
    totalVisitors,
    totalPageViews,
    viewsPerVisitor: totalVisitors ? totalPageViews / totalVisitors : 0,
    todayVisitors: today.visitors,
    todayPageViews: today.pageViews,
    trend,
    updatedAt: new Date(),
  };
}

export { NAMESPACE as analyticsNamespace };
