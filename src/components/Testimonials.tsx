import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Mercer",
    role: "Pro Gamer",
    content: "The actuation speed on these magnetic switches is unreal. It feels like the keyboard reads my mind before I even press the key.",
    avatar: "https://picsum.photos/seed/alex/100/100"
  },
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    content: "I type for 10 hours a day. The acoustic dampening and ergonomic profile have completely eliminated my wrist fatigue. Worth every penny.",
    avatar: "https://picsum.photos/seed/sarah/100/100"
  },
  {
    name: "Marcus Thorne",
    role: "Tech Reviewer",
    content: "CyberKeys has managed to blend premium aesthetics with enthusiast-level performance. This is the new gold standard for pre-built keyboards.",
    avatar: "https://picsum.photos/seed/marcus/100/100"
  }
];

export default function Testimonials() {
  return (
    <section id="community" className="py-32 relative z-20 bg-cyber-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-display font-bold mb-4"
          >
            JOIN THE <span className="text-gradient">ELITE</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Don't just take our word for it. Hear from the professionals who rely on our gear daily.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel p-8 rounded-3xl relative group hover:border-cyber-blue/30 transition-colors duration-500"
            >
              {/* Soft background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full border-2 border-white/10 group-hover:border-cyber-blue/50 transition-colors duration-500"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-cyber-blue">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4 relative z-10">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="text-cyber-cyan fill-cyber-cyan" />
                ))}
              </div>
              
              <p className="text-gray-400 leading-relaxed relative z-10 italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
