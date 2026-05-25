import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { Card } from "@/components/ui/Card";
import { Newsletter } from "@/components/Newsletter";
import { Search } from "lucide-react";
import { SEO } from "@/components/SEO";

export function BlogList() {
  const blogPosts = useStore(state => state.posts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = new Set(blogPosts.map(post => post.category));
    return ["All", ...Array.from(cats)];
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogPosts, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto relative z-10 w-full font-manrope">
      <SEO 
        title="Insights & Articles | An Hoang Dien Blog" 
        description="Sharing thoughts on Trade Marketing, E-commerce operations, and Sales strategies from practical experiences."
        url="/blog"
      />
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-syne font-black tracking-tighter uppercase text-white mb-4">
          Insights & <span className="text-cyber">Articles</span>
        </h1>
        <p className="text-[#A0A0AB] text-lg max-w-2xl font-light">
          Sharing thoughts on Trade Marketing, E-commerce operations, and Sales strategies from practical experiences.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-12 fade-rise" style={{ animation: `fadeRise 0.8s ease-out forwards`}}>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                selectedCategory === cat 
                ? "bg-cyber text-black" 
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 bg-[#111] border border-white/10 rounded-full py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyber/50 transition-colors"
          />
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center text-white/50 text-lg fade-rise">
          No articles found matching your criteria.
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {filteredPosts.map((post, idx) => (
            <Link to={`/blog/${post.id}`} key={idx} className="group block fade-rise" style={{ animation: `fadeRise 0.8s ease-out forwards ${0.1 * idx}s` }}>
              <Card className="p-8 md:p-10 border border-white/5 group-hover:border-cyber/30 transition-colors flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="flex-1 w-full order-2 md:order-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <span className="text-xs uppercase tracking-widest text-cyber font-bold">
                      {post.category}
                    </span>
                    <span className="text-xs font-mono text-white/40">
                      {post.date} • {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-syne font-bold text-white mb-4 group-hover:text-cyber transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[#A0A0AB] leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-8 flex items-center gap-2 text-white/60 group-hover:text-white transition-colors text-sm uppercase tracking-wider font-semibold">
                    Read Article <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>

                {post.coverImage && (
                  <div className="w-full md:w-48 xl:w-56 aspect-square shrink-0 rounded-2xl overflow-hidden border border-white/10 order-1 md:order-2">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Newsletter Subscription */}
      <Newsletter />

      <style>{`
        @keyframes fadeRise {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-rise {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
