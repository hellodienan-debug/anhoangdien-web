import { useState, useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Upload, Loader2, ImagePlus } from "lucide-react";
import { uploadImage } from "@/lib/storage";

export function BlogEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const posts = useStore((state) => state.posts);
  const addPost = useStore((state) => state.addPost);
  const updatePost = useStore((state) => state.updatePost);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
    readTime: "5 min read",
    coverImage: ""
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isInsertingImg, setIsInsertingImg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mardownFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && id) {
      const post = posts.find(p => p.id === id);
      if (post) {
        setFormData({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          date: post.date,
          readTime: post.readTime,
          coverImage: post.coverImage || ""
        });
      } else {
        navigate('/admin/blog');
      }
    }
  }, [id, isEditing, posts, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadImage(file, 'blog-covers');
      setFormData(prev => ({ ...prev, coverImage: url }));
    } catch (err) {
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleMarkdownImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsInsertingImg(true);
      const url = await uploadImage(file, 'blog-content');
      const mdImage = `\n![${file.name}](${url})\n`;
      setFormData(prev => ({ ...prev, content: prev.content + mdImage }));
    } catch (err) {
      alert("Failed to upload image.");
    } finally {
      setIsInsertingImg(false);
      if (mardownFileInputRef.current) mardownFileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && id) {
      updatePost(id, formData);
    } else {
      addPost(formData);
    }
    navigate('/admin/blog');
  };

  return (
    <div className="max-w-4xl pb-24">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/admin/blog')}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-syne font-bold text-white">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/70 font-semibold uppercase tracking-wider">Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-cyber/50 transition-colors"
              placeholder="e.g. Next Gen Retail Strategies"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/70 font-semibold uppercase tracking-wider">Excerpt</label>
            <textarea 
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows={2}
              className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-cyber/50 transition-colors"
              placeholder="A short summary of the post..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70 font-semibold uppercase tracking-wider">Category</label>
              <input 
                type="text" 
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-cyber/50 transition-colors"
                placeholder="e.g. Marketing"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70 font-semibold uppercase tracking-wider">Read Time</label>
              <input 
                type="text" 
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                required
                className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-cyber/50 transition-colors"
                placeholder="e.g. 5 min read"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70 font-semibold uppercase tracking-wider">Date</label>
              <input 
                type="date" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-cyber/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70 font-semibold uppercase tracking-wider">Cover Image URL</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  className="flex-1 bg-[#111] border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-cyber/50 transition-colors"
                  placeholder="e.g. ./assets/image.jpg or Upload"
                />
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  onChange={handleCoverUpload} 
                  className="hidden" 
                />
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl transition-colors shrink-0 disabled:opacity-50 flex items-center justify-center min-w-[56px]"
                >
                  {isUploading ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-white/70 font-semibold uppercase tracking-wider">Content (Markdown)</label>
              <input 
                type="file" 
                accept="image/*" 
                ref={mardownFileInputRef} 
                onChange={handleMarkdownImageUpload} 
                className="hidden" 
              />
              <button
                type="button"
                disabled={isInsertingImg}
                onClick={() => mardownFileInputRef.current?.click()}
                className="flex items-center gap-2 text-xs font-bold text-cyber hover:text-white uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                {isInsertingImg ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
                Upload Image
              </button>
            </div>
            <div className="text-xs text-cyber/80 mb-2">Supports full Markdown syntax including headers, tables, and HTML embeds.</div>
            <textarea 
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={15}
              className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-cyber/50 font-mono text-sm leading-relaxed transition-colors"
              placeholder="## Write your content here..."
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button 
            type="button"
            onClick={() => navigate('/admin/blog')}
            className="px-6 py-3 text-white/70 hover:text-white font-semibold uppercase tracking-wider text-sm transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="flex items-center gap-2 bg-cyber text-black px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors"
          >
            <Save size={18} />
            Save Post
          </button>
        </div>
      </form>
    </div>
  );
}
