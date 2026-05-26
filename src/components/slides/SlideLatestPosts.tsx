import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useStore } from "@/store/useStore";
import { Card } from "@/components/ui/Card";

export function SlideLatestPosts() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get latest 4 posts
  const posts = useStore((state) => state.posts);
  const latestPosts = posts.slice(0, 4);

  useGSAP(() => {
    gsap.fromTo(".post-anim",
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

  return (
    <section id="slide-latest-posts" ref={containerRef} className="py-24 md:py-32 relative z-10 w-full max-w-7xl mx-auto px-6 xl:px-12">
      <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h3 className="post-anim text-cyber font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase mb-3">
            Latest Insights
          </h3>
          <h2 className="post-anim text-3xl md:text-5xl font-syne font-black tracking-normal uppercase text-[#64cefb]">
            Recent Articles
          </h2>
        </div>
        <div className="post-anim hidden md:block">
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 liquid-glass rounded-full text-white text-xs font-bold uppercase tracking-widest hover:border-cyber/50 transition-colors group">
            View All <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {latestPosts.map((post, idx) => (
          <Link to={`/blog/${post.id}`} key={idx} className="group block post-anim">
            <Card className="h-full p-6 md:p-8 flex flex-col justify-between border border-white/5 group-hover:border-cyber/30 transition-colors rounded-[32px]">
              <div>
                {post.coverImage && (
                  <div className="w-full aspect-[16/9] md:aspect-[2/1] shrink-0 rounded-2xl overflow-hidden border border-white/10 mb-6">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-cyber font-bold">
                    {post.category}
                  </span>
                  <span className="text-[10px] font-mono text-white/40">
                    {post.date}
                  </span>
                </div>
                <h3 className="text-2xl font-syne font-bold text-white mb-3 group-hover:text-cyber transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[#A0A0AB] text-sm md:text-base leading-relaxed mb-6 line-clamp-3 font-light">
                  {post.excerpt}
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors text-xs uppercase tracking-wider font-semibold mt-auto pt-4 border-t border-white/10">
                Read Article <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-10 md:hidden post-anim flex justify-center">
        <Link to="/blog" className="inline-flex items-center gap-2 px-8 py-4 liquid-glass rounded-full text-white text-xs font-bold uppercase tracking-widest hover:border-cyber/50 transition-colors group">
          View All Articles <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
