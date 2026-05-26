import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { ContentData } from "@/types";
import { Card } from "@/components/ui/Card";
import { ImageRenderer } from "@/components/ui/ImageRenderer";

export function Slide07ExperienceAdaptive({ data }: { data: ContentData["s7"] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".adap-card",
      { opacity: 0, y: 50, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%"
        }
      }
    );
  }, { scope: containerRef });

  const [dateRole, company, position] = data.subtitle.split(" | ");

  return (
    <section id="slide-7" ref={containerRef} className="py-24 md:py-32 relative z-10 w-full min-h-[80vh] flex items-center justify-center">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ImageRenderer src={data.images.visual} className="w-full h-[120%] -top-[10%] opacity-30 object-cover" />
        <div className="absolute inset-0 bg-midnight/80 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        <Card className="adap-card p-8 md:p-14 bg-obsidian/90 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col items-center text-center">
          
          <h3 className="text-cyber font-semibold tracking-widest text-sm uppercase mb-4">
            {data.title}
          </h3>
          <h2 className="text-4xl md:text-5xl font-syne font-bold mb-4 text-[#64cefb]">
            {company}
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <span className="font-mono text-xs uppercase bg-white/5 border border-white/10 py-1.5 px-3 rounded-md text-[#A0A0AB]">
              {dateRole}
            </span>
            <span className="text-indigo font-medium">{position}</span>
          </div>

          <div className="space-y-6 w-full text-left">
            {data.highlights.map((highlight, idx) => {
              const splitPoint = highlight.indexOf(":");
              let strongText = highlight;
              let restText = "";
              if (splitPoint !== -1) {
                 strongText = highlight.slice(0, splitPoint + 1);
                 restText = highlight.slice(splitPoint + 1);
              }
              return (
                <div key={idx} className="bg-white/5 rounded-xl p-6 border border-white/5">
                  <span className="font-semibold text-white block mb-2">{strongText}</span>
                  <span className="text-[#A0A0AB] text-sm md:text-base leading-relaxed">{restText}</span>
                </div>
              );
            })}
          </div>

        </Card>
      </div>
    </section>
  );
}
