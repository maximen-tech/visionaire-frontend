"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogEntryProps {
  timestamp: string;
  message: string;
  phase?: "A1" | "A2" | "SYNTHESIS";
  type?: "info" | "success" | "warning" | "error";
}

/**
 * LogEntry Component
 *
 * Terminal-style log entry with Blueprint aesthetic.
 * Uses color coding: cyan (info), emerald (success), amber (warning), red (error).
 *
 * @param timestamp - ISO timestamp or HH:MM:SS format
 * @param message - Log message content
 * @param phase - Analysis phase (A1, A2, SYNTHESIS)
 * @param type - Log type for color coding
 *
 * @example
 * <LogEntry
 *   timestamp="14:32:15"
 *   message="Identity extraction complete"
 *   phase="A1"
 *   type="success"
 * />
 */
export default function LogEntry({
  timestamp,
  message,
  phase,
  type = "info"
}: LogEntryProps) {

  // Format timestamp to HH:MM:SS
  const formatTimestamp = (ts: string): string => {
    try {
      const date = new Date(ts);
      return date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return ts;
    }
  };

  // Get color and icon based on type
  const getTypeStyles = (logType: string) => {
    switch (logType) {
      case "success":
        return {
          color: "text-emerald-400",
          icon: "✓",
          iconBg: "bg-emerald-500/20",
        };
      case "warning":
        return {
          color: "text-amber-400",
          icon: "⚠",
          iconBg: "bg-amber-500/20",
        };
      case "error":
        return {
          color: "text-red-400",
          icon: "✗",
          iconBg: "bg-red-500/20",
        };
      default:
        return {
          color: "text-cyan-400",
          icon: "•",
          iconBg: "bg-cyan-500/20",
        };
    }
  };

  // Get phase color
  const getPhaseColor = (p?: string) => {
    switch (p) {
      case "A1":
        return "text-cyan-400 bg-cyan-500/20";
      case "A2":
        return "text-purple-400 bg-purple-500/20";
      case "SYNTHESIS":
        return "text-emerald-400 bg-emerald-500/20";
      default:
        return "text-slate-400 bg-slate-500/20";
    }
  };

  const typeStyles = getTypeStyles(type);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-3 items-start px-3 py-2 rounded-md",
        "hover:bg-slate-800/50 transition-colors duration-200",
        "font-mono text-xs"
      )}
    >
      {/* Timestamp */}
      <span className="text-slate-500 shrink-0 select-none">
        [{formatTimestamp(timestamp)}]
      </span>

      {/* Type Icon */}
      <span
        className={cn(
          "shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px]",
          typeStyles.iconBg
        )}
      >
        <span className={typeStyles.color}>{typeStyles.icon}</span>
      </span>

      {/* Phase Badge */}
      {phase && (
        <span
          className={cn(
            "shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase",
            getPhaseColor(phase)
          )}
        >
          {phase}
        </span>
      )}

      {/* Message */}
      <span className={cn("flex-1", typeStyles.color)}>
        {message}
      </span>
    </motion.div>
  );
}

/**
 * Helper function to determine log type based on message content
 *
 * @param message - Log message to analyze
 * @returns Detected log type
 */
export function detectLogType(message: string): "info" | "success" | "warning" | "error" {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("erreur") || lowerMsg.includes("error") || lowerMsg.includes("échec")) {
    return "error";
  }

  if (lowerMsg.includes("terminé") || lowerMsg.includes("complete") || lowerMsg.includes("success")) {
    return "success";
  }

  if (lowerMsg.includes("attention") || lowerMsg.includes("warning") || lowerMsg.includes("retry")) {
    return "warning";
  }

  return "info";
}
