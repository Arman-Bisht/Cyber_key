import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "CyberKeys PRO",
    price: "$249",
    image: "https://picsum.photos/seed/pro/800/600",
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "CyberKeys LITE",
    price: "$149",
    image: "https://picsum.photos/seed/lite/800/600",
    tag: "Compact"
  },
  {
    id: 3,
    name: "CyberKeys ELITE",
    price: "$349",
    image: "https://picsum.photos/seed/elite/800/600",
    tag: "Premium"
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-32 relative z-20 bg-cyber-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-display font-bold mb-4"
            >
              CHOOSE YOUR <span className="text-gradient">WEAPON</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 max-w-xl"
            >
              Explore our lineup of meticulously crafted keyboards, designed for every type of user.
            </motion.p>
          </div>
          <motion.a 
            href="#"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:flex items-center gap-2 text-cyber-blue hover:text-cyber-cyan transition-colors font-bold tracking-wide"
          >
            View All Models <ArrowRight size={20} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-cyber-blue/30 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Tag */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-cyber-blue/20 border border-cyber-blue/50 backdrop-blur-md">
                  <span className="text-xs font-bold text-cyber-blue uppercase tracking-wider">{product.tag}</span>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-20 p-6 bg-cyber-dark/80 backdrop-blur-xl border-t border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-display font-bold text-white group-hover:text-cyber-blue transition-colors duration-300">
                    {product.name}
                  </h3>
                  <span className="text-xl font-mono text-gray-300">{product.price}</span>
                </div>
                
                <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold tracking-wide transition-all duration-300 border border-white/10 group-hover:border-cyber-blue/50 flex items-center justify-center gap-2">
                  Buy Now <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <a href="#" className="inline-flex items-center gap-2 text-cyber-blue font-bold">
            View All Models <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
