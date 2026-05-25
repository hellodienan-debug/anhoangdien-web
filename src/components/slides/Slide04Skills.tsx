import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { ContentData } from "@/types";
import { Card } from "@/components/ui/Card";
import { ImageRenderer } from "@/components/ui/ImageRenderer";
import { CheckCircle2 } from "lucide-react";

export function Slide04Skills({ data }: { data: ContentData["s4"] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".bento-item",
      { opacity: 0, scale: 0.95, y: 20 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%"
        }
      }
    );
  }, { scope: containerRef });

  const skillsList = [
    "Key Account Management",
    "Account Operation",
    "Sales Data Analysis",
    "Business Planning",
    "Project Management",
    "E-commerce Operations"
  ];

  return (
    <section id="slide-4" ref={containerRef} className="py-24 md:py-32 relative z-10 w-full max-w-7xl mx-auto px-6 xl:px-12">
      <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
        <h3 className="bento-item text-indigo font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase mb-3">
          {data.subtitle}
        </h3>
        <h2 className="bento-item text-3xl md:text-5xl font-syne font-black tracking-tighter uppercase text-white">
          {data.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* Main Bento: Skills (Spans 2 columns) */}
        <Card className="bento-item md:col-span-2 md:row-span-2 overflow-hidden flex flex-col justify-end p-8 md:p-12 min-h-[400px]">
          <ImageRenderer src={data.images.skills} className="absolute inset-0 z-0 opacity-70 mix-blend-overlay hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/90 to-transparent z-10" />
          
          <div className="relative z-20">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-cyber font-bold mb-4">Core Competencies</h3>
            <div className="flex flex-wrap gap-3 mt-6">
              {skillsList.map((skill, i) => (
                <span key={i} className="text-[10px] md:text-xs font-syne font-semibold uppercase px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:border-cyber/50 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Small Bento 1: Tools */}
        <Card className="bento-item p-6 md:p-8 flex flex-col justify-between overflow-hidden group">
          <div className="relative z-20 mb-6">
            <h3 className="text-xl font-syne text-white mb-2">Tools & Software</h3>
            <p className="text-sm text-[#A0A0AB]">Power BI, Google Analytics, Microsoft Office Suite</p>
          </div>
          <div className="relative h-24 w-full z-10 mt-auto rounded-lg overflow-hidden border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity">
            <ImageRenderer src={data.images.tools} className="w-full h-full object-cover mix-blend-screen" />
          </div>
        </Card>

        {/* Small Bento 2: Language */}
        <Card className="bento-item p-6 md:p-8 relative overflow-hidden bg-gradient-to-br from-indigo/20 to-obsidian group">
          <div className="relative z-20 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-syne text-white mb-2">Language</h3>
              <p className="text-sm text-[#A0A0AB]">English Conversation</p>
            </div>
            <div>
              <div className="text-4xl text-cyber font-bold font-syne tracking-tighter mb-1 mt-4">
                TOEIC 550
              </div>
            </div>
          </div>
          
          {/* Typographic Art Background */}
          <div className="absolute -right-8 -bottom-10 text-[180px] font-black font-syne text-white/[0.03] leading-none pointer-events-none group-hover:text-white/[0.05] transition-colors">
            EN
          </div>
        </Card>

      </div>
    </section>
  );
}
