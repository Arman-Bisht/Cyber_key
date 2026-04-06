import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";

const keyboardLayout = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
  [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25],
  [2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.75],
  [1.25, 1.25, 1.25, 6.25, 1.25, 1.25, 1.25, 1.25]
];

interface KeyProps {
  width: number;
  keycapClass: string;
  glowColor: string;
  switchColor: string;
  label: string;
}

const Key: React.FC<KeyProps> = ({ width, keycapClass, glowColor, switchColor, label }) => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isFlashing, setIsFlashing] = useState(false);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const y = ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top;
    
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setIsFlashing(true);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    setTimeout(() => {
      setIsFlashing(false);
    }, 150);
  };

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ y: 2, scale: 0.95, rotateX: 5, rotateY: 5 }}
      onPointerDown={handleClick}
      animate={isFlashing ? { 
        borderColor: glowColor,
        boxShadow: `0 0 15px ${glowColor}66`
      } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`h-8 sm:h-10 md:h-12 rounded-md border backdrop-blur-sm relative overflow-hidden cursor-pointer flex items-center justify-center text-[8px] md:text-[10px] font-mono transition-colors duration-500 ${keycapClass}`}
      style={{ flex: width, perspective: "500px" }}
    >
      {/* Flash Overlay */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-0"
            style={{ backgroundColor: glowColor }}
          />
        )}
      </AnimatePresence>

      {/* Ripple Effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full pointer-events-none z-0"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 20,
              height: 20,
              marginLeft: -10,
              marginTop: -10,
              backgroundColor: glowColor,
              filter: "blur(4px)",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-10" />
      
      {/* Switch Stem Visual */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full opacity-20 transition-colors duration-500 z-10 ${switchColor}`} />
      
      {/* Key Label */}
      <span className="opacity-40 select-none relative z-20">
        {label}
      </span>
    </motion.div>
  );
};

interface InteractiveKeyboardProps {
  caseType: string;
  keycapType: string;
  switchType: string;
}

export default function InteractiveKeyboard({ caseType, keycapType, switchType }: InteractiveKeyboardProps) {
  const getCaseStyles = () => {
    switch (caseType) {
      case "Obsidian Black": 
        return {
          container: "bg-zinc-950 border-zinc-800 shadow-zinc-950/50",
          overlay: "bg-gradient-to-tr from-white/5 via-transparent to-white/5 opacity-30",
          effect: "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent)] pointer-events-none"
        };
      case "Titanium Gray": 
        return {
          container: "bg-zinc-700 border-zinc-600 shadow-zinc-700/50",
          overlay: "bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.03)_100%)]",
          effect: "absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] pointer-events-none"
        };
      case "Neon Cyan": 
        return {
          container: "bg-cyan-950 border-cyan-800 shadow-cyan-900/50",
          overlay: "bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-blue-500/10 opacity-40 animate-pulse",
          effect: "absolute inset-0 overflow-hidden pointer-events-none"
        };
      default: 
        return {
          container: "bg-zinc-900",
          overlay: "",
          effect: ""
        };
    }
  };

  const caseStyles = getCaseStyles();

  const getKeycapClass = () => {
    switch (keycapType) {
      case "PBT Cyberpunk": return "bg-purple-900/40 border-purple-500/30 text-purple-200 shadow-purple-500/10";
      case "ABS Stealth": return "bg-zinc-800/40 border-zinc-700/30 text-zinc-400 shadow-zinc-900/10";
      case "Ceramic White": return "bg-zinc-100/10 border-zinc-100/20 text-zinc-100 shadow-zinc-100/5";
      default: return "bg-zinc-800/40";
    }
  };

  const getSwitchColor = () => {
    switch (switchType) {
      case "Linear Red": return "bg-red-500";
      case "Tactile Brown": return "bg-amber-800";
      case "Clicky Blue": return "bg-blue-500";
      default: return "bg-zinc-600";
    }
  };

  const getGlowColor = () => {
    switch (keycapType) {
      case "PBT Cyberpunk": return "#b026ff";
      case "ABS Stealth": return "#00d2ff";
      case "Ceramic White": return "#ffffff";
      default: return "#00d2ff";
    }
  };

  return (
    <div className={`relative p-4 rounded-2xl border-4 shadow-2xl transition-all duration-700 overflow-hidden ${caseStyles.container}`}>
      {/* Material Effects Layer */}
      <div className={`absolute inset-0 pointer-events-none z-0 ${caseStyles.overlay}`} />
      <div className={caseStyles.effect} />
      
      {/* Light Trails for Neon Cyan */}
      {caseType === "Neon Cyan" && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div 
            animate={{ 
              x: ["-100%", "200%"],
              y: ["-100%", "200%"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute w-1 h-64 bg-cyan-400/20 blur-xl rotate-45"
          />
          <motion.div 
            animate={{ 
              x: ["200%", "-100%"],
              y: ["200%", "-100%"]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "linear",
              delay: 1
            }}
            className="absolute w-1 h-64 bg-purple-400/20 blur-xl rotate-45"
          />
        </div>
      )}

      <div className="flex flex-col gap-1.5 md:gap-2 relative z-10">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1.5 md:gap-2 w-full">
            {row.map((width, keyIndex) => (
              <Key
                key={`${rowIndex}-${keyIndex}`}
                width={width}
                keycapClass={getKeycapClass()}
                glowColor={getGlowColor()}
                switchColor={getSwitchColor()}
                label={width > 3 ? "SPACE" : ""}
              />
            ))}
          </div>
        ))}
      </div>
      
      {/* Underglow */}
      <div 
        className="absolute -bottom-2 left-4 right-4 h-4 blur-xl opacity-50 transition-colors duration-700"
        style={{ backgroundColor: getGlowColor() }}
      />
    </div>
  );
}
