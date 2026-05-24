import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TOTAL_SLIDES = 9;

export function Header() {
  const [activeSlide, setActiveSlide] = useState(1);

  // In a real implementation, we would tie this to IntersectionObserver or GSAP ScrollTrigger
  // to detect the currently active slide. For now, we mock the scroll listener.
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      // Rough estimation based on height
      const current = Math.min(
        TOTAL_SLIDES,
        Math.max(1, Math.ceil((scrollPosition + windowHeight / 2) / windowHeight))
      );
      setActiveSlide(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-6xl z-50 flex justify-between items-center liquid-glass rounded-full px-6 py-3">
        <div className="flex items-center gap-3 pl-2">
          <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <div className="text-xl font-syne font-black tracking-tighter uppercase text-white">
            AH<span className="text-cyber">.</span>DIEN
          </div>
        </div>
        <nav className="hidden lg:flex items-center rounded-full border border-gray-700 px-6 py-2 liquid-glass gap-8 text-xs font-medium text-white/80">
          <a href="#slide-1" className="hover:text-white transition-colors">01 Overview</a>
          <a href="#slide-3" className="hover:text-white transition-colors">02 Education</a>
          <a href="#slide-4" className="hover:text-white transition-colors">03 Skills</a>
          <a href="#slide-5" className="hover:text-white transition-colors">04 Experience</a>
          <a href="#slide-2" className="hover:text-white transition-colors">05 Contact</a>
        </nav>
        <div className="hidden sm:flex text-xs bg-black text-white hover:bg-gray-900 border border-white/20 transition-colors px-6 py-3 rounded-full font-bold uppercase tracking-wider items-center gap-2 group cursor-pointer">
          Available for hire
          <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
        </div>
      </header>

      {/* Vertical Page Indicator */}
      <div className="fixed left-6 xl:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-6 z-50 mix-blend-difference">
        <div className="font-syne text-[10px] rotate-90 mb-4 tracking-widest text-white/30 uppercase">Scroll</div>
        <div className="w-[1px] h-20 bg-white/10 relative">
          <div 
            className="absolute top-0 left-0 w-full bg-cyber transition-all duration-300"
            style={{ height: `${(activeSlide / TOTAL_SLIDES) * 100}%` }}
          />
        </div>
        <div className="flex flex-col gap-4 mt-4 items-center">
          <span className="text-cyber text-xs font-bold font-syne">{String(activeSlide).padStart(2, '0')}</span>
          <span className="text-white/20 text-[10px] font-syne">{String(TOTAL_SLIDES).padStart(2, '0')}</span>
        </div>
      </div>
    </>
  );
}
