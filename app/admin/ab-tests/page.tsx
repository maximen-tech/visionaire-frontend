'use client';

import { useState, useEffect } from 'react';
import { getABTestingFramework } from '@/lib/ab-testing/framework';
import type { ABTest, ABEvent, VariantStats } from '@/lib/ab-testing/types';

export default function ABTestsAdminPage() {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [events, setEvents] = useState<ABEvent[]>([]);
  const [stats, setStats] = useState<Map<string, VariantStats[]>>(new Map());
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if already authenticated in session
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('ab_admin_auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
        loadData();
      }
    }
  }, []);

  const handleAuth = () => {
    // Simple password check (use env var in production)
    const correctPassword = process.env.NEXT_PUBLIC_AB_ADMIN_PASSWORD || 'visionai2025';

    if (password === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('ab_admin_auth', 'true');
      loadData();
    } else {
      alert('Incorrect password');
    }
  };

  const loadData = () => {
    const framework = getABTestingFramework();
    const allTests = framework.getActiveTests();
    const allEvents = framework.getEventsFromLocalStorage();

    setTests(allTests);
    setEvents(allEvents);

    // Calculate stats per test
    const statsMap = new Map<string, VariantStats[]>();

    allTests.forEach((test) => {
      const testEvents = allEvents.filter((e) => e.testId === test.id);
      const variantStatsMap = new Map<string, VariantStats>();

      // Initialize stats for each variant
      test.variants.forEach((variant) => {
        variantStatsMap.set(variant.id, {
          variantId: variant.id,
          variantName: variant.name,
          assignments: 0,
          conversions: 0,
          conversionRate: 0,
          events: {},
        });
      });

      // Count events
      testEvents.forEach((event) => {
        const variantStats = variantStatsMap.get(event.variantId);
        if (!variantStats) return;

        // Count event types
        if (!variantStats.events[event.eventName]) {
          variantStats.events[event.eventName] = 0;
        }
        variantStats.events[event.eventName]++;

        // Count conversions
        if (event.eventName === 'conversion') {
          variantStats.conversions++;
        }

        // Estimate assignments (rough count based on unique events)
        variantStats.assignments = Math.max(
          variantStats.assignments,
          variantStats.events[event.eventName] || 0
        );
      });

      // Calculate conversion rates
      variantStatsMap.forEach((variantStats) => {
        if (variantStats.assignments > 0) {
          variantStats.conversionRate =
            (variantStats.conversions / variantStats.assignments) * 100;
        }
      });

      statsMap.set(test.id, Array.from(variantStatsMap.values()));
    });

    setStats(statsMap);
  };

  // Calculate statistical significance (simple chi-squared test)
  const calculateSignificance = (
    control: VariantStats,
    variant: VariantStats
  ): { pValue: number; significant: boolean } => {
    const n1 = control.assignments;
    const n2 = variant.assignments;
    const p1 = control.conversions / n1 || 0;
    const p2 = variant.conversions / n2 || 0;

    if (n1 < 30 || n2 < 30) {
      return { pValue: 1, significant: false }; // Not enough data
    }

    // Pooled proportion
    const p = (control.conversions + variant.conversions) / (n1 + n2);

    // Standard error
    const se = Math.sqrt(p * (1 - p) * (1 / n1 + 1 / n2));

    // Z-score
    const z = Math.abs((p1 - p2) / se);

    // Approximate p-value (two-tailed)
    const pValue = 2 * (1 - normalCDF(z));

    return { pValue, significant: pValue < 0.05 };
  };

  // Normal CDF approximation
  const normalCDF = (x: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp((-x * x) / 2);
    const prob =
      d *
      t *
      (0.3193815 +
        t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - prob : prob;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-8">
        <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            A/B Tests Admin Dashboard
          </h1>
          <p className="text-slate-600 mb-6">Enter password to access</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
            placeholder="Password"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            onClick={handleAuth}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-500 hover:to-blue-500 transition-all"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            A/B Testing Dashboard
          </h1>
          <p className="text-slate-400">
            Monitor active tests and conversion metrics
          </p>
          <button
            onClick={loadData}
            className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors"
          >
            Refresh Data
          </button>
        </div>

        {/* Tests Grid */}
        <div className="space-y-8">
          {tests.length === 0 && (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-slate-600">
                No active tests. Events: {events.length}
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Start using A/B tests in your app to see data here.
              </p>
            </div>
          )}

          {tests.map((test) => {
            const testStats = stats.get(test.id) || [];
            const control = testStats.find((s) => s.variantId === 'control');
            const variants = testStats.filter((s) => s.variantId !== 'control');

            return (
              <div
                key={test.id}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                {/* Test Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {test.name}
                  </h2>
                  <p className="text-slate-600 mb-2">{test.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-500">
                      Test ID: <code className="bg-slate-100 px-2 py-1 rounded">{test.id}</code>
                    </span>
                    <span className="text-slate-500">
                      Target: {test.targetMetric}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${test.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {test.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Variants Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {testStats.map((variantStats) => {
                    const isControl = variantStats.variantId === 'control';

                    return (
                      <div
                        key={variantStats.variantId}
                        className={`border-2 rounded-lg p-4 ${
                          isControl
                            ? 'border-slate-300 bg-slate-50'
                            : 'border-cyan-300 bg-cyan-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-slate-900">
                            {variantStats.variantName}
                          </h3>
                          {isControl && (
                            <span className="text-xs bg-slate-200 px-2 py-1 rounded">
                              Control
                            </span>
                          )}
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Assignments:</span>
                            <span className="font-semibold text-slate-900">
                              {variantStats.assignments}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Conversions:</span>
                            <span className="font-semibold text-slate-900">
                              {variantStats.conversions}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Conv. Rate:</span>
                            <span className="font-semibold text-cyan-600">
                              {variantStats.conversionRate.toFixed(2)}%
                            </span>
                          </div>
                        </div>

                        {/* Event Breakdown */}
                        {Object.keys(variantStats.events).length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-200">
                            <p className="text-xs text-slate-500 mb-2">Events:</p>
                            {Object.entries(variantStats.events).map(([eventName, count]) => (
                              <div
                                key={eventName}
                                className="flex justify-between text-xs"
                              >
                                <span className="text-slate-600">{eventName}:</span>
                                <span className="text-slate-900">{count}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Statistical Significance */}
                {control && variants.length > 0 && (
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-bold text-slate-900 mb-3">
                      Statistical Significance
                    </h4>
                    {variants.map((variant) => {
                      const { pValue, significant } = calculateSignificance(
                        control,
                        variant
                      );
                      const uplift =
                        ((variant.conversionRate - control.conversionRate) /
                          control.conversionRate) *
                        100;

                      return (
                        <div
                          key={variant.variantId}
                          className="flex items-center justify-between mb-2"
                        >
                          <span className="text-slate-700">
                            {variant.variantName} vs Control:
                          </span>
                          <div className="flex items-center gap-3">
                            <span
                              className={`font-semibold ${
                                uplift > 0 ? 'text-green-600' : 'text-red-600'
                              }`}
                            >
                              {uplift > 0 ? '+' : ''}
                              {uplift.toFixed(1)}% uplift
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                significant
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {significant
                                ? `Significant (p=${pValue.toFixed(3)})`
                                : 'Not Significant'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    {control.assignments < 30 && (
                      <p className="text-xs text-slate-500 mt-3">
                        ⚠️ Need at least 30 samples per variant for reliable
                        statistics
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Event Log */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Recent Events ({events.length})
          </h2>
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left">Time</th>
                  <th className="px-4 py-2 text-left">Test</th>
                  <th className="px-4 py-2 text-left">Variant</th>
                  <th className="px-4 py-2 text-left">Event</th>
                  <th className="px-4 py-2 text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                {events.slice(-50).reverse().map((event, idx) => (
                  <tr key={idx} className="border-b border-slate-100">
                    <td className="px-4 py-2 text-slate-600">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-2 font-mono text-xs text-slate-700">
                      {event.testId}
                    </td>
                    <td className="px-4 py-2 text-slate-700">
                      {event.variantId}
                    </td>
                    <td className="px-4 py-2 text-slate-900">
                      {event.eventName}
                    </td>
                    <td className="px-4 py-2 text-right text-slate-700">
                      {event.eventValue || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
