import { useStore } from "@/store/useStore";
import { SEO } from "@/components/SEO";
import { Slide01Hero } from "@/components/slides/Slide01Hero";
import { Slide02Contact } from "@/components/slides/Slide02Contact";
import { Slide03Education } from "@/components/slides/Slide03Education";
import { Slide04Skills } from "@/components/slides/Slide04Skills";
import { SlideExperienceDashboard } from "@/components/slides/SlideExperienceDashboard";
import { Slide07ExperienceAdaptive } from "@/components/slides/Slide07ExperienceAdaptive";
import { SlideTikTokChannel } from "@/components/slides/SlideTikTokChannel";
import { SlideLatestPosts } from "@/components/slides/SlideLatestPosts";
import { Slide09Footer } from "@/components/slides/Slide09Footer";

export function Home() {
  const content = useStore(state => state.portfolioContent);

  return (
    <main className="relative z-10 w-full overflow-hidden">
      <SEO />
      <Slide01Hero data={content.s1} />
      <Slide02Contact data={content.s2} />
      {/* TikTok Highlight - Personal Project */}
      <SlideTikTokChannel data={content.tiktok} />
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
      {/* Latest Posts */}
      <SlideLatestPosts />
      {/* Slide 09: Footer */}
      <Slide09Footer data={content.s9} />
    </main>
  );
}
