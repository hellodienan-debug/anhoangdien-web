import { motion } from "motion/react";

interface ShinyTextProps {
  text: string;
  className?: string;
}

export function ShinyText({ text, className = "" }: ShinyTextProps) {
  return (
    <motion.span
      className={`inline-block text-transparent bg-clip-text ${className}`}
      style={{
        backgroundImage: "linear-gradient(100deg, #64CEFB 0%, #ffffff 50%, #64CEFB 100%)",
        backgroundSize: "200% auto",
      }}
      animate={{
        backgroundPosition: ["200% center", "-200% center"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  );
}
