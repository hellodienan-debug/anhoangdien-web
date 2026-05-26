import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { ContentData } from "@/types";
import { Card } from "@/components/ui/Card";
import { ImageRenderer } from "@/components/ui/ImageRenderer";

type SlideExperienceProps = {
  data: ContentData["s5"] | ContentData["s6"] | ContentData["s8"];
  slideId: string;
  imageLeft?: boolean;
};

export function SlideExperienceDashboard({ data, slideId, imageLeft = false }: SlideExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".exp-anim",
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

  const [dateRole, company, position] = data.subtitle.split(" | ");

  const ContentBlock = () => (
    <div className="w-full md:w-[60%] flex flex-col justify-center">
      <h3 className="exp-anim text-indigo font-semibold tracking-widest text-sm uppercase mb-3">
        {data.title}
      </h3>
      <h2 className="exp-anim text-3xl md:text-5xl font-syne font-bold mb-4 text-[#64cefb]">
        {company || "Company"}
      </h2>
      <div className="exp-anim flex flex-wrap items-center gap-3 mb-8">
        <span className="font-mono text-xs uppercase bg-cyber/10 text-cyber border border-cyber/20 py-1.5 px-3 rounded-md">
          {dateRole}
        </span>
        <span className="text-[#A0A0AB]">{position || data.subtitle}</span>
      </div>

      <div className="exp-anim space-y-4 max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {data.highlights.map((highlight, idx) => {
          const splitPoint = highlight.indexOf(":");
          if (splitPoint === -1) {
            return (
              <Card key={idx} className="p-5">
                <p className="text-[#A0A0AB] leading-relaxed text-sm md:text-base">
                  {highlight}
                </p>
              </Card>
            );
          }
          const strongText = highlight.slice(0, splitPoint + 1);
          const restText = highlight.slice(splitPoint + 1);
          return (
            <Card key={idx} className="p-5 border-l-2 hover:border-l-cyber transition-all border-l-transparent">
              <span className="font-semibold text-white block mb-1">{strongText}</span>
              <span className="text-[#A0A0AB] text-sm md:text-base leading-relaxed">{restText}</span>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const ImageBlock = () => (
    <div className="w-full md:w-[40%] flex items-center exp-anim">
      <Card className="w-full aspect-[4/5] p-2" hoverEffect={false}>
        <ImageRenderer src={data.images.visual} className="w-full h-full rounded-xl brightness-[0.85] hover:brightness-[1.1] transition-all duration-700" />
      </Card>
    </div>
  );

  return (
    <section id={slideId} ref={containerRef} className="py-24 md:py-32 relative z-10 w-full max-w-7xl mx-auto px-6 xl:px-12">
      <div className={`flex flex-col gap-12 lg:gap-16 ${imageLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        {!imageLeft ? (
          <>
            <ContentBlock />
            <ImageBlock />
          </>
        ) : (
          <>
            <ImageBlock />
            <ContentBlock />
          </>
        )}
      </div>
    </section>
  );
}
