import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ContentData } from "@/types";
import { ShinyText } from "@/components/ui/ShinyText";
import { ImageRenderer } from "@/components/ui/ImageRenderer";

gsap.registerPlugin(ScrollTrigger);

export function Slide01Hero({ data }: { data: ContentData["s1"] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom top",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".hero-title", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.1 }
    )
    .fromTo(".hero-subtitle",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(".hero-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, transformOrigin: "left center", ease: "power3.inOut" },
      "-=0.5"
    )
    .fromTo(".hero-body",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    )
    .fromTo(".hero-image",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
      "-=0.8"
    );

    // Parallax background
    gsap.to(".hero-bg", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: containerRef });

  return (
    <section id="slide-1" ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <ImageRenderer src={data.images.background} className="hero-bg w-full h-[130%] -top-[15%] opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/90 to-midnight/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 xl:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-24">
        {/* Left Content */}
        <div className="flex-1 text-left w-full">
          <h2 className="hero-subtitle text-[#64cefb] text-sm md:text-base font-bold tracking-[0.4em] uppercase mb-4">
            {data.subtitle}
          </h2>
          <div className="overflow-hidden mb-6">
            <h1 className="hero-title text-6xl md:text-[80px] lg:text-[120px] font-black tracking-normal uppercase leading-[0.85] text-white">
              AN HOANG<br />
              <ShinyText text="DIEN" />
            </h1>
          </div>
          <div className="hero-line w-24 h-1 bg-cyber mb-8" />
          <p className="hero-body text-base md:text-xl text-[#A0A0AB] max-w-xl font-light leading-relaxed">
            {data.body}
          </p>
        </div>

        {/* Right Portrait */}
        <div className="hero-image relative w-full md:w-[45%] aspect-[4/5] flex-shrink-0">
          <div className="absolute inset-0 bg-cyber blur-[120px] opacity-10 rounded-full" />
          <ImageRenderer 
            src={data.images.portrait} 
            className="w-full h-full border border-white/10 rounded-[32px] shadow-deep z-10 relative bg-transparent" 
          />
        </div>
      </div>
    </section>
  );
}
