import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { ContentData } from "@/types";
import { Card } from "@/components/ui/Card";
import { ImageRenderer } from "@/components/ui/ImageRenderer";

export function Slide03Education({ data }: { data: ContentData["s3"] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".edu-anim",
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="slide-3" ref={containerRef} className="py-24 md:py-32 relative z-10 w-full max-w-7xl mx-auto px-6 xl:px-12">
      <div className="flex flex-col-reverse md:flex-row gap-12 lg:gap-20 items-center">
        
        {/* Left: Immersive Image Adaptive Showcase */}
        <div className="w-full md:w-1/2 relative edu-anim">
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo/20 to-transparent blur-2xl -z-10 rounded-full" />
          <Card className="aspect-[3/4] p-3 w-full max-w-md mx-auto" hoverEffect={false}>
            <ImageRenderer src={data.images.visual} className="w-full h-full rounded-xl" />
            
            {/* Superimposed Logo */}
            <div className="absolute top-8 right-8 w-20 h-20 bg-midnight/80 backdrop-blur border border-white/10 p-3 rounded-2xl shadow-deep">
              <ImageRenderer src={data.images.logo} className="w-full h-full rounded-lg mix-blend-screen" />
            </div>
          </Card>
        </div>

        {/* Right: Text Showcase */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h3 className="edu-anim text-cyber font-semibold tracking-widest text-sm uppercase mb-3">
            {data.subtitle}
          </h3>
          <h2 className="edu-anim text-4xl md:text-5xl lg:text-6xl font-syne font-bold mb-10 text-[#64cefb]">
            {data.title}
          </h2>

          <Card className="edu-anim p-8 border-l-2 border-l-indigo bg-gradient-to-r from-obsidian to-midnight">
            <h4 className="text-2xl font-syne font-semibold text-white mb-2">
              University of Economics HCMC
            </h4>
            <p className="text-indigo text-lg mb-6">Commercial Business</p>
            
            <div className="flex items-center gap-4 text-[#A0A0AB]">
              <span className="font-mono text-sm tracking-wide bg-white/5 py-1 px-3 rounded text-white">
                2015 - 2020
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyber" />
              <span className="font-medium text-white">GPA: 7.42/10 (Good)</span>
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
}
