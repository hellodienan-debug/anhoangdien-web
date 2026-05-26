import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { 
  ArrowRight, 
  ChevronLeft, 
  Share2, 
  MoreHorizontal, 
  Lock, 
  Play, 
  Grid, 
  Heart, 
  Bookmark, 
  Sparkles,
  Volume2,
  Tv,
  Upload,
  Loader2
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { uploadImage } from "@/lib/storage";
import { useStore } from "@/store/useStore";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.04.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.32 3.95-1.52 5.56-1.28 1.72-3.15 2.78-5.26 3.03-2.1.25-4.32-.08-6.1-1.27-1.87-1.24-3.1-3.23-3.41-5.46-.3-2.22.15-4.57 1.4-6.39 1.25-1.82 3.22-2.98 5.4-3.32 1.05-.16 2.13-.1 3.16.14V11.6c-.46-.11-.94-.17-1.42-.17-1.12.01-2.25.4-3.08 1.15-.81.74-1.29 1.79-1.35 2.92-.06 1.11.3 2.22 1 3.06.77.94 1.94 1.48 3.14 1.55 1.16.08 2.34-.23 3.23-.95.89-.72 1.42-1.78 1.52-2.94V.02h-.04z"/>
  </svg>
);

export function SlideTikTokChannel({ data }: { data?: { customScreenshotUrl?: string } }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'liked' | 'bookmarked'>('posts');
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploading, setUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const content = useStore((state) => state.portfolioContent);
  const updateContent = useStore((state) => state.updatePortfolioContent);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setIsAdmin(!!u);
    });
    return unsub;
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      alert("Cập nhật ảnh mockup TikTok thành công!");
    } catch (err: any) {
      console.error(err);
      alert("Không thể tải ảnh lên: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  useGSAP(() => {
    gsap.fromTo(".tiktok-anim",
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

    gsap.to(".tiktok-glow", {
      opacity: 0.6,
      scale: 1.05,
      yoyo: true,
      repeat: -1,
      duration: 3,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  // Custom high-quality mock video thumbnails using localized images
  const mockVideos = [
    {
      title: "Lắp Dàn Karaoke cho khách",
      views: "112.1K",
      isPinned: true,
      image: "/assets/s5_audio_equipment_01.jpg",
      link: "https://www.tiktok.com/@daprosound"
    },
    {
      title: "Đóng hàng cho khách",
      views: "36K",
      isPinned: true,
      image: "/assets/s8_field_sales_01.jpg",
      link: "https://www.tiktok.com/@daprosound"
    },
    {
      title: "Xưởng sản xuất Loa",
      views: "10K",
      isPinned: true,
      image: "/assets/s4_bento_skills_01.jpg",
      link: "https://www.tiktok.com/@daprosound"
    },
    {
      title: "Chỉnh hiệu ứng Reverb",
      views: "32.6K",
      isPinned: false,
      image: "/assets/s6_digital_platform_01.jpg",
      link: "https://www.tiktok.com/@daprosound"
    },
    {
      title: "Quy trình Ráp Loa Full",
      views: "1.183",
      isPinned: false,
      image: "/assets/s3_education_visual_02.jpg",
      link: "https://www.tiktok.com/@daprosound"
    },
    {
      title: "Lắp dàn karaoke gia đình",
      views: "1.360",
      isPinned: false,
      image: "/assets/s2_map_visual_04.jpg",
      link: "https://www.tiktok.com/@daprosound"
    }
  ];

  return (
    <section id="slide-tiktok" ref={containerRef} className="py-24 md:py-32 relative z-10 w-full max-w-7xl mx-auto px-6 xl:px-12 font-manrope">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none overflow-hidden select-none">
        <div className="tiktok-glow absolute inset-0 bg-gradient-to-tr from-[#120516]/20 via-[#0a0f1d]/10 to-transparent rounded-full blur-[120px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Content Column - Left (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <div className="tiktok-anim inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#00f2fe]/30 bg-[#00f2fe]/10 mb-8 mt-4 md:mt-0 shadow-[0_0_20px_rgba(0,242,254,0.1)]">
            <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00f2fe] drop-shadow-md">Personal Project</span>
          </div>

          <h2 className="tiktok-anim text-4xl sm:text-5xl lg:text-6xl font-syne font-black tracking-tighter uppercase text-white mb-6 leading-tight">
            DA PRO<span className="text-cyber">SOUND</span>
          </h2>
          
          <p className="tiktok-anim text-white/70 font-light text-base leading-relaxed mb-10 max-w-md">
            Mua bán, sửa chữa thiết bị âm thanh chuyên nghiệp: Loa, Micro, Vang cơ, Vang số, Đẩy công suất. Trải nghiệm âm thanh đỉnh cao và kiến thức chuyên sâu.
          </p>

          {/* Clean Metric layout exactly like user picture */}
          <div className="tiktok-anim flex items-center gap-12 mb-12">
            <div>
              <div className="text-3xl font-syne font-black text-white leading-none mb-2">10.6K</div>
              <div className="text-[10px] text-white/40 uppercase tracking-[0.15em] font-medium">Followers</div>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div>
              <div className="text-3xl font-syne font-black text-white leading-none mb-2">71.5K</div>
              <div className="text-[10px] text-white/40 uppercase tracking-[0.15em] font-medium">Likes</div>
            </div>
          </div>

          {/* Premium capsule button exactly like user photo */}
          <a 
            href="https://www.tiktok.com/@daprosound" 
            target="_blank" 
            rel="noreferrer"
            className="tiktok-anim inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-xs font-bold uppercase tracking-[0.15em] hover:bg-cyber transition-all duration-300 shadow-xl shadow-black/35 group"
          >
            Follow on TikTok
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>
        </div>

        {/* Visual Mockup Column - Right (7 Cols) */}
        <div className="lg:col-span-7 flex justify-center w-full relative">
          
          {/* Subtle surrounding light circles for luxurious depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none mix-blend-screen opacity-10">
            <div className="absolute inset-0 border border-white/5 rounded-full scale-90" />
            <div className="absolute inset-0 border border-white/5 rounded-full scale-110" />
          </div>

          {/* Pixel-Perfect iPhone Mockup Chassis */}
          <div className="tiktok-anim relative w-[310px] h-[640px] md:w-[325px] md:h-[670px] bg-black border-[9px] border-[#1d1d1f] rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden scale-100 md:scale-105 transition-transform duration-500 group">
            
            {/* Glossy Reflection overlay (Luxury touch) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-30" />

            {/* Simulated Dynamic Island (iPhone Notch) */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5.5 bg-black rounded-full z-40 flex items-center justify-end px-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#111] border border-white/5" />
            </div>

            {/* Floating Admin Replace Badge */}
            {isAdmin && (
              <div className="absolute inset-x-0 bottom-4 z-50 flex flex-col items-center justify-center gap-2 pointer-events-auto">
                <button
                  onClick={() => imageInputRef.current?.click()}
                  disabled={uploading}
                  className="bg-cyber text-black font-syne font-black uppercase text-[10px] tracking-widest px-5 py-2.5 rounded-full shadow-2xl hover:bg-white active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer border border-black/10"
                >
                  {uploading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  {data?.customScreenshotUrl ? "Thay ảnh Mock-up" : "Tải ảnh Mock-up lên"}
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            )}

            {/* Inner TikTok Screen Content */}
            <div className="absolute inset-0 w-full h-full bg-[#000000] text-white flex flex-col justify-between overflow-hidden text-xs">
              {data?.customScreenshotUrl ? (
                <img 
                  src={data.customScreenshotUrl} 
                  alt="TikTok Channel Mockup" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-fill"
                />
              ) : (
                <>
              
              {/* iPhone Status Bar */}
              <div className="w-full h-11 flex justify-between items-center px-6 pt-2 pb-1 relative z-30 select-none bg-black text-[11px] font-semibold text-white/95">
                <div>18:26</div>
                <div className="flex items-center gap-1.5">
                  {/* Signal bars */}
                  <div className="flex gap-0.5 items-end h-2.5">
                    <div className="w-0.5 h-1 bg-white rounded-full" />
                    <div className="w-0.5 h-1.5 bg-white rounded-full" />
                    <div className="w-0.5 h-2 bg-white rounded-full" />
                    <div className="w-0.5 h-2.5 bg-white rounded-full" />
                  </div>
                  {/* Battery icon mock */}
                  <div className="w-5 h-2.5 border border-white/45 rounded[3px] p-0.5 flex items-center">
                    <div className="h-full bg-white rounded-[1px] w-[80%]" />
                  </div>
                </div>
              </div>

              {/* Scrollable container of TikTok Feed */}
              <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
                
                {/* Simulated App Header */}
                <div className="flex justify-between items-center px-4 py-3 border-b border-white/5 bg-[#000]">
                  <ChevronLeft className="w-5 h-5 text-white/80" />
                  <div className="text-[13px] font-bold tracking-tight text-white flex items-center gap-1">
                    DA ProSound
                    <svg className="w-3.5 h-3.5 text-[#00f2fe]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-4">
                    <Share2 className="w-4.5 h-4.5 text-white/80" />
                    <MoreHorizontal className="w-4.5 h-4.5 text-white/80" />
                  </div>
                </div>

                {/* Profile Avatar / Username area */}
                <div className="flex flex-col items-center pt-5 pb-4 px-4">
                  <div className="relative mb-3 group">
                    <div className="w-20 h-20 rounded-full border-2 border-white/10 p-0.5 relative z-10 bg-black overflow-hidden flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-[#111] flex items-center justify-center overflow-hidden relative">
                        <img 
                          src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/7db7447d3d1964205acabb61ae5a0134.jpeg?lk3s=a5d48078&nonce=2074&refresh_token=65a127f872c050aeffba3c6981cf0ec1&x-expires=1716796800&x-signature=m0R%2Fp3D" 
                          alt="DA ProSound Logo" 
                          className="w-full h-full object-cover absolute inset-0 z-10"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="text-xl font-bold font-syne text-cyber select-none relative z-0">D.A</div>
                      </div>
                    </div>
                    {/* Add Verified check mark inside badge of avatar */}
                    <div className="absolute -bottom-1 right-1 bg-black border border-white/10 rounded-full p-1 z-20 shadow-md">
                      <Sparkles className="w-3.5 h-3.5 text-cyber" />
                    </div>
                  </div>

                  {/* Profile info text */}
                  <div className="text-center">
                    <h3 className="text-[15px] font-bold text-white tracking-tight flex items-center justify-center gap-1">
                      DA ProSound
                      <svg className="w-3.5 h-3.5 text-cyber" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </h3>
                    <p className="text-[11px] text-white/55 font-light mt-0.5">@daprosound</p>
                  </div>

                  {/* Stats Row inside TikTok */}
                  <div className="flex items-center justify-center gap-5 mt-4">
                    <div className="text-center">
                      <div className="text-[13px] font-bold text-white">0</div>
                      <div className="text-[10px] text-white/40 scale-90 origin-center">Đang follow</div>
                    </div>
                    <div className="w-[1px] h-3 bg-white/10" />
                    <div className="text-center">
                      <div className="text-[13px] font-bold text-white">10.6K</div>
                      <div className="text-[10px] text-white/40 scale-90 origin-center">Follower</div>
                    </div>
                    <div className="w-[1px] h-3 bg-white/10" />
                    <div className="text-center">
                      <div className="text-[13px] font-bold text-white">71.5K</div>
                      <div className="text-[10px] text-white/40 scale-90 origin-center">Thích</div>
                    </div>
                  </div>

                  {/* Edit profile mimics or interactive links */}
                  <div className="flex gap-2 w-full max-w-[240px] mt-5">
                    <a 
                      href="https://www.tiktok.com/@daprosound"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-white/10 hover:bg-white/15 text-white/90 text-center py-2 px-3 rounded-lg font-semibold tracking-tight transition-colors border border-white/5 text-[11px]"
                    >
                      Sửa hồ sơ
                    </a>
                    <a 
                      href="https://www.tiktok.com/@daprosound"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-white/10 hover:bg-white/15 text-white/90 text-center py-2 px-3 rounded-lg font-semibold tracking-tight transition-colors border border-white/5 text-[11px]"
                    >
                      Quảng bá
                    </a>
                  </div>

                  {/* Bio details description */}
                  <p className="text-[11px] font-light text-center text-white/80 leading-relaxed mt-5 max-w-[245px] whitespace-pre-line">
                    {"Mua bán, sửa chữa thiết bị âm thanh:\n- Loa, Micro, Vang cơ, Vang số, Đẩy công suất"}
                  </p>
                </div>

                {/* Inner Playlists links mimics */}
                <div className="px-4 py-2 border-t border-b border-white/5 bg-[#050505]">
                  <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
                    <div className="flex items-center gap-2 bg-white/5 py-1 px-3 rounded-full border border-white/5 shrink-0 select-none">
                      <Volume2 className="w-3.5 h-3.5 text-cyber" />
                      <span className="text-[10px] font-semibold text-white/90">Kiến thức âm thanh • 9</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 py-1 px-3 rounded-full border border-white/5 shrink-0 select-none">
                      <Tv className="w-3.5 h-3.5 text-[#00f2fe]" />
                      <span className="text-[10px] font-semibold text-white/90">Cách chỉnh Vang • 6</span>
                    </div>
                  </div>
                </div>

                {/* Tabs row with Grid / Liked / Bookmarked */}
                <div className="grid grid-cols-3 border-b border-white/5 bg-black sticky top-0 z-20">
                  <button 
                    onClick={() => setActiveTab('posts')}
                    className={`flex items-center justify-center py-3 border-b-2 transition-colors ${activeTab === 'posts' ? 'border-white text-white' : 'border-transparent text-white/45 hover:text-white'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('liked')}
                    className={`flex items-center justify-center py-3 border-b-2 transition-colors ${activeTab === 'liked' ? 'border-white text-white' : 'border-transparent text-white/45 hover:text-white'}`}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('bookmarked')}
                    className={`flex items-center justify-center py-3 border-b-2 transition-colors ${activeTab === 'bookmarked' ? 'border-white text-white' : 'border-transparent text-white/45 hover:text-white'}`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                {/* Grid Content section */}
                {activeTab === 'posts' && (
                  <div className="grid grid-cols-3 gap-0.5 p-0.5">
                    {mockVideos.map((video, idx) => (
                      <a 
                        href={video.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        key={idx}
                        className="relative aspect-[3/4] bg-neutral-900 overflow-hidden group/video cursor-pointer"
                      >
                        <img 
                          src={video.image} 
                          alt={video.title} 
                          className="w-full h-full object-cover group-hover/video:scale-105 transition-transform duration-500 opacity-90 group-hover/video:opacity-100" 
                        />
                        {/* Shading gradient for readability of overlays */}
                        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                        {/* Top banner labels (Pinned, Live, etc.) */}
                        {video.isPinned && (
                          <div className="absolute top-1 left-1 bg-[#ff0050] text-white text-[8px] font-black px-1 py-[1.5px] rounded-[1.5px] uppercase tracking-wide shadow-sm scale-90">
                            Đã ghim
                          </div>
                        )}

                        {/* Video title overlay bottom */}
                        <div className="absolute inset-x-1 bottom-1 flex flex-col items-start gap-0.5 select-none pointer-events-none origin-bottom-left scale-90">
                          {/* Simulated Play overlay badge */}
                          <div className="flex items-center text-[8px] font-bold text-white bg-black/30 backdrop-blur-[1px] px-1 py-[1.5px] rounded-[2px]">
                            <Play className="w-[6px] h-[6px] mr-[2px] text-white fill-current" />
                            {video.views}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                {activeTab === 'liked' && (
                  <div className="py-12 flex flex-col items-center justify-center text-white/40 gap-2">
                    <Lock className="w-6 h-6 stroke-[1.5]" />
                    <span className="text-[10px] font-light">Các video đã thích của người dùng ẩn danh</span>
                  </div>
                )}

                {activeTab === 'bookmarked' && (
                  <div className="py-12 flex flex-col items-center justify-center text-white/40 gap-2">
                    <Lock className="w-6 h-6 stroke-[1.5]" />
                    <span className="text-[10px] font-light">Danh sách lưu trữ riêng tư</span>
                  </div>
                )}

              </div>
                </>
              )}

              {/* Simulated iPhone Bottom Navigation pill */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/70 rounded-full z-40" />

            </div>

          </div>

          {/* Luxury dynamic shadow underneath the phone */}
          <div className="absolute -bottom-8 w-[240px] h-[30px] bg-black/60 blur-[30px] rounded-full pointer-events-none select-none z-0" />

        </div>

      </div>

    </section>
  );
}
