// Composant LogStream - Affiche les logs SSE en temps réel

"use client";

import { useEffect, useRef } from "react";

interface LogEntry {
  timestamp: string;
  message: string;
  phase?: "A1" | "A2" | "SYNTHESIS";
}

interface LogStreamProps {
  logs: LogEntry[];
}

export default function LogStream({ logs }: LogStreamProps) {
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll vers le bas quand de nouveaux logs arrivent
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const getPhaseColor = (phase?: string) => {
    switch (phase) {
      case "A1":
        return "text-blue-600";
      case "A2":
        return "text-purple-600";
      case "SYNTHESIS":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return timestamp;
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Logs en temps réel
        </h3>
        <span className="text-xs text-gray-500">{logs.length} événements</span>
      </div>

      <div
        ref={logContainerRef}
        className="flex-1 overflow-y-auto space-y-2 font-mono text-xs"
      >
        {logs.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            En attente des événements...
          </div>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className="flex gap-3 px-2 py-1 hover:bg-gray-800 rounded transition-colors"
            >
              <span className="text-gray-500 shrink-0">
                {formatTimestamp(log.timestamp)}
              </span>
              {log.phase && (
                <span
                  className={`${getPhaseColor(log.phase)} font-bold shrink-0`}
                >
                  [{log.phase}]
                </span>
              )}
              <span className="text-gray-300">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
