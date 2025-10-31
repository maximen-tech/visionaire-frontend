'use client';

import { useState, useEffect } from 'react';
import PasswordProtection from '@/components/admin/PasswordProtection';

interface ABTestData {
  winner: string;
  improvement?: number;
  [variantId: string]: string | number | { visits: number; conversions: number; rate: number } | undefined;
}

interface EmailData {
  sent?: number;
  opened?: number;
  openRate?: number;
}

interface EmailMetrics {
  totals?: { sent?: number; delivered?: number; openRate?: number; clickRate?: number };
  [key: string]: EmailData | { sent?: number; delivered?: number; openRate?: number; clickRate?: number } | undefined;
}

interface DashboardData {
  abTestResults: Record<string, ABTestData>;
  emailMetrics: EmailMetrics;
  conversionFunnel: {
    stages: Array<{ name: string; count: number; rate: number }>;
    conversionRate: number;
  };
  recentActivity: Record<string, number>;
  variantPerformance: Array<{
    variant: string;
    leads: number;
    consultations: number;
    conversionRate: number;
    avgTimeToConversion: string;
  }>;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/analytics');

      if (response.status === 401) {
        setError('Non autorisé - veuillez vous reconnecter');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const result = await response.json();
      setData(result.data);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Erreur lors du chargement des données');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PasswordProtection>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-zinc-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              📊 Admin Dashboard
            </h1>
            <p className="text-slate-600 mb-4">
              Métriques en temps réel - Vision&apos;AI&apos;re
            </p>
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Chargement...' : '🔄 Actualiser'}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {isLoading && !data && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
              <p className="text-slate-600 mt-4">Chargement des données...</p>
            </div>
          )}

          {data && (
            <>
              {/* Recent Activity Cards */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl mb-1">📊</div>
                  <div className="text-2xl font-bold text-slate-900">
                    {data.recentActivity.analyses_started}
                  </div>
                  <div className="text-xs text-slate-600">Analyses (24h)</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl mb-1">✅</div>
                  <div className="text-2xl font-bold text-green-600">
                    {data.recentActivity.analyses_completed}
                  </div>
                  <div className="text-xs text-slate-600">Complétées (24h)</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-2xl font-bold text-cyan-600">
                    {data.recentActivity.leads_converted}
                  </div>
                  <div className="text-xs text-slate-600">Leads (24h)</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl mb-1">📧</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {data.recentActivity.emails_sent}
                  </div>
                  <div className="text-xs text-slate-600">Emails (24h)</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl mb-1">🎁</div>
                  <div className="text-2xl font-bold text-amber-600">
                    {data.recentActivity.consultations_booked}
                  </div>
                  <div className="text-xs text-slate-600">Consultations (24h)</div>
                </div>
              </div>

              {/* A/B Test Results */}
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  🧪 A/B Test Results
                </h2>
                <div className="space-y-6">
                  {Object.entries(data.abTestResults).map(([testId, testData]: [string, ABTestData]) => (
                    <div key={testId} className="border-b border-slate-200 pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {testId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h3>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Winner: {testData.winner}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(testData)
                          .filter(([key]) => key !== 'winner' && key !== 'improvement')
                          .map(([variantId, stats]) => {
                            const statsData = stats as { visits?: number; views?: number; conversions?: number; rate?: number; clicks?: number; submissions?: number; interactions?: number };
                            if (typeof stats === 'string' || typeof stats === 'number') return null;
                            return (
                            <div
                              key={variantId}
                              className={`p-4 rounded-lg border-2 ${
                                variantId === testData.winner
                                  ? 'border-green-400 bg-green-50'
                                  : 'border-slate-200 bg-slate-50'
                              }`}
                            >
                              <div className="font-semibold text-slate-900 mb-3">
                                {variantId.charAt(0).toUpperCase() + variantId.slice(1)}
                                {variantId === testData.winner && (
                                  <span className="ml-2 text-green-600">🏆</span>
                                )}
                              </div>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-slate-600">
                                    {statsData.views !== undefined ? 'Views:' :
                                     statsData.submissions !== undefined ? 'Views:' :
                                     'Interactions:'}
                                  </span>
                                  <span className="font-semibold">
                                    {statsData.views || statsData.submissions || statsData.interactions || 0}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">
                                    {statsData.clicks !== undefined ? 'Clicks:' :
                                     statsData.submissions !== undefined ? 'Submissions:' :
                                     'Actions:'}
                                  </span>
                                  <span className="font-semibold">
                                    {statsData.clicks || statsData.submissions || statsData.interactions || 0}
                                  </span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-slate-300">
                                  <span className="text-slate-600">Rate:</span>
                                  <span className="font-bold text-cyan-600">
                                    {((statsData.rate || 0) * 100).toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                            );
                          })}
                      </div>

                      <div className="mt-4 text-center">
                        <span className="text-lg font-semibold text-green-600">
                          {testData.improvement} improvement
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Campaign Metrics */}
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  📧 Email Campaign Performance
                </h2>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-blue-600 mb-1">Total Sent</div>
                    <div className="text-2xl font-bold text-blue-900">
                      {data.emailMetrics.totals?.sent || 0}
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-green-600 mb-1">Delivered</div>
                    <div className="text-2xl font-bold text-green-900">
                      {data.emailMetrics.totals?.delivered || 0}
                    </div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <div className="text-sm text-amber-600 mb-1">Open Rate</div>
                    <div className="text-2xl font-bold text-amber-900">
                      {((data.emailMetrics.totals?.openRate || 0) * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <div className="text-sm text-cyan-600 mb-1">Click Rate</div>
                    <div className="text-2xl font-bold text-cyan-900">
                      {((data.emailMetrics.totals?.clickRate || 0) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Email Breakdown */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Email</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">Sent</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">Opened</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">Open %</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">Clicked</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">Click %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {['drip_day1', 'drip_day3', 'drip_day7', 'drip_day14'].map((emailId) => {
                        const emailData = data.emailMetrics[emailId] as EmailData | undefined;
                        if (!emailData) return null;
                        return (
                          <tr key={emailId} className="border-b border-slate-100">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              {emailId === 'drip_day1' && 'Day 1 - Welcome'}
                              {emailId === 'drip_day3' && 'Day 3 - Case Study'}
                              {emailId === 'drip_day7' && 'Day 7 - Urgency'}
                              {emailId === 'drip_day14' && 'Day 14 - Final'}
                            </td>
                            <td className="px-4 py-3 text-right text-slate-700">{emailData.sent || 0}</td>
                            <td className="px-4 py-3 text-right text-slate-700">{emailData.opened || 0}</td>
                            <td className="px-4 py-3 text-right font-semibold text-green-600">
                              {((emailData.openRate || 0) * 100).toFixed(1)}%
                            </td>
                            <td className="px-4 py-3 text-right text-slate-700">0</td>
                            <td className="px-4 py-3 text-right font-semibold text-cyan-600">
                              0%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Lead Conversion Funnel */}
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  🎯 Lead Conversion Funnel
                </h2>

                <div className="space-y-3">
                  {data.conversionFunnel.stages.map((stage, index) => {
                    const prevStage = index > 0 ? data.conversionFunnel.stages[index - 1] : null;
                    const dropoffRate = prevStage
                      ? ((prevStage.count - stage.count) / prevStage.count) * 100
                      : 0;

                    return (
                      <div key={stage.name}>
                        <div className="flex items-center gap-4">
                          {/* Bar */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-slate-900">{stage.name}</span>
                              <div className="flex items-center gap-3">
                                <span className="text-slate-600 text-sm">{stage.count}</span>
                                <span className="font-semibold text-cyan-600 w-16 text-right">
                                  {(stage.rate * 100).toFixed(1)}%
                                </span>
                              </div>
                            </div>
                            <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                                style={{ width: `${stage.rate * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        {/* Dropoff indicator */}
                        {index > 0 && dropoffRate > 0 && (
                          <div className="ml-4 mt-1 text-xs text-red-600">
                            ⚠️ {dropoffRate.toFixed(1)}% drop-off
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-slate-900">
                      Overall Conversion Rate
                    </span>
                    <span className="text-3xl font-bold text-green-600">
                      {(data.conversionFunnel.conversionRate * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Variant Performance Comparison */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  🏆 Lead Form Variant Performance
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Variant</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">Leads</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">Consultations</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">Conv. Rate</th>
                        <th className="px-4 py-3 text-right font-semibold text-slate-700">Avg Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.variantPerformance
                        .sort((a, b) => b.conversionRate - a.conversionRate)
                        .map((variant, index) => (
                          <tr
                            key={variant.variant}
                            className={`border-b border-slate-100 ${
                              index === 0 ? 'bg-green-50' : ''
                            }`}
                          >
                            <td className="px-4 py-3 font-medium text-slate-900">
                              {variant.variant}
                              {index === 0 && <span className="ml-2">🏆</span>}
                            </td>
                            <td className="px-4 py-3 text-right text-slate-700">{variant.leads}</td>
                            <td className="px-4 py-3 text-right text-slate-700">
                              {variant.consultations}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-green-600">
                              {(variant.conversionRate * 100).toFixed(1)}%
                            </td>
                            <td className="px-4 py-3 text-right text-slate-700">
                              {variant.avgTimeToConversion}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </PasswordProtection>
  );
}
