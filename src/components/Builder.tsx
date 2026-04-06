import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import InteractiveKeyboard from "./InteractiveKeyboard";

const parts = [
  { id: "case", name: "Case", options: ["Obsidian Black", "Titanium Gray", "Neon Cyan"] },
  { id: "switches", name: "Switches", options: ["Linear Red", "Tactile Brown", "Clicky Blue"] },
  { id: "keycaps", name: "Keycaps", options: ["PBT Cyberpunk", "ABS Stealth", "Ceramic White"] }
];

export default function Builder() {
  const [activePart, setActivePart] = useState(parts[0].id);
  const [selections, setSelections] = useState({
    case: "Obsidian Black",
    switches: "Linear Red",
    keycaps: "PBT Cyberpunk"
  });

  return (
    <section id="builder" className="py-32 relative z-20 bg-cyber-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-display font-bold mb-4"
          >
            BUILD YOUR <span className="text-gradient">WEAPON</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Customize every aspect of your keyboard with our intuitive builder. Click the keys to test the feel.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Builder Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video rounded-3xl glass-panel overflow-visible flex items-center justify-center group p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 to-cyber-purple/5 z-0 rounded-3xl" />
            
            <div className="relative z-10 w-full max-w-2xl">
              <InteractiveKeyboard 
                caseType={selections.case} 
                keycapType={selections.keycaps} 
                switchType={selections.switches}
              />
            </div>

            {/* Glowing accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyber-cyan/20 rounded-full blur-[80px] z-0 animate-pulse-glow" />
          </motion.div>

          {/* Builder Controls */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/10 pb-4">
              {parts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => setActivePart(part.id)}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors duration-300 relative ${
                    activePart === part.id ? "text-cyber-blue" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {part.name}
                  {activePart === part.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute -bottom-[18px] left-0 right-0 h-0.5 bg-cyber-blue shadow-[0_0_10px_rgba(0,210,255,0.8)]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Options */}
            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePart}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        staggerChildren: 0.1,
                        duration: 0.4,
                        ease: "easeOut"
                      }
                    },
                    exit: { 
                      opacity: 0, 
                      x: -20,
                      transition: {
                        duration: 0.2,
                        ease: "easeIn"
                      }
                    }
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {parts.find(p => p.id === activePart)?.options.map((option) => (
                    <motion.button
                      key={option}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -10 }
                      }}
                      whileHover={{ 
                        y: -4,
                        boxShadow: selections[activePart as keyof typeof selections] === option 
                          ? "0 0 30px rgba(0, 210, 255, 0.4)" 
                          : "0 0 20px rgba(255, 255, 255, 0.1)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelections({ ...selections, [activePart]: option })}
                      className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
                        selections[activePart as keyof typeof selections] === option
                          ? "bg-cyber-blue/10 border-cyber-blue shadow-[0_0_20px_rgba(0,210,255,0.2)] animate-pulse-glow"
                          : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 mb-4 border border-white/20" />
                      <h4 className="font-bold text-white mb-1">{option}</h4>
                      <p className="text-xs text-gray-400">Premium finish</p>
                    </motion.button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="mt-8 p-6 rounded-2xl glass-panel border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Build</p>
                <p className="text-2xl font-display font-bold text-white">$249.00</p>
              </div>
              <button className="rgb-border px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold tracking-wide transition-all duration-300">
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
