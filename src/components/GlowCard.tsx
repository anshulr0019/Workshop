import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlowCard({ children, className = "", hover = true }: Props) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.3 }}
      className={`relative group ${className}`}
    >
      {/* Animated glow behind */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-[#f47c20] via-[#1a4fa0] to-[#f47c20] rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition duration-700 bg-[length:300%_300%] animate-glow" />
      
      {/* Card content */}
      <div className="relative h-full bg-[#161616] border border-white/[0.06] rounded-2xl overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}