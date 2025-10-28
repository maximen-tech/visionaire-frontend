"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import LogEntry, { detectLogType } from "@/components/LogEntry";
import { fadeIn } from "@/lib/animations";

interface LogEntryData {
  timestamp: string;
  message: string;
  phase?: "A1" | "A2" | "SYNTHESIS";
}

interface LogStreamProps {
  logs: LogEntryData[];
}

/**
 * LogStream Component
 *
 * Terminal-style log stream with Blueprint aesthetic.
 * Displays real-time SSE logs with auto-scroll.
 *
 * @param logs - Array of log entries from SSE stream
 *
 * @example
 * <LogStream logs={[
 *   { timestamp: "2025-10-28T14:32:15Z", message: "Analysis started", phase: "A1" }
 * ]} />
 */
export default function LogStream({ logs }: LogStreamProps) {
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <motion.div
      {...fadeIn}
      className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden flex flex-col h-full shadow-xl"
    >
      {/* Header */}
      <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Live indicator */}
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </div>

            <h3 className="text-sm font-mono font-bold text-slate-100">
              🔧 Logs Technique
            </h3>
          </div>

          {/* Event counter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">
              {logs.length}
            </span>
            <span className="text-xs text-slate-500">événements</span>
          </div>
        </div>
      </div>

      {/* Log content */}
      <div
        ref={logContainerRef}
        className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
      >
        {logs.length === 0 ? (
          <motion.div
            {...fadeIn}
            className="text-slate-500 text-center py-12 font-mono text-sm"
          >
            <div className="inline-block animate-pulse">
              ▮▮▮ En attente des événements...
            </div>
          </motion.div>
        ) : (
          logs.map((log, index) => (
            <LogEntry
              key={index}
              timestamp={log.timestamp}
              message={log.message}
              phase={log.phase}
              type={detectLogType(log.message)}
            />
          ))
        )}
      </div>

      {/* Footer - Terminal info */}
      <div className="px-4 py-2 bg-slate-800 border-t border-slate-700">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500">
            Vision&apos;AI&apos;re Terminal v2.0
          </span>
          <span className="text-emerald-400">
            ● LIVE
          </span>
        </div>
      </div>
    </motion.div>
  );
}
