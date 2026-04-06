import { motion } from "motion/react";
import { Cpu, Zap, Layers, Settings } from "lucide-react";

const features = [
  {
    icon: <Cpu size={32} className="text-cyber-blue" />,
    title: "Quantum Switches",
    description: "Ultra-responsive magnetic switches with adjustable actuation points down to 0.1mm."
  },
  {
    icon: <Zap size={32} className="text-cyber-cyan" />,
    title: "Hyper-Speed Polling",
    description: "8000Hz polling rate ensures zero latency, giving you the edge in every keystroke."
  },
  {
    icon: <Layers size={32} className="text-cyber-purple" />,
    title: "Acoustic Dampening",
    description: "Multi-layered silicone and poron foam for a deep, satisfying thock sound profile."
  },
  {
    icon: <Settings size={32} className="text-white" />,
    title: "Modular Architecture",
    description: "Hot-swappable PCB and magnetic top frames allow complete customization in seconds."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-32 relative z-20 bg-cyber-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-display font-bold mb-4"
          >
            ENGINEERED FOR <span className="text-gradient">EXCELLENCE</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Every component is meticulously crafted to deliver an unparalleled typing experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col items-start group relative overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute -inset-4 bg-gradient-to-br from-cyber-blue/0 to-cyber-purple/0 group-hover:from-cyber-blue/10 group-hover:to-cyber-purple/10 blur-xl transition-all duration-500 z-0" />
              
              <div className="relative z-10 mb-6 p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyber-blue/30 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="relative z-10 text-xl font-bold mb-3 text-white group-hover:text-cyber-blue transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="relative z-10 text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
