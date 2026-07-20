import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ onAdminClick }: { onAdminClick: () => void }) {

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center text-lg">
            🔧
          </div>
          <div className="text-white font-bold tracking-wide">
            MANOJ AUTOMOBILE
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {["Services", "Pricing", "About", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item === "Pricing" ? "estimator" : item.toLowerCase()}`}
              className="relative text-sm text-white/70 hover:text-white transition"
            >
              {item}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-orange-500 transition-all duration-300 hover:w-full"></span>
            </a>
          ))}

          <button
            onClick={onAdminClick}
            className="px-4 py-1.5 border border-white/20 rounded-full text-sm hover:bg-white/10 transition"
          >
            Admin
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-black/90 backdrop-blur-xl px-5 pb-6"
          >
            <div className="flex flex-col gap-4 pt-4">
              {["services","estimator","about","faq"].map((id) => (
                <a key={id} href={`#${id}`} className="text-white/80">
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}