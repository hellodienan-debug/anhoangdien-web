import React from "react";

export function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-6 xl:px-12 pb-8 pt-12 relative z-10 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end border-t border-white/10 pt-6 text-white/40 gap-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyber"></div>
            <span className="text-[10px] md:text-xs uppercase tracking-tighter font-medium text-white/80">0703 5555 44</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo"></div>
            <span className="text-[10px] md:text-xs uppercase tracking-tighter font-medium text-white/80">hellodienan@gmail.com</span>
          </div>
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] font-light text-center md:text-right">
          Portfolio Volume 2026 // Edition 01
        </div>
      </div>
    </footer>
  );
}
