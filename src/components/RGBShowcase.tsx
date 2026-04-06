import { motion } from "motion/react";

const keyboardLayout = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
  [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25],
  [2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.75],
  [1.25, 1.25, 1.25, 6.25, 1.25, 1.25, 1.25, 1.25]
];

export default function RGBShowcase() {
  return (
    <section id="rgb" className="py-32 relative z-20 bg-cyber-dark overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark via-cyber-blue/5 to-cyber-dark" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-purple rounded-full blur-[150px] opacity-30 animate-rgb-shift mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            ILLUMINATE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-purple animate-rgb-shift bg-[length:200%_auto]">
              EXPERIENCE
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Per-key RGB lighting with 16.8 million colors. Sync with your entire setup using our proprietary software.
          </p>
        </motion.div>

        {/* Simulated Keyboard Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto p-4 md:p-8 rounded-3xl glass-panel border border-white/10 shadow-[0_0_100px_rgba(0,210,255,0.15)]"
        >
          <div className="flex flex-col gap-1 md:gap-2">
            {keyboardLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1 md:gap-2 w-full">
                {row.map((width, keyIndex) => (
                  <div
                    key={`${rowIndex}-${keyIndex}`}
                    className="h-10 sm:h-12 md:h-14 rounded-md bg-white/5 border border-white/10 relative overflow-hidden group hover:bg-white/20 transition-colors duration-300"
                    style={{
                      flex: width,
                    }}
                  >
                    {/* Simulated LED */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at center, ${
                          ['#00d2ff', '#00ffcc', '#b026ff'][Math.floor(Math.random() * 3)]
                        } 0%, transparent 70%)`
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Glowing underglow */}
          <div className="absolute -bottom-10 left-10 right-10 h-20 bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-purple blur-[60px] opacity-40 animate-rgb-shift" />
        </motion.div>
      </div>
    </section>
  );
}
