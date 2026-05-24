import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { ContentData } from "@/types";
import { ImageRenderer } from "@/components/ui/ImageRenderer";

export function Slide09Footer({ data }: { data: ContentData["s9"] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      }
    });

    tl.fromTo(".footer-anim",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power3.out" }
    )
    .fromTo(".footer-signature",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
      "-=0.5"
    );
  }, { scope: containerRef });

  return (
    <section id="slide-9" ref={containerRef} className="relative min-h-[80vh] flex flex-col items-center justify-center py-24 px-6 overflow-hidden text-center z-10">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageRenderer src={data.images.background} className="w-full h-[120%] -top-[10%] opacity-40 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/80 to-midnight/50" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto w-full">
        <h3 className="footer-anim text-cyber font-semibold tracking-widest text-sm uppercase mb-4">
          {data.subtitle}
        </h3>
        <h2 className="footer-anim text-4xl md:text-5xl lg:text-6xl font-syne font-bold mb-12 text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          {data.title}
        </h2>

        <div className="footer-anim space-y-4 mb-20">
          {data.highlights.map((highlight, idx) => (
            <p key={idx} className="text-[#A0A0AB] text-lg md:text-xl font-medium tracking-wide">
              {highlight}
            </p>
          ))}
        </div>

        {/* Signature */}
        <div className="footer-signature mt-8 w-48 md:w-64 opacity-80 hover:opacity-100 transition-opacity duration-500">
          <ImageRenderer src={data.images.signature} className="w-full h-auto bg-transparent border-none mix-blend-screen" />
        </div>
      </div>
    </section>
  );
}
