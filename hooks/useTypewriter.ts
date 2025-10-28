import { useState, useEffect, useRef } from "react";

/**
 * Options for useTypewriter hook
 */
export interface TypewriterOptions {
  /** The text to display with typewriter effect */
  text: string;
  /** Speed in milliseconds per character (default: 20ms) */
  speed?: number;
  /** Callback when typing animation completes */
  onComplete?: () => void;
  /** Delay before starting animation in milliseconds (default: 0) */
  startDelay?: number;
  /** Enable/disable the typewriter effect (default: true) */
  enabled?: boolean;
}

/**
 * useTypewriter Hook
 *
 * Creates a typewriter effect that reveals text character by character.
 * Perfect for storytelling, progressive messages, and engaging UX.
 *
 * @param options - TypewriterOptions configuration
 * @returns Object with displayedText (current text) and isComplete (animation done)
 *
 * @example
 * // Basic usage
 * const { displayedText, isComplete } = useTypewriter({
 *   text: "Bonjour! Analyse en cours...",
 *   speed: 20,
 *   onComplete: () => console.log("Done!"),
 * });
 *
 * @example
 * // With start delay
 * const { displayedText } = useTypewriter({
 *   text: "Message delayed by 1 second",
 *   startDelay: 1000,
 * });
 *
 * @example
 * // Disable animation (show full text immediately)
 * const { displayedText } = useTypewriter({
 *   text: "Instant text",
 *   enabled: false,
 * });
 */
export function useTypewriter({
  text,
  speed = 20,
  onComplete,
  startDelay = 0,
  enabled = true,
}: TypewriterOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // If disabled, show full text immediately
    if (!enabled) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    // Reset state
    setDisplayedText("");
    setIsComplete(false);

    // Start typing after delay
    startTimeoutRef.current = setTimeout(() => {
      let currentIndex = 0;

      const typeNextCharacter = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1));
          currentIndex++;
          timeoutRef.current = setTimeout(typeNextCharacter, speed);
        } else {
          // Animation complete
          setIsComplete(true);
          if (onComplete) {
            onComplete();
          }
        }
      };

      typeNextCharacter();
    }, startDelay);

    // Cleanup on unmount or dependency change
    return () => {
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, onComplete, startDelay, enabled]);

  return { displayedText, isComplete };
}

/**
 * useTypewriterSequence Hook
 *
 * Animates multiple text strings in sequence with typewriter effect.
 * Each string waits for the previous one to complete before starting.
 *
 * @param texts - Array of strings to animate in sequence
 * @param speed - Speed in milliseconds per character (default: 20ms)
 * @param delayBetween - Delay between each string in milliseconds (default: 500ms)
 * @returns Object with currentText (current string), currentIndex (index in array), allComplete (boolean)
 *
 * @example
 * const { currentText, currentIndex, allComplete } = useTypewriterSequence({
 *   texts: ["Ligne 1", "Ligne 2", "Ligne 3"],
 *   speed: 20,
 *   delayBetween: 500,
 * });
 */
export function useTypewriterSequence({
  texts,
  speed = 20,
  delayBetween = 500,
}: {
  texts: string[];
  speed?: number;
  delayBetween?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedTexts, setDisplayedTexts] = useState<string[]>([]);
  const [allComplete, setAllComplete] = useState(false);

  const currentText = texts[currentIndex] || "";

  const { displayedText, isComplete } = useTypewriter({
    text: currentText,
    speed,
    enabled: currentIndex < texts.length,
  });

  useEffect(() => {
    if (isComplete && currentIndex < texts.length) {
      // Add completed text to array
      setDisplayedTexts((prev) => [...prev, displayedText]);

      // Move to next text after delay
      if (currentIndex < texts.length - 1) {
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, delayBetween);
      } else {
        // All texts complete
        setAllComplete(true);
      }
    }
  }, [isComplete, currentIndex, displayedText, texts.length, delayBetween]);

  return {
    currentText: displayedText,
    currentIndex,
    displayedTexts,
    allComplete,
  };
}

export default useTypewriter;
