import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useVideoScrub } from "../hooks/useVideoScrub";

export default function Hero() {
  const stickyContainerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the 500vh container
  const { scrollYProgress } = useScroll({
    target: stickyContainerRef,
    offset: ["start start", "end end"],
  });

  // Canvas-based video scrub with spring physics
  const { canvasRef, isLoaded, loadProgress } = useVideoScrub({
    src: "/videos/keyboard-assembly.webm",
    scrollProgress: scrollYProgress,
    duration: 5,
  });

  return (
    <section
      ref={stickyContainerRef}
      className="relative"
      style={{ height: "500vh" }}
    >
      {/* Sticky viewport — pinned while scrolling through 500vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* === Layer 0: Video Canvas === */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: "#05070a" }}
        />

        {/* === Loading shimmer overlay === */}
        {!isLoaded && (
          <div className="absolute inset-0 z-[5] flex items-center justify-center">
            {/* Subtle radial glow while loading */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.08)_0%,rgba(5,7,10,1)_70%)]" />

            {/* Loading indicator */}
            <div className="relative flex flex-col items-center gap-4">
              <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple"
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.round(loadProgress * 100)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">
                Loading Experience
              </span>
            </div>
          </div>
        )}

        {/* === Layer 1: Background Effects === */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.10)_0%,transparent_60%)]" />
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow"
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow"
            style={{ animationDelay: "1.5s" }}
          />

          {/* Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* === Top fade: blend into navbar === */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#05070a] to-transparent z-[2] pointer-events-none" />

        {/* === Bottom fade: blend into next section === */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#05070a] to-transparent z-[2] pointer-events-none" />

        {/* === Layer 2: Content (above canvas) === */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 pt-20">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyber-blue/30 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse" />
              <span className="text-xs font-mono text-cyber-blue tracking-widest uppercase">
                The Future of Typing
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-6"
            >
              ASSEMBLE <br className="hidden md:block" />
              <span className="text-gradient">PERFECTION.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 font-light"
            >
              Experience the ultimate fusion of cyber-minimalist design and
              uncompromising performance. Build the keyboard that redefines your
              reality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <button className="rgb-border px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(0,210,255,0.2)] hover:shadow-[0_0_50px_rgba(0,210,255,0.4)]">
                Start Building
              </button>
              <button className="px-8 py-4 rounded-full glass-panel text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                Watch Trailer
              </button>
            </motion.div>
          </div>

          {/* Scroll Indicator — positioned at the bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
          >
            <span className="text-xs font-mono uppercase tracking-widest">
              Scroll to Explore
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
