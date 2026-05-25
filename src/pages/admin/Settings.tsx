import { useState, useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import { Save, RefreshCw, Upload, Image as ImageIcon, Trash2, Loader2, Link } from "lucide-react";
import { uploadImage } from "@/lib/storage";
import type { ContentData } from "@/types";

export function Settings() {
  const content = useStore((state) => state.portfolioContent);
  const updateContent = useStore((state) => state.updatePortfolioContent);
  const resetToDefaults = useStore((state) => state.resetToDefaults);
  
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setJsonText(JSON.stringify(content, null, 2));
  }, [content]);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText) as ContentData;
      updateContent(parsed);
      setError("");
      alert("Cấu hình JSON đã được lưu thành công!");
    } catch (e: any) {
      setError(e.message || "Invalid JSON syntax");
    }
  };

  const handleReset = () => {
    if (window.confirm("Bạn có chắc chắn muốn khôi phục toàn bộ giao diện và bài viết về mặc định? Các nội dung tùy chỉnh sẽ bị xóa học.")) {
      resetToDefaults();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadImage(file, "mockups");
      
      const updatedContent = {
        ...content,
        tiktok: {
          ...content.tiktok,
          customScreenshotUrl: url
        }
      };
      
      await updateContent(updatedContent);
      alert("Tải ảnh Mock-up mới lên thành công!");
    } catch (err: any) {
      console.error(err);
      alert("Không thể tải ảnh: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveMockup = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa ảnh chụp màn hình tùy chỉnh và quay lại màn hình mô phỏng mặc định?")) {
      return;
    }

    try {
      const updatedContent = {
        ...content,
        tiktok: {
          ...content.tiktok,
          customScreenshotUrl: ""
        }
      };
      await updateContent(updatedContent);
      alert("Đã xóa ảnh tùy chỉnh thành công!");
    } catch (err: any) {
      console.error(err);
      alert("Có lỗi xảy ra: " + err.message);
    }
  };

  return (
    <div className="max-w-4xl pb-24">
      <div className="mb-10">
        <h1 className="text-3xl font-syne font-bold mb-2 text-white">Cài Đặt Trang Chủ (Site Settings)</h1>
        <p className="text-white/50">Quản lý các hình ảnh, nội dung và các phần nâng cao của trang Web.</p>
      </div>

      {/* 1. TikTok Mockup Quick Settings */}
      <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyber/10 flex items-center justify-center text-cyber border border-cyber/20">
            <ImageIcon size={20} />
          </div>
          <div>
            <h2 className="text-lg font-syne font-bold text-white">Ảnh Mock-up TikTok (Khung iPhone)</h2>
            <p className="text-xs text-white/50">Tự do thay thế bất kỳ hình ảnh nào vào bên trong khung điện thoại iPhone trên website của bạn.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Action column */}
          <div className="md:col-span-2 flex flex-col justify-between gap-4">
            <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl text-xs text-white/75 leading-relaxed">
              <strong className="text-cyber">💡 Hướng dẫn:</strong> Chụp màn hình điện thoại trang hồ sơ TikTok <strong className="text-cyber">@daprosound</strong> của bạn, sau đó nhấp vào nút tải lên dưới đây để chọn ảnh đó. Hệ thống sẽ tự động cắt ghép hoàn hảo vào khung iPhone góc nghiêng tuyệt đẹp ngoài trang chủ!
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 bg-cyber text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white disabled:opacity-50 transition-colors cursor-pointer"
              >
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                Tải ảnh mới từ thiết bị
              </button>
              
              {content.tiktok?.customScreenshotUrl && (
                <button
                  onClick={handleRemoveMockup}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-400 border border-red-500/20 hover:border-red-500/50 hover:bg-red-500/5 px-5 py-3 rounded-full uppercase transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa ảnh hiện tại
                </button>
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Preview column */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center min-h-[180px] text-center relative overflow-hidden group">
            {content.tiktok?.customScreenshotUrl ? (
              <>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 z-10">
                  <a 
                    href={content.tiktok.customScreenshotUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1 bg-white text-black px-3 py-1.5 rounded-full text-[10px] font-bold uppercase"
                  >
                    <Link size={10} /> Xem ảnh gốc
                  </a>
                </div>
                <img 
                  src={content.tiktok.customScreenshotUrl} 
                  alt="Mockup Preview" 
                  referrerPolicy="no-referrer"
                  className="max-h-[160px] w-auto rounded object-contain shadow-md"
                />
              </>
            ) : (
              <div className="p-4 flex flex-col items-center text-white/30 text-xs">
                <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-3">
                  <ImageIcon size={20} />
                </div>
                <span>Chưa có ảnh chụp màn hình tùy chỉnh</span>
                <span className="text-[10px] text-white/20 mt-1">(Đang dùng màn hình mô phỏng mặc định)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Advanced JSON config */}
      <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-white/70 font-semibold uppercase tracking-wider">Cấu hình nâng cao (JSON Core Content)</label>
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 text-xs font-bold uppercase transition-colors"
            >
              <RefreshCw size={12} />
              Reset To Toàn Bộ Mặc Định
            </button>
          </div>
          <div className="text-xs text-white/40 mb-2 leading-relaxed max-w-2xl">
            Phần này kiểm soát tất cả văn bản, cấu hình các slide trên trang chủ. Vui lòng cẩn thận khi sửa trực tiếp và đảm bảo cú pháp JSON luôn đúng.
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg text-sm font-mono mb-2">
              Lỗi phân tích JSON: {error}
            </div>
          )}

          <textarea 
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            rows={15}
            className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none text-cyber font-mono text-sm leading-relaxed transition-colors spellcheck-false"
            spellCheck="false"
          />
        </div>

        <div className="flex items-center justify-end">
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-cyber text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
          >
            <Save size={16} />
            Lưu Nội Dung JSON
          </button>
        </div>
      </div>
    </div>
  );
}
