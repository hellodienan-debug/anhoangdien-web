import { useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/blogData";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-6 z-10 relative text-center">
        <h2 className="text-4xl font-syne font-bold text-white mb-4">Post not found</h2>
        <Link to="/blog" className="text-cyber hover:text-white transition-colors underline">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-32 pb-32 px-6 md:px-12 max-w-4xl mx-auto relative z-10 w-full font-manrope">
      <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-semibold uppercase tracking-wider mb-12 transition-colors">
        <span>&larr;</span> Back to Blog
      </Link>

      <div className="mb-16 fade-rise" style={{ animation: `fadeRise 0.8s ease-out forwards` }}>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 text-sm">
          <span className="text-cyber font-bold uppercase tracking-widest">{post.category}</span>
          <span className="hidden md:block text-white/20">•</span>
          <span className="font-mono text-white/40">{post.date}</span>
          <span className="hidden md:block text-white/20">•</span>
          <span className="font-mono text-white/40">{post.readTime}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne font-black tracking-tight text-white mb-8 leading-tight">
          {post.title}
        </h1>
        
        <p className="text-xl text-white/70 font-light leading-relaxed border-l-4 border-indigo pl-6 py-2">
          {post.excerpt}
        </p>
      </div>

      <div className="w-full h-px bg-white/10 mb-8 fade-rise" style={{ animation: `fadeRise 0.8s ease-out forwards 0.1s` }} />

      {post.coverImage && (
        <div className="w-full md:w-3/4 mx-auto aspect-square rounded-[32px] overflow-hidden border border-white/10 mb-16 fade-rise" style={{ animation: `fadeRise 0.8s ease-out forwards 0.2s` }}>
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="max-w-none fade-rise" style={{ animation: `fadeRise 0.8s ease-out forwards 0.3s` }}>
        <div className="prose prose-invert prose-lg prose-headings:font-syne prose-headings:font-bold prose-p:text-[#A0A0AB] prose-p:leading-relaxed prose-a:text-cyber hover:prose-a:text-white prose-a:transition-colors prose-strong:text-white prose-table:border-collapse prose-th:border prose-th:border-white/10 prose-th:bg-white/5 prose-td:border prose-td:border-white/10">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>

      <style>{`
        @keyframes fadeRise {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-rise {
          opacity: 0;
        }
      `}</style>
    </article>
  );
}
