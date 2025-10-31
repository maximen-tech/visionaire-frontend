import confetti from "canvas-confetti";

export interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  origin?: { x: number; y: number };
  colors?: string[];
  duration?: number;
}

/**
 * Trigger a subtle confetti burst
 * Perfect for: Analysis completed, form submitted
 */
export function celebrateSubtle(options?: ConfettiOptions) {
  const defaults: ConfettiOptions = {
    particleCount: 50,
    spread: 60,
    origin: { x: 0.5, y: 0.6 },
    colors: ["#00D4FF", "#10B981", "#F59E0B"],
  };

  const merged = { ...defaults, ...options };

  confetti({
    ...merged,
    ticks: 200,
    gravity: 0.8,
    decay: 0.9,
    startVelocity: 20,
    scalar: 0.8,
  });
}

/**
 * Trigger a full confetti celebration
 * Perfect for: Perfect score, milestone achieved
 */
export function celebrateFull(options?: ConfettiOptions) {
  const defaults: ConfettiOptions = {
    particleCount: 150,
    spread: 120,
    origin: { x: 0.5, y: 0.5 },
    colors: ["#00D4FF", "#A78BFA", "#10B981", "#F59E0B"],
  };

  const merged = { ...defaults, ...options };

  // Multiple bursts for dramatic effect
  const duration = merged.duration || 3000;
  const animationEnd = Date.now() + duration;
  const defaults2 = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults2,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: merged.colors,
    });
    confetti({
      ...defaults2,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: merged.colors,
    });
  }, 250);
}

/**
 * Side cannons effect
 * Perfect for: Major achievement, big reveal
 */
export function celebrateCannons(options?: ConfettiOptions) {
  const colors = options?.colors || ["#00D4FF", "#A78BFA", "#10B981"];
  const duration = options?.duration || 5000;
  const animationEnd = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: colors,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  })();
}

/**
 * Fireworks effect
 * Perfect for: First-time user, special events
 */
export function celebrateFireworks(options?: ConfettiOptions) {
  const duration = options?.duration || 4000;
  const animationEnd = Date.now() + duration;
  const colors = options?.colors || ["#00D4FF", "#A78BFA", "#10B981", "#F59E0B"];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: colors,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  })();
}

/**
 * Snow effect (gentle falling)
 * Perfect for: Welcome messages, seasonal content
 */
export function celebrateSnow(options?: ConfettiOptions) {
  const duration = options?.duration || 10000;
  const animationEnd = Date.now() + duration;
  const colors = options?.colors || ["#ffffff", "#e0f2fe", "#c7d2fe"];

  (function frame() {
    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: 200,
      origin: {
        x: Math.random(),
        y: -0.1,
      },
      colors: colors,
      shapes: ["circle"],
      gravity: 0.3,
      scalar: 0.4,
      drift: 0,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  })();
}

/**
 * Stars burst from center
 * Perfect for: Perfect score achievement
 */
export function celebrateStars() {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ["#FFD700", "#FFA500", "#FF69B4", "#00D4FF"],
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 30,
      scalar: 1.2,
      shapes: ["star"],
      origin: { x: 0.5, y: 0.5 },
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
      origin: { x: 0.5, y: 0.5 },
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}

/**
 * Use appropriate celebration based on context
 */
export function celebrate(
  context: "analysis-complete" | "perfect-score" | "first-time" | "milestone",
  options?: ConfettiOptions
) {
  switch (context) {
    case "analysis-complete":
      celebrateSubtle(options);
      break;
    case "perfect-score":
      celebrateStars();
      setTimeout(() => celebrateFull(options), 500);
      break;
    case "first-time":
      celebrateFireworks(options);
      break;
    case "milestone":
      celebrateCannons(options);
      break;
    default:
      celebrateSubtle(options);
  }
}
