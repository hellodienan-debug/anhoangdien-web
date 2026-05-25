import { useStore } from "@/store/useStore";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2 } from "lucide-react";

export function BlogManager() {
  const posts = useStore((state) => state.posts);
  const deletePost = useStore((state) => state.deletePost);
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(id);
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-syne font-bold mb-2 text-white">Blog Posts</h1>
          <p className="text-white/50">Manage your insightful articles.</p>
        </div>
        <Link 
          to="/admin/blog/new" 
          className="flex items-center gap-2 bg-cyber text-black px-5 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors"
        >
          <Plus size={18} />
          New Post
        </Link>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-white/50 bg-white/5">
              <th className="p-4 font-medium pl-6">Title & Category</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Read Time</th>
              <th className="p-4 font-medium text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 pl-6">
                  <div className="font-semibold text-white mb-1 line-clamp-1">{post.title}</div>
                  <div className="text-xs text-cyber uppercase font-bold">{post.category}</div>
                </td>
                <td className="p-4 text-white/60 font-mono text-sm">{post.date}</td>
                <td className="p-4 text-white/60 text-sm">{post.readTime}</td>
                <td className="p-4 text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => navigate(`/admin/blog/${post.id}`)}
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-white/50">
                  No blog posts found. Create one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
