import { useState } from "react";
import { cn } from "@/lib/utils";

export function ImageRenderer({ src, alt, className }: { src: string; alt?: string; className?: string }) {
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-obsidian border border-white/5", className)}>
      {!error ? (
        <img 
          // Basic normalizer for vite public assets path
          src={src.startsWith("./assets") ? src.replace("./assets", "/assets") : src} 
          alt={alt || "Asset"} 
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 bg-black/50">
          <span className="font-mono text-xs tracking-widest text-[#A0A0AB]">ASSET PENDING</span>
          <span className="font-mono text-[10px] text-[#A0A0AB] mt-1 truncate max-w-[80%]">{src}</span>
        </div>
      )}
    </div>
  );
}
