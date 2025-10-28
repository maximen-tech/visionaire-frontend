"use client";

import React, { useEffect, useRef } from "react";
import { blueprintGrid } from "@/lib/design-tokens";

interface BlueprintGridProps {
  density?: "low" | "medium" | "high";
  animated?: boolean;
  className?: string;
}

/**
 * BlueprintGrid Component
 *
 * Creates an animated blueprint-style grid background.
 * Lines "draw" themselves on page load for architectural feel.
 *
 * @param density - Grid line spacing: 'low' (80px), 'medium' (40px), 'high' (20px)
 * @param animated - Enable drawing animation on mount
 * @param className - Additional CSS classes
 */
export default function BlueprintGrid({
  density = "low",
  animated = true,
  className = "",
}: BlueprintGridProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const gridSpacing = blueprintGrid.density[density];
  const strokeWidth = blueprintGrid.strokeWidth;
  const color = blueprintGrid.color.primary;
  const opacity = blueprintGrid.opacity;

  useEffect(() => {
    if (!animated || !svgRef.current) return;

    const lines = svgRef.current.querySelectorAll("line");
    const animationDuration = 1500; // ms

    // Animate each line
    lines.forEach((line, index) => {
      const length = parseFloat(line.getAttribute("data-length") || "0");

      // Set initial state
      line.style.strokeDasharray = `${length} ${length}`;
      line.style.strokeDashoffset = `${length}`;
      line.style.opacity = "0";

      // Stagger animation slightly
      const delay = index * 20; // 20ms stagger

      setTimeout(() => {
        line.style.transition = `stroke-dashoffset ${animationDuration}ms ease-in-out, opacity ${animationDuration}ms ease-in-out`;
        line.style.strokeDashoffset = "0";
        line.style.opacity = opacity.active.toString();
      }, delay);
    });

    // Cleanup
    return () => {
      lines.forEach((line) => {
        line.style.transition = "";
        line.style.strokeDasharray = "";
        line.style.strokeDashoffset = "";
      });
    };
  }, [animated, opacity]);

  // Calculate grid dimensions (full viewport)
  const width = 2000; // Large enough for any screen
  const height = 2000;

  // Generate grid lines
  const verticalLines = [];
  const horizontalLines = [];

  for (let x = 0; x <= width; x += gridSpacing) {
    verticalLines.push(
      <line
        key={`v-${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke={color}
        strokeWidth={strokeWidth}
        opacity={animated ? 0 : opacity.idle}
        data-length={height}
      />
    );
  }

  for (let y = 0; y <= height; y += gridSpacing) {
    horizontalLines.push(
      <line
        key={`h-${y}`}
        x1={0}
        y1={y}
        x2={width}
        y2={y}
        stroke={color}
        strokeWidth={strokeWidth}
        opacity={animated ? 0 : opacity.idle}
        data-length={width}
      />
    );
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Optional: Add gradient for depth effect */}
          <radialGradient id="blueprintFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* Grid lines */}
        <g className="grid-lines">
          {verticalLines}
          {horizontalLines}
        </g>

        {/* Optional: Add corner markers for blueprint feel */}
        {density === "low" && (
          <g className="corner-markers" opacity={opacity.active}>
            {/* Top-left */}
            <circle cx="40" cy="40" r="3" fill={color} />
            {/* Top-right */}
            <circle cx={width - 40} cy="40" r="3" fill={color} />
            {/* Bottom-left */}
            <circle cx="40" cy={height - 40} r="3" fill={color} />
            {/* Bottom-right */}
            <circle cx={width - 40} cy={height - 40} r="3" fill={color} />
          </g>
        )}
      </svg>
    </div>
  );
}
