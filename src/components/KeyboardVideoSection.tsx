import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function KeyboardVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scale and rotate slightly as it enters
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.7, 1, 1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [10, 0, 0, -10]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[250vh] bg-cyber-dark overflow-visible"
      id="video-showcase"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-10">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-cyber-blue/20 via-transparent to-transparent opacity-30" />
        
        <motion.div 
          style={{ 
            scale, 
            opacity, 
            rotateX,
            perspective: "1000px"
          }}
          className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,243,255,0.15)]"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source 
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Engineered for <span className="text-cyber-blue">Precision</span>
              </h2>
              <p className="text-gray-400 max-w-xl text-lg">
                Experience the tactile response and lightning-fast actuation that defines our elite mechanical series.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Accents */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-cyber-blue/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-cyber-purple/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </section>
  );
}
