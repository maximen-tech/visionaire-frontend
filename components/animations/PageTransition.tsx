"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: "fade" | "slide" | "scale" | "blur" | "curtain";
  duration?: number;
}

const transitionVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  },
  scale: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.05, opacity: 0 },
  },
  blur: {
    initial: { filter: "blur(10px)", opacity: 0 },
    animate: { filter: "blur(0px)", opacity: 1 },
    exit: { filter: "blur(10px)", opacity: 0 },
  },
  curtain: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  },
};

export function PageTransition({
  children,
  variant = "fade",
  duration = 0.3,
}: PageTransitionProps) {
  const pathname = usePathname();
  const variants = transitionVariants[variant];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={{
          duration,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Stagger children animation
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Individual stagger item
export function StaggerItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Modal transition
interface ModalTransitionProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export function ModalTransition({
  children,
  isOpen,
  onClose,
}: ModalTransitionProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            initial={{ scale: 0.95, opacity: 0, y: "-45%" }}
            animate={{ scale: 1, opacity: 1, y: "-50%" }}
            exit={{ scale: 0.95, opacity: 0, y: "-45%" }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Slide-in panel (drawer)
interface DrawerTransitionProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  side?: "left" | "right" | "top" | "bottom";
}

export function DrawerTransition({
  children,
  isOpen,
  onClose,
  side = "right",
}: DrawerTransitionProps) {
  const slideVariants = {
    left: { x: "-100%" },
    right: { x: "100%" },
    top: { y: "-100%" },
    bottom: { y: "100%" },
  };

  const positionClasses = {
    left: "left-0 top-0 bottom-0",
    right: "right-0 top-0 bottom-0",
    top: "top-0 left-0 right-0",
    bottom: "bottom-0 left-0 right-0",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className={`fixed ${positionClasses[side]} z-50 bg-white dark:bg-dark-bg-primary shadow-depth-xl`}
            initial={slideVariants[side]}
            animate={{ x: 0, y: 0 }}
            exit={slideVariants[side]}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Notification/Toast transition
interface ToastTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

export function ToastTransition({
  children,
  isVisible,
  position = "top-right",
}: ToastTransitionProps) {
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  const slideDirection = position.includes("right")
    ? { x: 400 }
    : position.includes("left")
    ? { x: -400 }
    : { y: position.includes("top") ? -100 : 100 };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed ${positionClasses[position]} z-50`}
          initial={{ ...slideDirection, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ ...slideDirection, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Accordion transition
interface AccordionTransitionProps {
  children: React.ReactNode;
  isExpanded: boolean;
}

export function AccordionTransition({
  children,
  isExpanded,
}: AccordionTransitionProps) {
  return (
    <motion.div
      initial={false}
      animate={{
        height: isExpanded ? "auto" : 0,
        opacity: isExpanded ? 1 : 0,
      }}
      transition={{
        height: {
          duration: 0.3,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
}

// Route change loading bar
export function RouteChangeProgress() {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 z-50"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: [0, 0.3, 0.7, 1] }}
        exit={{ scaleX: 1, opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      />
    </AnimatePresence>
  );
}
