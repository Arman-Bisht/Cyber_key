import { motion } from "motion/react";
import { Twitter, Instagram, Youtube, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-20 bg-cyber-dark border-t border-white/5 pt-24 pb-12 overflow-hidden">
      {/* Soft Top Border Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-cyber-blue/10 blur-[50px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center">
                <span className="font-display font-bold text-white text-lg">C</span>
              </div>
              <span className="font-display font-bold text-xl tracking-wider text-white">CYBER<span className="text-cyber-blue">KEYS</span></span>
            </div>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
              Crafting the ultimate typing experience. We blend futuristic design with uncompromising performance to build keyboards that inspire.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Youtube, Github].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-cyber-blue hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-cyber-blue/30"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 tracking-wider uppercase text-sm">Products</h4>
            <ul className="space-y-4">
              {["CyberKeys PRO", "CyberKeys LITE", "CyberKeys ELITE", "Accessories", "Custom Parts"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-cyber-cyan transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 tracking-wider uppercase text-sm">Support</h4>
            <ul className="space-y-4">
              {["Help Center", "Downloads", "Warranty", "Contact Us", "Track Order"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-cyber-purple transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CyberKeys Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
