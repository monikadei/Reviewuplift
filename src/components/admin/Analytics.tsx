import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

type ReviewData = {
  labels: string[];
  reviews: number[];
  sources: { label: string; value: number }[];
  currentReviews: number;
  lastPeriodReviews: number;
  growth: number;
  activities: { date: string; action: string }[];
};

const generateMockReviewData = (period: string): ReviewData => {
  const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const periods = { '7days': 7, '30days': 30, '6months': 6 };
  const count = periods[period as keyof typeof periods] || 7;

  const labels =
    period === '6months'
      ? Array.from({ length: count }, (_, i) =>
          new Date(new Date().setMonth(new Date().getMonth() - (count - i - 1))).toLocaleString('default', {
            month: 'short',
          })
        )
      : Array.from({ length: count }, (_, i) =>
          new Date(Date.now() - (count - i - 1) * 86400000).toLocaleDateString()
        );

  const reviews = Array.from({ length: count }, () => getRandomInt(0, 10));
  const sources = [
    { label: 'Google', value: getRandomInt(0, 5) },
    { label: 'Yelp', value: getRandomInt(0, 3) },
    { label: 'Facebook', value: getRandomInt(0, 4) },
  ];
  const currentReviews = getRandomInt(100, 120);
  const lastPeriodReviews = getRandomInt(90, 100);
  const growth = Number((((currentReviews - lastPeriodReviews) / lastPeriodReviews) * 100).toFixed(2));
  const activities = Array.from({ length: 5 }, (_, i) => ({
    date: new Date(Date.now() - i * 86400000).toDateString(),
    action: `New review from ${['Google', 'Yelp', 'Facebook'][i % 3]}`,
  }));

  return {
    labels,
    reviews,
    sources,
    currentReviews,
    lastPeriodReviews,
    growth,
    activities,
  };
};

const Analytics: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('7days');
  const [data, setData] = useState<ReviewData>(() => generateMockReviewData('7days'));
  const [isLoading, setIsLoading] = useState(false);

  const handleReload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setData(generateMockReviewData(timePeriod));
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    handleReload();
  }, [timePeriod]);

  const reviewLineChart = {
    labels: data.labels,
    datasets: [
      {
        label: 'Review Growth',
        data: data.reviews,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const reviewBarChart = {
    labels: data.labels,
    datasets: [
      {
        label: 'Reviews',
        data: data.reviews,
        backgroundColor: '#6366f1',
      },
    ],
  };

  const reviewSourceData = {
    labels: data.sources.map((s) => s.label),
    datasets: [
      {
        label: 'Review Sources',
        data: data.sources.map((s) => s.value),
        backgroundColor: ['#3b82f6', '#ef4444', '#facc15'],
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-base">
      {/* Normal Sidebar (not fixed) */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
            <div className="flex items-center space-x-4">
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="border px-3 py-2 rounded"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="6months">Last 6 Months</option>
              </select>
              <button
                onClick={handleReload}
                className={`px-4 py-2 text-white rounded ${isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                {isLoading ? 'Loading...' : 'Reload'}
              </button>
            </div>
          </div>

          {/* Funnel Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-yellow-400 text-white p-4 rounded shadow font-semibold">Invites Sent: 1</div>
            <div className="bg-blue-500 text-white p-4 rounded shadow font-semibold">Unique Visits: 7</div>
            <div className="bg-blue-700 text-white p-4 rounded shadow font-semibold">QR Visits: 0</div>
            <div className="bg-green-500 text-white p-4 rounded shadow font-semibold">New Reviews: 0</div>
            <div className="bg-red-500 text-white p-4 rounded shadow font-semibold">Negative Feedback: 1</div>
          </div>

          {/* Main Charts Section */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-gray-500">Current Reviews</p>
                  <p className="text-2xl font-bold">{data.currentReviews}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-gray-500">Last Period Reviews</p>
                  <p className="text-2xl font-bold">{data.lastPeriodReviews}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <p className="text-gray-500">Growth</p>
                  <p className={`text-2xl font-bold ${data.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {data.growth}%
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow h-96">
                  <h2 className="font-semibold mb-2">Review Growth</h2>
                  <Line data={reviewLineChart} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
                <div className="bg-white p-4 rounded shadow h-96">
                  <h2 className="font-semibold mb-2">Review Bar Chart</h2>
                  <Bar data={reviewBarChart} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow h-96">
                  <h2 className="font-semibold mb-2">Review Source</h2>
                  <Pie data={reviewSourceData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h2 className="font-semibold mb-2">Recent Activity</h2>
                  <ul className="space-y-3 mt-3">
                    {data.activities.map((act, idx) => (
                      <li key={idx} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{act.action}</p>
                          <p className="text-sm text-gray-500">{act.date}</p>
                        </div>
                        <span className="text-indigo-600 font-semibold">✔</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;