import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { ContentData } from "@/types";
import { Card } from "@/components/ui/Card";
import { ImageRenderer } from "@/components/ui/ImageRenderer";
import { Phone, Mail, MapPin, Facebook, Youtube } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.04.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.32 3.95-1.52 5.56-1.28 1.72-3.15 2.78-5.26 3.03-2.1.25-4.32-.08-6.1-1.27-1.87-1.24-3.1-3.23-3.41-5.46-.3-2.22.15-4.57 1.4-6.39 1.25-1.82 3.22-2.98 5.4-3.32 1.05-.16 2.13-.1 3.16.14V11.6c-.46-.11-.94-.17-1.42-.17-1.12.01-2.25.4-3.08 1.15-.81.74-1.29 1.79-1.35 2.92-.06 1.11.3 2.22 1 3.06.77.94 1.94 1.48 3.14 1.55 1.16.08 2.34-.23 3.23-.95.89-.72 1.42-1.78 1.52-2.94V.02h-.04z"/>
  </svg>
);

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
          <h2 className="contact-stagger text-4xl md:text-5xl font-syne font-bold mb-12 text-[#64cefb]">
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

            <div className="contact-stagger flex items-center gap-4 mt-4">
              <a 
                href="https://www.tiktok.com/@daprosound" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#00f2fe]/10 hover:text-[#00f2fe] hover:border-[#00f2fe]/30 transition-all duration-300"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/@dienanaudiopro" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#ff0000]/10 hover:text-[#ff0000] hover:border-[#ff0000]/30 transition-all duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/anhoangdien1202" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#1877f2]/10 hover:text-[#1877f2] hover:border-[#1877f2]/30 transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
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
