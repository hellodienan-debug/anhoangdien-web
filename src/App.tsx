import data from "./data/contentData.json";
import type { ContentData } from "./types";
import { Header } from "./components/Header";
import { Slide01Hero } from "./components/slides/Slide01Hero";
import { Slide02Contact } from "./components/slides/Slide02Contact";
import { Slide03Education } from "./components/slides/Slide03Education";
import { Slide04Skills } from "./components/slides/Slide04Skills";
import { SlideExperienceDashboard } from "./components/slides/SlideExperienceDashboard";
import { Slide07ExperienceAdaptive } from "./components/slides/Slide07ExperienceAdaptive";
import { Slide09Footer } from "./components/slides/Slide09Footer";

function App() {
  const content = data as unknown as ContentData;
  return (
    <div className="bg-black min-h-screen selection:bg-cyber/30 selection:text-white font-manrope overflow-hidden relative">
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <Header />
      <main className="relative z-10">
        <Slide01Hero data={content.s1} />
        <Slide02Contact data={content.s2} />
        <Slide03Education data={content.s3} />
        <Slide04Skills data={content.s4} />
        {/* Slide 05: Experience 1 - Image Right */}
        <SlideExperienceDashboard data={content.s5} slideId="slide-5" imageLeft={false} />
        {/* Slide 06: Experience 2 - Image Left (Zigzag) */}
        <SlideExperienceDashboard data={content.s6} slideId="slide-6" imageLeft={true} />
        {/* Slide 07: Experience 3 - Adaptive */}
        <Slide07ExperienceAdaptive data={content.s7} />
        {/* Slide 08: Experience 4 - Image Right */}
        <SlideExperienceDashboard data={content.s8} slideId="slide-8" imageLeft={false} />
        {/* Slide 09: Footer */}
        <Slide09Footer data={content.s9} />
      </main>
    </div>
  );
}

export default App;
