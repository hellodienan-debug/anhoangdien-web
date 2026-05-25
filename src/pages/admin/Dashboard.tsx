import { useStore } from "@/store/useStore";
import { Link } from "react-router-dom";
import { FileText, Eye, Clock, ArrowRight } from "lucide-react";

export function Dashboard() {
  const posts = useStore((state) => state.posts);
  const totalPosts = posts.length;
  
  return (
    <div className="max-w-5xl">
      <div className="mb-10">
        <h1 className="text-3xl font-syne font-bold mb-2 text-white">Overview Overview</h1>
        <p className="text-white/50">Welcome back to your portfolio dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-3 text-white/60">
            <FileText size={20} />
            <span className="font-semibold text-sm uppercase tracking-wider">Total Posts</span>
          </div>
          <div className="text-4xl font-syne font-black text-white">{totalPosts}</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-3 text-white/60">
            <Eye size={20} />
            <span className="font-semibold text-sm uppercase tracking-wider">Site Views</span>
          </div>
          <div className="text-4xl font-syne font-black text-white">12.5K</div>
          <div className="text-xs text-cyber">+14% this month</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-3 text-white/60">
            <Clock size={20} />
            <span className="font-semibold text-sm uppercase tracking-wider">Uptime</span>
          </div>
          <div className="text-4xl font-syne font-black text-white">99.9%</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-syne font-bold text-white">Recent Blog Posts</h2>
        <Link to="/admin/blog" className="text-sm text-cyber hover:text-white flex items-center gap-1 transition-colors">
          View all <ArrowRight size={14} />
        </Link>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="divide-y divide-white/5">
          {posts.length === 0 ? (
            <div className="p-8 text-center text-white/50 text-sm">
              No recent blog posts.
            </div>
          ) : (
            posts.slice(0, 5).map((post) => (
              <div key={post.id} className="p-4 px-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div>
                  <h3 className="text-md font-semibold text-white mb-1">{post.title}</h3>
                  <div className="flex gap-4 text-xs text-white/50 font-mono">
                    <span>{post.date}</span>
                    <span>{post.category}</span>
                  </div>
                </div>
                <Link to={`/admin/blog/${post.id}`} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold text-white transition-colors">
                  Edit
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
