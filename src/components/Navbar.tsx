import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center">
            <span className="font-display font-bold text-white text-lg">C</span>
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-white">CYBER<span className="text-cyber-blue">KEYS</span></span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "Builder", "RGB", "Community"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-gray-400 hover:text-cyber-blue hover:drop-shadow-[0_0_8px_rgba(0,210,255,0.8)] transition-all duration-300"
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="rgb-border px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-sm font-bold tracking-wide transition-all duration-300"
          >
            Build Your Keyboard
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass-panel border-t border-white/10 px-6 py-4 flex flex-col gap-4"
        >
          {["Features", "Builder", "RGB", "Community"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-400 hover:text-cyber-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="rgb-border w-full px-6 py-3 rounded-full bg-white/5 text-sm font-bold mt-4">
            Build Your Keyboard
          </button>
        </motion.div>
      )}
    </nav>
  );
}
