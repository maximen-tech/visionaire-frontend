"use client";

import { useEffect, useState, useRef } from "react";
import type { IdentityA1 } from "@/lib/types";

interface ProgressiveMessageProps {
  progress: number;
  identityData: IdentityA1 | null;
  totalHours: number | null;
  status: string;
  onComplete: () => void;
}

const TYPING_SPEED = 20; // ms per character

export default function ProgressiveMessage({
  progress,
  identityData,
  totalHours,
  status,
  onComplete,
}: ProgressiveMessageProps) {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [phaseComplete, setPhaseComplete] = useState(false);
  const completedRef = useRef(false);

  // Determine phase based on progress
  useEffect(() => {
    if (progress < 20) setCurrentPhase(1);
    else if (progress < 45) setCurrentPhase(2);
    else if (progress < 75) setCurrentPhase(3);
    else if (progress < 95) setCurrentPhase(4);
    else setCurrentPhase(5);
  }, [progress]);

  // Get phase message content
  const getPhaseMessage = (phase: number): string => {
    const firstName = identityData?.owner_first_name || "Monsieur/Madame";
    const companyName = identityData?.company_name || "votre entreprise";

    switch (phase) {
      case 1:
        return `Bonjour ${firstName}! Félicitations de prendre action aujourd'hui. Pendant que notre IA analyse votre présence digitale, laissez-moi vous expliquer ce qui se passe en coulisses...`;

      case 2:
        return `Notre IA vient de scanner ${companyName}. ✓ Secteur identifié: ${identityData?.sector || "en cours..."}\n✓ Taille: ${identityData?.size || "en cours..."}\n\nMaintenant, l'IA compare votre site aux 47 critères essentiels de maturité digitale...`;

      case 3:
        return `L'IA compare votre présence digitale aux standards de votre secteur. Elle analyse vos forces, vos lacunes, et surtout... elle calcule quelque chose de très important pour vous: le TEMPS que vous pourriez économiser chaque semaine.`;

      case 4:
        return `Les opportunités sont identifiées! Notre IA a détecté exactement où vous perdez du temps chaque semaine:\n\n✓ Présence digitale: ${totalHours ? (totalHours * 0.3).toFixed(1) : "X"}h/semaine\n✓ Création de valeur: ${totalHours ? (totalHours * 0.4).toFixed(1) : "Y"}h/semaine\n✓ Gestion business: ${totalHours ? (totalHours * 0.3).toFixed(1) : "Z"}h/semaine`;

      case 5:
        return `Total: ${totalHours || "XXX"} heures par an récupérables! Imaginez ce que vous pourriez faire avec tout ce temps... Voulez-vous savoir exactement comment récupérer ces heures?`;

      default:
        return "";
    }
  };

  // Typewriter effect
  useEffect(() => {
    const targetText = getPhaseMessage(currentPhase);

    if (targetText === displayedText) {
      setIsTyping(false);
      setPhaseComplete(true);

      // If phase 5 is complete AND status is COMPLETE, trigger onComplete
      if (currentPhase === 5 && status === "COMPLETE" && !completedRef.current) {
        completedRef.current = true;
        setTimeout(() => {
          onComplete();
        }, 3000); // 3 second pause before allowing redirect
      }
      return;
    }

    setIsTyping(true);
    setPhaseComplete(false);

    const timer = setTimeout(() => {
      setDisplayedText(targetText.substring(0, displayedText.length + 1));
    }, TYPING_SPEED);

    return () => clearTimeout(timer);
  }, [displayedText, currentPhase, identityData, totalHours, status, onComplete]);

  // Reset text when phase changes
  useEffect(() => {
    setDisplayedText("");
    setPhaseComplete(false);
  }, [currentPhase]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Message de l'IA
        </h2>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((phase) => (
            <div
              key={phase}
              className={`w-2 h-2 rounded-full transition-colors ${
                phase <= currentPhase ? "bg-indigo-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-2 h-5 bg-indigo-600 ml-1 animate-pulse" />
            )}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Phase {currentPhase} / 5
          </span>
          <span className="text-indigo-600 font-medium">
            {progress}% terminé
          </span>
        </div>
      </div>
    </div>
  );
}
