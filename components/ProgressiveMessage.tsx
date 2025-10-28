"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { IdentityA1 } from "@/lib/types";
import GlassmorphicCard from "@/components/design-system/GlassmorphicCard";
import { fadeIn } from "@/lib/animations";

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
        return `👋 Bonjour ${firstName}!\n\nFélicitations de prendre action aujourd'hui. Pendant que notre IA analyse votre présence digitale, laissez-moi vous expliquer ce qui se passe en coulisses...`;

      case 2:
        return `🔍 Notre IA vient de scanner ${companyName}.\n\n✓ Secteur identifié: ${identityData?.sector || "en cours..."}\n✓ Taille: ${identityData?.size || "en cours..."}\n\nMaintenant, l'IA compare votre site aux 47 critères essentiels de maturité digitale...`;

      case 3:
        return `📊 L'IA compare votre présence digitale aux standards de votre secteur.\n\nElle analyse vos forces, vos lacunes, et surtout... elle calcule quelque chose de très important pour vous: le TEMPS que vous pourriez économiser chaque semaine.`;

      case 4:
        return `🎯 Les opportunités sont identifiées!\n\nNotre IA a détecté exactement où vous perdez du temps chaque semaine:\n\n✓ Présence digitale: ${totalHours ? (totalHours * 0.3).toFixed(1) : "X"}h/semaine\n✓ Création de valeur: ${totalHours ? (totalHours * 0.4).toFixed(1) : "Y"}h/semaine\n✓ Gestion business: ${totalHours ? (totalHours * 0.3).toFixed(1) : "Z"}h/semaine`;

      case 5:
        return `💎 Total: ${totalHours || "XXX"} heures par an récupérables!\n\nImaginez ce que vous pourriez faire avec tout ce temps...\n\nVoulez-vous savoir exactement comment récupérer ces heures?`;

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

  // Get phase label
  const getPhaseLabel = (phase: number): string => {
    switch (phase) {
      case 1: return "Bienvenue";
      case 2: return "Découverte";
      case 3: return "Analyse";
      case 4: return "Révélation";
      case 5: return "Invitation";
      default: return "Phase";
    }
  };

  return (
    <GlassmorphicCard className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <motion.div {...fadeIn} className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 animate-pulse" />
          <h2 className="text-xl md:text-2xl font-heading font-bold text-slate-900">
            Message de l&apos;IA
          </h2>
        </motion.div>

        {/* Phase badge */}
        <motion.div
          key={currentPhase}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm font-semibold shadow-glow-cyan"
        >
          {getPhaseLabel(currentPhase)}
        </motion.div>
      </div>

      {/* Phase dots */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((phase) => (
          <div
            key={phase}
            className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
              phase <= currentPhase
                ? "bg-gradient-to-r from-cyan-500 to-emerald-500"
                : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Message content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase}
            {...fadeIn}
            className="prose prose-lg max-w-none"
          >
            <p className="text-slate-700 leading-relaxed whitespace-pre-line text-lg">
              {displayedText}
              {isTyping && (
                <span className="inline-block w-0.5 h-6 bg-cyan-500 ml-1 animate-pulse" />
              )}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 font-medium">
            Phase {currentPhase} / 5
          </span>
          <span className="text-cyan-600 font-mono font-bold">
            {progress}% terminé
          </span>
        </div>
      </div>
    </GlassmorphicCard>
  );
}
