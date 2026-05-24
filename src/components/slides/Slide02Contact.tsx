import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { ContentData } from "@/types";
import { Card } from "@/components/ui/Card";
import { ImageRenderer } from "@/components/ui/ImageRenderer";
import { Phone, Mail, MapPin } from "lucide-react";

export function Slide02Contact({ data }: { data: ContentData["s2"] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".contact-stagger",
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%"
        }
      }
    );
    gsap.fromTo(".contact-map",
      { opacity: 0, scale: 0.95 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="slide-2" ref={containerRef} className="py-24 md:py-32 relative z-10 w-full max-w-7xl mx-auto px-6 xl:px-12">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        
        {/* Left: Content 60% */}
        <div className="w-full md:w-[60%] flex flex-col justify-center">
          <h3 className="contact-stagger text-indigo font-semibold tracking-widest text-sm uppercase mb-3">
            {data.subtitle}
          </h3>
          <h2 className="contact-stagger text-4xl md:text-5xl font-syne font-bold mb-12 text-white">
            {data.title}
          </h2>

          <div className="flex flex-col gap-6">
            <Card className="contact-stagger p-6 md:p-8 flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-midnight group-hover:border-cyber/50 transition-colors">
                <Phone className="w-5 h-5 text-cyber" />
              </div>
              <div>
                <p className="text-xs text-[#A0A0AB] tracking-widest uppercase mb-1">Phone</p>
                <p className="text-xl font-manrope font-medium text-white">{data.phone}</p>
              </div>
            </Card>

            <Card className="contact-stagger p-6 md:p-8 flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-midnight group-hover:border-indigo/50 transition-colors">
                <Mail className="w-5 h-5 text-indigo" />
              </div>
              <div>
                <p className="text-xs text-[#A0A0AB] tracking-widest uppercase mb-1">Email</p>
                <p className="text-lg md:text-xl font-manrope font-medium text-white">{data.email}</p>
              </div>
            </Card>

            <Card className="contact-stagger p-6 md:p-8 flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-midnight group-hover:border-cyber/50 transition-colors">
                <MapPin className="w-5 h-5 text-cyber" />
              </div>
              <div>
                <p className="text-xs text-[#A0A0AB] tracking-widest uppercase mb-1">Location</p>
                <p className="text-lg md:text-xl font-manrope font-medium text-white">{data.location}</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Right: Map Visual 40% */}
        <div className="w-full md:w-[40%] flex items-center contact-map">
          <Card className="w-full aspect-[4/5] p-2" hoverEffect={false}>
            <ImageRenderer src={data.images.map} className="w-full h-full rounded-xl" />
          </Card>
        </div>

      </div>
    </section>
  );
}
